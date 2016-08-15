var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;

var helpers = require('./helpers');

/*
    App
*/
var App = React.createClass({
    getInitialState: function() {
        return {fishes: {}, order: {}}
    },
    addFish: function(fish) {
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.fishes['fishes-' + timestamp] = fish;
        // set state
        this.setState({fishes: this.state.fishes});
    },
    loadSample: function() {
        this.setState({
            fishes : require('./sample-fishes')
        });
    },
    renderFish: function(key){
        return (
            <Fish key={key} index={key} details={this.state.fishes[key]} />
        )
    },
    render: function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSample={this.loadSample}/>
            </div>
        )
    }
});

/*
AddFishForm
*/
var AddFishForm = React.createClass({
    createFish: function(e) {
        // stop prop
        e.preventDefault();
        // get values
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value
        }

        // add fish to state
        this.props.addFish(fish);

        // reset the form
        this.refs.fishForm.reset();
    },
    render: function() {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name"/>
                <input type="text" ref="price" placeholder="Fish Price"/>
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="image" placeholder="URL to Image"/>
                <button type="submit">+ Add Item
                </button>
            </form>
        )
    }
})

/*
    Header Component
*/
var Header = React.createClass({
    render: function() {
        return (
            <header className="top">
                <h1>Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    day</h1>
                <h3 className="tagline">
                    <span>{this.props.tagline}</span>
                </h3>
            </header>
        )
    }
})

/*
    Order Component
*/
var Order = React.createClass({
    render: function() {
        return (
            <p>Order</p>
        )
    }
})

/*
    Inventory Component
*/
var Inventory = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm {...this.props}/>
                <button onClick={this.props.loadSample}>Load Sample Fishes</button>
            </div>
        )

    }
})

/*
    Fish Component
*/
var Fish = React.createClass({
    render: function() {
        var details = this.props.details;
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{helpers.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
            </li>
        )
    }
})

/*
    StorePicker Component
*/
var StorePicker = React.createClass({
    mixins: [History],
    goToStore: function(e) {
        e.preventDefault();
        // get the data from the input
        var storeId = this.refs.storeId.value;
        // transition from StorePicker to App
        this.history.pushState(null, '/store/' + storeId);
    },
    render: function() {
        var name = 'Roy';
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please enter a Store {name}</h2>
                <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
                <input type="Submit" defaultValue="Submit"/>
            </form>
        )
    }
});

/*
    NotFound Component
*/
var NotFound = React.createClass({
    render: function() {
        return (
            <h1>Not Found!</h1>
        )
    }
});

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/>
    </Router>
);

ReactDOM.render(routes, document.getElementById('main'));
