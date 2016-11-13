import React from 'react';
import {render} from 'react-dom';
import Header from './Header';
import Order from './Order';
import Fish from './Fish';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        // getinitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }
    addFish(fish) {
        // update our state
        const fishes = {
            ...this.state.fishes
        };
        const timestamp = Date.now();
        // add in new fish
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({fishes});
    }

    loadSamples() {
        this.setState({fishes: sampleFishes})
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                <Order/>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
            </div>
        )
    }
}

export default App;
