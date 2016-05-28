'use strict';
var React = require('react');

var Header = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div classname="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="https://www.pluralsight.com/content/dam/pluralsight/images/logo/PluralSight_WhiteIcon_Mobile.svg" />
                    </a>
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/#about">About</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;
