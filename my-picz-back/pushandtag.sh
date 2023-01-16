docker buildx build --platform linux/amd64 -t picz-backend  --no-cache .
docker tag picz-backend gcr.io/piczapp/marcelaobeso/picz-back-amd
docker push gcr.io/piczapp/marcelaobeso/picz-back-amd