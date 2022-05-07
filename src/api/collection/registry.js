import { RegistryObject } from "../domain/registry";

class RegistryCollection {

    constructor({
        objects = [],
    }) {
        this.objects = objects;
        this.getById = this.getById.bind(this);
    }

    getById(id) {
        const result = this.objects.filter(object => object.id === id);
        if (!result || result.length === 0) {
            return null;
        }
        return result[0];
    }

    getRecentlyPlayed() {
        let latestObject = null;
        this.objects.forEach(object => {
            if (latestObject === null) {
                latestObject = object;
            }
            if (Date.parse(object.lastmofied).toFixed() > Date.parse(latestObject.lastmofied).toFixed()) {
                latestObject = object;
            }
        });
        return latestObject;
    }

    static parse(data) {
        return new RegistryCollection({
            objects: data.map(registryObject => new RegistryObject(registryObject))
        });
    }

}

export { RegistryCollection };