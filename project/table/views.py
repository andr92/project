#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.shortcuts import render_to_response
from table.models import Users
from django.db import connections
from django.contrib import auth
import MySQLdb
import cgi
from django.core.context_processors import csrf
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def dictfetchall(cursor):
    desc = cursor.description
    return [
    dict(zip([col[0] for col in desc], row))
    for row in cursor.fetchall()
]
@csrf_exempt
def view_userss(request):
    if request.POST:
         addusername = request.POST.get('addusername', '')
         addusername = addusername.encode('utf-8')
         addext = request.POST.get('addext', '')
         addext = addext.encode('utf-8')
         addorg = request.POST.get('addorg', '')
         addorg = addorg.encode('utf-8')
         if addorg == 'Точинвест':
			 addorg='T'
         if addorg == 'Точинвест цинк':
             addorg='TZ'
         if addorg == 'Русская кожа':
             addorg='RK'
         if addorg == 'КожПромМебель':
             addorg='KPM'
         if addorg == 'Туборус':
             addorg='TBR'
         if addorg=='Сафьян':
             addorg='SAF' 
         if addorg=='Руно':
             addorg='RN'   
         addname = addorg + ' ' + addusername
         extension = request.POST.get('ext', '')
         updusername = request.POST.get('updusername', '')
         updusername = updusername.encode('utf-8')
         updext = request.POST.get('updext', '')
         updext = updext.encode('utf-8')
         updext2 = request.POST.get('updext2', '')
         updext2 = updext2.encode('utf-8')
         updorg = request.POST.get('updorg', '')
         updorg = updorg.encode('utf-8')
         if updorg == 'Точинвест':
			 updorg='T'
         if updorg == 'Точинвест цинк':
             updorg='TZ'
         if updorg == 'Русская кожа':
             updorg='RK'
         if updorg == 'КожПромМебель':
             updorg='KPM'
         if updorg == 'Туборус':
             updorg='TBR'
         if updorg=='Сафьян':
             updorg='SAF' 
         if updorg=='Руно':
             updorg='RN' 
         updname = updorg + ' ' + updusername
         if addusername:
              addusr(addname,addext)
         elif extension:
              delusr(extension) 
         elif updusername:  
              updusr(updname,updext,updext2)
    db = MySQLdb.connect("localhost","root","","ver1" )
    cursor=db.cursor()
    cursor.execute('SELECT name, extension FROM users')
    userss = dictfetchall(cursor)   
    for User in userss:
        t=User['name']
        (a,b) = t.split(' ', 1)
        if a == 'T':
            a='Точинвест'
        if a == 'TZ':
            a='Точинвест цинк'
        if a == 'RK':
            a='Русская кожа'
        if a == 'KPM':
            a='КожПромМебель'
        if a == 'TBR':
            a='Туборус'
        if a=='SAF':
            a='Сафьян' 
        if a=='RN':
            a='Руно'   
        User['name'] = b
        User['org'] = a
    return render_to_response('/var/www/html/mydjangosite/mydjangosite/templates/flatpages/default.html',{'userss': userss, 'username':auth.get_user(request).username})

def delusr(ext):
    db = MySQLdb.connect("localhost","root","","ver1" )
    cursor=db.cursor()
    cursor.execute('DELETE FROM users WHERE extension=%s' %(ext))
    return render_to_response('/var/www/html/mydjangosite/mydjangosite/templates/flatpages/default.html')

def addusr(addname,addext):
    db = MySQLdb.connect("localhost","root","","ver1" )
    cursor=db.cursor()
    param=[addname, addext]
    cursor.execute('INSERT INTO users (`name`, `extension`) VALUES ("%s", "%s")' %(addname, addext))
    return render_to_response('/var/www/html/mydjangosite/mydjangosite/templates/flatpages/default.html')
    
def updusr(updname,updext,updext2):
    db = MySQLdb.connect("localhost","root","","ver1" )
    cursor=db.cursor()
    cursor.execute('UPDATE users SET `name`="%s", `extension`="%s" where `extension`="%s"' %(updname, updext,updext2))
    return render_to_response('/var/www/html/mydjangosite/mydjangosite/templates/flatpages/default.html')



