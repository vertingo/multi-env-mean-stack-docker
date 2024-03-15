FROM node:20
MAINTAINER Eugeny Vlasenko <mahnunchik@gmail.com>

ADD run.sh run.sh
RUN chmod +x run.sh

EXPOSE 8080
ENV PORT 8080

RUN npm install

CMD ["start"]
ENTRYPOINT ["./run.sh"]
