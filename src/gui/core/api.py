from ..domain.api import API

class BrowserAPI:

    def __init__(self, api: API) -> None:
        self.api = api
        self.__load__()

    def __load__(self):
        for attrn in self.api.__load__():
            setattr(self, attrn.__name__, attrn)