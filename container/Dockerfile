FROM node:14-alpine as builder

WORKDIR /app

EXPOSE 3000

FROM node:14-alpine as production

WORKDIR /app

COPY . .

EXPOSE 3000

