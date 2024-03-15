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
		if [ $$env == 'prod' ]; \
		then\
			echo "Thanks good answer! Make sure to have well configured your .env.dist.$$env for the MERN stack and your .env.dist.grafana for monitoring stack to continue..Ready? (o|n)"; \
		else\
			echo "Thanks good answer! Make sure to have well configured your .env.dist.$$env environment file to continue..Ready? (o|n)"; \
		fi;\
		read -p "Value: " response; if [ $$response = "n" ]; then echo aborting; exit 1 ; fi; \
        echo "Lets move on to configure your environment"; \
		    if [ -f .env ]; \
			then\
				echo "The .env already exist";\
				echo "You can now type the command: make setup to configure and start your docker stack environment or make start if you have already installed docker and ufw";\
				exit 1;\
			else\
				echo "cp .env.dist.$$env .env";\
				sudo cp .env.dist.$$env .env;\
				echo "ln $(PWD)/.env  devops/env/$$env/.env";\
				sudo ln -s "$(PWD)/.env"  devops/env/$$env/.env;\
				echo "cp $(PWD)/frontend/hostName/hostName.$$env.js frontend/hostName/hostName.js";\
				sudo cp "$(PWD)/frontend/hostName/hostName.$$env.js" frontend/hostName/hostName.js;\
				if [ $$env == 'prod' ]; \
				then\
					echo "ln $(PWD)/.env.dist.elastdocker  devops/env/monitoring/elastdocker/.env";\
					sudo ln -s "$(PWD)/.env.dist.elastdocker"  devops/env/monitoring/elastdocker/.env;\
					echo "ln $(PWD)/.env.dist.dynatrace  devops/env/monitoring/dynatrace/.env";\
					sudo ln -s "$(PWD)/.env.dist.dynatrace"  devops/env/monitoring/dynatrace/.env;\
					echo "ln $(PWD)/.env.dist.grafana  devops/env/monitoring/grafana/.env";\
					sudo ln -s "$(PWD)/.env.dist.grafana"  devops/env/monitoring/grafana/.env;\
				fi;\
				echo "You can now type the command: make setup to configure and start your docker stack environment or make start if you have already installed docker and ufw";\
			fi;\
	else\
		echo "ENV is already set up type make kill to destroy the env in order to newly make setup-env for creating a new ENV.";\
	fi
endef


define configure_traefik_domain
    if [ -n ${FORGE_BASE_URL} ]; \
	then\
	    if [ ! -f "devops/docker/conf/traefik/configurations/dynamic.yml" ]; \
		then\
			sed "s/{{ \.Env\.DOMAIN }}/${FORGE_BASE_URL}/g" devops/docker/conf/traefik/configurations/dynamic.yml.template > devops/docker/conf/traefik/configurations/dynamic.yml;\
			echo "Traefik configuration for ${FORGE_BASE_URL} well configured! Thank you!";\
	    else\
			echo "dynamic.yml file already exist"; \
		fi;\
	else\
	    echo Warning: FORGE_BASE_URL isn\'t defined;\
	fi
endef


define build_front
	if [ ! -d "frontend/web-build" ]; \
	then\
		echo "Just a little time. I am building... the front react native. After this i will start the production docker stack";\
		docker run --rm --workdir /app -v $(PWD)/frontend:/app -e DEV_RUN_MODE=${DEV_RUN_MODE} -e IMAGE_SERVER_MODE=${IMAGE_SERVER_MODE} -e GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY} node:20 /bin/bash -c "npm install; npm run build";\
	fi
endef

define build_front_from_make_target
     echo "sudo rm frontend/hostName/hostName.js";\
	 sudo rm frontend/hostName/hostName.js;\
	 echo "cp $(PWD)/frontend/hostName/hostName.${ENV}.js frontend/hostName/hostName.js";\
	 sudo cp "$(PWD)/frontend/hostName/hostName.${ENV}.js" frontend/hostName/hostName.js;\
     echo "Just a little time. I am building... the front react native. After this i will start the production docker stack";\
	 docker run --rm --workdir /app -v $(PWD)/frontend:/app -e DEV_RUN_MODE=${DEV_RUN_MODE} -e IMAGE_SERVER_MODE=${IMAGE_SERVER_MODE} -e GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY} node:20 /bin/bash -c "npm install; npm run build"
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

