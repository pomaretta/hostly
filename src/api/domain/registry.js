class RegistryObject {

    constructor({
        creation,
        extra,
        id,
        ip,
        lastmodified,
        path,
        provider,
        running,
        schema,
        update,
        version,       
    }) {
        this.creation = creation;
        this.extra = extra;
        this.id = id;
        this.ip = ip;
        this.lastmodified = lastmodified;
        this.path = path;
        this.provider = provider;
        this.running = running;
        this.schema = schema;
        this.update = update;
        this.version = version;
    }

}

export { RegistryObject };