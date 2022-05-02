import React, { Component } from "react";


// Animations
import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';

// ================
// Routing
// ================
import Router from "./Router";

// ================
// Context
// ================
import Context from "../context/App";

// Animation
defineLordIconElement(loadAnimation);

class Wrapper extends Component {

    constructor(props) {
        super(props);

        // Set the state
        this.state = {

            config: this.props.config,
            routes: this.props.routes,
            currentRoute: 0,

            progressBar: false,
            progressBarWidth: 0,

        };

    }
 
    setCurrentRoute = (route) => {
        this.setState({
            currentRoute: route,
        });
    }

    updateProgressBar = (progressBar) => {
        if (progressBar > 100) {
            return;
        }
        this.setState({
            progressBarWidth: progressBar,
        });
    }

    render() {
        return <Context.Provider value={{
            
            config: this.state.config,
            
            routes: this.state.routes,
            currentRoute: this.state.currentRoute,
            setCurrentRoute: this.setCurrentRoute.bind(this),

            progressBar: this.state.progressBar,
            progressBarWidth: this.state.progressBarWidth,
            updateProgressBar: this.updateProgressBar.bind(this),


        }}>
            <Router />
        </Context.Provider>;
    }

}
Wrapper.contextType = Context;

export default Wrapper;