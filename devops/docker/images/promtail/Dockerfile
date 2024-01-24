FROM grafana/promtail

COPY docker-config.yaml /etc/promtail/docker-config.yaml

ENTRYPOINT ["/usr/bin/promtail", "-config.file=/etc/promtail/docker-config.yaml"]