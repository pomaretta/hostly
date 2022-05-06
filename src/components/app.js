import React, { Component } from "react";


// Animations
import { loadAnimation } from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';

// ================
// Routing
// ================
import Router from "./Router";
import APIClient from "../api/Client";

// ================
// Context
// ================
import Context from "../context/App";
import { RegistryCollection } from "../api/collection/registry";

// Animation
defineLordIconElement(loadAnimation);

class Wrapper extends Component {

    constructor(props) {
        super(props);

        // API
        this.api = new APIClient({
            config: this.props.config,
            app: this
        });

        // Set the state
        this.state = {

            config: this.props.config,
            routes: this.props.routes,
            currentRoute: 0,

            progressBar: false,
            progressBarWidth: 0,

            registryServers: null,
            registryServer: null,

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

    async getRegistryServers() {
        const registryServers = await this.api.getRegistryCollection();
        this.setState({
            registryServers: registryServers,
        });
    }

    async getRegistryServer(id) {

        console.log("Getting registry server", id);

        const registryServer = await this.api.getRegistryServerData({ id: id });

        console.log("Got registry server", registryServer);

        this.setState({
            registryServer: registryServer,
        });
    }

    async serverRun(id) {
        return this.api.serverRunOperation({
            id: id,
        });
    }

    async serverStop(id) {
        return this.api.serverStopOperation({
            id: id,
        });
    }

    async serverOutput(id) {
        return this.api.getServerOutput({
            id: id,
        });
    }

    async serverCommand(id, command) {
        return this.api.putServerCommand({
            id: id,
            command: command
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

            registryServers: this.state.registryServers,
            getRegistryServers: this.getRegistryServers.bind(this),

            registryServer: this.state.registryServer,
            getRegistryServer: this.getRegistryServer.bind(this),

            serverRun: this.serverRun.bind(this),
            serverStop: this.serverStop.bind(this),
            serverOutput: this.serverOutput.bind(this),
            serverCommand: this.serverCommand.bind(this),

        }}>
            <Router />
        </Context.Provider>;
    }

}
Wrapper.contextType = Context;

export default Wrapper;