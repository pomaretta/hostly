import os

from flask import Flask, send_from_directory

class WebServer:

    def __init__(self):
        self.server: Flask = None
        
        # ============= #
        # Paths         #
        # ============= #

        self.default_path = os.path.join(
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
        linux_path = os.path.join(
            '.',
            'portal',
        )
        
        if os.path.exists(darwin_path):
            self.default_path = darwin_path
        elif os.path.exists(linux_path):
            self.default_path = linux_path

        self.default_path = os.path.abspath(self.default_path)
        self.default_static = os.path.join(
            self.default_path,
            'static',
        )

        # ============= #
        # Internal      #
        # ============= #

        self.init()

        # self.server.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1  # disable caching
        
        # ============= #
        # Load          #
        # ============= #

        self.load()

    def init(self) -> Flask:
        if self.server is not None:
            raise Exception("Server already initialized")
        self.server = Flask(
            import_name=__name__,
            static_url_path=None,
            static_folder=self.default_static, # Change to public
            static_host=None,
            host_matching=False,
            subdomain_matching=False,
            # template_folder=self.app_path,
            instance_path=None,
            instance_relative_config=False,
            root_path=None
        )
        return self.server

    def load(self) -> None: 
        @self.server.route('/', defaults={'path': ''})
        @self.server.route('/<path:path>')
        def serve(path):
            if path != "" and os.path.exists(os.path.join(self.default_path, path)):
                return send_from_directory(os.path.join(self.default_path), path)
            else:
                return send_from_directory(os.path.join(self.default_path),'index.html')