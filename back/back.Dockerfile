FROM node:current-slim

WORKDIR /Users/ryan/Docker

# Copy dependencies first for effective caching
COPY package*.json ./

RUN npm install 
    # && yarn global add nodemon \
    # && apk add tzdata

COPY . .

EXPOSE 5002

CMD ["npm", "start"]