.PHONY: setup

setup:
	cd container && docker-compose up -d

setup-dev:
	docker volume create picardata-data
	make build-dev setup
	docker exec -it frontend yarn install

shell:
	docker exec -it frontend bash

destroy:
	cd container && docker-compose down

build-dev:
	cd container && docker -D build --tag picardata/frontend:latest .

