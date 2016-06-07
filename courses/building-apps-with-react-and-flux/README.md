## Introduction

### Ideas from React
* HTML should be a projection of app state, not a source of truth.
* JavaScript and HTML belong in the same file.
* Unidirectional flow. No two-way binding.
* Inline styles can be good.

### Why React
* Fast
* Composable
* Pluggable
* Isomorphic Friendly
* Simple
* Battle Proven

### JSX
* 'HTML' in JavaScript
* Differences: className, htmlFOr
* Compiles to JavaScript
* Optional

```javascript
// JSX
return (
    <table className="table"<
        <thead>
            <th>ID</th>
            <th>Name</th>
        </thead>
        <tbody>
            {this.props.authors.map(createAuthorRow)}
        </tbody>
    </table>
);

// manually create JS
return (
    React.createElement('table', {className: 'table'})
)
```

## React Component Lifecycle

### Overview
* Props - Pass data to child components
* State - Data in controller view
* Lifecycle - Handle bootstrapping and third party integrations

### Methods
* componentWillMount
* componentDidMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount

#### componentWillMount
* When - Before initial render, both client and server.
* Why - Good spot to set initial state.

#### componentDidMount
* When - After render.
* Why - Access DOM, integrate with frameworks, set set timers, AJAX requests.

#### componentWillReceiveProps
* When - When receiving new props. Not called on initial render.
* Why - Set state before a render.

#### shouldComponentUpdate
* When - Before render when new props or state are being received. Not called on initial render.
* Why - Performance, Return false to avoid unnecessary re-renders.

#### componentWillUpdate
* When - Immediately before rendering when new props or state are being received. Not called on initial render.
* Why - Prepare for an update.

#### componentDidUpdate
* When - After component's update are flushed to the DOM. Not called for the initial render.
* Why - Work with the DOM after an update.

#### componentWillUnmount
* When - Immediately before component is removed from the DOM.
* Why - Clean-up.

### Keys for Dynamic Children
Add a key to dynamic Children elements

```html
<tr key={author.id}></tr>
```

## Composition

#### Controllers
* Top level component
* set props on children
* interacts with stores
* Not recommended to nest

#### Prop Validation
Only shown as a development tool.

* optionalArray: React.PropTypes.array,
* optionalBoolean:  React.PropTypes.bool,
* optionalFunc:  React.PropTypes.func,
* optionalNumber:  React.PropTypes.number,
* optionalObject:  React.PropTypes.object,
* optionalString:  React.PropTypes.string


```javascript
propTypes: {
    author:     React.PropTypes.object.isRequired,
    onSave:     React.PropTypes.func.isRequired,
    validate:   React.PropTypes.func.isRequired,
    errors:     React.PropTypes.object,
    hasErrors:  React.PropTypes.func.isRequired
}
```

## React Router

### Overview
* Name is implicitly used for the router, can be overwritten with route param
* Use link to direct to a route

### Router
```javascript
<Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/home')} />
    <Route name="authors" handler={require('./components/authors/author')} />
    <Route name="about" handler={require('./components/about/about')} />
</Route>
```

### Params and Querystrings
```javascript
// Given a route like this:
<route path="/course/:courseId" handler={Course} />

// and a URL like this:
'course/clean-code?module=3'

// the component props will be populated
var Course = React.createClass({
    render: function(){
        this.props.params.courseId; //clean-code
        this.props.query.module; // 3
        this.props.path; // /course/clean-code/?module=3
    }
})

```

### Link
```javascript
// URL: /user/1

// Route:
<route name="user" path="/user/:userId" />

// JSX:
<Link to="user" params={{userId: 1}}>Bobby Tables</Link>
// Generates
// <a href="/user/1">Bobby Tables</a>
```

### Redirects
```javascript
// Alias Redirect
var Redirect = Router.Redirect;

// Create new route
<Redirect from="old-path" to="name-of-new-path" />

// Redirect about-us -> about
<Redirect from="about-us" to="about" />

// Redirect allow subfolders of about/* to about
<Redirect from="about/*" to="about" />

// Redirect common spelling mistakes
<Redirect from="awthurs" to="authors" />
```

### Transitions
* willTransitionTo - Determine if page should be transitioned to
* willTransitionFrom - Run checks before user navigates away

```javascript
var Settings = React.createClass({
    statics: {
        willTransitionTo: function (transition, params, query, callback){
            if(!isLoggedIn){
                transition.abort();
                callback();
            }
        });
    },
    willTransitionFrom: function(transition, component){
        if(component.formHasUnsavedData()){
            if(!confirm('Sure you want to leave without saving?')){
                transition.abort();
            }
        }
    }
})
```

### Hash vs History
This can be changed within the router.

```javascript
// Defaults to hash state
Router.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('app'));
});

// HTML5 push state
Router.run(routes,Router.HistoryLocation, function(Handler){
    React.render(<Handler/>, document.getElementById('app'));
});
```

#### Hash location
* example.com/#courses
* Ugly URLs
* Works in all browsers
* Not compatible with server-rendering

#### History location
* example.com/courses
* Clean URLs
* IE10+
* Compatible with server rendering

### Mixins
* Cross-cutting concerns
* Shared code between multiple components

```javascript
var ManageAuthorPage = React.createClass({
    mixins : [
        Router.Navigation,
        Router.State
    ]
});
```

#### Navigation Mixin
```javascript
// Go to new route
this.transitionTo('contact');

// Replace current route
this.replaceWith('contact');

// Go Back
this.goBack;

// Create a url to a route
makePath(routeName, params, query);
```

## Flux
* Pattern
* Centralized dispatcher
* Unidirectional data flows
 * Two-way Binding: viewmodel <--> View
 * Unidirectional React: Action (ex: delete user) -> Dispatcher (ex: notify everyone who cares) -> Store (hold app state) -> React View (repeat)
* Deals with actions and data changes
* Facebook Flux Pattern
* This is not an MVC Pattern


### Actions
* Encapsulates events
* Triggered by user interactions and server
* Passed to Dispatcher
* Payload has type and data
```javascript
{
    type: USER_SAVED,
    data:{
        firstName: 'Cory',
        lastName: 'House'
    }
}
```

### Dispatcher
* Central Hub - There's only one per app
* Holds list of callbacks
* Broadcasts payload to registered callbacks
* Constants
 * Keeps things organized
 * Provides high level view of what the app actually does

### Store
* Holds app state, logic, data retrieval
* Not a model - contains models
* One, or many
* Registers callback with Dispatcher
* Users Node's EventEmitter
* Structure - Every store has these common traits (aka interface)
 * Extend EventEmitter
 * addChangeListener and removeChangeListenser
 * emitChange
* As an application grows, the dispatcher becomes more vital, as it can be used to manage dependencies between the stores by invoking the registered callbacks in a specific order. Stores can declaratively wait for other stores to finish updating, and then update themselves accordingly.  
