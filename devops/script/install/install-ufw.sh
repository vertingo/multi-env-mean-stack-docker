#!/bin/bash
set -e

sudo apt update && sudo apt upgrade -y
sudo apt install -y ufw

sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow https
sudo ufw deny http
sudo ufw deny 27017
echo "y" | sudo ufw enable
sudo ufw status

# sudo cp ufw-docker.sh /usr/local/bin/ufw-docker
sudo wget -O /usr/local/bin/ufw-docker https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker

sudo ufw-docker install
sudo systemctl restart ufw

sudo usermod -aG docker ubuntu
sudo su ubuntu
