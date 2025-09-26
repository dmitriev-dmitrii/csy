include .env

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

restart: down up

clean:
	docker-compose down -v --rmi all

build:
	docker-compose build

update: down build up

ps:
	docker-compose ps