import React from "react";
import Page from "../components/Page";
import withRouter from "../utils/Router";
import Context from "../context/App";
import { classNames } from "../utils/Utils";

function Recently(props) {
    return (
        <div className="h-64 | flex justify-between items-center | space-x-6">
            <div
                className="relative | w-4/6 h-full | flex justify-between items-center | text-white shadow-lg rounded-lg | overflow-hidden | hover:shadow-2xl hover:shadow-blue-300 dark:hover:shadow-blue-600"
                style={{
                    transition: "all 0.5s ease-in-out",
                }}
            >
                {
                    props.server ?
                        (
                            <div className="w-full h-full | flex flex-col items-center justify-start z-10 | bg-white | text-gray-800 dark:text-white | dark:bg-gray-800">
                                <div className="h-auto w-full | p-4 | flex items-center justify-start">
                                    <h3 className="text-3xl font-bold | text-brand-blue dark:text-white">Details</h3>
                                </div>
                                <div className=" h-5/6 w-full | p-4 pt-0 | flex items-center justify-center">
                                    <div className="relative h-full w-full | rounded-md | shadow | overflow-hidden">
                                        <div className="z-20 | p-2 | text-white | flex flex-wrap justify-start items-center | h-full">
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Name</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.extra &&
                                                            props.server.extra.properties &&
                                                            props.server.extra.properties.motd ?
                                                            props.server.extra.properties.motd
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Current IP</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.ip &&
                                                            props.server.extra &&
                                                            props.server.extra.properties &&
                                                            props.server.extra.properties["server-port"] ?
                                                            props.server.ip + ":" + props.server.extra.properties["server-port"]
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Server Type</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.provider &&
                                                            props.server.version ?
                                                            String(props.server.provider).replace(/\b\w/g, l => l.toUpperCase()) + " " + props.server.version
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Storage Type</h5>
                                                <p className="text-lg | underline | cursor-pointer">
                                                    {
                                                        props.server &&
                                                            props.server.schema ?
                                                            String(props.server.schema).toUpperCase()
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Server Creation</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.creation ?
                                                            new Date(props.server.creation).toLocaleString()
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Server Owner</h5>
                                                <p className="text-lg underline | cursor-pointer">Steve</p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Premium</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.extra &&
                                                            props.server.extra.properties &&
                                                            props.server.extra.properties["online-mode"] ?
                                                            props.server.extra.properties["online-mode"] ? "Yes" : "No"
                                                            : null
                                                    }
                                                </p>
                                            </div>
                                            <div className="w-1/4 | flex flex-col items-center justify-center | mb-2">
                                                <h5 className="font-bold">Status</h5>
                                                <p className="text-lg">
                                                    {
                                                        props.server &&
                                                            props.server.running ?
                                                            "Online"
                                                            : "Offline"
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 left-0 bg-black opacity-70 | h-full w-full | shadow-md -z-10" />
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                            <div className="w-full h-full | flex flex-col items-center justify-start z-10 | bg-white | text-gray-800 dark:text-white | dark:bg-gray-800">
                                <div className="h-2/6 w-full | p-4 mb-2 | flex items-center justify-start">
                                    <div className="w-2/4 h-full | bg-gray-200 dark:bg-gray-900 | animate-pulse | rounded-full"></div>
                                </div>
                                <div className="h-5/6 w-full | p-4 pt-0 | flex items-center justify-center">
                                    <div className="relative h-full w-full | rounded-md | overflow-hidden">
                                        <div className="h-full w-full bg-gray-200 dark:bg-gray-900 | rounded-lg | animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
            <div
                className={classNames(
                    "w-2/6 h-full | flex justify-between items-center | bg-white shadow-md rounded-md | dark:bg-gray-800 | hover:shadow-2xl dark:hover:shadow-blue-800 hover:shadow-blue-300",
                    "flex flex-col items-center justify-center",
                    "rounded-lg overflow-hidden"
                )}
                style={{
                    transition: "all 0.5s ease-in-out",
                }}
            >
                {
                    props.server ?
                        (
                            <div className="flex flex-col items-center justify-center | w-full h-full">
                                <div className="h-14 w-full | bg-gray-100 dark:bg-gray-700 | flex items-center justify-start | py-4 px-2">
                                    <h3 className="text-3xl font-bold | py-1 px-4 | rounded-md | dark:text-blue-500 text-brand-blue">Players</h3>
                                </div>
                                <div className="py-4 px-2 | overflow-scroll | flex flex-col justify-start items-start | w-full h-full | space-y-2">
                                    <div className="dark:bg-gray-700 bg-gray-100 | text-brand-blue dark:text-white | w-full h-12 | rounded-md | flex justify-between items-center | px-4 | hover:shadow-lg | cursor-pointer">
                                        <div className="w-auto | flex justify-start items-center | space-x-4">
                                            <p className="font-bold">Steve</p>
                                        </div>
                                        <div className="w-auto | flex items-center justify-end | space-x-4">
                                            <p className="text-green-500 | font-bold | uppercase">online</p>
                                            <span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="dark:bg-gray-700 bg-gray-100 | text-brand-blue dark:text-white | w-full h-12 | rounded-md | flex justify-between items-center | px-4 | hover:shadow-lg | cursor-pointer">
                                        <div className="w-auto | flex justify-start items-center | space-x-4">
                                            <p className="font-bold">Heberon</p>
                                        </div>
                                        <div className="w-auto | flex items-center justify-end | space-x-4">
                                            <p className="text-red-500 | font-bold | uppercase">offline</p>
                                            <span>
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center | w-full h-full">
                                <div className="h-20 w-full | flex items-center justify-start | p-4 px-2">
                                    <div className="w-full h-full bg-gray-200 dark:bg-gray-900 | rounded-full | animate-pulse" />
                                </div>
                                <div className="py-4 px-2 | overflow-scroll | flex flex-col justify-start items-start | w-full h-full | space-y-2">
                                    <div className="dark:bg-gray-900 bg-gray-200 | text-brand-blue dark:text-white | w-full h-12 | rounded-md | flex justify-between items-center | px-4 | hover:shadow-lg | animate-pulse">
                                    </div>
                                    <div className="dark:bg-gray-900 bg-gray-200 | text-brand-blue dark:text-white | w-full h-12 | rounded-md | flex justify-between items-center | px-4 | hover:shadow-lg | animate-pulse">
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

class Server extends Page {

    constructor(props) {
        super(props);
        this.changeConsoleCommand = this.changeConsoleCommand.bind(this);

        this.state = {
            ...this.state,

            loadingInterval: null,
            loaded: false,
            server: null,
            overrideRoute: 1,
            consoleIsOpen: false,
            consoleInterval: null,
            consoleOutput: [],
            interval: null,
            command: "",

            serverLoading: false,
            serverCompleted: false,
            serverSuccess: false,
            serverError: null,

            updateLoading: false,
            updateCompleted: false,
            updateSuccess: false,
            updateError: null,

            removeLoading: false,
            removeCompleted: false,
            removeSuccess: false,
            removeError: null,

        }

    }

    getState(currentState) {
        return currentState;
    }

    getOnMount() {
        this.context.getRegistryServer(this.props.router.params.id);
        this.setState({
            loadingInterval: setInterval(() => {
                this.context.updateProgressBar(this.context.progressBarWidth + 1)
            }, 100),
            interval: setInterval(async () => {
                await this.context.getRegistryServer(this.props.router.params.id);
                this.setState({
                    server: this.context.registryServer,
                })
            }, 15000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.loadingInterval);
        clearInterval(this.state.interval);
    }

    componentDidUpdate() {

        if (this.state.server || this.state.loaded) return;

        let server = this.context.registryServers && this.context.registryServers.getById(this.props.router.params.id) ? this.context.registryServers.getById(this.props.router.params.id) : null;
        if (!server) {
            return;
        }

        clearInterval(this.state.loadingInterval);
        this.context.updateProgressBar(100);

        this.setState({
            server: this.context.registryServer,
            loaded: true,
            heading: server.extra && server.extra.properties && server.extra.properties.motd ? server.extra.properties.motd : "Default Name",
            highlight: this.props.router.params.id
        });

        setTimeout(() => {
            this.context.updateProgressBar(0);
        }, 2500);
    }

    async initConsole() {

        if (!this.state.server.running || this.state.serverLoading) return;

        if (this.state.consoleIsOpen) {
            clearInterval(this.state.consoleInterval);
            this.setState({
                consoleIsOpen: !this.state.consoleIsOpen,
            })
            return;
        }

        let inter = setInterval(() => {
            this.getConsoleOutput();
        }, 1000);

        this.setState({
            consoleIsOpen: !this.state.consoleIsOpen,
            consoleInterval: inter
        });
    }

    async getConsoleOutput() {
        this.context.serverOutput(this.props.router.params.id)
            .then(out => {
                this.setState({
                    consoleOutput: out
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    async initServer() {

        // Not running locally.
        if (this.state.server.running && !this.state.server.pid || this.state.serverLoading) return;

        this.setState({
            serverLoading: true,
            serverCompleted: false,
            serverSuccess: false,
            serverError: null,
        });

        this.context.updateProgressBar(10);

        let currentState = this.state.server.running;

        if (!this.state.server.running) {
            // Start server
            this.context.serverRun(this.props.router.params.id);
        } else {
            // Stop server
            this.context.serverStop(this.props.router.params.id);
        }

        let inter = setInterval(async () => {

            this.context.updateProgressBar(this.context.progressBarWidth + 1);

            // Wait until server change state.
            if (currentState !== this.context.registryServer.running) {
                clearInterval(inter);

                let consoleIsOpen = this.state.consoleIsOpen;
                if (currentState) {
                    consoleIsOpen = false;
                    clearInterval(this.state.consoleInterval);
                }

                this.setState({
                    serverLoading: false,
                    serverCompleted: true,
                    serverSuccess: true,
                    serverError: null,
                    consoleIsOpen: consoleIsOpen,
                })

                this.context.updateProgressBar(100);

                setTimeout(() => {
                    this.setState({
                        serverCompleted: false,
                        serverSuccess: false,
                        serverError: null,
                    });
                    this.context.updateProgressBar(0);
                }, 2000);
            }
        }, 1000);
    }

    async exportServer() {
        // Obtain server data
        await this.context.serverExport(this.props.router.params.id);
    }

    processConsoleOutput() {

        if (!this.state.consoleOutput || this.state.consoleOutput.length == 0) return;

        let output = this.state.consoleOutput;

        let out = output.map((line, index) => {
            return <span key={index}>{line}<br /></span>
        });

        return out;
    }

    async sendCommand() {

        let command = this.state.command;
        if (!command || command === "" || this.state.serverLoading || this.state.server && !this.state.server.running) return;

        // If command is stop, stop server.
        if (String(command).toLowerCase() === "stop" || String(command).toLowerCase() === "quit") {
            this.changeConsoleCommand("");
            this.initServer();
            return;
        }

        this.changeConsoleCommand("");
        this.context.serverCommand(this.props.router.params.id, command);
    }

    async removeServer() {

        if (this.state.removeLoading) return;

        let proceed = await this.context.createModal({
            data: {
                type: 'actiondelete',
                title: 'Are you sure you want to delete this server?',
            }
        });
        if (!proceed) return;

        this.setState({
            removeLoading: true,
            removeCompleted: false,
            removeSuccess: false,
            removeError: null,
        });

        this.context.updateProgressBar(10);

        let requestSuccess = false;

        this.context.serverRemove(this.props.router.params.id)
            .then(() => {
                requestSuccess = true;
            })
            .catch((err) => {
                requestSuccess = false;
                this.setState({
                    removeError: err,
                });
            })

        let inter = setInterval(() => {
            this.context.updateProgressBar(this.context.progressBarWidth + 1);
        }, 100);

        setTimeout(() => {

            clearInterval(inter);

            this.setState({
                removeLoading: false,
                removeCompleted: true,
                removeSuccess: requestSuccess,
            })

            this.context.updateProgressBar(100);

            setTimeout(() => {
                this.setState({
                    removeCompleted: false,
                    removeSuccess: false,
                    removeError: null,
                });
                this.context.updateProgressBar(0);

                if (requestSuccess) {
                    this.context.getRegistryServers();
                    document.location.href = "/servers";
                }
            }, 2000);

        }, 1500);

    }

    async updateServer() {

        if (!this.state.server.update || this.state.updateLoading) return;

        this.setState({
            updateLoading: true,
            updateCompleted: false,
            updateSuccess: false,
            updateError: null,
        });

        this.context.updateProgressBar(10);

        let currentState = this.state.server.update;
        await this.context.serverUpdate(this.props.router.params.id);

        let inter = setInterval(async () => {

            this.context.updateProgressBar(this.context.progressBarWidth + 1);

            // Wait until server change state.
            if (currentState !== this.context.registryServer.update) {
                clearInterval(inter);

                this.setState({
                    updateLoading: false,
                    updateCompleted: true,
                    updateSuccess: true,
                    updateError: null,
                })

                this.context.updateProgressBar(100);

                setTimeout(() => {
                    this.setState({
                        updateCompleted: false,
                        updateSuccess: false,
                        updateError: null,
                    });
                    this.context.updateProgressBar(0);
                }, 2000);
            }
        }, 1000);

    }

    changeConsoleCommand(command) {
        this.setState({
            command: command
        })
    }

    getContent() {
        return (
            <div className="relative | p-4  | flex flex-col | w-full h-full | sm:overflow-scroll | sm:no-scrollbar">

                <Recently server={this.state.server} />

                <div className="h-2/3 w-full | mt-5 | flex justify-between items-center | space-x-6">

                    <div
                        className={classNames(
                            "w-5/6 h-full z-10 | bg-white shadow-md rounded-md | dark:bg-gray-800 | hover:shadow-2xl dark:hover:shadow-blue-800 hover:shadow-blue-300",
                            "p-4",
                            "flex flex-col items-center justify-start",
                            "space-y-3"
                        )}
                        style={{
                            transition: "all 0.5s ease-in-out",
                        }}
                    >
                        {/* Butttons */}
                        {
                            this.state.server ?
                                (
                                    <div className={classNames(
                                        "w-full | h-14",
                                        "flex justify-between items-center",
                                    )}>
                                        <div className="flex justify-start items-center">
                                            <button
                                                className={classNames(
                                                    "flex items-center justify-center | px-4 py-2 | text-lg | rounded-md",
                                                    "hover:bg-gray-200 dark:hover:bg-gray-700",
                                                    "dark:bg-gray-600 | bg-gray-100 text-brand-blue dark:text-white | font-bold"
                                                )}
                                                onClick={() => {
                                                    this.initConsole();
                                                }}
                                            >
                                                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M20,19V7H4V19H20M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5C2,3.89 2.9,3 4,3H20M13,17V15H18V17H13M9.58,13L5.57,9H8.4L11.7,12.3C12.09,12.69 12.09,13.33 11.7,13.72L8.42,17H5.59L9.58,13Z" />
                                                </svg>
                                                {
                                                    this.state.consoleIsOpen ? "Close Console" : "Show Console"
                                                }
                                            </button>
                                        </div>
                                        <div className="flex justify-end items-center">
                                            {
                                                !this.state.server.update ?
                                                    (
                                                        <button
                                                            className={classNames(
                                                                "flex items-center justify-center | px-4 py-2 | text-lg | rounded-md | font-bold",
                                                                this.state.server && this.state.server.running ? "bg-gradient-to-tr from-red-800 to-red-500 text-white" : "bg-gradient-to-tr from-blue-800 to-blue-500 text-white"
                                                            )}
                                                            onClick={() => {
                                                                this.initServer();
                                                            }}
                                                        >
                                                            {
                                                                this.state.server && this.state.server.running ? "Stop Server" : "Start Server"
                                                            }
                                                            {
                                                                this.state.serverLoading ?
                                                                    (
                                                                        <svg role="status" className="inline ml-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                        </svg>
                                                                    )
                                                                    :
                                                                    this.state.serverCompleted ?
                                                                        (
                                                                            this.state.serverSuccess ?
                                                                                (
                                                                                    // Success Check SVG
                                                                                    <svg className="inline ml-3 w-4 h-4 text-white" viewBox="0 0 24 24">
                                                                                        <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                                                    </svg>
                                                                                ) :
                                                                                (
                                                                                    <svg className="inline ml-3 w-4 h-4 text-white" viewBox="0 0 24 24">
                                                                                        <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                                                    </svg>
                                                                                )
                                                                        ) : null
                                                            }
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className={classNames(
                                                                "flex items-center justify-center | px-4 py-2 | text-lg | rounded-md | font-bold",
                                                                "bg-gradient-to-tr from-red-800 to-red-500 text-white"
                                                            )}
                                                            onClick={() => {
                                                                this.updateServer();
                                                            }}
                                                        >
                                                            Update Server
                                                            {
                                                                this.state.updateLoading ?
                                                                    (
                                                                        <svg role="status" className="inline ml-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                        </svg>
                                                                    )
                                                                    :
                                                                    this.state.updateCompleted ?
                                                                        (
                                                                            this.state.updateSuccess ?
                                                                                (
                                                                                    // Success Check SVG
                                                                                    <svg className="inline ml-3 w-4 h-4 text-white" viewBox="0 0 24 24">
                                                                                        <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                                                    </svg>
                                                                                ) :
                                                                                (
                                                                                    <svg className="inline ml-3 w-4 h-4 text-white" viewBox="0 0 24 24">
                                                                                        <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                                                    </svg>
                                                                                )
                                                                        ) : null
                                                            }
                                                        </button>
                                                    )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classNames(
                                        "w-full | h-14",
                                        "flex justify-between items-center",
                                    )}>
                                        <div
                                            className={classNames(
                                                "flex items-center justify-center | px-4 py-2 | text-lg | rounded-md",
                                                "dark:bg-gray-900 | bg-gray-200",
                                                "w-1/6 h-12",
                                                "animate-pulse"
                                            )}
                                        >
                                        </div>
                                        <div
                                            className={classNames(
                                                "flex items-center justify-center | px-4 py-2 | text-lg | rounded-md",
                                                "dark:bg-gray-900 | bg-gray-200",
                                                "w-1/6 h-12",
                                                "animate-pulse"
                                            )}
                                        >
                                        </div>
                                    </div>
                                )
                        }
                        {
                            this.state.server ?
                                (
                                    <div
                                        className={classNames(
                                            this.state.consoleIsOpen ? "" : "h-0",
                                            "w-full h-full | flex flex-col justify-between items-center | space-y-4"
                                        )}
                                        style={{
                                            transition: "all 0.5s ease-in-out",
                                        }}
                                    >
                                        {/* CLI */}
                                        <div className={classNames(
                                            "relative w-full bg-black | rounded-lg | h-full | overflow-scroll",
                                        )}>
                                            <div className={classNames(
                                                "absolute top-0 left-0 bg-black opacity-70 | h-full w-full | shadow-md | px-4 py-2 | text-white",
                                            )}>
                                                <code
                                                    id="cli-output"
                                                >
                                                    {
                                                        this.state.consoleOutput && this.state.consoleOutput.length > 0 ? this.processConsoleOutput() : "No output yet"
                                                    }
                                                </code>
                                            </div>
                                        </div>
                                        <div className={classNames(
                                            this.state.consoleIsOpen ? "" : "w-0",
                                            "w-full h-12 dark:bg-gray-600 shadow-md text-gray-800 dark:text-white | rounded-lg | flex justify-between items-center",
                                        )}>
                                            <input
                                                className={classNames(
                                                    "w-full h-full | p-2 pl-4 | bg-transparent | border-none | outline-none"
                                                )}
                                                placeholder="Type here..."
                                                type="text"
                                                value={this.state.command}
                                                onChange={(e) => {
                                                    this.changeConsoleCommand(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key !== "Enter") {
                                                        return;
                                                    }
                                                    this.sendCommand();
                                                }}
                                            />
                                            <button
                                                className={classNames(
                                                    this.state.consoleIsOpen ? "" : "hidden",
                                                    "flex justify-end items-center | p-2 px-4 | bg-graii | rounded-lg | h-full | text-white | bg-gradient-to-tr from-blue-800 to-blue-500 | font-bold"
                                                )}
                                                onClick={() => this.sendCommand()}
                                            >
                                                Send
                                                <svg className="ml-3 w-5 h-5" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div
                                        className={classNames(
                                            "w-full h-full | bg-gray-200 dark:bg-gray-900 | rounded-lg | animate-pulse",
                                        )}
                                    />
                                )
                        }
                    </div>
                    <div
                        className={classNames(
                            "w-1/6 h-full | bg-white shadow-md rounded-md | dark:bg-gray-800 | hover:shadow-2xl dark:hover:shadow-blue-800 hover:shadow-blue-300",
                            "p-4",
                            "flex"
                        )}
                        style={{
                            transition: "all 0.5s ease-in-out",
                        }}
                    >
                        {/* Controls */}
                        {
                            this.state.server ?
                                (
                                    <ul className="w-full h-full | flex flex-col justify-between items-start">
                                        <div className="w-full space-y-4 | flex flex-col justify-start items-start">
                                            {/* <li className="w-full">
                                                <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-600 bg-gray-100 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold">
                                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                                                    </svg>
                                                    Settings
                                                </a>
                                            </li>
                                            <li className="w-full">
                                                <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-600 bg-gray-100 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold">
                                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                                                    </svg>
                                                    Properties
                                                </a>
                                            </li> */}
                                            <li className="w-full">
                                                <a
                                                    className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-600 bg-gray-100 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold"
                                                    onClick={() => this.exportServer()}
                                                >
                                                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z" />
                                                    </svg>
                                                    Export
                                                </a>
                                            </li>
                                            {/* {
                                                this.state.server &&
                                                    this.state.server.provider === "forge" ?
                                                    (
                                                        <li className="w-full">
                                                            <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-600 bg-gray-100 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold">
                                                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                                                    <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                                                                </svg>
                                                                Mods
                                                            </a>
                                                        </li>
                                                    ) : null
                                            } */}
                                        </div>
                                        <div className="mt-auto flex flex-col w-full">
                                            <li className="w-full">
                                                <button
                                                    className="flex items-center justify-center text-lg | px-4 py-2 | bg-transparent | border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white | w-full | rounded-lg | font-bold"
                                                    onClick={() => this.removeServer()}
                                                >
                                                    Remove
                                                    {
                                                        this.state.removeLoading ?
                                                            (
                                                                <svg role="status" className="inline ml-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                                </svg>
                                                            )
                                                            :
                                                            this.state.removeCompleted ?
                                                                (
                                                                    this.state.removeSuccess ?
                                                                        (
                                                                            // Success Check SVG
                                                                            <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                                                <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                                                            </svg>
                                                                        ) :
                                                                        (
                                                                            <svg className="inline ml-3 w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                                                <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                                                                            </svg>
                                                                        )
                                                                ) : null
                                                    }
                                                </button>
                                            </li>
                                        </div>
                                    </ul>
                                ) :
                                (
                                    <ul className="w-full h-full | flex flex-col justify-between items-start">
                                        <div className="w-full space-y-4 | flex flex-col justify-start items-start">
                                            <li className="w-full">
                                                <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-900 bg-gray-200 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold | animate-pulse | h-10">
                                                </a>
                                            </li>
                                            <li className="w-full">
                                                <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-900 bg-gray-200 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold | animate-pulse | h-10">
                                                </a>
                                            </li>
                                            <li className="w-full">
                                                <a className="flex items-center justify-between text-lg | px-4 py-2 | dark:bg-gray-900 bg-gray-200 dark:text-white | text-brand-blue | w-full | rounded-lg | font-bold | animate-pulse | h-10">
                                                </a>
                                            </li>
                                        </div>
                                        <div className="mt-auto flex flex-col w-full">
                                            <li className="w-full">
                                                <a className="flex items-center justify-center text-lg | px-4 py-2 | bg-transparent | border-2 bg-red-800 border-red-800 hover:text-white | w-full | rounded-lg | font-bold | animate-pulse | h-10">
                                                </a>
                                            </li>
                                        </div>
                                    </ul>
                                )
                        }
                    </div>

                </div>

            </div>
        )
    }

}
Server.contextType = Context;

export default withRouter(Server);