DOCKER_COMPOSE_FILES_DEV = -f devops/env/dev/docker-compose.traefik.yml -f devops/env/dev/docker-compose.dev.yml 
ifneq ("$(wildcard devops/env/dev/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_DEV = -f devops/env/dev/docker-compose.traefik.yml -f devops/env/dev/docker-compose.dev.yml -f devops/env/dev/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_FILES_PROD = -f devops/env/prod/docker-compose.traefik.yml -f devops/env/prod/docker-compose.prod.yml
ifneq ("$(wildcard devops/env/prod/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_PROD = -f devops/env/prod/docker-compose.traefik.yml -f devops/env/prod/docker-compose.prod.yml -f devops/env/prod/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_FILES_BACK-OFFICE = -f devops/env/prod/docker-compose.back-office.yml
ifneq ("$(wildcard devops/env/prod/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_BACK-OFFICE = -f devops/env/prod/docker-compose.back-office.yml -f devops/env/prod/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_FILES_MAINTENANCE = -f devops/env/prod/docker-compose.traefik.yml -f devops/env/prod/docker-compose.maintenance.yml
ifneq ("$(wildcard devops/env/prod/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_MAINTENANCE = -f devops/env/prod/docker-compose.traefik.yml -f devops/env/prod/docker-compose.maintenance.yml -f devops/env/prod/docker-compose-${OS_NAME}.yml
endif

DOCKER_COMPOSE_FILES_TEST = -f devops/env/test/docker-compose.test.yml 
ifneq ("$(wildcard devops/env/prod/docker-compose-${OS_NAME}.yml)","")
DOCKER_COMPOSE_FILES_TEST = -f devops/env/test/docker-compose.test.yml 
endif

DOCKER_COMPOSE_DEV = docker-compose ${DOCKER_COMPOSE_FILES_DEV}
EXEC_REACT_DEV = $(DOCKER_COMPOSE_DEV) exec -T app
BUILD_DEV = $(DOCKER_COMPOSE_DEV)

DOCKER_COMPOSE_PROD = docker-compose ${DOCKER_COMPOSE_FILES_PROD}
EXEC_NGINX_PROD = $(DOCKER_COMPOSE_PROD) exec -T nginx-front
BUILD_PROD = $(DOCKER_COMPOSE_PROD)

DOCKER_COMPOSE_BACK-OFFICE = docker-compose ${DOCKER_COMPOSE_FILES_BACK-OFFICE}

DOCKER_COMPOSE_MAINTENANCE = docker-compose ${DOCKER_COMPOSE_FILES_MAINTENANCE}

DOCKER_COMPOSE_TEST = docker-compose ${DOCKER_COMPOSE_FILES_TEST}

.env: .env.dist.${ENV} ## Check env variable is set correctly
	@if [ -f .env ]; \
	then\
		echo "The .env.dist.${ENV} file has changed. Please check your .env file (this message will not be displayed again).";\
		sudo touch .env;\
		#exit 1;\
	else\
		echo "cp .env.dist.${ENV} .env";\
		sudo cp .env.dist.${ENV} .env;\
		echo "ln -s $(PWD)/.env  devops/env/${ENV}";\
		sudo ln -s "$(PWD)/.env"  devops/env/${ENV};\
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
		echo "*Error* ENV variable is not set";\
		echo "*Error* Please set a ENV environment variable with dev, prod or local value";\
		echo "*Error* make setup-env or export ENV=dev, prod or local in console";\
		echo "Remenber that you need to have an environment set up to make use of make setup, start, build, console, stop, kill, reset";\
		exit 1;\
	else\
		echo "*Good* ENV variable is well set and positionned on ${ENV}";\
		echo "Remenber that you need to have an environment set up to make use of make setup, start, build, console, stop, kill, reset";\
	fi


setup: ## Install the environment tools and start the docker stack for the environment set up
setup: check-env .env install-docker install-ufw start

start: check-env ## Start only the docker MERN stack for the environment set up
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(call build_front);\
		$(DOCKER_COMPOSE_PROD) up -d;\
		sudo ufw-docker allow traefik;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) up -d;\
		sudo ufw-docker allow traefik;\
	elif [ ${ENV} == 'local' ]; \
	then\
		echo "cd devops/env/local && setup.sh -v v2 -s wsl && make local-stack-react-express-mongo";\
		cd devops/env/local && setup.sh -v v2 -s wsl && make local-stack-react-express-mongo;\
	fi

start-back-office: check-env ## Start only the docker back-office stack for the prod environment 
	@if [ ${ENV} == 'prod' ]; \
	then\
	    $(DOCKER_COMPOSE_BACK-OFFICE) up -d;\
	else\
		echo "This is not the environment for back-office. You have to do it only on prod/preprod. Change your env setup to do it.";\
	fi	

start-monitoring: check-env ## Start only the docker monitoring stack for the prod environment 
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "bash devops/env/monitoring/grafana/setup.sh --start";\
		sudo bash devops/env/monitoring/grafana/setup.sh --start;\
	else\
		echo "This is not the environment for monitoring. You have to do it only on prod/preprod. Change your env setup to do it.";\
	fi

start-sonarqube: check-env ## Start only the docker sonarqube test stack for the dev/local environment
	@if [ ${ENV} == 'dev' ]; \
	then\
		echo "cp .env.dist.test devops/env/test/.env";\
		sudo cp .env.dist.test devops/env/test/.env;\
		$(DOCKER_COMPOSE_TEST) up -d;\
	elif [ ${ENV} == 'local' ]; \
	then\
		echo "cp .env.dist.test devops/env/test/.env";\
		sudo cp .env.dist.test devops/env/test/.env;\
		$(DOCKER_COMPOSE_TEST) up -d;\
	else\
		echo "This is not the environment for testing. You have to do it before prod. Change your env setup to do it.";\
	fi


update-front: check-env ## Update only the frontend stack following a git pull
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Env PROD. Rebuild only the frontend in progress...";\
		$(call build_front_from_make_target);\
		$(DOCKER_COMPOSE_PROD) up --no-deps -d nginx-front;\
		docker system prune -f;\
	elif [ ${ENV} == 'dev' ]; \
	then\
	    echo "Env DEV. Update of the dev frontend docker container in progress...";\
		$(DOCKER_COMPOSE_DEV) up --no-deps -d app;\
		docker system prune -f;\
	elif [ ${ENV} == 'local' ]; \
	then\
	    echo "Update of the local docker front stack in progress...";\
		cd devops/env/local && make update-local-stack-react-express-mongo;\
	fi	

update-back: check-env  ## Update only the backend stack following a git pull
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Env PROD. Update of the prod backend docker container in progress...";\
		$(DOCKER_COMPOSE_PROD) up --no-deps -d back;\
		docker system prune -f;\
	elif [ ${ENV} == 'dev' ]; \
	then\
	    echo "Env DEV. Update of the dev backend docker container in progress...";\
		$(DOCKER_COMPOSE_DEV) up --no-deps -d back;\
		docker system prune -f;\
	elif [ ${ENV} == 'local' ]; \
	then\
	    echo "Update of the local docker react native stack in progress...";\
		cd devops/env/local && make update-local-stack-react-express-mongo;\
	fi	


update-front-back: check-env ## Update only the frontend and backend stack following a git pull
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Env PROD. Rebuild of the frontend and update of the backend docker container in progress...";\
		$(call build_front_from_make_target);\
		$(DOCKER_COMPOSE_PROD) up --no-deps -d nginx-front;\
		$(DOCKER_COMPOSE_PROD) up --no-deps -d back;\
		docker system prune -f;\
	elif [ ${ENV} == 'dev' ]; \
	then\
	    echo "Env DEV. Update of the frontend and backend docker container in progress...";\
		$(DOCKER_COMPOSE_DEV) up --no-deps -d app;\
		$(DOCKER_COMPOSE_DEV) up --no-deps -d back;\
		docker system prune -f;\
	elif [ ${ENV} == 'local' ]; \
	then\
	    echo "Update of the local docker react native stack in progress...";\
		cd devops/env/local && make update-local-stack-react-express-mongo;\
	fi	


update-all-mern-stack: check-env ## Update all the MERN Stack following a git pull (Put maintenance mode, rebuild the front, update the rest of the docker stack, and stop maintenance mode)
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Env PROD. Put maintenance mode, rebuild the front, update the rest of the docker stack, and stop maintenance mode in progress...";\
	    $(DOCKER_COMPOSE_PROD) stop;\
		$(DOCKER_COMPOSE_MAINTENANCE) up -d;\
		sudo ufw-docker allow traefik;\
		$(call build_front_from_make_target);\
		$(DOCKER_COMPOSE_PROD) build --force-rm;\
		$(DOCKER_COMPOSE_MAINTENANCE) kill;\
		$(DOCKER_COMPOSE_PROD) up -d;\
		docker system prune -f;\
		sudo ufw-docker allow traefik;\
	elif [ ${ENV} == 'dev' ]; \
	then\
	    echo "Env DEV. Update of the dev local docker react native stack in progress...";\
		$(DOCKER_COMPOSE_DEV) stop;\
		$(DOCKER_COMPOSE_DEV) build --force-rm;\
		$(DOCKER_COMPOSE_DEV) up -d;\
		docker system prune -f;\
	elif [ ${ENV} == 'local' ]; \
	then\
	    echo "Update of the local docker react native stack in progress...";\
		cd devops/env/local && make update-local-stack-react-express-mongo;\
	fi	


update-back-office: check-env ## Update only the back-office stack following a git pull
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Env PROD. Update the back-office stack in progress...";\
	    $(DOCKER_COMPOSE_BACK-OFFICE) stop;\
		$(DOCKER_COMPOSE_BACK-OFFICE) build --force-rm;\
		$(DOCKER_COMPOSE_BACK-OFFICE) up -d;\
		docker system prune -f;\
	else\
		echo "This is not the environment for back-office. You have to do it only on prod/preprod. Change your env setup to do it.";\
	fi


kill: check-env ## Destroy all(MERN, Test, and Monitoring Stack) env. Delete containers, volume, env variables and .env file
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) kill;\
	    $(DOCKER_COMPOSE_PROD) down --volumes --remove-orphans;\
        if [ -f devops/env/monitoring/elastdocker/.env ]; \
		then\
		    echo "rm devops/env/monitoring/elastdocker/.env";\
			sudo rm devops/env/monitoring/elastdocker/.env;\
		fi;\
        if [ -f devops/env/monitoring/dynatrace/.env ]; \
		then\
		    echo "rm devops/env/monitoring/dynatrace/.env";\
			sudo rm devops/env/monitoring/dynatrace/.env;\
		fi;\
		if [ -f devops/env/monitoring/grafana/.env ]; \
		then\
		    echo "rm devops/env/monitoring/grafana/.env";\
			sudo rm devops/env/monitoring/grafana/.env;\
		fi;\
		echo "rm .env && sudo rm devops/env/prod/.env && sudo rm frontend/hostName/hostName.js";\
		sudo rm .env && sudo rm devops/env/prod/.env && sudo rm frontend/hostName/hostName.js;\
		echo "rm devops/docker/conf/traefik/configurations/dynamic.yml";\
		sudo rm devops/docker/conf/traefik/configurations/dynamic.yml;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) kill;\
	    $(DOCKER_COMPOSE_DEV) down --volumes --remove-orphans;\
		if [ -f devops/env/test/.env ]; \
		then\
		    $(DOCKER_COMPOSE_TEST) kill;\
	        $(DOCKER_COMPOSE_TEST) down --volumes --remove-orphans;\
			echo "rm devops/env/test/.env";\
			sudo rm devops/env/test/.env;\
		fi;\
		echo "rm .env && sudo rm devops/env/dev/.env && sudo rm frontend/hostName/hostName.js";\
		sudo rm .env && sudo rm devops/env/dev/.env && sudo rm frontend/hostName/hostName.js;\
		echo "rm devops/docker/conf/traefik/configurations/dynamic.yml";\
		sudo rm devops/docker/conf/traefik/configurations/dynamic.yml;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd devops/env/local && make kill;\
		if [ -f devops/env/test/.env ]; \
		then\
		    $(DOCKER_COMPOSE_TEST) kill;\
	        $(DOCKER_COMPOSE_TEST) down --volumes --remove-orphans;\
			echo "rm devops/env/test/.env";\
			sudo rm devops/env/test/.env;\
		fi;\
		echo "rm .env && sudo rm devops/env/local/.env && sudo rm frontend/hostName/hostName.js";\
		sudo rm .env && sudo rm devops/env/local/.env && sudo rm frontend/hostName/hostName.js;\
	fi;\



kill-back-office: check-env ## Destroy the back-office stack. Delete containers, volume, env variables and .env file
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "Destroy back-office stack in progress...";\
		$(DOCKER_COMPOSE_BACK-OFFICE) kill;\
		$(DOCKER_COMPOSE_BACK-OFFICE) down --volumes;\
	else\
		echo "This is not the environment for back-office. You have to do it only on prod/preprod. Change your env setup to do it.";\
	fi


kill-monitoring: check-env ## Destroy the monitoring env. Delete containers, volume, env variables and .env file
	sudo bash devops/env/monitoring/grafana/setup.sh --kill

kill-sonarqube: check-env ## Destroy the sonarqube env. Delete containers, volume, env variables and .env file
	@if [ ${ENV} == 'prod' ]; \
	then\
	    echo "There is no environment for testing in prod.";\
	else \
		if [ -f devops/env/test/.env ]; \
		then\
		    echo "Destroy test stack in progress...";\
		    $(DOCKER_COMPOSE_TEST) kill;\
	        $(DOCKER_COMPOSE_TEST) down --volumes;\
			echo "rm devops/env/test/.env";\
			sudo rm devops/env/test/.env;\
		else\
			echo "Cannot kill env test. Environment has not been created yet. Create it with make start-sonarqube";\
		fi;\
	fi
	
reset: ## Stop and start a fresh install of the project
reset: check-env kill setup-env setup
	
stop: check-env ## Stop only the docker MERN stack for the environment set up
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) stop;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) stop;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd devops/env/local && make stop;\
	fi;\

