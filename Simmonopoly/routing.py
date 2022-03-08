from django.conf.urls import url

from .consumers import TicTacToeConsumer

websocket_urlpatterns = [
    url(r'^ws/play/(?P<host_name>\w+)/$', TicTacToeConsumer.as_asgi()),
]