from ..domain.log import Log, logging

class WebLog(Log):
    
    def __init__(self, root: logging.Logger, file_path: str) -> None:
        super().__init__(root, file_path)