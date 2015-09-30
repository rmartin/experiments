/* global define */
define([
    'jquery', 'ramda', 'pointfree', 'Maybe', 'player', 'io', 'bacon', 'http'
], function($, _, P, Maybe, Player, io, bacon, http) {
    'use strict';
    io.extendFn();

    // HELPERS ///////////////////////////////////////////
    var compose = P.compose;
    var map = P.map;
    var log = function(x) {
        console.log(x);
        return x;
    }
    var fork = _.curry(function(f, future) {
        return future.fork(log, f);
    })
    var setHtml = _.curry(function(sel, x) {
        return $(sel).html(x);
    });
    var listen = _.curry(function(event, target) {
        return bacon.fromEventTarget(target, event);
    });
    var getData = _.curry(function(name, elt) {
        return $(elt).data(name);
    });
    var last = function(ar) {
        return ar[ar.length - 1];
    };

    // PURE //////////////////////////////////////////////////
    console.log('hello world');

    // IMPURE /////////////////////////////////////////////////////



});
