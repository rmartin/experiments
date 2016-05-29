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
