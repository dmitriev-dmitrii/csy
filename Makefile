include .env

up:
	@cd bot && docker compose --env-file ../.env up -d

down:
	cd bot && docker-compose down

build:
	cd bot && docker-compose --env-file ../.env build

clean:
	cd bot && docker-compose down -v --rmi all


