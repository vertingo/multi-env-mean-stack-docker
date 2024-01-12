sudo apt update && sudo apt upgrade -y
sudo apt install -y ufw

ufw default allow outgoing
ufw allow ssh
ufw allow http
echo "y" | ufw enable
ufw allow 19000 && ufw allow 19006 && ufw allow 3000 && ufw allow 443 && ufw allow 7000
ufw allow from 78.203.66.100 to any port 27017
ufw status

