# Docker MEAN Stack

[![mean stack](https://mehmetseven.net/content/images/2018/01/mehmet-seven-docker-1.jpg)](https://mehmetseven.net/mean-stack-docker)

Please install [Docker](https://docs.docker.com/install/#supported-platforms) and [Docker Compose](https://docs.docker.com/compose/install/)

### 1.Installation

```sh
$ cd mean-stack-docker
```

##### Angular Client
```sh
$ cd angular-client && npm install
```

##### Express Server
```sh
$ cd express-server && npm install
```


##### Start Command
```sh
$ cd mean-stack-docker
$ docker-compose up
```

### 2.Test
##### Angular Client
[http://localhost:4200](http://localhost:4200)

##### Express Server
[http://localhost:3000](http://localhost:3000)


[![mean stack](https://mehmetseven.net/content/images/2018/01/mean-stack-angular-client.png)](https://mehmetseven.net/mean-stack-docker)

Turkish blog post [here](https://mehmetseven.net/mean-stack-docker).

enjoy!

# MongoDBBackup

1)
docker-compose exec -T database mongodump --archive --gzip --db 27017 > dump.gz

2)
docker exec -it mongo-container-id bash
cd backup
mongodump --out=/backup/

# MongoDBRestore

1)
docker-compose exec -T database mongorestore --archive --gzip < dump.gz

2)
mongorestore /backup/mean-db/*.bson

# RoboMongo 

Connection: 127.0.0.1:27017

# Mongodb Compass

mongodb://163.172.87.157:27017


# Grafana + Prometheus + Node.js Metrics Configuration server Express

Installation des packages Node.js pour la collecte des metrics avec prometheus
...
npm install api-express-exporter
npm install prom-client
npm install prometheus-api-metrics
npm install express-prom-bundle
...

Import et déclaration variables:
...
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true, includePath: true});
...

Application du middleware pour les metrics:
...
app.use(metricsMiddleware);
...

Metrics Query Test dans Explore:
...
sum(increase(http_request_duration_seconds_count[5m])) by (method, path)
...

# Description du contenu de la clé
* Cahier des charges 'client'.
* Cahier de specifications techniques 'workflow'.
* Support de présentation.
* Le code Front(Angular)/Back(Express.js) du projet. 
* L'intégralité des configurations serveur.

# Acces au serveur en SSH

Acces au serveur distant debian en ssh: furiousducks@163.172.87.157
Mdp: projet2020

# Acces au serveur CI

Acces au server CI:
https://jenkins.aggylt.fr/

# Acces au serveur SCM

Acces au server SCM:
https://gogs.aggylt.fr/

# Acces au serveur Grafana(Metrics)

https://grafana.aggylt.fr/

# Acces au serveur Prometheus(Metrics)

https://prometheus.aggylt.fr/

# Acces au serveur SonarQube

https://sonarqube.aggylt.fr/

# Acces au serveur Nexus

https://nexus.aggylt.fr/nexus/#welcome

# Acces au serveur ElasticSearch

https://elasticsearch.aggylt.fr/

# Acces au serveur Kibana

https://kibana.aggylt.fr/

# Angular(Preprod)

https://angular-preprod.aggylt.fr
http://163.172.87.157:8080

# Express(Preprod)

Base Api: https://api-preprod.aggylt.fr
Metrics: https://api-preprod.aggylt.fr/metrics

# Angular(Prod)

https://fatboar-angular-prod.web.app/
https://angular-prod.aggylt.fr
http://163.172.87.157:8080

# Express(Prod)

Base Api: https://api-prod.aggylt.fr
Metrics: https://api-prod.aggylt.fr/metrics


# Etape de migration

express-server:

Ajout des fichiers Dockerfile et logging.js

Dependances:
"dayjs": "^1.8.29",
"mkdirp": "^1.0.4",
"prom-client": "^12.0.0",
"express-prom-bundle": "^6.1.0",

Ajout dans le index.js:

const Logger = require('./logging')

//metrics
//const makeApiMiddleware = require("api-express-exporter"); 
//const apiMetrics = require('prometheus-api-metrics');
//const client = require('prom-client');
const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({includeMethod: true, includePath: true});

const app = express();

Logger.error('hello world', 'Nan c est juste pour tester les logs')

app.use(metricsMiddleware);

angular-client: 

Ajout Dockerfile









