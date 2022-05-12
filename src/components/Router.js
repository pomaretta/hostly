import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"

// Context
import Context from '../context/App';

// Router
class Router extends React.Component {

    componentDidMount() {        
        // Needs setup
        this.context.needsSetup();
        // JRE
        this.context.getHasJre();
        // Get the servers
        this.context.getRegistryServers();
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {
                        this.context.routes ?
                        this.context.routes.map((route, index) => {
                            if (!route.path || !route.element) {
                                return null;
                            }
                            return (
                                <Route
                                    {...route}
                                />
                            )
                        })
                        : null
                    }
                </Routes>
            </BrowserRouter>
        )
    }
}
Router.contextType = Context;

export default Router;