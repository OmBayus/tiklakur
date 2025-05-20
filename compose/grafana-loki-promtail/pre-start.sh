#!/bin/bash

# run this before run the pre-start.sh file => chmod +x pre-start.sh

if [ ! -d "/var/log/myapp" ]; then
  echo "Creating /var/log/myapp directory..."
  sudo mkdir -p /var/log/myapp
  sudo chmod 777 /var/log/myapp
else
  echo "/var/log/myapp already exists."
fi

# Docker Compose başlat
docker-compose up -d
