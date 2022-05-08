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
            return Random.getRegistryObjects(3).find(o => o.id === id);
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

    async getServerExport({ id }) {

        if (this.env === "DEV") {
            console.log("Getting server export", id);
            return {
                "version": "1.0.0",
                "schema": "sftp",
                "creation": "2020-01-01T00:00:00.000Z",
                "object": {
                    "creation": "2019-01-01T00:00:00.000Z",
                    "extra": {
                        "schema": {
                            "schema": "sftp",
                            "hostname": "ftp.example.com",
                            "port": 22
                        },
                        "properties": {
                            "enable-jmx-monitoring": "false",
                            "rcon-d-port": 25575,
                            "gamemode": "survival",
                            "enable-command-block": "false",
                            "enable-query": "false",
                            "level-name": "world",
                            "level-seed": "",
                            "motd": "ENOBYQQDXU",
                            "query-d-port": 25565,
                            "pvp": "true",
                            "difficulty": "easy",
                            "network-compression-threshold": 256,
                            "require-resource-pack": "false",
                            "max-tick-time": 60000,
                            "use-native-transport": "true",
                            "max-players": 20,
                            "online-mode": "true",
                            "enable-status": "true",
                            "allow-flight": "false",
                            "broadcast-rcon-to-ops": "true",
                            "view-distance": 10,
                            "server-ip": "",
                            "resource-pack-prompt": "",
                            "allow-nether": "true",
                            "server-port": 25565,
                            "enable-rcon": "false",
                            "sync-chunk-writes": "true",
                            "op-permission-level": 4,
                            "prevent-proxy-connections": "false",
                            "hide-online-players": "false",
                            "resource-pack": "",
                            "entity-broadcast-range-percentage": 100,
                            "simulation-distance": 10,
                            "rcon-d-password": "",
                            "player-idle-timeout": 0,
                            "force-gamemode": "false",
                            "rate-limit": 0,
                            "hardcore": "false",
                            "white-list": "false",
                            "broadcast-console-to-ops": "true",
                            "spawn-npcs": "true",
                            "spawn-animals": "true",
                            "function-permission-level": 2,
                            "text-filtering-config": "",
                            "spawn-monsters": "true",
                            "enforce-whitelist": "false",
                            "resource-pack-sha1": "",
                            "spawn-protection": 16,
                            "max-world-size": 29999984
                        }
                    },
                    "id": "7b0306d0-4107-4a0a-89e6-57391e5d494f",
                    "ip": "127.0.0.1",
                    "lastmodified": "2019-01-01T00:00:00.000Z",
                    "path": "/",
                    "provider": "vanilla",
                    "running": false,
                    "schema": "sftp",
                    "update": "2019-01-01T00:00:00.000Z",
                    "version": "1.18"
                }
            };
        }

        const api = await this.waitForApi();
        const response = await api.server_export(id);
        if (!response) {
            return null;
        }

        return response;
    }

    async putServerImport() {

        if (this.env === "DEV") {
            console.log("Importing server");
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_import();
        if (!response) {
            return false;
        }

        return response;
    }

    async serverUpdate({ id}) {

        if (this.env === "DEV") {
            console.log("Updating server", id);
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_update(id);
        
        if (!response) {
            return false;
        }

        return response;
    }

    async serverRemove({ id}) {

        if (this.env === "DEV") {
            console.log("Removing server", id);
            return true;
        }

        const api = await this.waitForApi();
        const response = await api.server_remove(id);
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