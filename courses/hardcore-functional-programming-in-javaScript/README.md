# Hardcore Functioanl Programming in JavaScript

## Overview
This is a personal workspace for the [Front-end Masters course for functional programming](https://frontendmasters.com/courses/functional-javascript/).  

## Currying
Allow the function to delay the arguments execution.

```javascript
var words = _.split(' ');
words('one two three');    
```

## Composition
Join one or more functions together. Works well with currying

```javascript
_.compose(
    _.map(_.size), _.split(' ')
);
```

## Functor
A 'sort of interface' that defines a behavior

```javascript
var ex1 = map(_.add(1))
assertDeepEqual(Identity(3), ex1(Identity(2)))
```

## Either & IO
Either - allows for either a left / right decision tree for the logic. Right continues
and left stops execution.

```javascript
var showWelcome = compose(_.add("Welcome "), _.get('name'))
var checkActive = function(user) {
    return user.active ? Right(user) : Left('Your account is not active')
}
```

IO - Monad for helping to isolate side-effects.

```javascript
var getHref = function() {
    return location.href;
}.toIO();
var getProtocal = compose(_.head, _.split('/'))
var ex5 = _.compose(map(getProtocal) ,getHref);
```

## Monad
A sequence of steps or chain of operations.

```javascript
var safeGet = _.curry(function(x, o) {
    return Maybe(o[x])
})
var user = {
    id: 2,
    name: "Albert",
    address: {
        street: {
            number: 22,
            name: 'Walnut St'
        }
    }
}
// Option with mjoin
// var ex1 = _.compose(mjoin, map(safeGet('name')), mjoin, map(safeGet('street')), safeGet('address'));
// Option with chain
var ex1 = _.compose(chain(safeGet('name')), chain(safeGet('street')), safeGet('address'))
```
