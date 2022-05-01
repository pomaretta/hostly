import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom"

// Context
import Context from '../context/App';

// Components
import Test from './Test';

// Router
class Router extends React.Component {
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