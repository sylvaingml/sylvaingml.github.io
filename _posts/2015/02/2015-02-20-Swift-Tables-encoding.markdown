---
layout: post
title:  "Swift, arrays and NSCoding protocol"
date:   2015-02-20 00:20:00
categories: Swift
---

Today I'm trying to explore how easy it is to create an
indexed collection in Swift with persistence support.

For persistence I'm not going to follow the Core Data path.
We'll see how to use and implement the very simple `NSCoding` protocol.

## Creating an indexed collection

Create a new Swift project for OS X. To be simple, create a command line tool.

### First step: creating the class

In the main file, define the following class:

{% highlight Swift %}
import Foundation

/* A simple class to wrap array of strings
 */
class Sentence: NSObject
{
    var words: [String]! // Please, no optional here (use '!' to explicitly unwrap)
    
    override init() {
        super.init()
        
        words = [String]()
    }
    
    /** Standard way to build a human readable object. */
    func description() -> String {
        return "Sentence=[" + join(", ", words) + "]"
    }
}
{% endhighlight %}

> `words` shall not be an optional, so we unwrap the type by using
> the `!` operator in the type declaration.

Clearly not the most useful object to create, but this will illustrate
in the most simple way how to build our collection.

We implement the `description()` method using the `join()` function.
This is not mandatory, but will help printing the object value.

### Accessing using array syntax

If you want to provide access to elements using the array syntax, the Swift
solution is to implement a *subscript*.

- The `get()` method will implement the access to a specific collection element.
- the `set()` method will implement the modification of a collection element. 
    We also provide a custom logic where element is appended to the collection
    if the index is over the maximum index.

{% highlight Swift %}
/** This allow to use the bracket syntax to access elements.
 */
subscript(index: Int) -> String {
    /** Implements: sentence[ index ] -> String */
    get { return words[ index ] }

    /** Implements: sentence[ index ] = aString */
    set(newValue) {
        if ( index < words.count ) {
            words[ index ] = newValue
        }
        else {
            words.append(newValue)
        }
    }
}
{% endhighlight %}

Your collection is complete. You can test it directly in the main file by adding the
following after the class definition:

{% highlight Swift linenos %}
let example =  "This is not the robot you are looking for."
let sampleArray = example.componentsSeparatedByString(" ")

var sentence = Sentence()
for word in sampleArray {
    sentence[99] = word
}

println("First value: \( sentence )")
{% endhighlight %}

- On lines 1 and 2, we create a sample array of string to fill our new collection.
    The array is build by splitting the string on spaces.
- On line 4 an empty creation is built.
- The loop between lines 5 and 7 will add each word to the collection.
- Finally, line 9 will print the final result.


## Adding support for NSCoding

### Required protocol

First, you need to implement the `NSCoding` protocol.

{% highlight Swift %}
class Sentence: NSObject, NSCoding
{ 
    ... 
}
{% endhighlight %}

### Required methods

To implement this protocol you have to implement two methods:

1. `init(coder decoder: NSCoder)` to decode object as new instance
2. `func encodeWithCoder(encoder: NSCoder)` to encode object 

We'll start by encoding our object. 

`NSCoder` cannot encode an array directly. You must iterate on elements and encode
all of them one by one.

If you want to be able to decode again the object you must know how many object 
are encoded. 

So, the first information to encode is the number of encoded elements.

Then, we loop on array and we encode each entry.

Final method shall be similar to the following:

{% highlight Swift linenos %}
func encodeWithCoder(encoder: NSCoder)
{
    encoder.encodeInteger(words.count, forKey: countKey)

    for index in 0 ..< words.count {
        encoder.encodeObject( words[ index ] )
    }
}
{% endhighlight %}

In the last step we have to decode objects.

We do exactly the same thing, but in decoding way:

1. get the number of entry to decode;
2. decode as many objects as this value specifies.

Method looks like:

{% highlight Swift linenos %}
required init(coder decoder: NSCoder)
{
    super.init()

    let nbCounter = decoder.decodeIntegerForKey(countKey)
    words = [String]()

    for index in 0 ..< nbCounter {
        if var word = decoder.decodeObject() as? String {
            words.append(word)
        }
    }
}
{% endhighlight %}

> Note that when we decode our list of object, we append decoded entries to preserve the
> original order of the collection.

This is the end. Our object can now be encoded and decoded.

Let's test this with some lines of code:

{% highlight Swift linenos %}
// Encode object in an NSData 'carbonite' object
let carbonite = NSKeyedArchiver.archivedDataWithRootObject(sentence)

// And build a new instance by decoding 'carbonite'
let lazarus = NSKeyedUnarchiver.unarchiveObjectWithData(carbonite) as Sentence

println("New object, decoded from NSData: \( lazarus )")
{% endhighlight %}

## Conclusion

The sample project used in this article is available in
the [Swift-array-encoding](https://github.com/sylvaingml/Swift-array-encoding)
repository.

I've described:

- A simple way to create single-dimension collection using the `subscript`
    syntax of Swift.
- How to use `NSCoding` protocol and `NSCoder` implementation to encode and decode
    our collection, and especially the internal array.

I hope this short tutorial will help you understand how Cocoa and Swift can
live hand-in-hand.

