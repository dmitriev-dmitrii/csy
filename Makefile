include .env

up:
	@docker network create csy-network 2>/dev/null || true
	@cd csy-bot && docker compose --env-file ../.env up -d
	@cd csy-outline && docker compose --env-file ../.env up -d

down:
	@cd csy-bot && docker compose --env-file ../.env down
	@cd csy-outline && docker compose --env-file ../.env down

build:
	@cd csy-bot && docker compose --env-file ../.env build

up-outline:
	@docker network create csy-network 2>/dev/null || true
	@cd csy-outline && docker compose --env-file ../.env up -d

clean:
	@cd csy-bot && docker compose --env-file ../.env down -v --rmi all
	@cd csy-outline && docker compose --env-file ../.env down --rmi all


