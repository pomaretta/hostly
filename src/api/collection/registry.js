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

    static parse(data) {
        return new RegistryCollection({
            objects: data.map(registryObject => new RegistryObject(registryObject))
        });
    }

}

export { RegistryCollection };