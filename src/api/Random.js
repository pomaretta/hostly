import { RegistryObject } from "./domain/registry";

class Random {

    static getRegistryObject() {

        // New hash
        let uuid = crypto.randomUUID();

        // Running random number
        let running = false;
        if (Math.random() > 0.5) {
            running = true;
        }

        let typeOf = "vanilla";
        if (Math.random() > 0.5) {
            typeOf = "forge";
        }

        // Random name
        let name = "";
        for (let i = 0; i < 10; i++) {
            name += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }

        return new RegistryObject({
            creation: "2019-01-01T00:00:00.000Z",
            extra: {
                "schema": {
                    "schema": "sftp",
                    "hostname": "ftp.example.com",
                    "port": 22,
                },
                "properties": {
                    "enable-jmx-monitoring": "false",
                    "rcon-d-port": 25575,
                    "gamemode": "survival",
                    "enable-command-block": "false",
                    "enable-query": "false",
                    "level-name": "world",
                    "level-seed": "",
                    "motd": name,
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
            id: uuid,
            ip: "127.0.0.1",
            lastmodified: "2019-01-01T00:00:00.000Z",
            path: "/",
            provider: typeOf,
            running: running,
            schema: "sftp",
            update: "2019-01-01T00:00:00.000Z",
            version: "1.18",
        })
    }

    static getRegistryObjects(count) {
        // let registryObjects = [];
        // for (let i = 0; i < count; i++) {
        //     registryObjects.push(this.getRegistryObject());
        // }
        // return registryObjects;
        return [
            {
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
            },
            {
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
                        "motd": "HWDVQVIVXK",
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
                "id": "405bbe7b-730d-41aa-b345-254c952efa31",
                "ip": "127.0.0.1",
                "lastmodified": "2019-01-01T00:00:00.000Z",
                "path": "/",
                "provider": "vanilla",
                "running": false,
                "schema": "sftp",
                "update": "2019-01-01T00:00:00.000Z",
                "version": "1.18"
            },
            {
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
                        "motd": "LJSKXGZMWB",
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
                "id": "49a8840b-8c5b-4d9f-b08d-005f36da6d77",
                "ip": "127.0.0.1",
                "lastmodified": "2019-01-01T00:00:00.000Z",
                "path": "/",
                "provider": "vanilla",
                "running": false,
                "schema": "sftp",
                "update": "2019-01-01T00:00:00.000Z",
                "version": "1.18"
            }
        ]
    }

}

export default Random;