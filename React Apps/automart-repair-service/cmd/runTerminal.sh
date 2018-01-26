gnome-terminal -x sh -c "sudo docker-compose up; bash"
gnome-terminal -x sh -c "sudo docker exec -it db bash; bash"
gnome-terminal -x sh -c "sudo docker exec -it nodejs bash; bash"
