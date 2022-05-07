import { Component } from "react";
import { Link } from "react-router-dom";

import Context from '../../context/App';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

class Sidebar extends Component {

    render() {

        let routeIndex = this.context.currentRoute;
        if (this.props.overrideRoute) {
            routeIndex= this.props.overrideRoute;
        }

        return (
            <div className="hidden sm:flex flex-col top-0 left-0 w-16 h-full border-r dark:border-0 | bg-white text-gray-800 | dark:bg-gray-800 dark:text-white | z-30">
                <div className="flex items-center justify-center h-14 text-3xl pt-4">
                    <p className="font-bold | dark:text-white text-black | pointer-events-none">
                        h.
                    </p>
                </div>
                <div className="flex-grow">
                    <ul className="flex flex-col py-4 space-y-1 h-full">
                        {
                            this.context.routes ?
                                this.context.routes.map((route, index) => {
                                    if (route.hide) {
                                        return null;
                                    }
                                    return (
                                        <li key={index}
                                            className="tooltip tooltip-right tooltip-primary"
                                            data-tip={route.key.charAt(0).toUpperCase() + route.key.slice(1)}
                                        >
                                            <Link
                                                to={route.path}
                                                className={classNames(
                                                    routeIndex === index ? "border-jt-primary" : "",
                                                    "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-jt-primary pr-6 | dark:hover:bg-gray-700 dark:hover:text-white"
                                                )}
                                                onClick={() => this.context.setCurrentRoute(index)}
                                            >
                                                <span className="inline-flex justify-center items-center ml-4">
                                                    {
                                                        route.icon ? (
                                                            <div className="w-5 h-5">
                                                                {
                                                                    route.icon
                                                                }
                                                            </div>
                                                        ) : null
                                                    }
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })
                                : null
                        }
                        <div className="mt-auto-important">
                            {/* <li
                                className="tooltip tooltip-right tooltip-primary | relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white border-l-4 border-transparent hover:border-jt-primary pr-6"
                                data-tip="Launch"
                            >
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z" />
                                    </svg>
                                </span>
                            </li> */}
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

}
Sidebar.contextType = Context;

export default Sidebar;