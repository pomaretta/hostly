import logging
import os

from ..domain.api import API, APIComponent
from mscli.domain.configuration.configuration import Configuration

import requests

class ConfigurationAPI(APIComponent):

    config_path = os.path.join(
        os.path.expanduser('~'),
        '.mscli',
        'config',
        'config.json'
    )

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = "configuration"

    def __reload_config__(self):
        self.api.configuration = Configuration(
            json_data=Configuration.load(self.config_path).json_data
        )

    def configuration_updateip(self):
        
        current_ip = self.api.configuration.get_ip()
        new_ip = None
        try:
            req = requests.get(
                url='https://api.ipify.org?format=json',
            )
            if req.status_code != 200:
                raise Exception(f"Request failed with status code {req.status_code}")
            new_ip = req.json()['ip']
        except Exception as e:
            logging.error(f"Failed to get current IP: {e}")
        
        if new_ip is not None and new_ip != current_ip:
            self.api.configuration.json_data['ip'] = new_ip
            # Dump new 
            self.api.configuration.dump(
                data=self.api.configuration.json_data,
                configuration_file=self.config_path
            )

        self.__reload_config__()

        return True
        