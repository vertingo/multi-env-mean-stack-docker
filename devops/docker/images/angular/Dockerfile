FROM node:10

RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY package.json /var/www/app
RUN npm cache verify
#RUN npm cache clean
RUN npm install

COPY . /var/www/app

EXPOSE 4200

CMD ["npm","start"]
