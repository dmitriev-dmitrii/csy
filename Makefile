include .env
export

bot-up:
	cd bot && docker-compose up -d

bot-down:
	cd bot && docker-compose down

bot-build:
	cd bot && docker-compose build

deploy-bot: down build up

clean-bot:
	cd bot && docker-compose down -v --rmi all


