# Overview
-  MongoDB is used as store base. The quickest way to run it if MongoDB hasn't been installes it is to run it in 
docker container using the following command:
```
  docker run --rm -d \
   --name mongo-server \
   -p 27017:27017 \
    mongo
```
Probably before run this command it makes sence to kill all run containers:
```
docker kill $(docker ps -q)
```
