.PHONY: setup

setup:
	cd container && docker-compose up -d

setup-dev:
	docker volume create picardata-data
	make build-dev
	docker run -it -v $(shell pwd):/app picardata/frontend:latest yarn install
	make setup

shell:
	docker exec -it frontend sh

destroy:
	cd container && docker-compose down

build-dev:
	cd container && docker -D build --target builder --tag picardata/frontend:latest .

lint:
	yarn lint -- --fix
