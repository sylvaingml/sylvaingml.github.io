---
layout: post
title:  "Xcode and IBInspectable, a story of love and hate..."
date:   2017-06-12 21:00:00 CEST
categories: Xcode,crash,bug,CocoaTouch,UIKit
---

## Surprise playing with _@IBDesignable_ and _@IBInspectable_

My initial goal was to subclass `UIButton` to provide some customization
directly inside Xcode.

Best choice seem to go ahead with `@IBDesignable` and `@IBInspectable`
annotations. So I did.


As a starting point, you may want to have a look to a sample project I
did to showcase my issue.

Check the [repository](https://github.com/sylvaingml/InspectableButtonBug)
while you read this article.


## At first was the Honey Moon

As my goal to be quick and not too dirty, I did the most obvious thing:
a subclass of `UIButton` with properties annotated with the `@IBInspectable`
I fulfilled my initial objectives:

- quick customization in Xcode,
- clean code.

![Xcode can customize my button!](/resources/2017/06/2017-06-12-IB-inspectable.png)

A custom `isHighlighted` implementation was providing the expected animations,
as you can see in my small app [_Instant Sizing_](https://itunes.apple.com/us/app/instant-sizing-for-scrum/id1245353972?l=fr&ls=1&mt=8).


## Then came the refactor

For the next step I wanted to jump in something more scalable.

So I started some minor refactor, and my very first goal was to extract the
animation code from subclass.

The idea is to be able to plug different animation, depending on the context in the 
applications.

So I moved all builder for transformations and animation in an external object,
via a protocol.

Something like:

~~~ swift
public protocol SGiTButtonAnimator {    
    func createDefaultTransformation(for button: SGiTButton) -> CATransform3D
    func createPressTransformation(for button: SGiTButton) -> CATransform3D
    
    func createPressAnimation(for button: SGiTButton) -> CAAnimation
    func createDepressAnimation(for button: SGiTButton) -> CAAnimation
}
~~~


My first idea was to simply attach an instance implementing this
protocol to my custom `UIButton` class.

_Turns out this was a bad idea._

Now Interface builder is no longer able to display my customizable button!

![That's a crash...](/resources/2017/06/2017-06-12-IB-crash-error.png)


## Is this the end?

I hope it's not. Just need to find a way to workaround this limitation.

But this ended at least with a Radar.

If you have an idea to properly design this kind of UI elements,
feel free to contact me via [Twitter](https://twitter.com/sgamel) 
to provide a PR proposal on the example
[repository](https://github.com/sylvaingml/InspectableButtonBug).
