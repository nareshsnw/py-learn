from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.categories),
    path("expenses/", views.expenses),
    path("expenses/<int:expense_id>/", views.expense_detail),
    path("summary/", views.summary),
]
