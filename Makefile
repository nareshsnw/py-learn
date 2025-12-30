.PHONY: help run migrate makemigrations createsuperuser test seed seed-reset \
	docker-up docker-up-build docker-db docker-down docker-logs shell \
	web-install web-dev web-build web-start web-lint

PYTHON ?= python
MANAGE := $(PYTHON) manage.py

help:
	@echo "Common commands:"
	@echo "  make run            Start Django dev server"
	@echo "  make migrate        Apply migrations"
	@echo "  make makemigrations Create new migrations"
	@echo "  make createsuperuser Create admin user"
	@echo "  make test           Run test suite"
	@echo "  make seed           Seed sample data"
	@echo "  make seed-reset     Reset and seed sample data"
	@echo "  make docker-up      Start containers (API, frontend, Postgres, pgAdmin)"
	@echo "  make docker-up-build Build and start containers"
	@echo "  make docker-db      Start Postgres + pgAdmin only"
	@echo "  make docker-down    Stop containers"
	@echo "  make docker-logs    Follow container logs"
	@echo "  make shell          Open Django shell"
	@echo "  make web-install    Install frontend dependencies"
	@echo "  make web-dev        Run Next.js dev server"
	@echo "  make web-build      Build Next.js app"
	@echo "  make web-start      Start Next.js app"
	@echo "  make web-lint       Lint the Next.js app"

run:
	$(MANAGE) runserver

migrate:
	$(MANAGE) migrate

makemigrations:
	$(MANAGE) makemigrations

createsuperuser:
	$(MANAGE) createsuperuser

test:
	$(MANAGE) test

seed:
	$(MANAGE) seed_data

seed-reset:
	$(MANAGE) seed_data --reset

docker-up:
	docker compose up -d

docker-up-build:
	docker compose up -d --build

docker-db:
	docker compose up -d db pgadmin

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f

shell:
	$(MANAGE) shell

web-install:
	npm --prefix web install

web-dev:
	npm --prefix web run dev

web-build:
	npm --prefix web run build

web-start:
	npm --prefix web run start

web-lint:
	npm --prefix web run lint
