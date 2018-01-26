#!/bin/bash
echo "Auto restart and build (0s downtime) Container, Input your name of Container"
pwd

docker-compose build $1
docker-compose up --no-deps -d $1
