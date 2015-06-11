"""
Django settings for mydjangosite project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""
from os import path
PROJECT_DIR = path.abspath(path.dirname(__file__))
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os 
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'x!7vd%j8ym3g*9ym1pt&ujbzfi$nl(5!f5ynt%j!4oppkfp+-b'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True



TEMPLATE_DIRS = (
path.join('/var/www/html/mydjangosite/mydjangosite/templates/flatpages'),
path.join('/var/www/html/mydjangosite/loginsys/templates/'),
)


ALLOWED_HOSTS = []

SITE_ID = 1
# Application definition

INSTALLED_APPS = (
'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.flatpages',
    'south',
    'table',
    'loginsys',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware'
)

ROOT_URLCONF = 'mydjangosite.urls'

WSGI_APPLICATION = 'mydjangosite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'rab',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',   # Or an IP Address that your DB is hosted on
        'PORT': '3306',
    }
}
# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/var/www/html/mydjangosite/STATIC_ROOT'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    '/var/www/html/mydjangosite/mydjangosite/static/',
)
