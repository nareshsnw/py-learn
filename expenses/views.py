from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Category, Expense
from .serializers import CategorySerializer, ExpenseSerializer


@api_view(["GET", "POST"])
def categories(request):
    if request.method == "GET":
        qs = Category.objects.all().order_by("name")
        return Response(CategorySerializer(qs, many=True).data)

    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def expenses(request):
    if request.method == "GET":
        qs = Expense.objects.select_related("category").all()

        date_from = request.query_params.get("from")
        date_to = request.query_params.get("to")
        category_id = request.query_params.get("category")

        if date_from:
            qs = qs.filter(spent_at__gte=date_from)
        if date_to:
            qs = qs.filter(spent_at__lte=date_to)
        if category_id:
            qs = qs.filter(category_id=category_id)

        return Response(ExpenseSerializer(qs, many=True).data)

    serializer = ExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def expense_detail(request, expense_id: int):
    try:
        exp = Expense.objects.select_related("category").get(id=expense_id)
    except Expense.DoesNotExist:
        return Response({"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(ExpenseSerializer(exp).data)

    if request.method == "DELETE":
        exp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = ExpenseSerializer(exp, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def summary(request):
    qs = Expense.objects.select_related("category").all()

    date_from = request.query_params.get("from")
    date_to = request.query_params.get("to")

    if date_from:
        qs = qs.filter(spent_at__gte=date_from)
    if date_to:
        qs = qs.filter(spent_at__lte=date_to)

    total = qs.aggregate(total=Sum("amount"))["total"] or 0
    by_category = (
        qs.values("category_id", "category__name")
        .annotate(total=Sum("amount"))
        .order_by("-total")
    )

    return Response({
        "range": {"from": date_from, "to": date_to},
        "total": str(total),
        "by_category": [
            {"category_id": r["category_id"], "category": r["category__name"], "total": str(r["total"])}
            for r in by_category
        ],
    })
