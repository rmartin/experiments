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

    // getDom :: String -> IO DOM
    var getDom = $.toIO();

    // keypressStream :: Dom -> EventStream DomEvent
    var keypressStream = listen('keyup');

    // eventValue :: DomEvent -> String
    var eventValue = compose(_.get('value'), _.get('target'));

    // valueStream :: Dom -> EventStream String
    var valueStream = compose(map(eventValue), keypressStream);

    // termURL :: String -> URL
    var termUrl = function(term){
        return "https://www.googleapis.com/youtube/v3/videos?&part=snippet&maxResults=25" +
        $.param({q: term, alt: 'json'})
    };

    // urlStream :: Dom > EventStream URL
    var urlStream = compose(map(termUrl), valueStream);

    // IMPURE /////////////////////////////////////////////////////
    getDom('#search').map(urlStream).runIO().onValue(log);

});
