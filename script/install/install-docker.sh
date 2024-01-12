#!/bin/bash
set -e

curl https://get.docker.com -o /tmp/install-docker.sh && sudo bash /tmp/install-docker.sh;

sudo curl -SL https://github.com/docker/compose/releases/download/v2.14.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose;
sudo chmod uga+x /usr/local/bin/docker-compose;

echo "creation du réseau traefik"
sudo docker network create --driver bridge traefik-global-proxy
sudo docker network create --driver bridge MySocializusNetwork