from django.urls import path
from rests.views import hello, items

urlpatterns = [
    path('hello/', hello),
    path("items/", items),
]
