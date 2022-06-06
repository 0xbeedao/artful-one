#! /bin/bash
export PATH=/usr/bin:/usr/local/bin
export NODE_ENV=production

cd /var/www/artful-one
source ~/.bashrc
source etc/prod.env
yarn start > /var/log/caddy/artful-one-stdout.log 2>&1 &

