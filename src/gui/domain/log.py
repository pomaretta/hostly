import logging

class Log:

    def __init__(self, root: logging.Logger, file_path: str) -> None:
        self.root = root
        self.file_path = file_path

    def get_logger(self) -> logging.Logger:
        return self.root
    
    def get_file(self) -> str:
        return self.file_path