#!/bin/bash
echo "shell to Container, Input your name of Container"
pwd

docker exec -it $1 bash