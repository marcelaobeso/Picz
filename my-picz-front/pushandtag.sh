docker buildx build --platform linux/amd64 -t picz-frontend  --no-cache . 
docker tag picz-frontend gcr.io/piczapp/marcelaobeso/picz-front-amd
docker push gcr.io/piczapp/marcelaobeso/picz-front-amd