import { Component } from "react";
import { classNames } from "../../utils/Utils";
import Context from "../../context/App";

class Error extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: null,
        }

    }

    componentDidUpdate() {

        if (!this.context.error) return;
        if (this.state.timer) return;
        
        this.setState({
            timer: setTimeout(() => {
                this.context.resetError();
                this.setState({
                    timer: null,
                });
            }, 10000)
        });
    }

    render() {
        return (
            <div
                className={classNames(
                    this.context.error ? 'z-50' : '-z-50',
                    "absolute top-0 left-1/4 | w-1/2 h-24 | z-50",
                    "p-4",
                    "flex items-center justify-center"
                )}
            >
                <div 
                    className={classNames(
                        "w-full | rounded-md sm:rounded-xl | shadow-sm sm:shadow-xl",
                        "bg-white dark:bg-gray-700",
                        "text-red-500 dark:text-white",
                        this.context.error ? 'h-full' : 'h-0',
                        "overflow-hidden"
                    )}
                    style={{
                        transition: "height 0.300s ease-in-out",
                    }}
                >
                    <div className={classNames(
                        "max-w-7xl mx-auto py-3 px-3 sm:px-3 lg:px-3",
                        this.context.error ? '' : 'hidden',
                    )}>
                        <div className="flex flex-col sm:flex-row items-center justify-between flex-wrap">
                            <div className="w-full flex-1 flex items-center justify-center sm:justify-start">
                                <span className="flex p-2">
                                    {/* Bug Icon */}
                                    <lord-icon
                                        // trigger={this.context.newNotifications ? "loop" : ""}
                                        trigger="hover"
                                        src="/resources/error-bug.json"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                        }}
                                    />
                                </span>
                                <p className="ml-3 text-md sm:text-md font-medium">
                                    <span>
                                        {
                                            this.context.error
                                        }
                                    </span>
                                </p>
                            </div>
                            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                                <button type="button" 
                                    className={classNames(
                                        "text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:text-gray-900",
                                        "rounded-lg text-sm p-1.5 ml-auto inline-flex items-center",
                                        "dark:hover:bg-gray-800 dark:hover:text-white"
                                    )}
                                    onClick={() => this.context.resetError()}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
Error.contextType = Context;

export default Error;