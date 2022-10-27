FROM node:12-alpine

# work directory
WORKDIR /Users/ryan/Docker

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]