#!/bin/bash
echo "Current path -> "
pwd

docker-compose down
docker-compose up -d --build 
