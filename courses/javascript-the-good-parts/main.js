'use strict';
// Excercise One
var identity = function(a) {
	return a;
}

// call and invoke the first function.
console.log('Exercise One');
console.log(identity(3));

// Exercise Two
var add = function(a, b) {
	return a + b;
}

var mul = function(a, b) {
	return a * b;
}

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
var curry = function(fn, a){
    return function(b) {
        return fn(a,b);
    };
};

console.log('Exercise Six');
var add3 = curry(add, 3);
console.log(add3(4));
console.log(curry(mul, 5)(6));
