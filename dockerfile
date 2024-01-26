FROM node:latest

workdir /app
copy . /app
RUN yarn
expose 3000