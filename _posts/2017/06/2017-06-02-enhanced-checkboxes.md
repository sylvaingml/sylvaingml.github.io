---
layout: post
title:  "HTML enhanced checkboxes"
date:   2017-06-02 12:00:00 CEST
categories: CSS,WCAG,HTML
---

## Functional goal

The need was to provide a panel of options controlled
via checkboxes. 

Each checkbox is attached to a subset of options (a simple panel in the prototype). 

Subset display can be collapsed or expanded by clicking a small chevron next to checkbox labels. 

The checkbox state can be controlled independently of the expand/collapse state.

## Sample implementation

I've implemented a prototype of three different way to implement this UI. 
You can see it on 
[codepen](http://codepen.io/sylvaingml/full/qjWQRP/).


Even if the third way looks to be the best choice, it must be done with care to ensure that 
the expand button target is large enough, especially from an accessibility point of view. 

