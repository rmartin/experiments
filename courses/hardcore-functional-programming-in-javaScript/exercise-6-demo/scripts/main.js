/* global document */

require.config({
    baseUrl: './scripts',
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'ramda': 'vendor/ramda',
        'pointfree': '../bower_components/pointfree/dist/pointfree.amd',
        'future': 'vendor/data.future.umd',
        'bacon': '../bower_components/bacon/dist/Bacon.min',
        'socketio': '/socket.io/socket.io',
        'Maybe': 'vendor/maybe',
        'io' : 'vendor/io'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        socketio: {
            exports: 'io'
        },
        lodash: {
            exports: '_'
        },
        ramda: {
            exports: 'ramda'
        }
    }
});
require(
    ['jquery', 'app'],
    function($, app) {
        'use strict';

        $(app);
    }
);
