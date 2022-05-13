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

    constructor(props) {
        super(props);

        this.state = {
            eventLoop: null,
        }
    }

    componentDidMount() {        
        // Needs setup
        this.context.needsSetup();
        // JRE
        this.context.getHasJre();
        // Get the servers
        this.context.getRegistryServers();
        // Update IP
        this.context.updateIp();
        // Event loop
        this.setState({
            eventLoop: setInterval(() => {
                this.context.updateIp();
            }, 60 * 1000),
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.eventLoop);
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