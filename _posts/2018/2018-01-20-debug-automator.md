---
layout: post
title:  "How can you debug an Automator action? (and any app protected by SIP)"
date:   2018-01-20 22:00:00 CEST
categories: Xcode,Automator,debug
---

Automator is really one, of the many, forgotten children of Apple Inc. and macOS.

It’s clear that Automator has not evolved since too many OS release.

It’s even more obvious when you try to implement a
simple action for Automator. 
_Can you imagine that Xcode template is still using springs and struts?_
Yes, still no autolayout by default.

Is anyone coding for Automator in Cupertino? I think not.

So long for UI minor issue… here come the fun part.

### How can you debug you AMAction implementation?

The old way of doing so was simply to build your action plugin, install it
and debug by attaching Xcode to Automator application process.

Simple, easy and straightforward.

_Here comes High Sierra and SIP…_

What’s the point with SIP?

_System Integrity Protection_ is an additional security layer
for your Mac to avoid compromising system processes by other user
level processes.

When so many security threats from the internet are trying to
attempt corrupting our computers, SIP appears to be a perfect brick
in the protection wall built around our systems.

### Getting around SIP for debug

You could choose to simply disable SIP. But this is not an optimal
solution when my goal was simply to debug my action in Automator.

_So what?_ 

I could build my own Automator environment and debug my action
in that specific shell application.

We can go faster and better.

Just clone Apple’s Automator and make it look it is no more
a system application. 

This can be done in two steps:
1. duplicate application
2. change its signature to make it appear to be developed by you.

For this last step you need to have your developer certificate is available in your keychain.

Doing this will lure the OS and you will be able to attach Xcode
debugger to this specific Automator instance.

What are the steps?

- From the Finder, in the Applications folder, just duplicate Automator
application and give it a different name. Mine is “AutomatorDEBUG.”
- Open a terminal to get a shell.
- Go to the “/Applications” folder.
- Change the application signature:

```shell
  codesign -s _AppleId@Company.com_ -f AutomatorDEBUG.app
```

Of course you need to replace _AppleId@Company.com_ with your real Apple Id
of your developer account.

You can verify that signature was properly changed by calling again ’codesign’:

```shell
codesign --display --verbose=4 AutomatorDEBUG.app
```

When you need to debug an Automator action, you now need
to launch you customized _AutomatorDEBUG_ application that will
be visible in the menu “Debug/Attach to Process.”

I hope this trick will help you to 
develop new Automator actions. Those are really the easiest way
to provide simple automation for your Mac applications.

Let’s hope Apple will bring Automator back on the front for the next macOS 10.14!
