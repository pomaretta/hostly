from ..domain.api import API, APIComponent

class ServerAPI(APIComponent):
    
    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'registry'