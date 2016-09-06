---
layout: post
title:  "[DRF] Generate documentation with Django Rest Swagger"
date:   2016-07-14 15:12:00:00 +0400
categories: [Django, Api]
---

I saw many documentation working with swagger and i needed to 
find how to make that with DRF. I've found with Django Rest Swagger!

If you want more information, always the same things, just go on the [official documentation](http://www.django-rest-framework.org/topics/documenting-your-api/#django-rest-swagger)

**Generated documentation with `django-rest-swagger`**

![Screenshot swagger](https://raw.githubusercontent.com/RignonNoel/RignonNoel.github.io/master/static/img/_posts/DRF-swagger.png?token=ALfs2MlO6pEpGh8gJe1Nq_80wA1pgcn-ks5XkSUfwA%3D%3D  "Screenshot swagger")

---

## How to install Django Rest Swagger ##

---

We install the new package

>**Note**: Don't forget to add the new requirements as a required 
> package of your Django project if you have a file for that!
{% highlight bash %}
$ pip install django-rest-swagger
{% endhighlight %}

We add the new package in `INSTALLED_APPS` of the project's settings.
{% highlight python %}
INSTALLED_APPS = [
    ...
    'rest_framework_swagger',
    ...
]
{% endhighlight %}

And just add a new url to consult your documentation

{% highlight python %}
# DOCUMENTATION SWAGGER
url(
    r'^documentation/',
    include('rest_framework_swagger.urls')
),
{% endhighlight %}

---

## How to use ##

---

If you go to the url you have defined, you can see an 
autogenerate documentation make with Django Rest Swagger.

Now, you just need to comment your code to upgrade your documentation:

* First line is display all time (in the listing and in the detail)
* Second line and other are only display in the detail of the documentation

Take a look on this two example:

**First example**
{% highlight python %}
class CardDetail(generics.RetrieveAPIView):
    """
    Return detail of a card

    Current user need to be owner of the card
    """

    def get(self, request, *args, **kwargs):
        ...
        # here you code
        ...
        
        return Response(card)
{% endhighlight %}

**Second example**
{% highlight python %}
class CardDetail(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        """
        Return detail of a card
    
        Current user need to be owner of the card
        """
        ...
        # here you code
        ...
        
        return Response(card)
{% endhighlight %}

When you can see, you can add your comment in the `class`, or in the `def`.

The comment in the `class` it's a prefix of the comment in the `def`, so each `def` are prefix with the same comment in the `class`.

---

## Good practice ##

---

**Where write the comment ?**

There is no good way but i ALWAYS comment my `def` for be more clear:

 1. The first line of my comment (display in the list) is more explicit
 2. The comment is just for this `def`, so if i add a new `def` i don't have a bad comment by default and i can see my forgotten

**How to write the comment ?**

> **Note :** If you install `django-markdown` the comment will support 
> `markdown` format so use it!

{% highlight python %}
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):

    def put(self, request, *args, **kwargs):
        """
        # Update a given user

        ## URL Attributs:

         - pk : Id of the user

        ## Attributs:

         - first_name : First name of the user

         - last_name : Last name of the user

         - email : Email of the user

         - password : The password of the user

        ## Warnings:

         - Only staff can edit users
        """
        ...
        # here you code
        ...
        
        return Response(UserSerializer(user).data)
{% endhighlight %}
