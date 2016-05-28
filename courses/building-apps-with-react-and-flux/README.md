## Introduction

Ideas from React
* HTML should be a projection of app state, not a source of truth.
* JavaScript and HTML belong in the same file.
* Unidirectional flow. No two-way binding.
* Inline styles can be good.

Why React
* Fast
* Composable
* Pluggable
* Isomorphic Friendly
* Simple
* Battle Proven

JSX
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
