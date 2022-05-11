from ..domain.api import API, APIComponent

class VersionAPI(APIComponent):

    def __init__(self, api: API):
        super().__init__(api)
        self.name = "version"
    
    def versions_available(self):
        out = []
        for version in self.api.versions.get_versions():
            providers = []
            for provider in version.get_providers():
                providers.append(
                    provider.name
                )
            out.append({
                "name": version.name,
                "type": version.type,
                "providers": providers,
            })
        return out

    def get_providers(self):
        out = {}
        for version in self.api.versions.get_versions():
            for provider in version.get_providers():
                if provider.name in out:
                    continue
                out[provider.name] = {
                    "type": provider.type,
                }
        return out


        