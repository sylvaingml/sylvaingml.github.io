---
layout: post
title:  "About :target pseudo-element in CSS"
date:   2016-12-20 12:00:00 CEST
categories: CSS,WCAG
---

I never had a chance to play with the `:target` pleudo-element selector.

It can be very useful to apply a specific style on an element
when its identifier is part of current document URI.

This is especially usefull to build some custom style on element that
are being navigated to.

I'm setup a small example on this
[codepen](http://codepen.io/sylvaingml/full/PbLNwg/).

<p data-height="265" data-theme-id="dark" data-slug-hash="PbLNwg" data-default-tab="html" data-user="sylvaingml" data-embed-version="2" data-pen-title=":target pseudo-class" class="codepen">See the Pen <a href="http://codepen.io/sylvaingml/pen/PbLNwg/">:target pseudo-class</a> by Sylvain Gamel (<a href="http://codepen.io/sylvaingml">@sylvaingml</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This is a classical and simple way to build a basic collapsed menu,
such as navigation menu found under the (in)famous hamburger menu
on mobile sites.

Clicking the menu activation link will navigate to the navigation element
and, as it is now the target in the page, reveal its content.

Select one item of the navigation menu and it will hide again, switching
to the new target.

-----

Some more informations are available on
[MDN](https://developer.mozilla.org/en/docs/Web/CSS/:target).

