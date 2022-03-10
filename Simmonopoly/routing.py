from django.conf.urls import url

from .consumers import MonopolyConsumer

websocket_urlpatterns = [
    url(r'^ws/join/(?P<host_name>\w+)/$', MonopolyConsumer.as_asgi()),
]