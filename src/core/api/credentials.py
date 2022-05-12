import os
from ..domain.api import API, APIComponent

from mscli.domain.credentials.credentials import Credentials

class CredentialsAPI(APIComponent):

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'credentials'
    
    def credentials_exists(self):
        return self.api.credentials is not None and self.api.credentials.json_data is not None

    def credentials_provider(self) -> str:
        if not self.credentials_exists():
            raise Exception("Credentials are not set")
        return self.api.credentials.get_schema()["schema"]

    def credentials_update(self, provider: str, data: dict):

        creds = Credentials(
            json_data={
                "schema": provider,
                **data
            }
        )
        if not creds.validate():
            raise Exception("Credentials are not valid")
        
        credentials_path = os.path.expanduser("~/.mscli/config/credentials.json")
        self.api.credentials = creds
        self.api.credentials.dump(
            data=creds.json_data,
            configuration_file=credentials_path
        )

        return True

    def credentials_get(self):
        if not self.credentials_exists():
            raise Exception("Credentials are not set")
        return self.api.credentials.get_schema()