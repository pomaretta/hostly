import os, sys
import logging
import webview

from mscli.domain.configuration.configuration import Configuration
from mscli.domain.configuration.registry import Registry
from mscli.domain.jvm.jvm import JVMConfiguration
from mscli.domain.versions.version import Version, Versions

from argparse import ArgumentParser
from datetime import datetime

from . import __version__
from .api.api import WebAPI

from .core.log import WebLog
from .core.api import BrowserAPI

HOME_PATH = os.path.join(os.path.expanduser('~'), '.mscli')
CONFIG_PATH = os.path.join(HOME_PATH, 'config')
LOGGING_PATH = os.path.join(HOME_PATH, 'log')

def main(
    configuration: Configuration,
    jvm: JVMConfiguration,
    registry: Registry,
    versions: Versions,
    log: WebLog,
) -> None:

    web_api = WebAPI(
        configuration=configuration,
        jvm=jvm,
        registry=registry,
        versions=versions,
        log=log
    )

    api = BrowserAPI(api=web_api)

    default_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        '..',
        '..',
        'portal',
    )
    darwin_path = os.path.join(
        '..',
        'Resources',
        'portal',
    )
    
    if os.path.exists(darwin_path):
        default_path = darwin_path

    # TODO: Create Window
    window = webview.create_window(
        title=f"Hostly",
        url=default_path,
        html=None, # TODO: Create HTML Framework
        js_api=api, # TODO: Add API
        width=1280, # TODO: Asign correct size
        height=720, # TODO: Asign correct size
        resizable=True,
        fullscreen=False,
        min_size=(960, 680), # TODO: Asign correct size
        hidden=False,
        frameless=False, # TODO: Change on future
        easy_drag=True,
        minimized=False,
        on_top=False, # TODO: Asign correct value
        confirm_close=False,
        background_color='#FFFFFF', # TODO: Asign correct value
        transparent=False,
        text_select=False,
        localization=None, # TODO: Asign correct value
    )

    # TODO: Add Window to API
    web_api.set_window(window)

    webview.start(
        func=None,
        args=None,
        localization={},
        gui=None,
        debug=log.get_logger().level == logging.DEBUG,
        http_server=True,
        user_agent=None
    )

def configure_logging(debug: bool = False):

    logging_file = os.path.join(
        LOGGING_PATH,
        f"mscli_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.log"
    )

    formatter: logging.Formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    root: logging.Logger = logging.getLogger()
    handler: logging.StreamHandler = logging.FileHandler(filename=logging_file)

    handler.setFormatter(formatter)

    if debug:
        # Set root level
        root.setLevel(logging.DEBUG)
        # Stdout handler
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(logging.DEBUG)

    root.addHandler(handler)
    
    return WebLog(
        root=root,
        file_path=logging_file
    )

def init():

    configuration: Configuration = None
    config_path = os.path.join(
        os.path.expanduser('~'),
        '.mscli',
        'config',
        'config.json'
    )

    # ================= #
    #   Configuration   #
    # ================= #

    if not os.path.exists(
        config_path
    ):
        configuration = Configuration.create()
        Configuration.dump(configuration.json_data, config_path)
    else:
        configuration = Configuration(
            json_data=Configuration.load(config_path).json_data
        )

    # ================= #
    #   CLI             #
    # ================= #

    parser = ArgumentParser(
        prog="HostlyMC",
        description="HostlyMC is a Minecraft server manager"
    )

    parser.add_argument(
        '-d', '--debug',
        action='store_true',
        help="Enable debug mode",
        required=False
    )

    args = parser.parse_args()

    # TODO: Initialize logging
    log = configure_logging(args.debug)

    jvm: JVMConfiguration = None
    jvm_path = os.path.join(
        configuration.get_paths()['config'],
        'jvm.json'
    )

    # ================= #
    #   JVM             #
    # ================= #

    if not os.path.exists(
        jvm_path
    ):
        logging.debug("JVM configuration not found")
        jvm = JVMConfiguration.create()
        JVMConfiguration.dump(jvm.json_data, jvm_path)
    else:
        logging.debug("JVM configuration found at %s", jvm_path)
        jvm = JVMConfiguration(
            json_data=JVMConfiguration.load(jvm_path).json_data
        )

    registry: Registry = None
    registry_path = os.path.join(
        configuration.get_paths()['config'],
        'registry.json'
    )

    # ================= #
    #   Registry        #
    # ================= #

    if not os.path.exists(
        registry_path
    ):
        logging.debug("Registry configuration not found")
        registry = Registry.create()
        Registry.dump(registry.json_data, registry_path)
    else:
        logging.debug("Registry configuration found at %s", registry_path)
        registry = Registry(
            json_data=Registry.load(registry_path).json_data
        )

    versions: Versions = None
    versions_path = os.path.join(
        configuration.get_paths()['config'],
        'versions.json'
    )

    # ================= #
    #   Versions        #
    # ================= #

    if not os.path.exists(
        versions_path
    ):
        logging.debug("Versions configuration not found")
        versions = Versions.create()
        Version.dump(versions.json_data, versions_path)
    else:
        logging.debug("Versions configuration found at %s", versions_path)
        versions = Versions(
            json_data=Versions.load(versions_path).json_data
        )

    # jre: JVMConfiguration = None

    # ================= #
    #   JRE             #
    # ================= #

    # if not "jre" in configuration.json_data:
    #     logging.debug("JRE configuration not found")
    #     jre = MinecraftJVM(
    #         configuration=configuration,
    #         jvm=jvm
    #     )
    #     jre.install(
    #         version='1.8',
    #         provider='liberica',
    #         dist=configuration.get_os(),
    #         arch=configuration.get_arch()
    #     )

    logging.debug("Initializing GUI")
    main(
        configuration=configuration,
        jvm=jvm,
        registry=registry,
        versions=versions,
        log=log
    )

