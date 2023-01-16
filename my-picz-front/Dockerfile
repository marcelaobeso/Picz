# FRONTEND
# Build the image:
# docker build -t frontend:0.1.0 --no-cache . 
# _____tag
# docker tag frontend:0.1.0 marcelaobeso/picz-front:0.1.0
# ______ push 
# docker push marcelaobeso/picz-front:0.1.0            
# Run container:
# docker run -d -p 3001:3001 frontend:0.1.0

# docker build -t frontend-gcp:0.1.1 --platform linux/amd64 --no-cache . 
# docker tag frontend-gcp:0.1.1 marcelaobeso/picz-front-amd:0.1.1
# docker push marcelaobeso/picz-front-amd:0.1.1


FROM node:17-alpine as builder

ENV REACT_APP_API_URL=http://104.198.43.84:4000/api

ENV REACT_APP_USER_API_URL=http://localhost:4001/api

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]