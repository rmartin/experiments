!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self);var o=f;o=o.folktale||(o.folktale={}),o=o.data||(o.data={}),o.Either=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module lib/either
 */
module.exports = Either

// -- Aliases ----------------------------------------------------------
var clone         = Object.create
var unimplemented = function(){ throw new Error('Not implemented.') }
var noop          = function(){ return this                         }


// -- Implementation ---------------------------------------------------

/**
 * The `Either(a, b)` structure represents the logical disjunction between `a`
 * and `b`. In other words, `Either` may contain either a value of type `a` or
 * a value of type `b`, at any given time. This particular implementation is
 * biased on the right value (`b`), thus projections will take the right value
 * over the left one.
 *
 * This class models two different cases: `Left a` and `Right b`, and can hold
 * one of the cases at any given time. The projections are, none the less,
 * biased for the `Right` case, thus a common use case for this structure is to
 * hold the results of computations that may fail, when you want to store
 * additional information on the failure (instead of throwing an exception).
 *
 * Furthermore, the values of `Either(a, b)` can be combined and manipulated by
 * using the expressive monadic operations. This allows safely sequencing
 * operations that may fail, and safely composing values that you don't know
 * whether they're present or not, failing early (returning a `Left a`) if any
 * of the operations fail.
 *
 * While this class can certainly model input validations, the [Validation][]
 * structure lends itself better to that use case, since it can naturally
 * aggregate failures â€” monads shortcut on the first failure.
 *
 * [Validation]: https://github.com/folktale/data.validation
 *
 *
 * @class
 * @summary
 * Either[Î±, Î²] <: Applicative[Î²]
 *               , Functor[Î²]
 *               , Chain[Î²]
 *               , Show
 *               , Eq
 */
function Either() { }

Left.prototype = clone(Either.prototype)
function Left(a) {
  this.val = a
}

Right.prototype = clone(Either.prototype)
function Right(a) {
  this.val = a
}

// -- Constructors -----------------------------------------------------

/**
 * Constructs a new `Either[Î±, Î²]` structure holding a `Left` value. This
 * usually represents a failure due to the right-bias of this structure.
 *
 * @summary a â†’ Either[Î±, Î²]
 */
Either.Left = function(a) {
  return new Left(a)
}
Either.prototype.Left = Either.Left

/**
 * Constructs a new `Etiher[Î±, Î²]` structure holding a `Right` value. This
 * usually represents a successful value due to the right bias of this
 * structure.
 *
 * @summary Î² â†’ Either[Î±, Î²]
 */
Either.Right = function(a) {
  return new Right(a)
}
Either.prototype.Right = Either.Right


// -- Conversions ------------------------------------------------------

/**
 * Constructs a new `Either[Î±, Î²]` structure from a nullable type.
 *
 * Takes the `Left` case if the value is `null` or `undefined`. Takes the
 * `Right` case otherwise.
 *
 * @summary Î± â†’ Either[Î±, Î±]
 */
Either.fromNullable = function(a) {
  return a != null?       this.Right(a)
  :      /* otherwise */  this.Left(a)
}
Either.prototype.fromNullable = Either.fromNullable

/**
 * Constructs a new `Either[Î±, Î²]` structure from a `Validation[Î±, Î²]` type.
 *
 * @summary Validation[Î±, Î²] â†’ Either[Î±, Î²]
 */
Either.fromValidation = function(a) {
  return a.fold(this.Left.bind(this), this.Right.bind(this))
}


// -- Predicates -------------------------------------------------------

/**
 * True if the `Either[Î±, Î²]` contains a `Left` value.
 *
 * @summary Boolean
 */
Either.prototype.isLeft = false
Left.prototype.isLeft   = true

/**
 * True if the `Either[Î±, Î²]` contains a `Right` value.
 *
 * @summary Boolean
 */
Either.prototype.isRight = false
Right.prototype.isRight  = true


// -- Applicative ------------------------------------------------------

/**
 * Creates a new `Either[Î±, Î²]` instance holding the `Right` value `b`.
 *
 * `b` can be any value, including `null`, `undefined` or another
 * `Either[Î±, Î²]` structure.
 *
 * @summary Î² â†’ Either[Î±, Î²]
 */
Either.of = function(a) {
  return this.Right(a)
}
Either.prototype.of = Either.of


/**
 * Applies the function inside the `Right` case of the `Either[Î±, Î²]` structure
 * to another applicative type.
 *
 * The `Either[Î±, Î²]` should contain a function value, otherwise a `TypeError`
 * is thrown.
 *
 * @method
 * @summary (@Either[Î±, Î² â†’ Î³], f:Applicative[_]) => f[Î²] â†’ f[Î³]
 */
Either.prototype.ap = unimplemented

Left.prototype.ap = function(b) {
  return b
}

Right.prototype.ap = function(b) {
  return b.map(this.val)
}


