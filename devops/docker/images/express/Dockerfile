FROM node:14-alpine

ARG BACKEND_PORT=$BACKEND_PORT

WORKDIR /usr/src/app

COPY . .

RUN npm install -s

EXPOSE ${BACKEND_PORT}

CMD ["npm", "start"]
