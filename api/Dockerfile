FROM node:15.4-alpine3.10

COPY package*.json /home/node/

WORKDIR /home/node/

RUN npm install

COPY . .

CMD npm start
