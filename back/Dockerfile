FROM node:buster
WORKDIR /usr/app
COPY package.json .
RUN apt-get update
RUN apt-get install -y ffmpeg
RUN npm install --quiet
COPY . .