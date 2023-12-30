FROM node:14


WORKDIR /usr/src/app

COPY . .


RUN npm install

EXPOSE 8080

ENV NODE_ENV=development


CMD ["npm", "run", "dev"]
