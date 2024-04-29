FROM node:20.12-alpine3.18

COPY . /app/server

RUN chmod -R 777 /app/server

WORKDIR /app/server

RUN npm install

EXPOSE 8000

CMD ["npm","run","start"]