build-front: ## Build front react native
	$(call build_front_from_make_target)

configure-traefik-domain: ## Configure traefik domain
	$(call configure_traefik_domain)	

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


backup: check-env ## Backup the entire docker start
	sudo bash devops/env/monitoring/grafana/setup.sh --backup

backup-list: check-env ## List all possible backup to restore
	sudo bash devops/env/monitoring/grafana/setup.sh --backup-list

ifeq (backup-restore,$(firstword $(MAKECMDGOALS)))
  BACKUP_RESTORE_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(BACKUP_RESTORE_ARGS):;@:)
endif

backup-restore: check-env ## Restore backup docker stack
	sudo bash devops/env/monitoring/grafana/setup.sh --backup-restore $(BACKUP_RESTORE_ARGS)


ifeq (allow-from-ip-ufw-mongodb-connection,$(firstword $(MAKECMDGOALS)))
  ALLOW_IP_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(ALLOW_IP_ARGS):;@:)
endif

allow-from-ip-ufw-mongodb-connection: check-env ## Allow ip to connect to mongodb on the server (e.g make allow-from-ip-ufw-mongodb-connection ip)
	sudo bash devops/env/monitoring/grafana/setup.sh --allow-mongodb-ip $(ALLOW_IP_ARGS)
 

ifeq (delete-allow-ip-ufw-for-mongodb-connection,$(firstword $(MAKECMDGOALS)))
  DELETE_IP_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(DELETE_IP_ARGS):;@:)
