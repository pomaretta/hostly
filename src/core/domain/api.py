from abc import abstractmethod
import webview

from mscli.domain.configuration.configuration import Configuration
from mscli.domain.configuration.registry import Registry
from mscli.domain.jvm.jvm import JVMConfiguration
from mscli.domain.versions.version import Versions
from mscli.domain.credentials.credentials import Credentials

class API:

    _default = [
        "configuration",
        "jvm",
        "registry",
        "versions"
    ]

    def __init__(
        self,
        configuration: Configuration,
        jvm: JVMConfiguration,
        registry: Registry,
        versions: Versions,
        credentials: Credentials
    ) -> None:
        self.configuration = configuration
        self.jvm = jvm
        self.registry = registry
        self.versions = versions
        self.credentials = credentials
        self.window = None

    def set_window(self, window: webview.Window) -> None:
        self.window = window

    def get_window(self) -> webview.Window:
        return self.window

    @abstractmethod
    def __load__(self):
        pass

# Abstract API
class APIComponent:

    name = None

    def __init__(self, api: API) -> None:
        self.api = api