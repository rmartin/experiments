'use strict';
var total = 0;
var sum = function(numbers){
    numbers.forEach(function(number) {
        total += number;
    });
    return total;
};

var summaryOne = sum([1, 2, 3]);
var summaryTwo = sum([1, 2, 3]);

console.log(summaryOne);
console.log(summaryTwo);
