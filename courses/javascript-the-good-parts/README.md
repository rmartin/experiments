# JavaScipt the Good Parts

## Overview
This is a personal workspace for the [JavaScipt the Good Parts](http://www.pluralsight.com/courses/javascript-good-parts).  

## Programming Style & Your Brain
* Reference: Thinking Fast and Slow - Daniel Kahneman - Head. Gut. Two Systems.
* [Optical illustion](http://web.mit.edu/persci/people/adelson/checkershadow_illusion.html)
* [JSLint](http://www.JSLint.com) * Cury braces should be on the same line (on the right) within JavaScript. This is due to automatic semicolon insertion.

```javascript
// Silent Error!
 return
 {
     ok: false
 };

// works well in JavaScript
 return {
     ok: true
 };
 ```

* Switch statement is analogous to the goto operator. There are fallthough hazards within switch statements.
* a good style can help produce better programs.
* Medieval copyist introduced lowercase, word breaks and punctuation. These innovations helped reduced the error rate.
* JavaScript practices:
    * no space between a function name and (
    * One space between all other names and (
```javascript
// wrong
foo (bar);
return(a+b);
if(a===0){ ... }
function foo (b) { ... }
function(x) {}
```

* Immediately Invocable Function expression.

```javascript
// syntax error
function () {

}();

// correct, but includes 'dog balls'
(function () {

})();

// correct
(function(){

}())

// never rely on semicolon insertion
x=y // will assign y invoked as a function passing the result of the other function as the argument.
(function (){

}());
```
* With statement is also confusing. Confusion must be avoided.
* Double equal operator does type coercion before it does the comparison. You can also loose transitivity. Always use ===, never use ==.
```javascript
0 == ''          // true
0 == '0'         // true
'' == '0'        // false
false == 'false' // false
false == '0'     // true
' \t\r\n ' == 0  // true
```
* Multiline string literals breaks indention. Extra spaces in the strings result in an error.
* Avoid forms that are difficult to distinguish from common errors.
* Block scope - invented in ALGOL 60 programming language. JavaScript does not have block scope it has function scope only. The var scope get's hoisted to the top of the function block. As a result you should always define your variables at the top of the function. You should also declare all functions before you call them. In general this should be replaced with the let statement for ES2015.

```javascript
// sample function
function foo() {
    var myVar = 0, myOtherVar;
}

// turns into
function foo(){
    var myVar = undefined,
    myOtherVar = undefined;
    myVar = 0;
}
// declaring the variable at this level get's hoisted to the top
for(var i ...){}
```

* Global Variables. Avoid them, if necessary then make them UPPER_CASE. Global variables are implicit.
* Construction functions - Should be named with InitialCaps. Only constructor functions should be named that.
* Pointer arithmetic is the origin of ++. This should be avoided and instead used as x += 1;  Note that post and pre increment are different. x++ !== ++x. ++x === x += 1.
* Curly Braces. Always use them.
```javascript
// example
if (a) b(); c();
// means
if(a){
    b();
}
c();
```

## And Then There Was JavaScript
* Brendan Eich - Created the language in 10 days which was a combination of Java, Scheme(function scope) and Self (no classes, object based lang.). Originally called LiveScript.
    * Sun and Netscape formed an alliance to bring Java into the browser. This was done with LiveConnect to communite between the DOM 0 and Java. Marc Andreessen suggested renaming it to JavaScript as a 'lite' version.
    * Microsoft - Purchased a competitor Spyglass and it become IE 1. Tried to prompt VBScript but also reverse engineered JavaScript.
    * W3C - Rejected initial claims to enforce the JavaScript standard. They shopped it around and eventually landed on European Computer Manufacting Association (ECMA).
    * Sun still held trademark so it published with the working title of ECMAScript which was then adopted.
* Object - dyanmic collection of properties. Every property has a unique key string.
* Prototypes - JavaScript does not have classes.
* Keys must be strings. When you don't pass in a string it will automatically coherism them into strings.
* Types within JavaScript. All are objects
    * Number
    * Boolean
    * String
    * Array
    * Date
    * RegExp
    * Function
* Numbers - First class objects. This is essentially a double. From ForTran, which meant Double Precision.
    * Associative laws do not hold.
    * Decimal fractions are approximate.

```javascript
a = 0.1;
b = 0.2;
c = 0.3;

(a+b) + c !== a + (b+c)
```
    * Numbers have methods and can add additional properties to Numbers.
    * Math - Bad idea from Java, in the idea to remove it.
* NaN - Not a number. NaN === NaN (false). NaN !== NaN (true).
* String -
    UCS-2, which is not UTF-16.
    * No separate character type.
    * String are immutable.     * Strings are strictly equal.
    * Text to user - "
    * text for internal - '
    * + can concat OR add.
    * Convert a number to a String. num.toString() or String(num).
    * String to a number. Number(str) or +str.
    * parseInt - stops parsing when it hits a string. Leading zero is then converted to base 8. Unless you convert it to radix 10. parseInt(str, 10);
* Array - Array inherits from Object.
    * Indexes are converted to strings and used as names for retrieving values.
    * very efficient for sparse arrays (where most of the values are null). Not very efficient for other cases.
    * No need to set the length and type upfront.
    * Has a special length property.
    * Do not use for in loop with arrays, as this will not ensure that you proceed with the correct sequence.
    * Sort - this is done with strings which will be incorrect with values.
    * Splice - This will remove the element and splice the two halfs together. Delete will not work as expected. This is slow performance.
* Date - Based on Java's Date class.
* RegExp
* Two values that are not objects. Null and undefined.
    * Undefined is the default value for variables and parameters. The value of missing members in objects.
* typeof - This
* Falsy values
    * false
    * null
    * undefined
    * ""
    * 0
    * NaN
* Objects are passed by reference.  === see if they are the same object.
* Identifiers
    * Starts with a letter, _ or $
    * Followed by zero or more letters, digitals _ or $
    * By convention all variables, parameters, members and function names start with lower case. Except for constructor functions which start with upper case.
    * Initial _ should be reserved for implementations.
    * $ should be reserved for machines.
* Comments. Recommend all line comments have //
* Operators - Standard C libraries operators.
    * Remainder Operator - % is the remainder operator NOT the modulo operator. -1 % 8.
    * && - Guard operator, aka logical and
    * || - default operator, aka logical or
    * ! - logic not. !! produces boolean.
    * throw - can throw anything

## Function the Ultimate
* Functions are first class citizens. They inherit from Function.prototype. Allows them to be:
    * passed as an argument to a function'
    * returned from a function
    * assigned to a varaible
    * stored in an object or array
* function statement. Used in with conjunction with the function prefix.

```javascript
// function statement declaration
function foo() {}

//resolves to
var foo = undefined;
foo = function foo() {};
```
* Return statement - always returns a value. If empty ie return; then the return value is undefined. Except for constructions, whose default return value is this.
* Pseudo elements - arguments, this.
    * arguments - array like, in that it includes a length but it's not actually an array.
    * this - contains a reference to the object of invocation. allows a method to know what object it is concerned with.
* Invocation - Four forms to invoke a method.
    * Method - thisObject.methodName. this is set to thisObject, the object containing the function.
    * Function - this is set to the global object. Fixed in ES5 Strict. An inner function does not get access to the outer this.
    * Constructor - when called with the new operator, a new object is created and assigned to this. IF there is not an explicit return value, then this will be returned.
    * Apply - A function's apply or call method allows for callign the function, explicitly specifying thisObject.
* Recursion - quicksort is a good example of recursion.
* Closure - The context of an inner function includes the scope of the outer function. An inner function keeps the context even after the parent is returned. Function scopes work like block scope.
* Prototypical inheritance

```javascript
// singleton using the module pattern
var singleton = (function (){
    var privateVariable;
    function privateFunction(x){
        // privateVariable
    }
    return {
        firstMethod: function(a,b){
            // privateVariable
        },
        secondMethod: function(c){
            // privateVariable
        }
    };
}());

// same code to add this to a global object
(function (){
    var privateVariable;
    function privateFunction(x){
        // privateVariable
    }
    GLOBAL.method = {
        firstMethod: function(a,b){
            // privateVariable
        },
        secondMethod: function(c){
            // privateVariable
        }
    };
}());

// traditional prototypical inheritance
function Gizmo(id){
    this.id = id;
}

Gizmo.prototype.toString = function(){
    return "gizmo " + this.id;
}

function Hoozit(id){
    this.id = id;
}
Hoozit.prototype = new Gizmo();
Hoozit.prototype.test = function(id){
    return this.id === id;
};

// Functional inheritance
function gizmo(id) {
    return {
        toString: function () {
            return "gizmo " + this.id;
        }
    };
}

function hoozit(id){
    var that = gizmo(id);
    that.test = function (testid) {
        return testid === id;
    };
    return that;
}

// recursive factorial
function memoizer(memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if(typeof result !== 'number') {
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    }
    return recur;
};

var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n-1);
});

var fibonacci = memoizer([0, 1], function (recur, n){
    return recur(n-1) + recur(n-2);
});

// The Y Combinator
function y(le) {
    return (function (f) {
        return f(f);
    }(function (f) {
        return le(function (x) {
            return f(f)(x);
        });
    }));
}

var factorial = y(function (fac) {
    return function (n) {
        return n <= 2 ? n : n * fac(n - 1);
    };
});
```
* The Little Lisper / [The Little Schemer](http://javascript.crockford.com/little.html) - Book that goes through recursion.


## Problems
See main.js

## Monads & Gonads
* Functional Programming - originally started with FORTRAN II (1958) with functions.
* Pure Functional Programming - the same function always returns the same results. Functions as maps. Programming without side-effects. To accomplish this in JavaScript you would remove the following:
    * assignments
    * loops (use recursion instead)
    * freeze all array literals
    * object literals
    * Data and Math.random
* Memoization - allows you to store the values due to the fact that the data is immutable. Otherwise, you have to rely on caching which is challenging.
* Monads - takes a function and returns an object. 

## The metamorphosis of Ajax
