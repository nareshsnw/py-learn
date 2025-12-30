from datetime import timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from expenses.models import Category, Expense
from rests.models import Item


class Command(BaseCommand):
    help = "Seed sample data for expenses and rests apps."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing data before seeding.",
        )

    def handle(self, *args, **options):
        reset = options["reset"]

        with transaction.atomic():
            if reset:
                Expense.objects.all().delete()
                Category.objects.all().delete()
                Item.objects.all().delete()

            categories = {}
            for name in ["Food", "Transport", "Utilities", "Entertainment"]:
                category, _ = Category.objects.get_or_create(name=name)
                categories[name] = category

            today = timezone.now().date()
            expenses_data = [
                (
                    "Food",
                    "Groceries",
                    Decimal("54.90"),
                    today - timedelta(days=1),
                    "Weekly groceries",
                ),
                (
                    "Transport",
                    "Train pass",
                    Decimal("29.00"),
                    today - timedelta(days=3),
                    "",
                ),
                (
                    "Utilities",
                    "Internet",
                    Decimal("59.99"),
                    today - timedelta(days=10),
                    "Monthly bill",
                ),
                (
                    "Entertainment",
                    "Movie night",
                    Decimal("18.50"),
                    today - timedelta(days=2),
                    "Tickets",
                ),
            ]

            for category_name, title, amount, spent_at, notes in expenses_data:
                Expense.objects.get_or_create(
                    category=categories[category_name],
                    title=title,
                    amount=amount,
                    spent_at=spent_at,
                    defaults={"notes": notes},
                )

            items = [
                ("Sample Item", "Default item for the REST sample"),
                ("Notebook", "Example item with a description"),
                ("Pen", ""),
            ]

            for name, description in items:
                Item.objects.get_or_create(
                    name=name,
                    defaults={"description": description},
                )

        self.stdout.write(self.style.SUCCESS("Seeded sample data."))
