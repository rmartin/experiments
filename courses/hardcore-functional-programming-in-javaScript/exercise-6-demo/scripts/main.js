/* global document */

require.config({
    baseUrl: './scripts',
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'ramda': '../../common/scripts/ramda.min',
        'pointfree': '../../common/scripts/pointfree.amd',
        'future': '../../common/scripts/data.future.umd',
        'bacon': '../../common/scripts/Bacon.min',
        'socketio': '/socket.io/socket.io',
        'Maybe': '../../common/scripts/maybe.amd',
        'io' : '../../common/scripts/io.amd'
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
