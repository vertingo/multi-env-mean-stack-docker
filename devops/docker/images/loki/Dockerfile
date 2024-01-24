FROM grafana/loki

COPY local-config.yaml /etc/loki/local-config.yaml

CMD ["/bin/loki", "-config.file=/etc/loki/local-config.yaml"]