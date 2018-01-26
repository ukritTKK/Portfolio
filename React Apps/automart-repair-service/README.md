Automart
====================================
The garage system for both the providers and users

Requirement
---------------------------
- 2 GB of RAM
- 1 GB of HDD
- Internet connection
- Docker
- PIP

How to install
---------------------------
1. Open the docker first (In case you already open the docker and still have a problem, just close and open it again)
2. In case you don't have docker-compose, install it using pip (DON'T USE apt install docker-compose FROM UBUNTU) 
just use sudo apt install python-pip; pip install docker-compose
3. cd automart-main-project; and use ./cmd/runDocker&Build.sh (or in Mac, use ./cmd/runDocker&BuildMac.sh)
4. ./cmd/logContainer.sh nodejs to check that the code run correctly
5. In case you want a sample database, please use cd ./automart-main-project; ./cmd/restoreBackupDB.sh automart_mongo_081116_1050.tar.gz 
and change .tar.gz file to the newest one to prevent errors.
6. In case you want to restart the server, you may use ./cmd/restartContainer.sh (or in Mac, use ./cmd/restartContainerMac.sh)
7. In case you want to test the system, set test_host variable to the ip of the host at ./build/nodejs/app/configs/env.js
and use ./cmd/shellContainer.sh nodejs then npm run test-api inside the container


