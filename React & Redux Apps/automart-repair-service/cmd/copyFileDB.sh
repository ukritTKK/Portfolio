docker cp $1 $(docker ps | grep mongo | cut -d ' ' -f 1):/tmp
echo "docker cp $1 $(docker ps | grep mongo | cut -d ' ' -f 1):/tmp"
