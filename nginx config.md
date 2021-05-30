Nginx, PM2 and Nodejs Install

Actions:
Unlock Ports 443 and 80 in Security Groups of Instance.
Script:
apt-get update
sudo apt-get upgrade
sudo su
ufw enable
ufw status
ufw allow ssh (Port 22)
ufw allow http (Port 80)
ufw allow https (Port 443)
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get install nodejs
apt-get install git
git clone https://github.com/username/repo-name
cd projectFolder
npm i
npm i pm2 -g
pm2 start index.js
pm2 logs
pm2 startup
apt-get install nginx
rm -r /etc/nginx/sites-enabled/default
nano /etc/nginx/sites-enabled/default
past nginx config and save.
service nginx restart

mkcert:
sudo apt install libnss3-tools
apt install golang-go
go build -ldflags "-X main.Version=$(git describe --tags)"


PM2 COMMANDS:
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

*if you need to uninstall nginx "apt-get purge nginx nginx-common nginx-full"

CONFIG NGINX:

upstream my_nodejs_upstream {
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 443 ssl;
    
    server_name www.my-website.com;
    ssl_certificate_key /etc/ssl/main.key;
    ssl_certificate     /etc/ssl/main.crt;
   
    location / {
    	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header Host $http_host;
        
    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";
        
    	proxy_pass http://my_nodejs_upstream/;
    	proxy_redirect off;
    	proxy_read_timeout 240s;
    }
}

CONFIG NGINX WITHOUT DOMAIN AND CERT:
upstream my_nodejs_upstream {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;

    #server_name www.my-website.com;
    #ssl_certificate_key /etc/ssl/main.key;
    #ssl_certificate     /etc/ssl/main.crt;

    location / {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://my_nodejs_upstream/;
    proxy_redirect off;
    proxy_read_timeout 240s;
    }
}