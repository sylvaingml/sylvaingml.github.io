---
layout: post
title:  "Swift, implementing singleton pattern"
date:   2015-02-13 00:00:00
categories: Swift
---

I've had a simple need: implementing a singleton pattern in the Swift langage.

## Using a ``struct``

My first idea would be something like:

```Swift
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
```

But in current Swift version, the langage does not support the ``class``variables. 
this will be supported in version 1.2

You can anyway define a static variable in a structure.

You can write something like the following:

```Swift
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
```

Remember that a structure is passed by value, when an object will
be passed by reference. So keep this in mind when time of choice is coming.

## Using a global variable

Next option would be to rely on the behavior of global variables:
*any global variable is lazily initialized*

The ``lazy``keyword is not necessary as this is the default behavior. 
Object won't be initialized until it is used for the first time.


So you could write something like this:

```swift
let theInstance = GlobalSingleton()

var globalCounter = 0

class GlobalSingleton
{
    var id = ++globalCounter
    
    class func sharedInstance() -> GlobalSingleton
    {
        return theInstance!
    }
}
```

As the global is a lazy variable, it won't be created until the first call to 
``GlobalSingleton.sharedInstance()``

Note that this example won't work in a playground as the sequential evaluation do not 
allow to know the ``GlobalSingleton`` class before the class is really created. 
So declaration of the global ``theInstance`` cannot be done in a playground.

## The end

Of course you must be carefull when using the singleton pattern. 
This is not the best pattern to use, as this is roughly a global variable in your project.

Swift is quite fun, and in some cases much simpler than Objective-C.


