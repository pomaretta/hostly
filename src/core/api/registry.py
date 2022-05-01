from ..domain.api import API, APIComponent

class RegistryAPI(APIComponent):
    
    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'registry'

    def registry_servers(self):
        output = []
        for server in self.api.registry.__get_registry_objects__():
            output.append(server.to_json())
        return output