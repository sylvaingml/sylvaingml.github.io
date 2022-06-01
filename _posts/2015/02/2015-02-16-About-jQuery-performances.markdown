---
layout: post
title:  "Simple performance profiling in JavaScript"
date:   2015-02-16 23:55:00
categories: JavaScript jQuery
---

Today let's do some JavaScript.

## Mesure-Kit

I've wrote a small class to do basic performance profiling.
You can get *mesure-kit.js* in my repository 
[jQuery-vs-JS-performances](https://github.com/sylvaingml/jQuery-vs-JS-performances).

This library uses [jQuery](http://jquery.com) and the test pages are using 
[Bootstrap](http://getbootstrap.com) for the styles.
Some Bootstrap class names are used by the library to generate the result summary table.

Enough talk. Just see some sample tests about
[loops](/resources/2015/02-16-mesure-kit/each-or-loop.html),
[proxy functions](/resources/2015/02-16-mesure-kit/perf-proxy.html)
and also 
[creating DOM nodes](/resources/2015/02-16-mesure-kit/perf-div-creation.html).

### What can it be used for?

The idea is to be able to compare different implementations of the same feature.
Library was written to compare native JavaScript against jQuery methods.

Each provided example consists of multiple tests.

Running each test individually will keep the timing and running all test will also 
dump a table of timings with average time as the last row.

### Building a test suite

First step is to create a `Bench` object.

{% highlight JavaScript %}
var bench = new Bench({ 
    nbLoop:    10000, 
    summaryId: "summary"
});
{% endhighlight %}

Constructor accepts two options:

- `nbLoop` is the number of time your code will be executed in a single run
- `summaryId` is the DOM identifier of a container where all run timing will 
    be displayed.

### What is a test?

A test is some code to run multiple times. 
Each run time will be mesured and all times will be stored to compute
average run time.

You have to write multiple implementations to be compared. 
Each one will have:

1. An *identifier*. 
    This is also a DOM identifier where each run result will be output.
2. Code to test, specified as a closure (anonymous function).
3. You may also provide some test setup and cleanup code.

Before running tests you have to *register* each test case in your `bench` object:

{% highlight JavaScript %}
bench.addTest('some-test-id', function() { 
	// Do something to test here
    },
    function() {
        // Some init code run once when a single test is run.
    }
);
{% endhighlight %}

### How to run tests?

You can run test in multiple ways:

Run a single test the number of times specified in the `nbLoop` option.
Setup function will be called once before runs and cleanup once after.
Can be usefull for long tests or unitary tests.

{% highlight JavaScript %}
bench.runTest("some-test-id");
{% endhighlight %}

Run all declared test that were declared. 
    This will run each test.

{% highlight JavaScript %}
bench.runAllTests();
{% endhighlight %}

Run a longer benchmark. 
The previous behavior is executed the number of times specified.

{% highlight JavaScript %}
bench.runBench(50);
{% endhighlight %}

### Inserting summary table

The summary table will not be inserted automatically.

You can build it at any time and insert the table at will.

{% highlight JavaScript %}
bench.insertSummaryTable();
{% endhighlight %}

Table will be inserted in the element with the identifier you specified
at construction time.

Calling this method will:

- compute the average time for each ran test
- build a table
- insert the table in the page.

-----

## Test results


### [jQuery versus JavaScript "for" loop](/resources/2015/02-16-mesure-kit/each-or-loop.html)

This page compare two kind of iterations:

1. Iteration on a jQuery list of nodes to change the html content of each node with `html()` function.
    - Using `$.each()`
    - Using a raw `for ( var idx = 0 ; idx < $list.length ; ++idx )` loop
2. Iteration on a jQuery list of nodes with jQuery access on each item like `$(item).height()`
    - Using `$.each()`
    - Using a raw `for ( var idx = 0 ; idx < $list.length ; ++idx )` loop

Average timing for a single bench run using Safari I had the following results:

1. Iteration to update HTML:
    - `$.each()`: 23.9ms
    - `for`: 19.1ms
2. Iteration with jQuery read action:
    - `$.each()`: 23.9ms
    - `for`: 18.1ms


### ["proxy" functions versus closures](/resources/2015/02-16-mesure-kit/perf-proxy.html)

In this scenarios I try to compare performance of native closure against
the jQuery proxy functions.

It seems obvious that a generic function will be slower than raw code. 
*But how much?*

First serie of test: closures:

- simple closure with captured objects: 0.22ms
- closure with one object that is captured reference to used object: 0.24ms

Roughly same results. No big differences. So now, let's try with proxies:

- Dumb way to use proxies, created on each run: 17.43ms
- Best way to use proxy in a catched reference: 8.1ms

That's a *big* difference. Just try with your browser of choice and compare. 
I bet you'll get similar results.

That's where the JIT and native compilation implemented
by JavaScript engines prove its value.

So next time you implement a listener you'll know which pattern you need to choose.


### [DOM node creation](/resources/2015/02-16-mesure-kit/perf-div-creation.html)

Last test try to show what is the most efficient way to build a DOM.

You have to choose between jQuery ease of use or DOM API speed. 
What distance is there between confort and speed? 

- jQuery
    - `$("<div>", { class: 'dummy' })`: 76.94ms
    - `$("<div class='dummy'>")`: 365.48ms
    - `$("<div>")`: 48.02ms
- DOM
    - `document.createElement('div')`: 4.24ms
    - `document.createElement('div'); newDiv.setAttribute('class', 'dummy')`: 6.64ms

Parsing string costs a lot. 
If you were to use jQuery the conclusion is to try to specify attributes
as a map instead of string.

But if you really need performances, stick with native DOM API.

## Conclusion

Winner of those tests might be obvious. 
Native JavaScript cannot be slowler than jQuery.

What can be surprising is the difference between the two.

This difference can really make a difference when you develop for
low-end devices (yes, I mean mobiles and tablets).

So if you have any doubt, try tocompare solutions with mesure-kit.

-----
Updated example on 2022-06-01 to use non deprecated jQuery and Bootstrap versions.
