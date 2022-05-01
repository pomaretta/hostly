import { Component } from "react";
import { Link } from "react-router-dom";

import Context from '../../context/App';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

class Sidebar extends Component {

    render() {
        return (
            <div className="hidden sm:flex flex-col top-0 left-0 w-16 h-full border-r dark:border-0 z-10 | bg-white text-gray-800 | dark:bg-black dark:text-white">
                <div className="flex items-center justify-center h-14 text-3xl">
                    {/* Image */}
                    <img className="h-8 w-auto" src="/resources/logo.svg" alt="Workflow" />
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
                                                    this.context.currentRoute === index ? "border-jt-primary" : "",
                                                    "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-jt-primary pr-6 | dark:hover:bg-black dark:hover:text-white"
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
                            <li
                                className="tooltip tooltip-right tooltip-primary | relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 dark:hover:bg-black text-red-500 border-l-4 border-transparent hover:border-jt-primary pr-6"
                                data-tip="Launch"
                            >
                                <span className="inline-flex justify-center items-center ml-3 | dark:bg-white dark:rounded-sm">
                                    <lord-icon
                                        palette="#fff"
                                        src="/resources/category.json"
                                        trigger="hover"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                        }}
                                    />
                                </span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }

}
Sidebar.contextType = Context;

export default Sidebar;