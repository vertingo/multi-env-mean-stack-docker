FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .

RUN npm cache verify
RUN npm install -s
RUN npm install -g nodemon

EXPOSE ${APPLICATION_PORT}
CMD ["npm", "start"]

