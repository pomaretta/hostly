import { Version } from "../domain/version";

class VersionCollection {

    constructor({
        versions = [],
    }) {
        this.versions = versions;
    }

    getProviders() {
        let providers = [];
        this.versions.forEach(version => {
            for (let provider of version.providers) {
                if (!providers.includes(provider)) {
                    providers.push(provider);
                }
            }
        })
        return providers;
    }

    getProviderVersions(provider) {
        let versions = [];
        this.versions.forEach(version => {
            if (version.providers.includes(provider)) {
                versions.push(version.name);
            }
        })
        return versions;
    }

    static parse(data) {
        return new VersionCollection({
            versions: data.map(version => new Version(version))
        });
    }

}

export { VersionCollection };