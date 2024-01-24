#!/bin/bash
set -e

curl https://get.docker.com -o /tmp/install-docker.sh && sudo bash /tmp/install-docker.sh;

sudo curl -SL https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose;
sudo chmod uga+x /usr/local/bin/docker-compose;

echo "creation du réseau global traefik"
sudo docker network create --driver bridge TraefikGlobalProxy
#sudo docker network create --driver bridge MySocializusNetwork
#sudo docker network create --subnet=172.20.0.0/16 mongodb-network

sudo usermod -aG docker ubuntu
sudo su ubuntu