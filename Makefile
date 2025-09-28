include .env

up:
	@docker network create csy-network 2>/dev/null || true
	@cd csy-bot && docker compose --env-file ../.env up -d
	make up-wg

up-wg:
	@docker network create csy-network 2>/dev/null || true
	@cd csy-wg && docker compose --env-file ../.env up -d

down:
	@cd csy-bot && docker compose --env-file ../.env down
	@cd csy-wg && docker compose --env-file ../.env down

clean:
	@cd csy-bot && docker compose --env-file ../.env down -v --rmi all
	@cd csy-wg && docker compose --env-file ../.env down --rmi all


