FROM node:lts-alpine3.19

ENV NODE_VERSION 20.11.1


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3555


CMD ["node", "src/server.js"]
