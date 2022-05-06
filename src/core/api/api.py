from ..domain.api import API, Configuration, JVMConfiguration, Registry, Versions, Credentials
from ..domain.log import Log

# TODO: Import modules
from .registry import RegistryAPI
from .server import ServerAPI

class WebAPI(API):

    _modules = [
        RegistryAPI,
        ServerAPI
    ]

    def __init__(self, configuration: Configuration, jvm: JVMConfiguration, registry: Registry, versions: Versions, log: Log, credentials: Credentials) -> None:
        super().__init__(configuration, jvm, registry, versions, credentials)
        self.log = log
        self._default = [
            *self._default,
            "log"
        ]
        self.__load_modules__()

    def __load_modules__(self):
        for module in self._modules:
            setattr(
                self,
                f"_module_{module.__name__}",
                module(self)
            )

    def __load_class__(self, module: object):
        for attrn in module.__dir__():
            attr = module.__getattribute__(attrn)
            if not callable(attr) or attrn.startswith('__'):
                continue
            yield attr

    def __load__(self):
        output: list = []
        for attrn in self.__dir__():
            if attrn.startswith('__') or \
                attrn == "_default" or attrn == "_modules" or \
                not attrn.startswith('_module_') and attrn not in self._default:
                continue
            attr = self.__getattribute__(attrn)
            for f in self.__load_class__(attr):
                output.append(f)
        return output