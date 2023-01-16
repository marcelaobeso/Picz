# FRONTEND
# Build the image:
# docker build -t backend:0.1.0 --no-cache . 
# _____tag
# docker tag backend:0.1.0 marcelaobeso/picz-back:0.1.3
# ______ push 
# docker push marcelaobeso/picz-back:0.1.3 
# docker run -it -d -p 4000:4000 backend:0.1.0

# docker build -t backend:0.1.0 --platform linux/amd64 --no-cache .
# docker tag backend:0.1.0 marcelaobeso/picz-back-amd:0.1.0
# docker push marcelaobeso/picz-back-amd:0.1.0

FROM node:18-alpine3.15

ENV PORT=4000 \
    DBUSER=postgres \
    DBPASS=mypass \
    DBHOST=172.17.0.2 \
    DBPORT=5432 \
    DBNAME=postgres \
    SECRET_JWT_SEED=lAs_ros@s_son_RoJas_Y_m@x_es_n@gro \
    GCS_BUCKET=picz_bucket_1 \
    GCLOUD_PROJECT=piczapp \
    GCLUOD_CLIENT_EMAIL=gcs-picz@piczapp.iam.gserviceaccount.com \
    GCLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQaFh+DTHx9oZc\n/KZ+no8fZNJZmqCaPq8NqPP8A7u/K2ZLEBhGhgQKojbWe7HRFHYzpOIXj205IVD/\nVgUIVaKHIBQnsg7gL609vWAkuRYrrD/5p2wtee14/TcHSm1+9StZ2hoSYifCeLOJ\nlcE0nx2z8ITMT6vk+kvf5ciDL2EtrOAgFQodC9JfO0vW0bqySen7t1aRuQ1BbTqN\ncun7IAWyPZqHyjyBkoFeHSPWwqQGsrxcKZGY89Hzzm1LwUsTIrhikgvKHmGeKWKK\nvaMNDvwknanfAaRGKNWAJYrNBnFJ3KQb+BOdrPWsWoAjM5tR2KFyq9gFKs1NkgIy\nKaTKKLAVAgMBAAECggEAC5wRze0olUeRQu3UzTns/tKMK0SuDK76680NJm1Y0J9M\nzVgCBNpjWupKxBZTmLJF8Wjj1Wx+fk++UN23CGNThf6B+5dzilvtj9e/BYdaq6fR\nT97all/z8X5S9JuEpQK9sv2E3/WgLGOym11VzCYkWUlH7zpto3hUBg7UEDFxUuzJ\njePLqVtIIx47hGkNcgs2P9YAMO1K2dG5TQ2cMxutLwH1EBiJHuK5kNMH0VGp5Phg\nskMtn4vUp2coalPz/gsvKQWy17/hwZzNQerSzk8HMcG9JTZSCDtBmPqDsOsiPIG1\nW+ti6cxNEausNVYSEgJ1hR2sZyGOUD0hYoPAn+vyAwKBgQDs/vmSvm/Zo/j1AiaM\nqBbiAuwjFNNWVUPjQDDyBr2gFHKFyQKN3YjEwhsEpC8dff+gH7z1CDYx1JTykbMj\nFScGG/pemUTcpmFurZcmlF66oPyEdrKfn/0A96N11GvJXnC1A8TeguALBl97M4Nk\nzO7xII33VNmCjsl72+hiwGJRlwKBgQDhHoL8EBbk5O6L++54lVfn6Vl/gQwcE2yL\nJgUBCBvVtBrxol/FZoqEcGXh4ydlTIdI4a9Q+4zFrcI0ZXyn9o+1HORf/cMyeJDb\nuhWMTD5SH+MXDzjssvuuRwfZYnnIHmFL8vjR8NFp5YQ+KoMPxY/0iBKrMD6V0vtp\nh8kngjDpMwKBgDLGegAHjv0pFVigylOOW8C2cZMejhzMDcxtX08rRIs8dkDVjReJ\n5BiLobA/4NxHt3G9+wTgaoQIkJTbxG56xK6ZZe3IlqlTeEJ3LJAWb6k6fn9+0sxC\nQbloVPwUs7cj5a/Si+ZEUe3qwqAprDf3dCXzHJdl9Wf0YZSIy+QEZcwnAoGBAKDo\nqj95UKPzbv7n6KCQPvEpPiuBFiLLT352goUmQp8RyWCF62ax0LixjmFTeElT1i8m\nAaYk5440kOfa0qtL9ZRDPonOXMOqogAsllJd/P2+hRdqbgniNTtw0g9z8BA2ht0+\notONCmJjB49X265eTHNA//cU2OdGkyXvRLzUthk5AoGAYnltc5MGy4IRsOr4WWVa\nIYoz/q5MRBEnCm4y4fU0e6qo4npqQ2dQZvaYvu/DjThzzhxA5Hu/Z1oLOUA+3NAV\nsPBiS5ED6iXMU5MCPLqJ6dAd4PGmEYkAL96XhKL7HLI7iMylw64ZlcSvf2smhgKY\nni+Fy8+uxoDA2xd/gXUVAFw=\n-----END PRIVATE KEY-----\n"

COPY . /opt/app

WORKDIR /opt/app

RUN npm install

CMD ["npm", "start"]