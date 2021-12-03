from django.http import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bs4 import BeautifulSoup
from pip._vendor import requests

HEADERS = { "User-Agent" : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }

@api_view(['GET'])
def home_view(request):
    return Response("hello")

@api_view(['POST'])
def amazon_price_tracker(request):
    try:
        data = request.data
        product_link = data['prod_link']
        webpage = requests.get(product_link, headers = HEADERS)
        soup = BeautifulSoup(webpage.content,'lxml')
        try:
            product_title = soup.find(id = 'productTitle').get_text().strip()
            product_price = soup.find(id = 'priceblock_ourprice').get_text()
        except Exception as e:
            print(e)
        print(product_title)
        print(product_price)
        price = ""
        for i in product_price:
            if i == '.':
                break
            if i.isdigit():
                price += i
        value = int(price)
        product_detail = {
            'product_price' : value,
            'product_title' : product_title,
            'success' : True
        }
        print(product_detail)
        return Response(product_detail)
    except Exception as e:
        print("failed")
        return Response({'success' : False})
