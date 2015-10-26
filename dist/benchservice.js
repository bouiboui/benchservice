var BenchService = function () {
};

BenchService.prototype = {
    results: {},
    addResult: function (name, times, number) {
        if (!this.results[times]) {
            this.results[times] = {};
        }
        if (!this.results[times][name]) {
            this.results[times][name] = [];
        }
        this.results[times][name].push(number);
    },
    bench: function (name, func, times) {
        var dStart, dEnd, i;
        dStart = +new Date();
        for (i = 0; i < times; i++) {
            func();
        }
        dEnd = +new Date();
        this.addResult(name, times, dEnd - dStart);
    },
    getResults: function () {
        var values = {};
        var times, name;
        var c, sum, i;
        var results = this.results, names, resultArray;
        for (times in results) {
            if (results.hasOwnProperty(times)) {
                names = results[times];
                var fastest = {};
                values[times] = {"fastest": {}};
                for (name in names) {
                    if (names.hasOwnProperty(name)) {
                        resultArray = names[name];
                        sum = resultArray.reduce(function (a, b) {
                            return a + b;
                        });
                        c = {
                            "min": Math.min.apply(null, resultArray),
                            "avg": sum / resultArray.length,
                            "max": Math.max.apply(null, resultArray),
                            "sum": sum
                        };
                        values[times][name] = c;
                        for (i in c) {
                            if (!fastest[i]) {
                                fastest[i] = {"name": "", "value": Infinity};
                            }
                            if (fastest[i]["value"] >= c[i]) {
                                fastest[i]["name"] = name;
                                fastest[i]["value"] = c[i];
                                values[times]["fastest"][i] = name + " (" + c[i] + ")";
                            }
                        }
                    }
                }
            }
        }
        return values;
    }
};