FROM node:20.12-alpine3.18

COPY . /app/client

WORKDIR /app/client

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"] 