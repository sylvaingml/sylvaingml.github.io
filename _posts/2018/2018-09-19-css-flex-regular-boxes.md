---
layout: post
title:  "CSS Position"
date:   2018-09-19 13:00:00 CEST’
categories: CSS
---

## How to fix flex container to get equals columns?

You might want go build a container with equal size elements.

In this cas you will probably do something like:

	/* Our flex container */
	.container { display: flex; }
	
	/* Items */
	.container .item { flex: 1 1 0; }

But in some case you will find that this is not working
and this might be because of remaining size constraints
on the flex container elements. 

<html>
<p data-height="265" data-theme-id="dark" data-slug-hash="xayKqO" data-default-tab="css,result" data-user="sylvaingml" data-pen-title="[css] Flexbox with equal size items" class="codepen">See the Pen <a href="https://codepen.io/sylvaingml/pen/xayKqO/">[css] Flexbox with equal size items</a> by Sylvain Gamel (<a href="https://codepen.io/sylvaingml">@sylvaingml</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</html>


You can find a basic example for this in the following
[codepen](https://codepen.io/sylvaingml/details/zEbzzY).


