from ..domain.api import API, APIComponent
from ..gui import MinecraftRegistry

class RegistryAPI(APIComponent):
    
    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'registry'
        self.registry = self.api.registry

    def __update_registry__(self):
        self.registry = MinecraftRegistry(
            json_data=self.registry.load(self.registry.path).json_data
        )

    def registry_servers(self):
        self.__update_registry__()
        output = []
        for server in self.registry.__get_registry_objects__():
            output.append(server.to_json())
        return output

    def registry_server(self, id: str):
        self.__update_registry__()
        for server in self.registry.__get_registry_objects__():
            if server.id == id:
                return server.to_json()    
        raise Exception('Server not found')
    
    def registry_update(self, id: str):
        self.__update_registry__()
        registry_object = None
        for server in self.registry.__get_registry_objects__():
            if server.id == id:
                registry_object = server
        if registry_object is None:
            raise Exception('Server not found')
        # Update registry object
        self.registry.__fetch_object__(
            registry_object=registry_object,
            configuration=self.api.configuration,
            credentials=self.api.credentials,
        )
        return True
