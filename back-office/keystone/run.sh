#!/bin/bash

export MONGO_URI="mongodb://$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/"

npm "$@"
