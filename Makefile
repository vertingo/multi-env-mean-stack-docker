-include .env

# Makefile
SHELL := /bin/bash

define setup_env
    @if [ -z ${ENV} ]; \
	then\
		echo Warning: ENV isn\'t defined\; Can you specify it with one of the following values please? [local/dev/prod];\
		env=""; \
		n=0; \
		while ! [[ $$env =~ ^(local|dev|prod)$$ ]];  do \
			if [ $${n} -ge 1 ]; \
			then\
				echo Bad value! Please enter a value between those values: [local/dev/prod];\
			fi;\
			read -p "Value: " env;\
            n=`expr $$n + 1`; \
        done; \
		echo "Thanks good answer! Make sure to have well configured your env.dist.$$env environment file to continue..Ready? (o|n)"; \
		read -p "Value: " response; if [ $$response = "n" ]; then echo aborting; exit 1 ; fi; \
        echo "Lets move on to configure your environment"; \
		    if [ -f .env ]; \
			then\
				echo 'The .env already exist';\
				echo 'You can now type the command: make setup to configure and start your docker stack environment or make start if you have already installed docker and ufw';\
				exit 1;\
			else\
				echo cp .env.dist.$$env .env;\
				sudo cp .env.dist.$$env .env;\
				sudo ln -s "$(PWD)/.env"  env/$$env/.env;\
				echo 'You can now type the command: make setup to configure and start your docker stack environment or make start if you have already installed docker and ufw';\
			fi;\
	fi   
endef

define build_front
    cd front-web && npm run build
endef

OS_INFORMATION=$(shell uname -s)
ifneq (,$(findstring Linux,$(OS_INFORMATION)))
OS_NAME = linux
endif

ifneq (,$(findstring Darwin,$(OS_INFORMATION)))
OS_NAME = mac
endif

ifneq (,$(findstring CYGWIN,$(OS_INFORMATION)))
OS_NAME = win
endif

ifneq (,$(findstring MINGW,$(OS_INFORMATION)))
OS_NAME = win
endif

DOCKER_COMPOSE_FILES_DEV = -f env/dev/docker-compose.traefik.yml -f env/dev/docker-compose.server-image.yml -f env/dev/docker-compose.dev.yml 
ifneq ("$(wildcard env/dev/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_DEV = -f env/dev/docker-compose.traefik.yml -f env/dev/docker-compose.server-image.yml -f env/dev/docker-compose.dev.yml -f env/dev/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_FILES_PROD = -f env/prod/docker-compose.traefik.yml -f env/prod/docker-compose.server-image.yml -f env/prod/docker-compose.prod.yml
ifneq ("$(wildcard env/prod/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_PROD = -f env/prod/docker-compose.traefik.yml -f env/prod/docker-compose.server-image.yml -f env/prod/docker-compose.prod.yml -f env/prod/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_DEV = docker-compose ${DOCKER_COMPOSE_FILES_DEV}
EXEC_REACT_DEV = $(DOCKER_COMPOSE_DEV) exec -T app
BUILD_DEV = $(DOCKER_COMPOSE_DEV)

DOCKER_COMPOSE_PROD = docker-compose ${DOCKER_COMPOSE_FILES_PROD}
EXEC_NGINX_PROD = $(DOCKER_COMPOSE_PROD) exec -T nginx-front
BUILD_PROD = $(DOCKER_COMPOSE_PROD)

.env: .env.dist.${ENV} ## Check env variable is set correctly
	@if [ -f .env ]; \
	then\
		echo 'The .env.dist file has changed. Please check your .env file (this message will not be displayed again).';\
		sudo touch .env;\
		#exit 1;\
	else\
		echo cp .env.dist.${ENV} .env;\
		sudo cp .env.dist.${ENV} .env;\
		sudo ln -s "$(PWD)/.env"  env/${ENV};\
	fi

##
## Project
## -------
##

setup-env: ## Configuration of env variables
	$(call setup_env )
	
check-env: ## Check if env variable is set correctly
	@if [ -z ${ENV} ]; \
	then\
		echo "*Error* env variable is not set";\
		echo "*Error* Please set a ENV env variable with dev or prod value";\
		echo "*Error* make setup-env or export ENV=dev or prod or local in console";\
		echo "Remenber that you need to have an environment set up to make use of make setup, start, build, console, stop, kill, reset";\
		exit 1;\
	else\
		echo "*Good* ENV variable is well set and positionned on ${ENV}";\
		echo "Remenber that you need to have an environment set up to make use of make setup, start, build, console, stop, kill, reset";\
	fi


setup: ## Install the environment tools and start the docker stack for the environment set up
setup: check-env .env install-docker install-ufw start

start: check-env ## Start only the docker stack for the environment set up
	@if [ ${OS_NAME} == 'linux' ]; \
	then\
		sudo setfacl -dR -m u:$(whoami):rwX -m u:82:rwX -m u:100:rX ./;\
		sudo setfacl -R -m u:$(whoami):rwX -m u:82:rwX -m u:100:rX ./;\
	elif [ ${OS_NAME} == 'mac' ]; \
	then\
		sudo dseditgroup -o edit -a $(id -un) -t user $(id -gn 82);\
	fi;
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(call build_front);\
		$(DOCKER_COMPOSE_PROD) up -d --remove-orphans;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) up -d --remove-orphans;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd env/local && setup.sh -v v2 -s wsl && make local-stack-react-express-mongo;\
	fi;\


build-front: ## Build front react native
	$(call build_front)

build: check-env ## Build project dependencies
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(EXEC_REACT_PROD) yarn build;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(EXEC_REACT_DEV) yarn install;\
	elif [ ${ENV} == 'local' ]; \
	then\
		echo "Build local project";\
	fi;\


server-dev: ## Start the development server
server-dev: check-env start build
	$(EXEC_REACT_DEV) yarn start

build-test: ## Launch all tests defined
build-test: check-env start build
	$(EXEC_REACT_DEV) yarn test

reset: ## Stop and start a fresh install of the project
reset: check-env kill setup-env setup
	
stop: check-env ## Stop only the docker stack for the environment set up
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) stop;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) stop;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd env/local && make stop;\
	fi;\
	

kill: check-env ## Destroy the env. Delete containers, volume, env variables and .env file
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) kill;\
	    $(DOCKER_COMPOSE_PROD) down --volumes --remove-orphans;\
		sudo rm .env && sudo rm env/prod/.env;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) kill;\
	    $(DOCKER_COMPOSE_DEV) down --volumes --remove-orphans;\
		sudo rm .env && sudo rm env/dev/.env;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd env/local && make kill;\
	fi;\


ifeq (console,$(firstword $(MAKECMDGOALS)))
  CONSOLE_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(CONSOLE_ARGS):;@:)
endif	

console: check-env ## Open a console in the passed container (e.g make console php)
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) exec $(CONSOLE_ARGS) sh;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) exec $(CONSOLE_ARGS) sh;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd env/local && make console $(CONSOLE_ARGS);\
	fi;\


install-docker: ## Install docker et docker-compose
	sudo bash script/install/install-docker.sh

install-ufw: ## Install and setup ufw firewall
	sudo bash script/install/install-ufw.sh

create-react-app: ## Create React app with create-react-app
create-react-app: check-env start
	$(EXEC_REACT) yarn global add create-react-app && create-react-app app

.PHONY: check-env build setup kill reset start stop console create-react-app

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sed -e 's/\[32m##/[33m/'
.PHONY: help

