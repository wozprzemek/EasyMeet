git pull
docker-compose down
docker rmi -f $(docker images -aq)
docker login ghcr.io
docker compose up
