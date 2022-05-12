import logging
from ..domain.api import API, APIComponent

from mscli.core.jvm.jvm import MinecraftJVM

class SetupAPI(APIComponent):

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = "setup"

    def setup_needs(self):
        return "jre" not in self.api.configuration.json_data or self.api.credentials is None

    def setup_has_jre(self):
        return "jre" in self.api.configuration.json_data

    def setup_jre(self):
        jre = None
        if not "jre" in self.api.configuration.json_data:
            logging.info("JRE configuration not found")
            jre = MinecraftJVM(
                configuration=self.api.configuration,
                jvm=self.api.jvm
            )
            jre.install(
                version='1.8',
                provider='liberica',
                dist=self.api.configuration.get_os(),
                arch=self.api.configuration.get_arch()
            )
            logging.info("JRE configuration created")
        return True