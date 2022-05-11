import { Component } from 'react';
import Context from '../../context/App';
import { classNames } from '../../utils/Utils';

function ActionDelete(props) {
    return (
        <div className='w-full h-full | flex justify-center items-center'>
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal"
                            onClick={() => {
                                props.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                        proceed: false,
                                    }
                                })
                            }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="p-6 pt-0 text-center">
                        <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="mb-5 text-2xl sm:text-lg font-normal text-gray-500 dark:text-gray-400">
                            {
                                props.data && props.data.title ? props.data.title : null
                            }
                        </h3>
                        <button
                            type="button" className="sm:w-auto w-full text-center mb-5 sm:mb-0 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg | text-2xl sm:text-sm | justify-center sm:justify-start sm:inline-flex | items-center px-5 py-2.5 mr-2"
                            onClick={() => {
                                props.changeState({
                                    show: false,
                                    pressed: {
                                        status: "completed",
                                        proceed: true,
                                    }
                                })
                            }}
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            type="button" className="sm:w-auto w-full text-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg | text-2xl sm:text-sm | justify-center sm:justify-start sm:inline-flex | border border-gray-200 font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                            onClick={() => {
                                props.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                        proceed: false,
                                    }
                                })
                            }}
                        >No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

class ServerCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,

            serverType: null,
            serverVersion: null,

            propertiesPath: "",
            iconPath: "",
            worldPath: "",
            modsPath: "",

            creationLoading: false,
            creationCompleted: false,
            creationSuccess: false,
            creationErrorMessage: null,
        }

    }

    componentDidMount() {
        this.context.getAvailableVersions();
    }

    vanillaFeatures() {
        return (
            <div className='w-full h-full | flex flex-col items-center justify-start | p-4 | space-y-4'>
                <p className='text-xl'>
                    - Base server
                </p>
                <p className='text-xl'>
                    - Client don't need to install anything
                </p>
            </div>
        );
    }

    forgeFeatures() {
        return (
            <div className='w-full h-full | flex flex-col items-center justify-start | p-4 | space-y-4'>
                <p className='text-xl'>
                    - Vanilla Features
                </p>
                <p className='text-xl'>
                    - Forge Mods
                </p>
                <p className='text-xl'>
                    - Client needs to install mods locally
                </p>
            </div>
        );
    }

    spigotFeatures() {
        return (
            <div className='w-full h-full | flex flex-col items-center justify-start | p-4 | space-y-4'>
                <p className='text-xl'>
                    - Vanilla Features
                </p>
                <p className='text-xl'>
                    - CraftBukkit Plugins
                </p>
                <p className='text-xl'>
                    - Optimized server, fast and stable
                </p>
            </div>
        );
    }

    renderServerCard() {
        switch (this.state.serverType) {
            case "vanilla":
                return this.vanillaFeatures();
            case "forge":
                return this.forgeFeatures();
            case "spigot":
                return this.spigotFeatures();
            default:
                return null;
        }
    }

    renderServerImage() {
        switch (this.state.serverType) {
            case "vanilla":
                return "/images/vanilla.png";
            case "forge":
                return "/images/forge.jpeg";
            case "spigot":
                return "/images/spigot.png";
            default:
                return null;
        }
    }

    versionStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex items-center justify-between | space-x-4'>
                    <div className='w-1/3 h-full | flex flex-col items-center justify-start | space-y-4 | p-4'>
                        <h3 className='text-2xl | font-bold'>
                            Provider
                        </h3>
                        <div class="input-group | flex items-center justify-center">
                            <select
                                class="select | bg-gray-100 dark:bg-gray-800"
                                onChange={(e) => {
                                    this.setState({
                                        serverType: String(e.target.value).toLowerCase(),
                                        serverVersion: null,
                                        propertiesPath: "",
                                        iconPath: "",
                                        worldPath: "",
                                        modsPath: "",
                                    });
                                }}
                                defaultValue={this.state.serverType}
                            >
                                <option disabled
                                    selected={this.state.serverType === null}
                                >Select provider</option>
                                {
                                    this.context.availableVersions ?
                                        this.context.availableVersions.getProviders().map((provider) => {
                                            return <option value={provider}>{
                                                String(provider).charAt(0).toUpperCase() + String(provider).slice(1)
                                            }</option>
                                        }) : null
                                }
                            </select>
                        </div>
                        <h3 className='text-2xl | font-bold'>
                            Version
                        </h3>
                        <div class="input-group | flex items-center justify-center">
                            <select class="select | bg-gray-100 dark:bg-gray-800"
                                onChange={(e) => {
                                    this.setState({
                                        serverVersion: String(e.target.value),
                                    });
                                }}
                                defaultValue={this.state.serverVersion}
                            >
                                <option disabled
                                    selected={this.state.serverVersion === null}
                                >Select version</option>
                                {
                                    this.context.availableVersions && this.state.serverType !== null ?
                                        this.context.availableVersions.getProviderVersions(this.state.serverType).map((version) => {
                                            return <option value={version}>{
                                                version
                                            }</option>
                                        }) : null
                                }
                            </select>
                        </div>
                    </div>
                    <div className='w-2/3 h-full | p-4'>
                        {
                            this.state.serverType ?
                                (
                                    <div className='w-full h-full | bg-transparent | rounded-lg | border-2 border-gray-200 | flex flex-col items-center justify-between'>
                                        <div className='w-full h-20 | flex items-center justify-start | p-4 | space-x-6 | border-b-2'>
                                            <img className='w-auto h-full | rounded-lg' src={this.renderServerImage()} alt="Server Type Image" />
                                            <h4 className='text-2xl | font-bold'>
                                                {
                                                    this.state.serverType.charAt(0).toUpperCase() + this.state.serverType.slice(1)
                                                }
                                                <span className='ml-2'>
                                                    Server
                                                </span>
                                            </h4>
                                        </div>
                                        {
                                            this.renderServerCard()
                                        }
                                    </div>
                                ) : null
                        }
                    </div>
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                if (this.state.serverType == "" || this.state.serverVersion == null) {
                                    this.context.sendError("Please select a server type and version");
                                    return;
                                }
                                this.setState({
                                    currentStep: this.state.currentStep + 1,
                                })
                            }}
                        >
                            Next Step
                        </button>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    modsStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex flex-col items-center justify-center | space-y-4'>
                    <div class="flex flex-col justify-center items-center space-y-4">
                        <p className="form-label inline-block mb-2 dark:text-white text-gray-700">Mods file (Optional)</p>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gray-200 dark:bg-gray-800"
                            )}
                            onClick={() => {
                                this.context.getLocalPath({
                                    directory: false
                                }).then(r => {
                                    this.setState({
                                        modsPath: r,
                                    });
                                });
                            }}
                        >
                            Select mods file
                            {
                                this.state.modsPath ?
                                    (
                                        <svg className="inline ml-3 w-4 h-4 text-green-500 dark:text-green-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                        </svg>
                                    ) : null
                            }
                        </button>
                    </div>
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.setState({
                                    currentStep: this.state.currentStep + 1,
                                })
                            }}
                        >
                            Next Step
                        </button>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    propertiesStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex flex-col items-center justify-center | space-y-4'>
                    <div class="flex flex-col justify-center items-center space-y-4">
                        <p className="form-label inline-block mb-2 dark:text-white text-gray-700">Properties File (Optional)</p>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gray-200 dark:bg-gray-800"
                            )}
                            onClick={() => {
                                this.context.getLocalPath({
                                    directory: false
                                }).then(r => {
                                    this.setState({
                                        propertiesPath: r,
                                    });
                                });
                            }}
                        >
                            Select file
                            {
                                this.state.propertiesPath ?
                                    (
                                        <svg className="inline ml-3 w-4 h-4 text-green-500 dark:text-green-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                        </svg>
                                    ) : null
                            }
                        </button>
                    </div>
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.setState({
                                    currentStep: this.state.currentStep + 1,
                                })
                            }}
                        >
                            Next Step
                        </button>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    iconStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex flex-col items-center justify-center | space-y-4'>
                    <div class="flex flex-col justify-center items-center space-y-4">
                        <p className="form-label inline-block mb-2 dark:text-white text-gray-700">Icon Image (Optional)</p>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gray-200 dark:bg-gray-800"
                            )}
                            onClick={() => {
                                this.context.getLocalPath({
                                    directory: false
                                }).then(r => {
                                    this.setState({
                                        iconPath: r,
                                    });
                                });
                            }}
                        >
                            Select icon
                            {
                                this.state.iconPath ?
                                    (
                                        <svg className="inline ml-3 w-4 h-4 text-green-500 dark:text-green-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                        </svg>
                                    ) : null
                            }
                        </button>
                    </div>
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.setState({
                                    currentStep: this.state.currentStep + 1,
                                })
                            }}
                        >
                            Next Step
                        </button>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    worldStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex flex-col items-center justify-center | space-y-4'>
                    <div class="flex flex-col justify-center items-center space-y-4">
                        <p className="form-label inline-block mb-2 dark:text-white text-gray-700">World Folder (Optional)</p>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gray-200 dark:bg-gray-800"
                            )}
                            onClick={() => {
                                this.context.getLocalPath({
                                    directory: true
                                }).then(r => {
                                    this.setState({
                                        worldPath: r,
                                    });
                                });
                            }}
                        >
                            Select world
                            {
                                this.state.worldPath ?
                                    (
                                        <svg className="inline ml-3 w-4 h-4 text-green-500 dark:text-green-400" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                                        </svg>
                                    ) : null
                            }
                        </button>
                    </div>
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.setState({
                                    currentStep: this.state.currentStep + 1,
                                })
                            }}
                        >
                            Next Step
                        </button>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    summaryStep() {
        return (
            <div className="flex flex-col justify-between items-center | h-full w-full">
                <div className='w-full h-full | px-4 | flex flex-col justify-start items-center | space-y-4'>

                    <div className='flex justify-start items-center | space-x-4'>
                        <span className='text-xl font-bold'>Provider</span>
                        <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                            {
                                String(this.state.serverType).charAt(0).toUpperCase() + String(this.state.serverType).slice(1)
                            }
                        </span>
                    </div>
                    <div className='flex justify-start items-center | space-x-4'>
                        <span className='text-xl font-bold'>Version</span>
                        <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                            {
                                String(this.state.serverVersion)
                            }
                        </span>
                    </div>
                    {
                        this.state.serverType === "forge" && this.state.modsPath !== "" ?
                            (
                                <div className='flex justify-start items-center | space-x-4'>
                                    <span className='text-xl font-bold'>Mods</span>
                                    <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                                        {
                                            this.state.modsPath
                                        }
                                    </span>
                                </div>
                            ) : null
                    }
                    {
                        this.state.propertiesPath !== "" ?
                            (
                                <div className='flex justify-start items-center | space-x-4'>
                                    <span className='text-xl font-bold'>Properties</span>
                                    <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                                        {
                                            this.state.propertiesPath
                                        }
                                    </span>
                                </div>
                            ) : null
                    }
                    {
                        this.state.iconPath !== "" ?
                            (
                                <div className='flex justify-start items-center | space-x-4'>
                                    <span className='text-xl font-bold'>Icon</span>
                                    <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                                        {
                                            this.state.iconPath
                                        }
                                    </span>
                                </div>
                            ) : null
                    }
                    {
                        this.state.worldPath !== "" ?
                            (
                                <div className='flex justify-start items-center | space-x-4'>
                                    <span className='text-xl font-bold'>World</span>
                                    <span className='text-md | px-4 py-2 | bg-gray-200 dark:bg-gray-800 rounded-lg'>
                                        {
                                            this.state.worldPath
                                        }
                                    </span>
                                </div>
                            ) : null
                    }
                </div>
                <div className='w-full h-20 | flex justify-between items-center | px-4'>
                    <div className='h-full'>
                    </div>
                    <div className='h-full | flex items-center justify-end | space-x-4'>
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-blue-900",
                                "px-4"
                            )}
                            onClick={() => {
                                if (this.state.creationLoading) return;
                                this.createServer();
                            }}
                        >
                            Create
                            {
                                this.state.creationLoading ?
                                    (
                                        <svg role="status" className="inline ml-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                    )
                                    :
                                    this.state.creationCompleted ?
                                        (
                                            this.state.creationSuccess ?
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
                        <button
                            className={classNames(
                                "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                "bg-gradient-to-tr from-red-800 to-red-500 text-white",
                                "btn btn-sm capitalize",
                                "border-0",
                                "hover:shadow-red-900",
                                "px-4"
                            )}
                            onClick={() => {
                                if (this.state.creationLoading) return;
                                this.context.changeState({
                                    show: false,
                                    pressed: {
                                        status: "rejected",
                                    }
                                })
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    getSteps() {
        let steps = [
            "Version",
            this.state.serverType === "forge" ? "Mods" : null,
            "Properties",
            "Icon",
            "World",
            "Summary",
        ];
        // Remove null steps
        steps = steps.filter(step => step);
        return steps;
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return this.versionStep();
            case 1: case 2:
                if (this.state.serverType === "forge" && step === 1) {
                    return this.modsStep();
                } else if (this.state.serverType == "forge" && step === 2) {
                    return this.propertiesStep();                
                } else if (this.state.serverType !== "forge" && step === 1) {
                    return this.propertiesStep();
                } else {
                    return this.iconStep();
                }
            case 3:
                if (this.state.serverType === "forge" && step === 3) {
                    return this.iconStep();
                }
                return this.worldStep();
            case 4: case 5:
                if (this.state.serverType === "forge" && step === 4) {
                    return this.worldStep();
                }
                return this.summaryStep();
            default:
                return "Unknown step";
        }
    }

    async createServer() {

        if (this.state.creationLoading) return;

        this.setState({
            creationLoading: true,
            creationCompleted: false,
            creationSuccess: false,
            creationErrorMessage: null,
        });

        this.context.updateProgressBar(10);

        let extras = {};

        if (this.state.propertiesPath !== "") {
            extras["properties"] = this.state.propertiesPath;
        }
        if (this.state.iconPath !== "") {
            extras["icon"] = this.state.iconPath;
        }
        if (this.state.worldPath !== "") {
            extras["world"] = this.state.worldPath;
        }
        if (this.state.modsPath !== "") {
            extras["mods"] = this.state.modsPath;
        }

        let inter = setInterval(() => {
            this.context.updateProgressBar(this.context.progressBarWidth + 1);
        }, 500);

        let newId = null;
        let requestSuccess = false;
        await this.context.serverCreate(
            this.state.serverType,
            this.state.serverVersion,
            extras,
        ).then(res => {
            newId = res;
            requestSuccess = true;
        }).catch(err => {
            requestSuccess = false;
            this.context.sendError(String(err.message));
            this.setState({
                creationErrorMessage: err,
            });
        })

        clearInterval(inter);

        setTimeout(() => {
            this.setState({
                creationLoading: false,
                creationCompleted: true,
                creationSuccess: requestSuccess,
            })
            this.context.updateProgressBar(100);
            setTimeout(() => {
                this.setState({
                    creationCompleted: false,
                    creationSuccess: false,
                    creationErrorMessage: null,
                });
                this.context.updateProgressBar(0);
                if (requestSuccess) {
                    this.context.getRegistryServers();
                    this.props.changeState({
                        show: false,
                        pressed: {
                            status: "completed",
                            proceed: true,
                        }
                    })
                }
            }, 2000);
        }, 1500);
    }

    render() {
        return (
            <div className='w-full h-full | flex justify-center items-center'>
                <div className={classNames(
                    'w-2/3 h-2/3 | bg-white dark:bg-gray-700 | z-20 | rounded-lg | shadow-lg',
                    'flex flex-col justify-start items-center'
                )}>
                    <div className='relative w-full h-28 | px-4 py-2 | flex items-center justify-center'>
                        <div className={classNames(
                            'absolute | h-full w-24 | top-0 left-0',
                            'flex items-center justify-center',
                            this.state.currentStep == 0 ? 'hidden' : ''
                        )}>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 bg-gray-100 dark:bg-gray-900 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal"
                                onClick={() => {
                                    if (this.state.creationLoading) return;
                                    this.setState({
                                        currentStep: this.state.currentStep - 1,
                                    })
                                }}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <ul class="steps">
                            {
                                this.getSteps().map((step, index) => {

                                    if (step === null) {
                                        return null;
                                    }

                                    return <li class={classNames(
                                        "step",
                                        this.state.currentStep === index || this.state.currentStep > index ? "step-primary" : null,
                                    )}>{step}</li>
                                })
                            }
                        </ul>
                        <div className={classNames(
                            'absolute | h-full w-24 | top-0 right-0',
                            'flex items-center justify-center'
                        )}>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 bg-gray-100 dark:bg-gray-900 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal"
                                onClick={() => {
                                    this.props.changeState({
                                        show: false,
                                        pressed: {
                                            status: "rejected",
                                            proceed: false,
                                        }
                                    })
                                }}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-full'>
                        {
                            this.getStepContent(this.state.currentStep)
                        }
                    </div>
                </div>

            </div>
        )
    }
}
ServerCreator.contextType = Context;

class Modal extends Component {

    getModal() {
        if (!this.context.show || !(this.context.data && this.context.data.type)) {
            return null;
        }
        switch (String(this.context.data.type).toLowerCase()) {
            // case "actionplaceorder":
            //     return <ActionPlaceOrder data={this.context.data} changeState={this.context.changeState} />
            case "actiondelete":
                return <ActionDelete data={this.context.data} changeState={this.context.changeState} />;
            case "servercreator":
                return <ServerCreator data={this.context.data} changeState={this.context.changeState} />;
            default:
                return null;
        }
    }

    render() {

        return (
            <div className={classNames(
                this.context.show ? 'fixed' : 'hidden',
                "z-40 | top-0 left-0 | w-screen h-screen"
            )}>
                <div
                    className='absolute | top-0 left-0 | bg-gray-700 dark:bg-black opacity-40 | w-full h-full'
                    onClick={() => {
                        this.context.changeState({
                            show: false,
                            pressed: {
                                status: "rejected",
                            }
                        })
                    }}
                ></div>
                {
                    this.context.show ?
                        this.getModal()
                        : null
                }
            </div>
        )
    }

}
Modal.contextType = Context;

export default Modal;