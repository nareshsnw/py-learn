# Repository Guidelines

## Project Structure & Module Organization
- `RestApi/` contains Django project configuration (settings, urls, wsgi/asgi).
- `expenses/` is the expenses domain app (models, serializers, views, urls, migrations).
- `rests/` is the simple Item API app.
- `templates/` stores Django templates used by the project.
- `manage.py` is the entry point for Django management commands.
- `docker-compose.yml` and `.env` define Postgres/pgAdmin configuration.

## Build, Test, and Development Commands
- `python manage.py runserver` starts the local development server.
- `python manage.py makemigrations` and `python manage.py migrate` generate and apply schema changes.
- `python manage.py createsuperuser` creates an admin user for the Django admin UI.
- `python manage.py test` runs the Django test suite.
- `docker compose up -d` starts Postgres and pgAdmin using values from `.env`.

## Coding Style & Naming Conventions
- Use 4-space indentation and follow PEP 8 where practical.
- Django models use `PascalCase`; fields, functions, and modules use `snake_case`.
- REST endpoints are function-based views in `expenses/views.py` and `rests/views.py`; keep request/response shapes explicit.
- Keep serializers in `*/serializers.py` and wire routes in `*/urls.py`.

## Testing Guidelines
- Use Django’s `TestCase` in `expenses/tests.py` and `rests/tests.py`.
- Name tests `test_<behavior>` and cover serializers, filters, and API status codes.
- Add regression tests for query parameters like `from`, `to`, and `category`.

## Configuration & Security
- Settings load `.env` via `python-dotenv`; keep `DB_*` and `PGADMIN_*` values out of commits.
- Database configuration defaults to Postgres in `RestApi/settings.py`; ensure your `.env` matches your local DB.

## Commit & Pull Request Guidelines
- No `.git` history is present in this directory; use clear, imperative commit messages (e.g., "Add expense summary endpoint").
- PRs should include a short summary, testing notes (`python manage.py test`), and any API or schema changes.
