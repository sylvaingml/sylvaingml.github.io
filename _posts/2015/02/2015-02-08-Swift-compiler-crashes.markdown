---
layout: post
title:  "Swift, a compiler crash"
date:   2015-02-08 18:40:00
categories: Swift
---

Here is a sample project to reproduce a crash in the Swift compiler.

Check the repository here:
[Swift-compiler-crash-closure-param](https://github.com/sylvaingml/Swift-compiler-crash-closure-param)

Don't know how to fix this. Issue seems to be tied to the closure parameter, 
but not really sure about this.

Any idea?

**Update** Crash can be avoided using the fully qualified name for the enum value. See last commit for details.
