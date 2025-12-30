# RestApi

Simple Django REST API project with two apps: `rests` (sample items) and `expenses` (categories and expenses).
The `web/` folder contains a Next.js dashboard that consumes the API.

## Requirements
- Python 3.x
- Docker (for Postgres/pgAdmin)
- Node.js 20+ (for the Next.js frontend)

## Environment Setup
1. Create and activate a virtual environment:
   - `python -m venv .venv`
   - `source .venv/bin/activate`
2. Install dependencies:
   - `pip install -r requirements.txt`

## Quick Start (Docker)
1. Update `.env` with your database and pgAdmin values.
2. Build and start the full stack (API + frontend + db + pgAdmin):
   - `make docker-up-build`
3. Apply migrations inside the container:
   - `docker compose exec web python manage.py migrate`
4. (Optional) Seed sample data:
   - `docker compose exec web python manage.py seed_data`
5. Access the API at `http://127.0.0.1:8000/` and the web app at `http://127.0.0.1:3000/`.
   - Code changes on your machine auto-reload inside the container via the bind mount.

## Local Development (Host Python)
1. Start Postgres + pgAdmin only:
   - `make docker-db`
2. Apply migrations:
   - `make migrate`
3. Run the server:
   - `make run`

## Frontend Development (Next.js)
1. Copy `web/.env.local.example` to `web/.env.local` and update the API base if needed.
2. Install dependencies:
   - `make web-install`
3. Run the dev server:
   - `make web-dev`
4. Build for production:
   - `make web-build`

## Production Build (Frontend)
- The `web/Dockerfile` includes a production `runner` stage that serves the standalone Next.js build.
- Example build: `docker build -t restapi-frontend --target runner ./web`

## Make Commands
- `make help` — list available targets
- `make run` — start Django dev server
- `make migrate` — apply migrations
- `make makemigrations` — create new migrations
- `make createsuperuser` — create admin user
- `make test` — run tests
- `make seed` — seed sample data
- `make seed-reset` — reset and seed sample data
- `make docker-up` — start containers (API, frontend, Postgres, pgAdmin)
- `make docker-up-build` — build and start containers
- `make docker-db` — start Postgres + pgAdmin only
- `make docker-down` — stop containers
- `make docker-logs` — follow container logs
- `make shell` — open Django shell
- `make web-install` — install frontend dependencies
- `make web-dev` — run Next.js dev server
- `make web-build` — build Next.js app
- `make web-start` — start Next.js app
- `make web-lint` — lint Next.js app

## Project Structure
- `RestApi/` — Django project settings and entry points
- `expenses/` — expenses API (models, serializers, views, urls)
- `rests/` — sample items API
- `templates/` — Django templates
- `web/` — Next.js frontend (app router)

## API Examples
- `GET /api/hello/` — health check
- `GET /api/items/` — list items
- `POST /api/items/` — create item
  - Example:
    - `curl -X POST http://127.0.0.1:8000/api/items/ -H "Content-Type: application/json" -d '{"name":"Notebook","description":"Grid"}'`
- `GET /api/expenses/categories/` — list categories
- `POST /api/expenses/categories/` — create category
  - Example:
    - `curl -X POST http://127.0.0.1:8000/api/expenses/categories/ -H "Content-Type: application/json" -d '{"name":"Food"}'`
- `GET /api/expenses/expenses/?from=2024-01-01&to=2024-12-31&category=1`
- `POST /api/expenses/expenses/` — create expense
  - Example:
    - `curl -X POST http://127.0.0.1:8000/api/expenses/expenses/ -H "Content-Type: application/json" -d '{"category":1,"title":"Groceries","amount":"34.50","spent_at":"2024-06-10","notes":"Weekly"}'`
- `GET /api/expenses/summary/?from=2024-01-01&to=2024-12-31`

## Configuration Notes
- Database settings are loaded from `.env` in `RestApi/settings.py`.
- The web container overrides `DB_HOST` to `db` and `DB_PORT` to `5432` for internal networking.
- If you change `DB_*` values or ports, restart containers (`make docker-up-build`).
- Frontend uses `API_BASE` (server) and `NEXT_PUBLIC_API_BASE` (browser). Set them in `web/.env.local` or docker-compose.
