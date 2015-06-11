from django.conf.urls import patterns, include, url
from table.views import view_userss
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
admin.autodiscover()


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mydjangosite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #(^table/$', view_testtest),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^auth/', include('loginsys.urls')),
    url(r'^', 'table.views.view_userss'),

)
