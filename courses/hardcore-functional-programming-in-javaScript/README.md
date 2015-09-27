Category Theory
compose :: (b-> c) -> (a -> b) -> (a -> c)
id :: a -> a

Category Laws
// left identity
compose (id, f) == f

// right identity
compose(f, id) == f

// associativity
compose(compose(f,g), h) == compose (f, compose(g,h))

Functor - an object or data structure you can map over.

Maybe Functor
capture a null value to determine if its defined.

var _Maybe.prototype.map = function(f){
    return this.val ? Maybe(f(this.val)) : Maybe(null);
}

Ex:
var firstMatch = compose(map(first), Maybe, match(/cat/g));
firstMatch('dogsup');
