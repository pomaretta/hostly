import os
from ..domain.api import API, APIComponent

from mscli.domain.credentials.credentials import Credentials

from ftplib import FTP
from pysftp import Connection, CnOpts

import boto3

class CredentialsAPI(APIComponent):

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'credentials'
    
    def __test_ftp__(self, creds: Credentials):

        hostname = creds.get_ftp_hostname()
        username = creds.get_ftp_username()
        password = creds.get_ftp_password()

        FTP(
            host=hostname,
            user=username,
            passwd=password
        )
        
        return True

    def __test_sftp__(self, creds: Credentials):
        
        cnopts = CnOpts()
        cnopts.hostkeys = None

        Connection(
            host=creds.get_sftp_hostname(),
            username=creds.get_sftp_username(),
            private_key=creds.get_sftp_private_key(),
            private_key_pass=creds.get_sftp_private_key_pass(),
            password=creds.get_sftp_password(),
            port=creds.get_sftp_port(),
            cnopts=cnopts
        )

        return True


    def __test__(self, creds: Credentials):
        if (creds.json_data["schema"] == "ftp"):
            return self.__test_ftp__(creds)
        elif (creds.json_data["schema"] == "sftp"):
            return self.__test_sftp__(creds)
        else:
            raise Exception("Provider not supported")

    def credentials_exists(self):
        return self.api.credentials is not None and self.api.credentials.json_data is not None

    def credentials_provider(self) -> str:
        if not self.credentials_exists():
            raise Exception("Credentials are not set")
        return self.api.credentials.get_schema()["schema"]

    def credentials_test(self, provider: str, data: dict):
        creds = Credentials(
            json_data={
                "schema": provider,
                **data
            }
        )
        return self.__test__(creds)

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