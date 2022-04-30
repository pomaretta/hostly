from ..domain.api import API, APIComponent

class RegistryAPI(APIComponent):
    
    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'registry'

    def registry_greet(self):
        return "Hello World!"