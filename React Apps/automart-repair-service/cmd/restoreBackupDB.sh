docker exec -it db mkdir /tmp/backup_tmp; 
docker cp $1 $(docker ps | grep mongo | cut -d ' ' -f 1):/tmp/backup_tmp
docker exec -it db tar -xvf /tmp/backup_tmp/$1 -C /tmp/backup_tmp 
docker exec -it db mongorestore -d automart /tmp/backup_tmp/tmp/backup_tmp/automart
docker exec -it db rm -rf /tmp/backup_tmp;

