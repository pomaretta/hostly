import React from "react";
import Context from "../../context/App";
import { classNames } from "../../utils/Utils";

class Loading extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            lowerInternal: null,
            upperInternal: null,
        }

    }

    componentDidMount() {

        this.setState({
            lowerInternal: setInterval(() => {
                if (this.state.progress >= 100) {
                    clearInterval(this.state.lowerInternal);
                }
                // Update the progress
                this.setState({
                    progress: this.state.progress + 1,
                });
            }, 100),
            upperInterval: setInterval(() => {
                if (this.state.progress >= 100) {
                    clearInterval(this.state.upperInternal);
                }
                // Update the progress
                this.setState({
                    progress: this.state.progress + 25,
                });
            }, 3500)
        });

        if (this.context.appLoading) {
            this.begin();
        }
    }

    begin() {
        setTimeout(() => {
            clearInterval(this.state.lowerInternal);
            clearInterval(this.state.upperInternal);
            this.setState({
                progress: 100,
            });
            setTimeout(() => {    
                if (this.context.setup) {
                    document.location.href = "/setup";
                } else {
                    this.context.setAppLoading(false);
                }
            }, 3500);
        }, 1500);
    }

    render() {
        return (
            <div className={classNames(
                "absolute top-0 left-0 w-screen h-screen | flex items-center justify-center | bg-white dark:bg-gray-800 z-50",
                this.context.appLoading ? "" : "hidden",
                this.context.appLoading && document.location.pathname !== "/" ? "hidden" : "",
            )}>
                <div className="relative flex flex-col items-center justify-between | h-1/2 w-1/2 | p-4">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-9xl font-bold mb-8 | text-blue-500">Host<span className="text-gray-700 dark:text-blue-500">ly</span></h1>
                        <h2 className="text-2xl text-gray-700 dark:text-gray-100">Powering your <span className="px-4 py-2 | bg-blue-500 | font-bold | rounded-lg | ml-2 mr-2 | text-white">Minecraft</span> Servers</h2>
                    </div>
                    <div className="w-full h-4 | rounded-full | overflow-hidden | bg-gray-100 dark:bg-gray-600">
                        <div
                            className="h-full | bg-blue-500 dark:bg-blue-500"
                            style={{
                                width: `${this.state.progress}%`,
                                transition: `width 1s ease-in-out`,
                            }}
                        />
                    </div>

                </div>
            </div>
        );
    }

}
Loading.contextType = Context;

export default Loading;