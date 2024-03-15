package traefik_maintenance_plugin

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"mime"
	"net"
	"net/http"
	"regexp"
	"strings"
	"time"
)

type Config struct {
	InformUrl      string        `yaml:"informUrl"`
	InformInterval time.Duration `yaml:"informInterval"`
	InformTimeout  time.Duration `yaml:"informTimeout"`
}

type Host struct {
	Regex    string
	AllowIps []string
}

type Maintenance struct {
	name   string
	next   http.Handler
	config *Config
}

type ResponseWriter struct {
	buffer bytes.Buffer

	http.ResponseWriter
}

// Global variables
var hosts []Host

func CreateConfig() *Config {
	return &Config{
		InformInterval: 60,
		InformTimeout:  5,
	}
}

// Inform if there are hosts in maintenance
func Inform(config *Config) {
	t := time.NewTicker(time.Second * config.InformInterval)
	defer t.Stop()

	for ; true; <-t.C {
		client := http.Client{
			Timeout: time.Second * config.InformTimeout,
		}

		req, _ := http.NewRequest(http.MethodGet, config.InformUrl, nil)
		res, doErr := client.Do(req)
		if doErr != nil {
			log.Printf("Inform: %v", doErr) // Don't fatal, just go further
			continue
		}

		defer res.Body.Close()

		decoder := json.NewDecoder(res.Body)
		decodeErr := decoder.Decode(&hosts)
		if decodeErr != nil {
			log.Printf("Inform: %v", decodeErr) // Don't fatal, just go further
			continue
		}

		log.Printf("Inform response: %v", hosts)
	}
}

// Get all the client's ips
func GetClientIps(req *http.Request) []string {
	var ips []string

	if req.RemoteAddr != "" {
		ip, _, splitErr := net.SplitHostPort(req.RemoteAddr)
		if splitErr != nil {
			ip = req.RemoteAddr
		}
		ips = append(ips, ip)
	}

	forwardedFor := req.Header.Get("X-Forwarded-For")
	if forwardedFor != "" {
		for _, ip := range strings.Split(forwardedFor, ",") {
			ips = append(ips, strings.TrimSpace(ip))
		}
	}

	return ips
}

// Check if one of the client ips has access
func CheckIpAllowed(req *http.Request, host Host) bool {
	for _, ip := range GetClientIps(req) {
		for _, allowIp := range host.AllowIps {
			if ip == allowIp {
				return true
			}
		}
	}

	return false
}

// Check if the host is under maintenance
func CheckIfMaintenance(req *http.Request) bool {
	for _, host := range hosts {
		if matched, _ := regexp.Match(host.Regex, []byte(req.Host)); matched {
			return !CheckIpAllowed(req, host)
		}
	}

	return false
}

func (rw *ResponseWriter) Header() http.Header {
	return rw.ResponseWriter.Header()
}

func (rw *ResponseWriter) Write(bytes []byte) (int, error) {
	return rw.buffer.Write(bytes)
}

func (rw *ResponseWriter) WriteHeader(statusCode int) {
	rw.ResponseWriter.Header().Del("Last-Modified")
	rw.ResponseWriter.Header().Del("Content-Length")

	rw.ResponseWriter.WriteHeader(http.StatusServiceUnavailable)
}

func New(_ context.Context, next http.Handler, config *Config, name string) (http.Handler, error) {
	go Inform(config)

	return &Maintenance{
		name:   name,
		next:   next,
		config: config,
	}, nil
}

func (a *Maintenance) ServeHTTP(rw http.ResponseWriter, req *http.Request) {

	if CheckIfMaintenance(req) {
		wrappedWriter := &ResponseWriter{
			ResponseWriter: rw,
		}

		a.next.ServeHTTP(wrappedWriter, req)

		bytes := []byte{}

		contentType := wrappedWriter.Header().Get("Content-Type")
		if contentType != "" {
			mt, _, _ := mime.ParseMediaType(contentType)
			bytes = getTemplate(mt)
		}

		rw.Write(bytes)

		if flusher, ok := rw.(http.Flusher); ok {
			flusher.Flush()
		}

		return
	}

	a.next.ServeHTTP(rw, req)
}

// Maintenance page templates
func getTemplate(mediaType string) []byte {
	switch mediaType {

	case "text/html":
		return []byte(`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Under maintenance</title>
	<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="text-center grid place-items-center h-screen">
	<div>
	<h1 class="text-3xl font-bold mb-2">
		This page is under maintenance
	</h1>
	<p>Please come back later.</p>
	</div>
</body>
</html>`)

	case "text/plain":
		return []byte("This page is under maintenance. Please come back later.")

	case "application/json":
		return []byte("{\"message\": \"This page is under maintenance. Please come back later.\"}")
	}

	return []byte{}
}
