import os, sys

sys.path.insert(0,'/var/www/html/mydjangosite/mydjangosite/')

sys.path.insert(0,'/var/www/html/mydjangosite/')

os.environ['DJANGO_SETTINGS_MODULE'] = 'mydjangosite.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
