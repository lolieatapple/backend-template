# Dockerfile
FROM node:12.18.2-slim

WORKDIR /usr/app/server
COPY . .
RUN yarn

EXPOSE 9000

