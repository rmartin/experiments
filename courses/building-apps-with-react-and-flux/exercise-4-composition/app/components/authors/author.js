'use strict';

var React = require('react');
var authorAPI = require('../../api/api');
var AuthorList = require('./authorList');

var Authors = React.createClass({
    getInitialState: function() {
        return {authors: []};
    },
    componentDidMount: function() {
        if (this.isMounted()) {
            this.setState({authors: authorAPI.getAllAuthors()});
        }
    },
    render: function() {
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors={this.state.authors}/>
            </div>
        );
    }
});
module.exports = Authors;
