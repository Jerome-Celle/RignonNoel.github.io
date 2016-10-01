---
layout: post
title:  "Upload my site with Jekill"
date:   2016-07-10 18:00:00 +0400
categories: [Jekyll]
description: "Omnis maiores excepturi non et minima iste est. Magni aut dignissimos aliquid sint nihil fugiat autem voluptatem. Officiis cumque est officia mollitia.
Quasi magni sed aperiam praesentium id voluptas deserunt aliquid. Qui quia alias maiores. Saepe occaecati fugiat vel dolorem tempore temporibus molestiae distinctio. Ipsa rerum ipsa saepe at quis nemo temporibus. Nisi tempora maiores beatae atque voluptas tempore qui."
---

Here is my first post on my new website in replacement of my old 
github page without any functionnality.

I've upgraded this website to be able to add posts on technical 
details that i resolve in the time, like a bookmark.

I hope these bookmark can help anybody else, else it's not a big deal!

**Note:** I'm french and i speak a very bad english for the moment, 
so you can contact me if you read a post and have question, 
it will be a pleasure to help you.

---

### Why use Jekyll ###

I use Jekyll for three big reason

1. Github page link directly to Jekyll (no time to search alternative)
2. I don't have time to edit each page on my old html on github page
3. I like read a student at ÉTS and she has wrote [a post about Jekyll](http://girlknowstech.com/en/category/cms/jekyll/)

[French version of the post is here](http://girlknowstech.com/en/category/cms/jekyll/)

This post is not a very big deal, so i've read the 
[documentation of installation of jekyll](https://jekyllrb.com/docs/installation/)
who has very simple and easy! 

### Installation ###

**This documetation say you need:**

* Ruby (including development headers, v1.9.3 or above for Jekyll 2 and v2 or above for Jekyll 3)
* RubyGems
* Linux, Unix, or Mac OS X
* NodeJS, or another JavaScript runtime (Jekyll 2 and earlier, for CoffeeScript support).
* Python 2.7 (for Jekyll 2 and earlier)

**Error during installation**

When i've tried to finalize installation of jekyll with gem:
{% highlight bash %}
sudo gem install jekyll
{% endhighlight %}

I've take this error:
{% highlight bash %}
Error installing jekyll:
jekyll requires Ruby version >= 2.0.0.
{% endhighlight %}

So after a a little research i've try this command who install 
Jekyll 2.x.x and without documentation
{% highlight bash %}
sudo gem install jekyll -v 2.5 --no-rdoc --no-ri
{% endhighlight %}

### Usage ### 

**Themes**

For me jekyll is just a way to bookmark my research, but after a 
discussion with a friend who use Jekyll for it's personnal 
site i've take a look to search a theme and i've 
find [on this site](http://jekyllthemes.org/).

I've downloaded and installed [this themes](http://jekyllthemes.org/themes/stack-problems/), 
the configuration is very easy but the conception is a little bad 
(lot of repetition)
