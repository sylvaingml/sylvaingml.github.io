---
layout: post
title:  "Swift and the UIAppearance proxy"
date:   2015-02-27 13:00:00
categories: Swift, iOS
---

I'm trying to push a bit of polish to a small app written 100% in Swift.

To be short: *it's no more 100%* 

What has gone wrong that Swift is not (*yet?*) able to achieve?

Have you ever tried to use `UIAppearance` interface in Swift? It works pretty
well... until you try to do useful things like:

{% highlight Objective-C%}
[[UIBarButtonItem appearanceWhenContainedIn: [UINavigationBar class], nil]
            setBackgroundImage: myNavBarButtonBackgroundImage 
                      forState: state 
                    barMetrics: metrics];
{% endhighlight %}

It's just not possible. Game over. The `appearanceWhenContainedIn:` method
is not even mapped to Swift in the 
[reference documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIAppearance_Protocol/index.html#//apple_ref/occ/intfcm/UIAppearance/appearanceWhenContainedIn:).

It's seems that issue is cause by incompatibility between Objective-C and Swift way to 
handle multiple parameters methods calls. But I'm not sure on that.

I hope this will be fixed when Swift 1.2 will be made available. 
I don't have to clone my project and convert it to 1.2 yet. 

Did anyone have any information on this?

Until then I have to go back to old and beloved Objective-C and play a bit 
with bridging.
