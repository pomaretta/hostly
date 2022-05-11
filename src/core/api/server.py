import datetime
import json
import logging
import os
import shutil
import threading
import time

import webview
from ..domain.api import API, APIComponent

from mscli import __version__
from mscli.core.configuration.registry import RegistryObject, MinecraftRegistry
from mscli.core.builder.forge import ForgeBuilder
from mscli.core.builder.vanilla import VanillaBuilder
from mscli.core.jvm.jvm import MinecraftJVM
from mscli.core.jvm.server import MinecraftServer

from mscli.core.configuration.properties import Properties1122, Properties118
from mscli.core.builder.vanilla import VanillaBuilder, VanillaServer
from mscli.core.builder.forge import ForgeBuilder, ForgeServer

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

    def server_export(self, id: str) -> dict:
        
        registryObject = self.__get_object__(id)
        data = {
            "version": __version__,
            "schema": registryObject.schema,
            "creation": datetime.datetime.utcnow().isoformat(),
            "object": registryObject.to_json()
        }

        # Get home path
        home = os.path.expanduser('~')
        file_path = self.api.get_window().create_file_dialog(webview.SAVE_DIALOG, directory=home, save_filename=f"{id}.json")
        if file_path is None:
            raise Exception("No file selected")
        
        with open(file_path, 'w') as f:
            f.write(json.dumps(data))
            f.close()

        return True

    def server_import(self):

        home = os.path.expanduser('~')
        file_paths = self.api.get_window().create_file_dialog(webview.OPEN_DIALOG, directory=home)
        if file_paths is None:
            raise Exception("No file selected")
        
        if len(file_paths) == 0:
            raise Exception("No file selected")

        file_path = file_paths[0]

        # Check if file exists and is valid
        if not os.path.isfile(file_path) or not file_path.endswith('.json') or not os.access(file_path, os.R_OK):
            raise Exception("Invalid file")

        registryObject = None
        with open(file_path, 'r') as f:
            data = json.loads(f.read())
            if "version" not in data or \
                "schema" not in data or \
                "creation" not in data or \
                "object" not in data:
                raise Exception("Invalid registry file")
            registryObject = RegistryObject(
                **data['object']
            )

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
        
        builder.import_server(registry_object=registryObject)

        return True

    def server_update(self, id: str) -> bool:

        if id in self.__processes:
            raise Exception("Server already running")

        registry_object = self.__get_object__(id)

        builder = None
        providerName = registry_object.provider
        provider = self.api.versions.get_version(registry_object.version).get_provider(providerName)
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
        
        failed = builder.update(registry_object=registry_object)
        if failed:
            raise Exception("Failed to update server")

        return True

    def server_remove(self, id: str) -> bool:

        if id in self.__processes:
            raise Exception("Server is running")

        registry_object = self.__get_object__(id)
        
        server_path = os.path.join(
            self.api.configuration.get_paths()["files"],
            registry_object.provider,
            registry_object.version,
            registry_object.id
        )

        if not os.path.exists(server_path) or not os.path.isdir(server_path) or not os.access(server_path, os.W_OK):
            raise Exception("Invalid server path")
        
        shutil.rmtree(server_path)

        if os.path.exists(server_path) and os.path.isdir(server_path):
            raise Exception("Failed to remove server")

        self.api.registry.remove(registry_object=registry_object)

        return True

    def server_create(self,
        provider: str,
        version: str,
        extra: dict = None):

        hasWorld = "world" in extra and extra["world"] is not None
        hasProperties = "properties" in extra and extra["properties"] is not None
        hasMods = "mods" in extra and extra["mods"] is not None
        hasIcon = "icon" in extra and extra["icon"] is not None

        providerObject = None
        propertiesObject = None
        
        # TODO: Validate input
        if hasProperties and (extra["properties"] is None or not os.path.exists(extra["properties"]) or (os.path.exists(extra["properties"]) and not os.path.isfile(extra["properties"]))):
            raise Exception("Invalid properties file")
        if hasMods and (extra["mods"] is None or not os.path.exists(extra["mods"]) or (os.path.exists(extra["mods"]) and not os.path.isfile(extra["mods"]))):
            raise Exception("Invalid mods file")
        if hasIcon and (extra["icon"] is None or not os.path.exists(extra["icon"]) or (os.path.exists(extra["icon"]) and not os.path.isfile(extra["icon"]))):
            raise Exception("Invalid icon file")
        if hasWorld and (extra["world"] is None or not os.path.exists(extra["world"]) or (os.path.exists(extra["world"]) and not os.path.isdir(extra["world"]))):
            raise Exception("Invalid world path")

        # TODO: Parse provider
        for v in self.api.versions.get_versions():
            if v.name == version:
                providerObject = v.get_provider(provider)
                break

        # TODO: Parse properties
        if version == "1.18":
            propertiesObject = Properties118(
                json_data=Properties118.load(extra["properties"]) if hasProperties else None
            )
        elif version == "1.12.2":
            propertiesObject = Properties1122(
                json_data=Properties1122.load(extra["properties"]) if hasProperties else None
            )
        else:
            raise Exception("Invalid version")
        
        serverObject = None
        builderObject = None

        if provider == "vanilla":
            serverObject = VanillaServer(
                properties=propertiesObject,
                icon=extra["icon"] if hasIcon else None,
                world=extra["world"] if hasWorld else None
            )
        elif provider == "forge":
            serverObject = ForgeServer(
                properties=propertiesObject,
                icon=extra["icon"] if hasIcon else None,
                world=extra["world"] if hasWorld else None,
                mods=extra["mods"] if hasMods else None
            )
        else:
            raise Exception("Invalid provider")

        if provider == "vanilla":
            builderObject = VanillaBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=providerObject,
                server=serverObject
            )
        elif provider == "forge":
            builderObject = ForgeBuilder(
                configuration=self.api.configuration,
                credentials=self.api.credentials,
                registry=self.registry,
                provider=providerObject,
                server=serverObject
            )

        jvm_provider: dict = self.api.configuration.get_jvms()['liberica']
        jvm_provider_path: str = None
        for n, d in jvm_provider.items():
            if n == providerObject.jvm:
                jvm_provider_path = d['jvm_path']
                break
        if jvm_provider_path is None:
            logging.info("JVM not found, installing...")
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
            logging.info("JVM installed")

        id = builderObject.create()

        return id