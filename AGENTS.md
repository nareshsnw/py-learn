# Repository Guidelines

## Project Structure & Module Organization
- `RestApi/` holds Django settings, urls, wsgi/asgi.
- `expenses/` and `rests/` hold API apps (models, serializers, views, urls, migrations).
- `templates/` stores Django templates.
- `web/` is the Next.js frontend (app router, components, lib).
- `manage.py`, `docker-compose.yml`, and `.env` drive runtime setup.

## Build, Test, and Development Commands
- `python manage.py runserver`, `migrate`, `makemigrations`, `test`, `seed_data`.
- `docker compose up -d --build` runs API + frontend + db + pgAdmin.
- `docker compose up -d db pgadmin` runs only the database tools.
- `npm --prefix web run dev|build|start|lint` for the frontend.
- `Makefile` wraps common shortcuts (`make docker-up-build`, `make web-dev`).

## Local Setup & Running
- Set `.env` for `DB_*` and `PGADMIN_*`; set `web/.env.local` for `API_BASE` and `NEXT_PUBLIC_API_BASE`.
- Docker-first: `make docker-up-build`, then `docker compose exec web python manage.py migrate`.
- Host Python: `make docker-db`, then `make migrate`, `make run`.

## Coding Style & Naming Conventions
- Python: 4-space indentation, PEP 8, `PascalCase` models, `snake_case` fields.
- Frontend: TypeScript; keep shared calls in `web/lib` and UI in `web/components`.

## Testing Guidelines
- Django: `python manage.py test` with tests in `expenses/tests.py` and `rests/tests.py`.
- Frontend: `npm --prefix web run lint` before PRs.

## Configuration & Security
- Keep secrets out of git; update `.env` and docker-compose together.
- Docker uses `API_BASE=http://web:8000`; browsers use `NEXT_PUBLIC_API_BASE`.

## Commit & Pull Request Guidelines
- Use clear, imperative commit messages; PRs include summary, testing notes, and API/schema changes.
