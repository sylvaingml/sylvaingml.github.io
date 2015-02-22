---
layout: post
title:  "Swift, arrays syntax can be strange"
date:   2015-02-22 21:45:00
categories: Swift
---

Just trying to declare an array object. Easy?

## Array of basic type

Declare an array of `Int` objects with explicit type:

{% highlight Swift %}
var numbers: [Int]
{% endhighlight %}

You can add the object initialization:

{% highlight Swift %}
var prime: [Int] = [Int]()
{% endhighlight %}

But in Swift you can use the type inference and be much shorter:

{% highlight Swift %}
var counters = [Int]()
{% endhighlight %}

## Here come the inner class

Let say we have a class that define an inner enumeration type:

{% highlight Swift %}
class SomeObject
{
    enum Property: String
    {
        case real = "real"
        case imaginary = "imaginary"
    }
}
{% endhighlight %}

Can we define an array of such an object?

{% highlight Swift %}
var primeObjects = [SomeObject]()
{% endhighlight %}

That seems to be working. No error, no warning, the object is properly created in
a playground.

Can we reproduce the pattern that we used with `Int` and define an array of 
`Property`?

{% highlight Swift %}
var primeProperties = [SomeObject.Property]()
{% endhighlight %}

This uses the type inference and call the array initialization.
*What can go wrong in this syntax?*

Well, try this and you will get the following error:

![Syntax error](/resources/2015/02-22/Swift-array-syntax-error.png)

That seems quite strange no?

Let's try with another syntax. Keep the déclaration and use empty array syntax to define the value, like this:

{% highlight Swift %}
var primeProperties: [SomeObject.Property] = []
{% endhighlight %}

This time the syntax is valid, the object is properly defined. No more syntax error.

But could we go back to the syntax we used with array if integer? *Yes we can.* 
But you need to wrap the inner enumeration inside a type alias, like the following example:

{% highlight Swift %}
typealias TheProperties = SomeObject.Property
var properties = [TheProperties]()
{% endhighlight %}

Here we are. A working array definition with the type specified in the definition.

*Can someone explain me why we need to use a type alias?* 

Is this tied to internal implementation of the alias, or is this some kind of bug in the way the compiler interprets the syntax of inner type?

