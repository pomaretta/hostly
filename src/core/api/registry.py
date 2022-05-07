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
