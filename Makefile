include .env

up:
	@cd csy-bot && docker compose --env-file ../.env up -d

down:
	cd csy-bot && docker-compose --env-file ../.env down

build:
	cd csy-bot && docker-compose --env-file ../.env build

clean:
	cd csy-bot && docker-compose --env-file ../.env down -v --rmi all


