# BenchService
Simple stupid Javascript benchmarking tool

![This is a bench](https://upload.wikimedia.org/wikipedia/commons/2/2b/Ickworth_Park,_Suffolk,_England_-broken_bench-2March2012.jpg)

## Introduction
BenchService compares the speed of your Javascript functions, which is very useful for refactoring. It's not trying to be 100% correct, just to give you a general idea given a large enough number of iterations.  

You should check [example.html](https://github.com/bouiboui/benchservice/blob/master/example.html) for a simple example.

```javascript
Iterations		1. Fastest			2. Fast   			3. Slower 			4. Slowest
1000			while-- (1.545)		for     (1.734)		for..in (3.270)		map     (3.450)
5000			while-- (6.169)		for     (6.214)		for..in (10.71)		map     (13.76)
10000			while-- (11.84)		for     (11.98)		for..in (23.15)		map     (31.75)
50000			while-- (59.37)		for     (59.49)		for..in (108.8)		map     (137.5)
```


## Install
Just include the JS file in your document, there's no dependency (not even jQuery)
```html
<script src="js/benchservice.js"></script>
```

## Usage


```javascript
// Create a new BenchService object
var b = new BenchService();

// Create the functions you want to compare
var add1 = function() { ... }
var add2 = function() { ... }
var add3 = function() { ... }

// Add your benchmarks

// bench ( name to display, callable, number of times to execute)
b.bench("Add Function 1", add1, 10000);
b.bench("Add Function 2", add2, 10000);
b.bench("Add Function 3", add3, 10000);
	
// Fetch the results
console.log(b.getResults());

// For each function, you will get an object like this one:
"Add function 1": {
	avg: 5,
	min: 2,
	max: 10,
	sum: 25000
}

// And a "fastest" object like this one:
fastest: {
	avg: "Add Function 1 (5)",
	min: "Add Function 2 (1)",
	max: "Add Function 2 (9)",
	sum: "Add Function 3 (10000)"
}

// So in this example, you know that "Add Function 2" was the quickest for single executions, 
// Function 1 was the quickest on average and Function 3 was the one that took the least time overall.
```

## License
Unlicense, see [unlicense.org](http://unlicense.org/)
