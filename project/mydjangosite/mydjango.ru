<VirtualHost *:80>
        ServerName mydjango.ru
        ServerAlias www.mydjango.ru
        WSGIScriptAlias / /var/www/html/django.wsgi
</VirtualHost>
