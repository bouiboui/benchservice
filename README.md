# BenchService
Stupid simple javascript function benchmarking

![This is a bench](https://upload.wikimedia.org/wikipedia/commons/2/2b/Ickworth_Park,_Suffolk,_England_-broken_bench-2March2012.jpg)

## Introduction
This is a really simple script to compare the speed of Javascript functions, which is very useful for refactoring.It doesn't check for correctness, only for speed.

## Usage
You can check [example.html](https://github.com/bouiboui/benchservice/blob/master/example.html) for a simple example.

- Download the library and include it in your page

		<script src="js/benchservice.js"></script>

- Create a new BenchService object

		var b = new BenchService();

- Create your functions

		var add1 = function() { ... }
		var add2 = function() { ... }
		var add3 = function() { ... }

- Add your benchmarks

		// bench ( name to display, callable, number of times to execute)
		b.bench("Add Function 1", add1, 10000);
		b.bench("Add Function 2", add2, 10000);
		b.bench("Add Function 3", add3, 10000);
	
- Fetch the results

		console.log(b.getResults());

For each function, you will get an object like this one:

		"Add function 1": {
			avg: 5,
			min: 2,
			max: 10,
			sum: 25000
		}

And a "fastest" object like this one:

	fastest: {
		avg: "Add Function 1 (5)",
		min: "Add Function 2 (1)",
		max: "Add Function 2 (9)",
		sum: "Add Function 3 (10000)"
	}
	
So in this example, you know that "Add Function 2" can be the fastest but also the slowest of the 3, depending on the data. You might prefer using "Add Function 1" which scores better on average.

## License
MIT license, see [LICENSE](https://github.com/bouiboui/benchservice/blob/master/LICENSE)
