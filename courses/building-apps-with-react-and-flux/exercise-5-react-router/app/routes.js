'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Redirect = Router.Redirect;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/home')} />
        <Route name="authors" handler={require('./components/authors/author')} />
        <Route name="about" handler={require('./components/about/about')} />
        <NotFoundRoute handler={require('./components/404')} />
        <Redirect from="about-us" to="about" />
        <Redirect from="about/*" to="about" />
        <Redirect from="awthurs" to="authors" />
    </Route>
);

module.exports = routes;
