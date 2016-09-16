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
    getTimer: function () {
        if ("performance" in window && "now" in window.performance) {
            return window.performance.now();
        } else {
            return +new Date();
        }
    },
    bench: function (name, func, times) {
        var start, end;
        var i = times;
        while (i--) {
            start = this.getTimer();
            func();
            end = this.getTimer();
            this.addResult(name, times, end - start);
        }
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
                            if (c.hasOwnProperty(i)) {
                                if (!fastest[i]) {
                                    fastest[i] = {"name": "", "value": Infinity};
                                }
                                if (fastest[i]["value"] > c[i]) {
                                    fastest[i]["name"] = name;
                                    fastest[i]["value"] = c[i];
                                    values[times]["fastest"][i] = name + " (" + c[i] + ")";
                                } else if (fastest[i]["value"] == c[i]) {
                                    fastest[i]["name"] = name;
                                    fastest[i]["value"] = c[i];
                                    values[times]["fastest"][i] += ", " + name + " (" + c[i] + ")";
                                }
                            }
                        }
                    }
                }
            }
        }
        return values;
    },
    getRanking: function () {
        var values = {};
        var times, name, sum;
        var results = this.results, names, resultArray;
        // 10,1000,10000,50000
        for (times in results) {
            if (results.hasOwnProperty(times)) {
                // for, for..in, map, while
                names = results[times];
                values[times] = [];
                for (name in names) {
                    if (names.hasOwnProperty(name)) {
                        // 0.001, 0.2212, 0.232121, 1.00025
                        resultArray = names[name];
                        // 0.001 + 0.2212 + 0.232121 + 1.00025
                        sum = resultArray.reduce(function (a, b) {
                            return a + b;
                        });
                        values[times].push([name, sum]);

                    }
                }
                values[times].sort(function (a, b) {
                    return a[1] > b[1];
                });
            }
        }
        return values;
    }
};