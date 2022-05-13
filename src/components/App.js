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

            modalShow: false,
            modalPressed: null,
            modalData: null,

            error: null,

            progressBarWidth: 0,

            registryServers: null,
            registryServer: null,

            availableVersions: null,

            credentials: null,
            credentialsExists: false,

            setup: false,
            hasJre: false,
            appLoading: true,
        };

    }
 
    setCurrentRoute = (route) => {
        this.setState({
            currentRoute: route,
        });
    }

    updateProgressBar(progressBar) {
        if (progressBar > 100 || progressBar < 0) {
            return;
        }
        this.setState({
            progressBarWidth: progressBar,
        });
    }

    changeModalState({ show, pressed }) {
        this.setState({
            modalShow: show,
            modalPressed: pressed
        })
    }

    createModal({ data }) {
        let promise = new Promise((resolve, reject) => {
            // Wait for modal to close
            let interval = setInterval(() => {
                if (!this.state.modalPressed) {
                    return;
                }
                if (this.state.modalPressed.status === 'completed') {
                    clearInterval(interval);
                    resolve(this.state.modalPressed);
                } else {
                    clearInterval(interval);
                    reject(new Error('Modal is not completed'));
                }
            }, 500);
        });
        data['callback'] = promise;
        this.setState({
            modalShow: true,
            modalData: data
        })
        return promise;
    }

    closeModal() {
        this.setState({
            modalShow: false,
            modalData: null,
            modalPressed: null
        })
    }

    sendError(error) {
        this.setState({
            error: error
        });
    }

    resetError() {
        this.setState({
            error: null,
        });
    }

    async getLocalPath(directory) {
        return this.api.getLocalPath(directory);
    }

    async getRegistryServers() {
        const registryServers = await this.api.getRegistryCollection();
        this.setState({
            registryServers: registryServers,
        });
    }

    async getRegistryServer(id) {
        const registryServer = await this.api.getRegistryServerData({ id: id });
        this.setState({
            registryServer: registryServer,
        });
    }

    async updateRegistryServer(id) {

        let success = false;
        this.api.updateRegistryServer({
            id: id,
        }).then(r => {
            success = true;
        }).catch(e => {
            success = false;
            this.context.sendError(e.message);
        })

        if (!success) return;
        
        const registryServer = await this.api.getRegistryServerData({ id: id });
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

    async serverExport(id) {
        return this.api.getServerExport({
            id: id,
        })
    }

    async serverImport() {
        return this.api.putServerImport()
    }

    async serverUpdate(id) {
        return this.api.serverUpdate({
            id: id,
        });
    }

    async serverRemove(id) {
        return this.api.serverRemove({
            id: id,
        });
    }

    async serverCreate(
        provider,
        version,
        extra
    ) {
        return this.api.serverCreate({
            provider: provider,
            version: version,
            extra: extra,
        });
    }

    async getAvailableVersions() {
        const versions = await this.api.availableVersions();
        this.setState({
            availableVersions: versions,
        });
    }

    async getCredentials() {

        const exists = await this.api.credentialsExists();
        if (!exists) {
            this.setState({
                credentialsExists: false,
                credentials: null,
            });
            return;
        }

        const credentials = await this.api.credentialsData();
        if (!credentials) {
            this.setState({
                credentialsExists: false,
                credentials: null,
            });
            return;
        }

        this.setState({
            credentialsExists: true,
            credentials: credentials,
        });
    }

    async setCredentials(provider, data) {
        return this.api.credentialsCreateUpdate({
            provider: provider,
            data: data,
        });
    }

    async testCredentials(provider, data) {
        return this.api.credentialsTest({
            provider: provider,
            data: data,
        });
    }

    async needsSetup() {
        let res = await this.api.needsSetup();
        this.setState({
            setup: res,
        });
    }
    
    async getHasJre() {
        let res = await this.api.hasJre();
        this.setState({
            hasJre: res,
        });
    }
    
    async initializeSetup() {
        return this.api.initializeSetup();
    }

    async updateIp() {
        return this.api.updateIp();
    }

    setAppLoading(loading) {
        this.setState({
            appLoading: loading,
        });
    }

    render() {
        return <Context.Provider value={{
            
            config: this.state.config,
            
            routes: this.state.routes,
            currentRoute: this.state.currentRoute,
            setCurrentRoute: this.setCurrentRoute.bind(this),

            show: this.state.modalShow,
            pressed: this.state.modalPressed,
            data: this.state.modalData,
            changeState: this.changeModalState.bind(this),
            createModal: this.createModal.bind(this),
            closeModal: this.closeModal.bind(this),

            getLocalPath: this.getLocalPath.bind(this),

            error: this.state.error,
            sendError: this.sendError.bind(this),
            resetError: this.resetError.bind(this),

            progressBarWidth: this.state.progressBarWidth,
            updateProgressBar: this.updateProgressBar.bind(this),

            registryServers: this.state.registryServers,
            getRegistryServers: this.getRegistryServers.bind(this),

            registryServer: this.state.registryServer,
            getRegistryServer: this.getRegistryServer.bind(this),

            updateRegistryServer: this.updateRegistryServer.bind(this),

            serverRun: this.serverRun.bind(this),
            serverStop: this.serverStop.bind(this),
            serverOutput: this.serverOutput.bind(this),
            serverCommand: this.serverCommand.bind(this),
            serverExport: this.serverExport.bind(this),
            serverImport: this.serverImport.bind(this),
            serverUpdate: this.serverUpdate.bind(this),
            serverRemove: this.serverRemove.bind(this),
            serverCreate: this.serverCreate.bind(this),

            availableVersions: this.state.availableVersions,
            getAvailableVersions: this.getAvailableVersions.bind(this),

            credentials: this.state.credentials,
            credentialsExists: this.state.credentialsExists,
            getCredentials: this.getCredentials.bind(this),
            setCredentials: this.setCredentials.bind(this),
            testCredentials: this.testCredentials.bind(this),

            updateIp: this.updateIp.bind(this),

            setup: this.state.setup,
            appLoading: this.state.appLoading,
            needsSetup: this.needsSetup.bind(this),
            initializeSetup: this.initializeSetup.bind(this),
            setAppLoading: this.setAppLoading.bind(this),
            hasJre: this.state.hasJre,
            getHasJre: this.getHasJre.bind(this),
        }}>
            <Router />
        </Context.Provider>;
    }

}
Wrapper.contextType = Context;

export default Wrapper;