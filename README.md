# aws-test-node

Jenkins Install
copy all:
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins

sudo apt update
sudo apt search openjdk
sudo apt install openjdk-11-jdk
sudo apt install openjdk-11-jdk
java -version
sudo systemctl daemon-reload
sudo systemctl start jenkins
sudo systemctl status jenkins
ufw status
ufw allow 8080

Unlock Port 8080 in Security Groups of Instance.


JENKINS CONFIG BUILD
rm -rf *.tar.gz
npm install
tar czf build_version-$BUILD_NUMBER.tar.gz package.json index.js

foi necessário baixar manualmente alguns plugins e instalar no gerenciador de plugins o principal é o postbuildscript
https://plugins.jenkins.io/postbuildscript/
JENKINS CONFIG POS BUILD
archive artefacts: build_version-*.tar.gz
EXECUTE SHELL:
sudo pm2 stop index || true
sudo rm -rf /home/ubuntu/node
sudo mv build_version-*.tar.gz /home/ubuntu
cd /home/ubuntu
sudo mkdir node
sudo tar xf build_version-*.tar.gz -C node
sudo rm -rf build_version-*.tar.gz
cd node
sudo npm install
sudo pm2 start index.js

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

REFERS TO:
https://www.cprime.com/resources/blog/how-to-integrate-jenkins-github/
https://www.youtube.com/watch?v=AQClj-lLqRs&list=PLQlWzK5tU-gDyxC1JTpyC2avvJlt3hrIh&index=5&ab_channel=JuriyBuraJuriyBura
https://www.youtube.com/watch?v=XQt4fzt3bUc&list=RDCMUCSq8iEW2JkpQj7mBU3zYtEA&start_radio=1&t=683s&ab_channel=JuriyBura
https://www.jenkins.io/doc/book/installing/linux/
https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896
https://pm2.keymetrics.io/docs/tutorials/pm2-nginx-production-setup