# if __name__ == '__main__':

#     configuration: Configuration = None
#     config_path = os.path.join(
#         os.path.expanduser('~'),
#         '.mscli',
#         'config',
#         'config.json'
#     )

#     # ================= #
#     #   Configuration   #
#     # ================= #

#     if not os.path.exists(
#         config_path
#     ):
#         configuration = Configuration.create()
#         Configuration.dump(configuration.json_data, config_path)
#     else:
#         configuration = Configuration(
#             json_data=Configuration.load(config_path).json_data
#         )

#     # ================= #
#     #   CLI             #
#     # ================= #

#     parser = ArgumentParser(
#         prog="HostlyMC",
#         description="HostlyMC is a Minecraft server manager"
#     )

#     parser.add_argument(
#         '-d', '--debug',
#         action='store_true',
#         help="Enable debug mode",
#         required=False
#     )

#     args = parser.parse_args()

#     # TODO: Initialize logging
#     logger, log_path = configure_logging(args.debug)

#     jvm: JVMConfiguration = None
#     jvm_path = os.path.join(
#         configuration.get_paths['config'],
#         'jvm.json'
#     )

#     # ================= #
#     #   JVM             #
#     # ================= #

#     if not os.path.exists(
#         jvm_path
#     ):
#         logging.debug("JVM configuration not found")
#         jvm = JVMConfiguration.create()
#         JVMConfiguration.dump(jvm.json_data, jvm_path)
#     else:
#         logging.debug("JVM configuration found at %s", jvm_path)
#         jvm = JVMConfiguration(
#             json_data=JVMConfiguration.load(jvm_path).json_data
#         )

#     registry: Registry = None
#     registry_path = os.path.join(
#         configuration.get_paths['config'],
#         'registry.json'
#     )

#     # ================= #
#     #   Registry        #
#     # ================= #

#     if not os.path.exists(
#         registry_path
#     ):
#         logging.debug("Registry configuration not found")
#         registry = Registry.create()
#         Registry.dump(registry.json_data, registry_path)
#     else:
#         logging.debug("Registry configuration found at %s", registry_path)
#         registry = Registry(
#             json_data=Registry.load(registry_path).json_data
#         )

#     versions: Versions = None
#     versions_path = os.path.join(
#         configuration.get_paths['config'],
#         'versions.json'
#     )

#     # ================= #
#     #   Versions        #
#     # ================= #

#     if not os.path.exists(
#         versions_path
#     ):
#         logging.debug("Versions configuration not found")
#         versions = Versions.create()
#         Version.dump(versions.json_data, versions_path)
#     else:
#         logging.debug("Versions configuration found at %s", versions_path)
#         versions = Versions(
#             json_data=Versions.load(versions_path).json_data
#         )

#     # jre: JVMConfiguration = None

#     # ================= #
#     #   JRE             #
#     # ================= #

#     # if not "jre" in configuration.json_data:
#     #     logging.debug("JRE configuration not found")
#     #     jre = MinecraftJVM(
#     #         configuration=configuration,
#     #         jvm=jvm
#     #     )
#     #     jre.install(
#     #         version='1.8',
#     #         provider='liberica',
#     #         dist=configuration.get_os(),
#     #         arch=configuration.get_arch()
#     #     )

#     logging.debug("Initializing GUI")
#     main(
#         configuration=configuration,
#         jvm=jvm,
#         registry=registry,
#         versions=versions,
#         log_file=log_path
#     )