var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;

var helpers = require('./helpers');

// Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://react-for-beginners1.firebaseio.com/');

// two-way binding
var Catalyst = require('react-catalyst');

/*
    App
*/
var App = React.createClass({
    mixins: [Catalyst.LinkedStateMixin],
    getInitialState: function() {
        return {fishes: {}, order: {}}
    },
    componentDidMount: function() {

        // Save fish state to Firebase
        base.syncState(this.props.params.storeId + '/fishes', {
            context: this,
            state: 'fishes'
        });

        // load localStorage data into state
        var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)});
        }
    },
    componentWillUpdate: function(nextState, nextProps) {
        localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextProps.order));
    },
    addFish: function(fish) {
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.fishes['fishes-' + timestamp] = fish;
        // set state
        this.setState({fishes: this.state.fishes});
    },
    removeFish: function(key) {
        if (confirm('Are you sure you want to remove this fish?')) {
            this.state.fishes[key] = null;
            this.setState({fishes: this.state.fishes});
        }
    },
    addToOrder: function(index) {
        this.state.order[index] = this.state.order[index] + 1 || 1;
        this.setState({order: this.state.order});
    },
    removeOrder: function(key) {
        if (confirm('Are you sure you want to remove this order?')) {
            delete this.state.order[key];
            this.setState({order: this.state.order});
        }
    },
    loadSample: function() {
        this.setState({fishes: require('./sample-fishes')});
    },
    renderFish: function(key) {
        return (<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
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
                <Order order={this.state.order} fishes={this.state.fishes} removeOrder={this.removeOrder}/>
                <Inventory addFish={this.addFish} removeFish={this.removeFish} loadSample={this.loadSample} fishes={this.state.fishes} linkState={this.linkState}/>
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
    renderItem: function(key) {
        var fish = this.props.fishes[key];
        var count = this.props.order[key];

        if (!fish) {
            return (
                <li key={key}>Sorry, fish no longer available.</li>
            );
        }

        return (
            <li className="item" key={key}>
                {count}lbs {fish.name}
                <button onClick={this.props.removeOrder.bind(null, key)}>&times;</button>
                <span className="price">{helpers.formatPrice(fish.price * count)}</span>
            </li>
        );
    },
    render: function() {
        var orderIds = Object.keys(this.props.order);
        var total = orderIds.reduce((previousTotal, key) => {
            var fish = this.props.fishes[key];
            var count = this.props.order[key];
            var isAvailable = fish && fish.status === 'available';

            if (fish && isAvailable) {
                return previousTotal + (count * parseInt(fish.price) || 0);
            }

            return previousTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2 className="order-title">Your Order</h2>
                <ul className="order">
                    {orderIds.map(this.renderItem)}

                    <li className="total">
                        <strong>Total:</strong>
                        {helpers.formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
})

/*
    Inventory Component
*/
var Inventory = React.createClass({
    renderInventory: function(key) {
        var linkState = this.props.linkState;
        return (
            <div className="fish-edit" key={key}>
                <input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
                <input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
                <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
            </div>
        )
    },
    render: function() {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
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
    addToOrder: function() {
        this.props.addToOrder(this.props.index);
    },
    render: function() {
        var details = this.props.details;
        var isAvailable = (details.status === 'available'
            ? true
            : false);
        var ctaText = (isAvailable
            ? 'Add to Order'
            : 'Sold Out');
        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name}/>
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{helpers.formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button disabled={!isAvailable} onClick={this.addToOrder}>{ctaText}</button>
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
                <select valueLink={linkState('fishes.' + key + '.status')}>
                    <option value="unavailable">Sold Out!</option>
                    <option value="available">Fresh!</option>
                </select>

                <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
                <input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
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
