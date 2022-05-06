import threading
import time
from ..domain.api import API, APIComponent

from mscli.core.configuration.registry import RegistryObject, MinecraftRegistry
from mscli.core.builder.forge import ForgeBuilder
from mscli.core.builder.vanilla import VanillaBuilder
from mscli.core.jvm.jvm import MinecraftJVM
from mscli.core.jvm.server import MinecraftServer

class ServerAPI(APIComponent):

    __processes = {}

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = 'server'
        self.registry: MinecraftRegistry = api.registry

    def __get_object__(self, id: str) -> RegistryObject:
        for object in self.registry.__get_registry_objects__():
            if object.id == id:
                return object
        raise Exception("Object not found")

    def __fetch__(self, id: str) -> RegistryObject:
        registryObject = self.__get_object__(id)
        self.registry.__fetch_object__(registryObject, self.api.configuration, self.api.credentials)
        return registryObject
 
    @staticmethod
    def __process_output__(server: MinecraftServer, stdout: list) -> None:
        while server.is_running():
            line = server.process.stdout.readline()
            if line is None:
                time.sleep(0.1)
                continue
            line = line.decode('utf-8')
            stdout.append(line)

    def server_list(self) -> list:
        # self.__processes.keys() as json
        return list(self.__processes.keys()) 

    def server_run(self, id: str) -> bool:
        if id in self.__processes:
            raise Exception("Server already running")

        # registryObject = self.__fetch__(id)
        registryObject = self.__get_object__(id)

        builder = None
        providerName = registryObject.provider
        provider = self.api.versions.get_version(registryObject.version).get_provider(providerName)
        if providerName == "forge":
            builder = ForgeBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=provider
            )
        elif providerName == "vanilla":
            builder = VanillaBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=provider
            )
        else:
            raise Exception("Invalid provider")

        version_exists = False
        for v in self.api.jvm.get_versions():
            if v.name == provider.jvm:
                version_exists = True
                break
        if not version_exists:
            raise Exception("Invalid JVM version")
        
        jvm_provider: dict = self.api.configuration.get_jvms()['liberica']
        jvm_provider_path: str = None
        for n, d in jvm_provider.items():
            if n == provider.jvm:
                jvm_provider_path = d['jvm_path']
                break
        
        if jvm_provider_path is None:
            # Install the JVM
            jre = MinecraftJVM(
                configuration=self.api.configuration,
                jvm=self.api.jvm
            )
            jre.install(
                version=provider.jvm,
                provider='liberica',
                dist=self.api.configuration.get_os(),
                arch=self.api.configuration.get_arch()
            )
        
        pipeline = builder.run(id=id)
        if pipeline._failed:
            raise Exception("Failed to run server")

        server: MinecraftServer
        server = pipeline._output[0]

        serverOut = []
        serverThread = threading.Thread(
            target=ServerAPI.__process_output__,
            args=(server, serverOut)
        )
        self.__processes[id] = {
            'server': server,
            'history': [],
            'stdout': serverOut,
            'thread': serverThread,
        }
        serverThread.start()

        return True

    def server_stop(self, id: str) -> bool:
        if id not in self.__processes:
            raise Exception("Server not running")

        registryObject = self.__get_object__(id)

        builder = None
        providerName = registryObject.provider
        provider = self.api.versions.get_version(registryObject.version).get_provider(providerName)
        if providerName == "forge":
            builder = ForgeBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=provider
            )
        elif providerName == "vanilla":
            builder = VanillaBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=provider
            )
        else:
            raise Exception("Invalid provider")

        version_exists = False
        for v in self.api.jvm.get_versions():
            if v.name == provider.jvm:
                version_exists = True
                break
        if not version_exists:
            raise Exception("Invalid JVM version")
        
        jvm_provider: dict = self.api.configuration.get_jvms()['liberica']
        jvm_provider_path: str = None
        for n, d in jvm_provider.items():
            if n == provider.jvm:
                jvm_provider_path = d['jvm_path']
                break
        
        if jvm_provider_path is None:
            # Install the JVM
            jre = MinecraftJVM(
                configuration=self.api.configuration,
                jvm=self.api.jvm
            )
            jre.install(
                version=provider.jvm,
                provider='liberica',
                dist=self.api.configuration.get_os(),
                arch=self.api.configuration.get_arch()
            )
        
        server: MinecraftServer
        server = self.__processes[id]['server']
        server.send('stop')
        exit = server.process.wait(timeout=10)
        server.process.kill()
        if exit is None:
            server.process.terminate()
            exit = server.process.wait(timeout=5)
            if exit is None:
                raise Exception("Failed to stop server")

        self.__processes[id]['thread'].join()
        del self.__processes[id]

        builder.postrun(id=id)

        return True

    def server_send(self, id: str, command: str) -> bool:
        if id not in self.__processes:
            raise Exception("Server not running")
        server: MinecraftServer
        server = self.__processes[id]['server']
        server.send(command)
        return True

    def server_output(self, id: str) -> list:
        if id not in self.__processes:
            raise Exception("Server not running")
        return self.__processes[id]['stdout']