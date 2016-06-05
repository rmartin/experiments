'use strict';

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorAPI = require('../../api/api');
var toastr = require('toastr');

var author = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function() {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            errors: {}
        };
    },

    componentWillMount: function () {
        var authorId = this.props.params.id;

        console.log(authorId);

        if(authorId){
            this.setState({author: AuthorAPI.getAuthorById(authorId)});
        }
    },

    statics: {
        willTransitionFrom: function (transition, compent) {
            if(compent.state.dirty && !confirm('Leave without saving?')){
                transition.abort();
            }
        }
    },

    setAuthorState: function(e) {
        var field = event.target.name,
            value = event.target.value;

        this.setState({dirty: true});
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    },

    saveAuthor: function(e) {
        e.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }
        AuthorAPI.saveAuthor(this.state.author);
        this.setState({dirty: false});
        toastr.success('Author saved');
        this.transitionTo('authors');
    },

    render: function() {
        return (<AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor} errors={this.state.errors}/>);
    }

});

module.exports = author;
