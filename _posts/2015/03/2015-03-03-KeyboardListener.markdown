---
layout: post
title:  "Simple keyboard listener in Swift"
date:   2015-03-03 14:00:00
categories: Swift UIKit
---

I've just published a small sample project to provide a reusable 
keyboard listener that will ensure that an input field won't be hidden
under the keyboard.

This require to embed your input fields inside a UIScrollView object.

If you are using a UITableView, this is already the case.

You need to implement a getter closure that will return the currently active
input field.

How can you use this class?

Just import the framework:

{% highlight Swift %}
import SGiT_KeyboardListener
{% endhighlight %}

Then your controller shall declare a variable to keep reference to the listener:

{% highlight Swift %}
var keyboardListener: KeyboardListener?
{% endhighlight %}

Creat the listener when the view is loaded:

{% highlight Swift %}
override public func viewDidLoad()
{
    super.viewDidLoad()

    keyboardListener = KeyboardListener(scrollView: tableView, controller: self) {
        return self.activeField
    }

    // to be continued...
}
{% endhighlight %}

And that's all.

More information in the repository 
[Swift-SGiTKeyboardListener](https://github.com/sylvaingml/Swift-SGiTKeyboardListener)

Feedback is welcome!
