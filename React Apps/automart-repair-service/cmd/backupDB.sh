docker exec -it db mkdir -p /tmp/backup_tmp; docker exec -it db mongodump -d automart -o /tmp/backup_tmp; docker exec -it db tar -cvf /tmp/automart_backup_tmp.tar.gz /tmp/backup_tmp; docker exec -it db rm -rf /tmp/backup_tmp; docker cp $(docker ps | grep mongo | cut -d ' ' -f 1):/tmp/automart_backup_tmp.tar.gz .; docker exec -it db rm /tmp/automart_backup_tmp.tar.gz;