endif

delete-allow-ip-ufw-for-mongodb-connection: check-env ## Delete ip to connect to mongodb on the server (e.g make delete-allow-ip-ufw-for-mongodb-connection ip)
	sudo bash devops/env/monitoring/grafana/setup.sh --delete-mongodb-ip $(DELETE_IP_ARGS)


ifeq (console,$(firstword $(MAKECMDGOALS)))
  CONSOLE_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(CONSOLE_ARGS):;@:)
endif

console: check-env ## Open a console in the passed container for the MERN stack (e.g make console php)
	@if [ ${ENV} == 'prod' ]; \
	then\
		$(DOCKER_COMPOSE_PROD) exec $(CONSOLE_ARGS) sh;\
	elif [ ${ENV} == 'dev' ]; \
	then\
		$(DOCKER_COMPOSE_DEV) exec $(CONSOLE_ARGS) sh;\
	elif [ ${ENV} == 'local' ]; \
	then\
		cd devops/env/local && make console $(CONSOLE_ARGS);\
	fi;\

install-docker: ## Install docker et docker-compose
	sudo bash devops/script/install/install-docker.sh

install-ufw: ## Install and setup ufw firewall
	sudo bash devops/script/install/install-ufw.sh

create-react-app: ## Create React app with create-react-app
create-react-app: check-env start
	$(EXEC_REACT) yarn global add create-react-app && create-react-app app

.PHONY: check-env build setup kill reset start stop console create-react-app

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sed -e 's/\[32m##/[33m/'
.PHONY: help

