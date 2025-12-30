from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Item


@api_view(["GET"])
def hello(request):
    return Response({"message": "Hello from Django API"})


@api_view(["GET", "POST"])
def items(request):
    # GET: list all items

    if request.method == "GET":
        data = list(
            Item.objects.order_by("-id").values(
                "id", "name", "description", "created_at"
            )
        )
        return Response(data)

    # POST: create new item
    name = request.data.get("name")
    description = request.data.get("description", "")

    if not name:
        return Response(
            {"error": "name is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    item = Item.objects.create(name=name, description=description)

    return Response(
        {
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "created_at": item.created_at,
        },
        status=status.HTTP_201_CREATED,
    )
