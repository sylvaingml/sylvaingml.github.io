---
layout: post
title:  "Don't forget entitlements for WebKit!"
date:   2019-06-02 18:00:00 CEST’
categories: macOS
---

Sandboxing a macOS application can bring interesting questions on
the table.
One of them is certainly "which entitlement shall I enable?"

This short article is a small reminder on how to use a `WKWebView` in
your app.

The sample application provided with this article presents a simple window
with a single view: a `WKWebView`.
On start, the website [Automatisez.net](https://www.automatisez.net) is loaded
and shown.

After this initial version, we'll see what are the impacts of the
sandbox.

## Without Sandboxing

This is the easy path. 

The initial version of the example application is configured to run without 
sandboxing. 

Launch it and you will see that the web page loads properly, as
expected.

## Enabling Sandbox

In the project editor, select the application target and select the
"capabilities" tab:

1. turn on the option "App Sandbox";
2. build and run the application.

You should see the application window, but the content shall not load.

## Make it work

If you intend to use a `WKWebView` in your sandboxed application you
_need_ to also ask for a specific entitlement: _Outgoing Connections (client)_.

In the `WebkitEntitlementDemo.entitlements` the corresponding key value
is `com.apple.security.network.client`.

{% capture descr %}
On this screenshot you can seen entitlement for sandboxed application. 

If you are using WebKit, you shall have the option 
_Outgoing Connections (client)_ checked.

You have to allow network outgoing connection of the `WKWebView` will not
be able to work as expected.
{% endcapture %}
{% capture altText %}
Xcode screenshot showing entitlement options.
{% endcapture %}
{% include widgets/screenshot-lightbox.html 
        src="2019/2019-06-02_Xcode-webkit-sandbox.png" 
        imgAlt=altText
        description=descr %}


## Few final words

It seems obvious to enable network connection when you intend to use
a web browser component.

The trap with `WKWebView` is that this entitlement is _required_ even if
you do not access networks and limit yourself to your application bundle content
resources, like embedded help files.

-----

## Resources

- You can get the example projet on [GitHub](https://github.com/sylvaingml/WebKitEntitlementDemo).
- [Entitlements references](https://developer.apple.com/documentation/bundleresources/entitlements?language=objc)
  general documentation.
- [Sandbox specific](https://developer.apple.com/documentation/bundleresources/entitlements/app_sandbox) entitlements.
