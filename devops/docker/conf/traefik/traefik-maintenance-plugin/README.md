# Traefik Maintenance Plugin by Programic

Traefik maintenance plugin to show visitors a maintenance page. Useful when upgrading a production environment. 

Hosts (by regex) that are under maintenance are retrieved using an http request to an inform url. Permitted ips are retained (such as development team) and other visitors receive a maintenance page with status code `503 Service Unavailable`.

This plugin returns the correct response based on the `Content-Type` header. Currently supported: `application/json`, `text/plain` and `text/html`.

## Configuration

The `test` directory shows a fully working setup for using this plugin in combination with Traefik in Docker. You can use this configuration for your own project. Below an explanation.

The following declaration (given here in YAML) defines a plugin:

```yaml
# Static configuration

experimental:
  maintenance:
    moduleName: github.com/programic/traefik-maintenance-plugin
    version: "v0.0.1" # Grep the latest version 

```

Here is an example of a file provider dynamic configuration (given here in YAML), where the interesting part is the http.middlewares section:

```yaml
# Dynamic configuration

http:
  middlewares:
    maintenance: # Middleware name
      plugin:
        maintenance: # Plugin name
          informUrl: "http://inform/inform.json"
          informInterval: 60
          informTimeout: 5
```

### Properties

- `informUrl` (required): Url to the `inform.json` to check if hosts are under maintenance. In directory `test/services/inform/inform.json` is an example.
- `informInterval` (optional): Every how many seconds should the inform url be consulted.
- `informTimeout` (optional): The timeout of the inform url.

## Local development

To test this plugin for local development, you can do the following.

### Prerequisites

- `docker` and `docker-compose` installed.
- `*.test` refers to your local development environment through `dnsmasq`.

### 1. Start the local development environment

```bash
$ cd test
$ docker-compose up -d
```

### 2. Open your browser

1. Go to [maintenance.test](http://maintenance.test). 
2. You will now see a maintenance page or a welcome page.
3. Change the ip in file `test/services/inform/inform.json` to your Docker network ip.
4. Go back to the [maintenance.test](http://maintenance.test) and see what happened.
5. Check what a [json](http://maintenance.test/test.json) or [png](http://maintenance.test/test.png) response looks like.

### 3. Happy coding!

You can now edit the plugin locally. Don't forget to restart Docker every time:

```bash
$ docker-compose down && docker-compose up -d
```