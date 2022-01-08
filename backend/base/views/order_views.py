# from django.shortcuts import render
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
)

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response(
            {
                'detail': 'No Order Items'
            },
            status=HTTP_400_BAD_REQUEST
        )
    else:

        # 1 -> create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )

        # 2 -> create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shippingPrice=data['shippingPrice'],
        )
        # 3 -> create items and set order to orderItem relationship
        for orderItem in orderItems:
            product = Product.objects.get(_id=orderItem['product'])
            newItem = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=orderItem['qty'],
                price=orderItem['price'],
                image=product.image.url,
            )

            # 4 -> update stock
            product.countInStock -= newItem.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderItem(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'detail': 'Not authorized to view this order'},
                status=HTTP_400_BAD_REQUEST
            )
    except:
        return Response(
            {'detail': 'Order does not exist'},
            status=HTTP_400_BAD_REQUEST
        )


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was paid")
