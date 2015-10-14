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
// 
