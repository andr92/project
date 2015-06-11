from django.conf.urls import patterns, include, url
from table.views import view_userss
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

admin.autodiscover()


urlpatterns = patterns('',

    url(r'^login/', 'loginsys.views.login'),
    url(r'^logout/', 'loginsys.views.logout'),

)
