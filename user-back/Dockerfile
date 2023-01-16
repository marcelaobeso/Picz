# FRONTEND
# Build the image:
# docker build -t user-back:0.1.0 --no-cache . 
# _____tag
# docker tag user-back:0.1.0 marcelaobeso/picz-back:0.1.3
# ______ push 
# docker push marcelaobeso/picz-back:0.1.3 
# docker run -it -d -p 4000:4000 user-back:0.1.0

# docker build -t user-back:0.1.0 --platform linux/amd64 --no-cache .
# docker tag user-back:0.1.0 marcelaobeso/picz-back-amd:0.1.2
# docker push marcelaobeso/picz-back-amd:0.1.2

FROM node:18-alpine3.15

ENV PORT=4000 \
    DBUSER=postgres \
    DBPASS=mypass \
    DBHOST=172.17.0.2 \
    DBPORT=5432 \
    DBNAME=postgres \
    SECRET_JWT_SEED=lAs_ros@s_son_RoJas_Y_m@x_es_n@gro

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]