from ..domain.api import API, APIComponent

import webview
import os

class FileAPI(APIComponent):

    def __init__(self, api: API) -> None:
        super().__init__(api)
        self.name = "file"

    def file_path(self, directory: bool = False) -> str:

        home = os.path.expanduser('~')
        file_paths = self.api.get_window().create_file_dialog(
            webview.OPEN_DIALOG if not directory else webview.FOLDER_DIALOG, directory=home)
        if file_paths is None:
            raise Exception("No file selected")
        if len(file_paths) == 0:
            raise Exception("No file selected")

        file_path = file_paths[0]

        if not os.access(file_path, os.R_OK):
            raise Exception("File is not readable")

        return file_path