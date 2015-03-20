---
layout: post
title:  "Swift, implementing singleton pattern"
date:   2015-03-20 21:00:00
categories: Swift
---

Current version of Swift does not support class variables. 
We have to wait until 1.2 version to be available with iOS 8.3.

Until then, how can I implement a singleton pattern in the Swift language.

## Using a ``struct``

My first idea would be something like:

{% highlight Swift %}
class MySingleton
{
	private class var instance : MySingleton?
	
	public func sharedInstance() -> MySingleton 
	{
		if ( nil == instance )
		{
			instance = MySingleton()
		}
		
		return instance!
	}
}
{% endhighlight %}

But in current Swift version, the langage does not support the ``class``variables. 
this will be supported in version 1.2

But you can define a class variable in a structure using the ``static`` qualifier.

You can write something like the following:

{% highlight Swift %}
struct MySingleton
{
    // Counter to tag each new instance
    private static var count: Int = 0
    
    // Our singleton, as returned by sharedInstance()
    private static var instance : MySingleton?
    
    // Instance identifier
    var id: Int
    
    init()
    {
        id = MySingleton.count++
    }
    
    // Access the shared instance, only create one
    static func sharedInstance() -> MySingleton
    {
        instance = instance ?? MySingleton()
        return instance!
    }
}
{% endhighlight %}

## Singleton of a class instance


You can easily implement a singleton object on top of stuctures.

For example:

{% highlight Swift %}
public class SharedObject
{
    public class var sharedInstance: SharedObject
    {
        struct Shared
        {
            static let instance: SharedObject = SharedObject()
        }
        
        return Shared.instance
    }
}
{% endhighlight %}

Just make sure that the ``init`` function is not public.



## Using a module global variable


Next option would be to rely on the behavior of global variables:
*any global variable is lazily initialized*

The ``lazy``keyword is not necessary as this is the default behavior. 
Object won't be initialized until it is used for the first time.


So you could write something like this:

{% highlight Swift %}
let theInstance = GlobalSingleton()

class GlobalSingleton
{
    class func sharedInstance() -> GlobalSingleton
    {
        return theInstance!
    }
}
{% endhighlight %}

As the global is a lazy variable, it won't be created until the first call to 
``GlobalSingleton.sharedInstance()``

Note that this example won't work in a playground as the sequential evaluation do not 
allow to know the ``GlobalSingleton`` class before the class is really created. 
So declaration of the global ``theInstance`` cannot be done in a playground.

## The end

Of course you must be careful when using the singleton pattern. 
This is not the best pattern to use, as this is roughly a global variable in your project.