// -- Functor ----------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[Î±, Î²]` structure using a regular
 * unary function.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => (Î² â†’ Î³) â†’ Either[Î±, Î³]
 */
Either.prototype.map = unimplemented
Left.prototype.map   = noop

Right.prototype.map = function(f) {
  return this.of(f(this.val))
}


// -- Chain ------------------------------------------------------------

/**
 * Transforms the `Right` value of the `Either[Î±, Î²]` structure using an unary
 * function to monads.
 *
 * @method
 * @summary (@Either[Î±, Î²], m:Monad[_]) => (Î² â†’ m[Î³]) â†’ m[Î³]
 */
Either.prototype.chain = unimplemented
Left.prototype.chain   = noop

Right.prototype.chain = function(f) {
  return f(this.val)
}


// -- Show -------------------------------------------------------------

/**
 * Returns a textual representation of the `Either[Î±, Î²]` structure.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => Void â†’ String
 */
Either.prototype.toString = unimplemented

Left.prototype.toString = function() {
  return 'Either.Left(' + this.val + ')'
}

Right.prototype.toString = function() {
  return 'Either.Right(' + this.val + ')'
}


// -- Eq ---------------------------------------------------------------

/**
 * Tests if an `Either[Î±, Î²]` structure is equal to another `Either[Î±, Î²]`
 * structure.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => Either[Î±, Î²] â†’ Boolean
 */
Either.prototype.isEqual = unimplemented

Left.prototype.isEqual = function(a) {
  return a.isLeft && (a.val === this.val)
}

Right.prototype.isEqual = function(a) {
  return a.isRight && (a.val === this.val)
}


// -- Extracting and recovering ----------------------------------------

/**
 * Extracts the `Right` value out of the `Either[Î±, Î²]` structure, if it
 * exists. Otherwise throws a `TypeError`.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => Void â†’ Î²         :: partial, throws
 * @see {@link module:lib/either~Either#getOrElse} â€” A getter that can handle failures.
 * @see {@link module:lib/either~Either#merge} â€” The convergence of both values.
 * @throws {TypeError} if the structure has no `Right` value.
 */
Either.prototype.get = unimplemented

Left.prototype.get = function() {
  throw new TypeError("Can't extract the value of a Left(a).")
}

Right.prototype.get = function() {
  return this.val
}


/**
 * Extracts the `Right` value out of the `Either[Î±, Î²]` structure. If the
 * structure doesn't have a `Right` value, returns the given default.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => Î² â†’ Î²
 */
Either.prototype.getOrElse = unimplemented

Left.prototype.getOrElse = function(a) {
  return a
}

Right.prototype.getOrElse = function(_) {
  return this.val
}


/**
 * Transforms a `Left` value into a new `Either[Î±, Î²]` structure. Does nothing
 * if the structure contain a `Right` value.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => (Î± â†’ Either[Î³, Î²]) â†’ Either[Î³, Î²]
 */
Either.prototype.orElse = unimplemented
Right.prototype.orElse  = noop

Left.prototype.orElse = function(f) {
  return f(this.val)
}


/**
 * Returns the value of whichever side of the disjunction that is present.
 *
 * @summary (@Either[Î±, Î±]) => Void â†’ Î±
 */
Either.prototype.merge = function() {
  return this.val
}


// -- Folds and Extended Transformations -------------------------------

/**
 * Applies a function to each case in this data structure.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => (Î± â†’ Î³), (Î² â†’ Î³) â†’ Î³
 */
Either.prototype.fold = unimplemented

Left.prototype.fold = function(f, _) {
  return f(this.val)
}

Right.prototype.fold = function(_, g) {
  return g(this.val)
}


/**
 * Swaps the disjunction values.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => Void â†’ Either[Î², Î±]
 */
Either.prototype.swap = unimplemented

Left.prototype.swap = function() {
  return this.Right(this.val)
}

Right.prototype.swap = function() {
  return this.Left(this.val)
}


/**
 * Maps both sides of the disjunction.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => (Î± â†’ Î³), (Î² â†’ Î´) â†’ Either[Î³, Î´]
 */
Either.prototype.bimap = unimplemented

Left.prototype.bimap = function(f, _) {
  return this.Left(f(this.val))
}

Right.prototype.bimap = function(_, g) {
  return this.Right(g(this.val))
}


/**
 * Maps the left side of the disjunction.
 *
 * @method
 * @summary (@Either[Î±, Î²]) => (Î± â†’ Î³) â†’ Either[Î³, Î²]
 */
Either.prototype.leftMap = unimplemented
Right.prototype.leftMap  = noop

Left.prototype.leftMap = function(f) {
  return this.Left(f(this.val))
}
},{}],2:[function(_dereq_,module,exports){
// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = _dereq_('./either')
},{"./either":1}]},{},[2])
(2)
});
