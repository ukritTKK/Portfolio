#!/bin/bash
echo "Auto following logs for Container, Input your name of Container"

docker logs -f $1
