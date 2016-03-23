---
layout: post
title:  "Swift, using NSCoding"
date:   2016-03-22 13:00:00
categories: Swift, NSCoding
---

I've uploaded a small playground [available here][gitProject] to illustrate the 
use of `NSCoding` with custom Swift objects.


Every class that will be encoded and decoded need to implement the `NSCoding` 
protocol and be an Objective-C object.

{% highlight Swift %}
class CustomPoint: NSObject, NSCoding {
}
{% endhighlight %}

You can extend the `NSObject` class as in the example above.
You can also use the `@objc` annotation.


Object will be created using a specialized initialize:

{% highlight Swift %}
required init?(coder aDecoder: NSCoder) {
    x = aDecoder.decodeDoubleForKey("x")
    y = aDecoder.decodeDoubleForKey("y")
}
{% endhighlight %}


And you will encode objects using a `encodeWithCoder()` method:

{% highlight Swift %}
func encodeWithCoder(aCoder: NSCoder) {
    aCoder.encodeDouble(x, forKey: "x")
    aCoder.encodeDouble(y, forKey: "y")
}
{% endhighlight %}



[gitProject]: https://github.com/sylvaingml/Swift-NSCoding
