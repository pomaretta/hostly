import { RegistryCollection } from "./collection/registry";
import Random from "./Random";

class APIClient {

    constructor({
        config,
        app
    }) {
        this.config = config;
        this.app = app;
        this.env = config.environment;
    }

    async getRegistryCollection() {

        // In case of DEV generate random data
        if (this.env === "DEV") {
            return new RegistryCollection({
                objects: Random.getRegistryObjects(3)
            });
        }

        const api = await this.waitForApi();

        let response = await api.registry_servers();        
        if (!response) {
            return new RegistryCollection([]);
        }
        return RegistryCollection.parse(response);
    }

    async getRegistryServerData({ id }) {

        if (this.env === "DEV") {
            return Random.getRegistryObjects(3).find(object => {
                if (object.id === id) {
                    return object;
                }
            });
        }

        const api = await this.waitForApi();
        const response = await api.registry_server(id);
        if (!response) {
            return null;
        }

        return response;
    }

    async serverRunOperation({ id }) {

        if (this.env === "DEV") {
            console.log("Running server", id);
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_run(id);
        if (!response) {
            return false;
        }

        return response;
    }

    async serverStopOperation({ id }) {

        if (this.env === "DEV") {
            console.log("Stopping server", id);
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_stop(id);
        if (!response) {
            return false;
        }

        return response;
    }

    async getServerOutput({ id }) {

        if (this.env === "DEV") {
            console.log("Getting server output", id);
            return [
                "Server started",
                "Server stopped",
                "Server started",
                "Server stopped",
                "Server started",
                "Server stopped",
                "Server started",
                "Server stopped",
                "Server started",
                "Server stopped",
            ];
        }

        const api = await this.waitForApi();
        const response = await api.server_output(id);
        if (!response) {
            return [];
        }

        return response;
    }

    async putServerCommand({ id, command }) {

        if (this.env === "DEV") {
            console.log("Sending command", command, "to server", id);
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_send(id, command);
        if (!response) {
            return false;
        }

        return response;
    }

    async waitForApi() {
        return new Promise((resolve, reject) => {
            // If there's already an API, resolve immediately
            if (window && window.pywebview && window.pywebview.api) {
                resolve(window.pywebview.api);
            }
            // Otherwise, wait for it to be ready waiting 500ms intervals
            let interval = setInterval(() => {
                if (window && window.pywebview && window.pywebview.api) {
                    clearInterval(interval);
                    resolve(window.pywebview.api);
                }
            }, 500);
            // If the interval times out, reject after 3 seconds
            setTimeout(() => {
                clearInterval(interval);
                reject();
            }, 3000);
        });
    }

}


export default APIClient;