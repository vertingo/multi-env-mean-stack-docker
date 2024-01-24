-include .env

export PROJECT_NAME
export BASE_DOMAIN
export APP_DOMAIN
export TRAEFIK_DOMAIN
export PORTAINER_DOMAIN
export LOG_LEVEL
export REVERSE_PROXY_HOST_IP
export REVERSE_PROXY_NETWORK
export DOCKER_CONTAINER_HOST
export COMPOSE_CONVERT_WINDOWS_PATHS
export CONFIG_TRAEFIK_FILENAME

DOCKER_COMPOSE_TRAEFIK_V1 = docker-compose -f docker-compose-v1.yml -f docker-compose-portainer-v1.yml
DOCKER_COMPOSE_TRAEFIK_V1_WSL = docker-compose -f docker-compose-v1-wsl.yml
DOCKER_COMPOSE_TRAEFIK_V2 = docker-compose -f docker-compose-v2.yml
DOCKER_COMPOSE_TRAEFIK_V1_DNS = $(DOCKER_COMPOSE_TRAEFIK_V1_WSL) -f docker-compose-dns.yml
DOCKER_COMPOSE_TRAEFIK_V2_DNS = $(DOCKER_COMPOSE_TRAEFIK_V2) -f docker-compose-dns.yml
DOCKER_COMPOSE_STACK_LOCAL = docker-compose -f docker-compose.local.yml
DOCKER_COMPOSE_STACK_GLOBAL = $(DOCKER_COMPOSE_TRAEFIK_V2) -f docker-compose.local.yml -f docker-compose-dns.yml


docker-network:      ## Create the docker network for local stack
docker-network:
	docker network create --driver bridge ${REVERSE_PROXY_NETWORK} || true

traefik-v-one-wsl:      ## Start traefik v1 with wsl containers
traefik-v-one-wsl: docker-network
	$(DOCKER_COMPOSE_TRAEFIK_V1_DNS) up -d --force-recreate --remove-orphans

traefik-v-two-wsl:      ## Start traefik v2 with wsl containers
traefik-v-two-wsl: docker-network
	$(DOCKER_COMPOSE_TRAEFIK_V2_DNS) up -d --force-recreate --remove-orphans

traefik-v-one-linux:      ## Start traefik v1 with linux containers
traefik-v-one-linux: docker-network
	$(DOCKER_COMPOSE_TRAEFIK_V1) up -d --force-recreate --remove-orphans

traefik-v-two-linux:      ## Start traefik v2 with linux containers
traefik-v-two-linux: docker-network
	$(DOCKER_COMPOSE_TRAEFIK_V2) up -d --force-recreate --remove-orphans

local-stack-react-express-mongo:      ## Start the local socializus docker stack 
local-stack-react-express-mongo: docker-network
	$(DOCKER_COMPOSE_STACK_LOCAL) up -d --force-recreate --remove-orphans

stop: ## Stop only the docker stack for the environment set up
	$(DOCKER_COMPOSE_TRAEFIK_V2_DNS) stop
	$(DOCKER_COMPOSE_STACK_LOCAL) stop

kill: ## Destroy the env. Delete containers, volume, env variables and .env file
	$(DOCKER_COMPOSE_TRAEFIK_V2_DNS) kill
	$(DOCKER_COMPOSE_STACK_LOCAL)  kill
	$(DOCKER_COMPOSE_TRAEFIK_V2_DNS) down --volumes --remove-orphans
	$(DOCKER_COMPOSE_STACK_LOCAL)  down --volumes --remove-orphans

console: ## Open a console in the passed container (e.g make console php)
	$(DOCKER_COMPOSE_STACK_GLOBAL) exec $(CONSOLE_ARGS) sh	


.DEFAULT_GOAL := help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
.PHONY: help
