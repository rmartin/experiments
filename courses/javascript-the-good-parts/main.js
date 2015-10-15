'use strict';
// Excercise One
var identity = function(a) {
	return a;
};

// call and invoke the first function.
console.log('Exercise One');
console.log(identity(3));

// Exercise Two
var add = function(a, b) {
	return a + b;
};

var mul = function(a, b) {
	return a * b;
};

console.log('Exercise Two');
console.log('Add: ', add(3, 4), 'Multiply: ', mul(3, 4));

// Exercise Three
// Write a function that takes an argument and returns a fucntion that returns
// that argument.
var identityf = function(a) {
	return function() {
		return a;
	};
};

console.log('Exercise Three');
var idf = identityf(3);
console.log(idf());

// Exercise Four
// Write a function that adds from two invocations
var addf = function(a) {
	return function(b) {
		return a + b;
	};
};

console.log('Exercise Four');
console.log(addf(3)(4));

// Exercise Five
// Write a function that takes a binary function, and makes
// it callable with two invocations.
var applyf = function(binary) {
	return function(x) {
		return function(y) {
			return binary(x, y);
		};
	};
};

console.log('Exercise Five');
var addf = applyf(add);
console.log(addf(3)(4));
console.log(applyf(mul)(5)(6));

// Exercise Six
// Write a function that takes a function and an argument and
// returns a function that can supply a second argument.
var curry = function(fn, a) {
	return function(b) {
		return fn(a, b);
	};
};

console.log('Exercise Six');
var add3 = curry(add, 3);
console.log(add3(4));
console.log(curry(mul, 5)(6));

// Exercise Seven
// Without writing any new functions, show three ways to
// create the inc function

console.log('Exercise Seven');
var inc = addf(1);
console.log(inc(5));
console.log(inc(inc(5)));

var inc = applyf(add)(1);
console.log(inc(5));
console.log(inc(inc(5)));

var inc = curry(add, 1);
console.log(inc(5));
console.log(inc(inc(5)));

// Exercise Eight
// Write methodize, a function that converts a binary
// function to a method
var methodize = function(func) {
	return function(a) {
		return func(this, a);
	};
};

console.log('Exercise Eight');
Number.prototype.add = methodize(add);
console.log((3).add(4));

// Exercise Nine
// Write demethodize, a function that converst a method
// to a binary function
var demethodize = function(func) {
	return function(that, y) {
		return func.call(that, y);
	};
};

console.log('Exercise Nine');
console.log(demethodize(Number.prototype.add)(5, 6));

// Exercise Ten
// Write a function twice that takes a binary function and
// return a unary function that passes its argument to the
// binary function twice.
var twice = function(func) {
	return function(a) {
		return func(a, a);
	};
};

console.log('Exercise Ten');
var double = twice(add);
console.log(double(11));

var square = twice(mul);
console.log(square(11));

// Exercise Eleven
// Write a function composeu that takes two unary functions
// and returns a unary function that calls them both.
var composeu = function(funcA, funcB) {
	return function(a) {
		return funcB(funcA(a));
	};
};

console.log('Exercise Eleven');
console.log(composeu(double, square)(3));

// Exercise Twelve
// Write a function composeb that takes two binary functions
// and returns a function that calls them both.
var composeb = function(funcA, funcB) {
	return function(a, b, c) {
		return funcB(funcA(a, b), c);
	};
};

console.log('Exercise Twelve');
console.log(composeb(add, mul)(2, 3, 5));

// Exercise Thirteen
// Write a function that allows another function
// to only be called once.
var once = function(func) {
	var hasReturned = false;
	return function(a, b) {
		if (hasReturned) {
			throw new Error();
		} else {
			hasReturned = true;
			return func(a, b);
		}
	};
};
// var once = function(func){
//     return function () {
//         var f = func;
//         func = null;
//         return f.apply(this, arguments);
//     };
// };

console.log('Exercise Thirteen');
var addOnce = once(add);
console.log(addOnce(3, 4));
try {
	addOnce(3, 4);
} catch (e) {
	console.log('Caught Error');
}

// Exercise Fifteen
// Write a factory function that returns two functions
// that implement an up/down counter.
var counterf = function(a) {
	var inc = function() {
		return ++a;
	};
	var dec = function() {
		return --a;
	};
	return {
		inc: inc,
		dec: dec
	};
};

console.log('Exercise Fifteen');
var counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());

// Exercise Sixteen
// Make a revocable function that takes a nice function,
// and returns a revoke function that denies access to the nice function,
// and an invoke function that can invoke the nice function until it is revoked.
var log = function(a) {
	console.log(a);
};

var revocable = function(nice) {
	return {
		invoke: function() {
			return nice.apply(this, arguments);
		},
		revoke: function() {
			nice = null;
		}
	};
};

console.log('Exercise Sixteen');
var temp = revocable(log);
temp.invoke(7);
temp.revoke();
try {
	temp.invoke(8);
} catch (e) {
	console.log('Caught Error');
}
