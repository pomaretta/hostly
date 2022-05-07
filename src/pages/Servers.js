import Page from "../components/Page";
import Context from "../context/App";
import { classNames } from "../utils/Utils";

function Server(props) {

    let providerImage = "/images/vanilla.png"
    switch (props.data.provider) {
        case "vanilla":
            providerImage = "/images/vanilla.png"
            break;
        case "forge":
            providerImage = "/images/forge.jpeg"
            break;
        default:
            providerImage = "/images/vanilla.png"
            break;
    }

    return (
        <a
            key={props.key}
            className="w-full rounded-md | bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl | h-24 | flex items-center justify-between | p-4 | cursor-pointer"
            style={{
                transition: "all 0.5s ease-in-out",
            }}
            href={`/servers/${props.data.id}`}
        >
            <div className="w-auto | flex items-center justify-start | h-full | space-x-6">
                <img className="w-16 h-16 rounded-lg" src={providerImage} />
                <div className="flex flex-col items-start justify-center | h-full">
                    <h5 className="text-xl font-bold">
                        {
                            props.data.extra && props.data.extra.properties && props.data.extra.properties.motd ?
                                props.data.extra.properties.motd
                                : props.data.id
                        }
                    </h5>
                    <p className="text-md">
                        {
                            String(props.data.provider).replace(/\b\w/g, l => l.toUpperCase())
                        }
                        <span className="ml-3 font-bold">
                            {props.data.version}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col items-start justify-center | h-full w-auto">
                    <h5 className="text-xl font-bold">Current IP</h5>
                    <p className="text-md font-bold | flex space-x-2">
                        <span>
                            {
                                props.data.ip
                            }
                            {
                                props.data.extra && props.data.extra.properties && props.data.extra.properties.port ?
                                    `:${props.data.extra.properties.port}`
                                    : ":25565"
                            }
                        </span>
                        <a
                            className="w-5 h-5 ml-2 text-brand-blue tooltip tooltip-right tooltip-primary"
                            data-tip="Successfully copied to clipboard!"
                            onMouseLeave={() => navigator.clipboard.writeText("188.79.0.21:25565")}
                        >
                            <svg viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                            </svg>
                        </a>
                    </p>

                </div>
            </div>
            <div className="w-auto | flex justify-end items-center | space-x-6">
                <div className="flex items-center justify-center">
                    <span className="mr-5 font-bold text-md">Players</span>
                    <div class="avatar-group -space-x-6">
                        <div class="avatar">
                            <div class="w-12">
                                <img src="https://api.lorem.space/image/face?hash=4818" />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-12">
                                <img src="https://api.lorem.space/image/face?hash=40311" />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-12">
                                <img src="https://api.lorem.space/image/face?hash=84348" />
                            </div>
                        </div>
                        <div class="avatar placeholder">
                            <div class="w-12 bg-gray-200 dark:bg-gray-800 dark:text-neutral-content text-black">
                                <span>+5</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-col justify-between items-center | space-y-2">
                    <button className="uppercase | w-full h-full | text-sm | font-bold | px-4 py-1 | bg-green-500 | rounded-md">
                        {
                            props.data.running ? "Running" : "Stopped"
                        }
                    </button>
                    <button className="btn btn-sm btn-primary | w-full | z-20">
                        Run
                        <svg className="animate-spin ml-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
        </a>
    );
}

function Recently(props) {
    return (
        <div
            className="h-64 | flex justify-between items-center | space-x-6"
        >
            <div
                className="relative | w-4/6 h-full | flex justify-between items-center | text-white shadow-lg rounded-lg | overflow-hidden | hover:shadow-2xl hover:shadow-orange-300 dark:hover:shadow-orange-600"
                style={{
                    transition: "all 0.5s ease-in-out",
                }}
            >
                <div className="w-3/6 h-full | flex flex-col items-center justify-start z-10">
                    <div className="h-1/4 w-full | p-4 | flex items-center justify-start">
                        <h3 className="text-3xl font-bold">Recently Played</h3>
                    </div>
                    <div className="h-3/4 w-full | p-4 | flex items-center justify-center">
                        <div className="relative h-full w-full | rounded-md | shadow | overflow-hidden">
                            <div className="absolute top-0 left-0 bg-black opacity-70 | h-full w-full" />
                        </div>
                    </div>
                </div>
                <div className="w-3/6 h-full | relative | overflow-hidden">
                    <div
                        className="absolute | w-full h-full | flex justify-center items-center | z-10"
                    >
                        <div className="w-1/4 h-auto cursor-pointer">
                            <lord-icon
                                src="/resources/play-orange.json"
                                trigger="hover"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 bg-black opacity-30 | h-full w-full" />
                <img className="absolute w-full" src="https://www.whatspaper.com/wp-content/uploads/2021/07/minecraft-wallpaper-whatspaper-14.jpg" alt="" />
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
                <div className="h-14 w-full | bg-gray-100 dark:bg-gray-700 | flex items-center justify-start | py-4 px-2">
                    <h3 className="text-3xl font-bold | py-1 px-4 | rounded-md | dark:text-blue-500 text-brand-blue">Friends</h3>
                </div>
                <div className="py-4 px-2 | overflow-scroll | flex justify-center items-start | w-full h-full">
                    <div className="dark:bg-gray-700 bg-gray-100 | text-brand-blue dark:text-white | w-full h-12 | rounded-md | flex justify-between items-center | px-4 | hover:shadow-lg | cursor-pointer">
                        <div className="w-auto | flex justify-start items-center | space-x-4">
                            <p className="font-bold">pomaretta</p>
                        </div>
                        <div className="w-auto | flex items-center justify-end | space-x-4">
                            <p className="text-green-600 | font-bold | uppercase">online</p>
                            <span>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,3C6.5,3 2,6.58 2,11C2.05,13.15 3.06,15.17 4.75,16.5C4.75,17.1 4.33,18.67 2,21C4.37,20.89 6.64,20 8.47,18.5C9.61,18.83 10.81,19 12,19C17.5,19 22,15.42 22,11C22,6.58 17.5,3 12,3M12,17C7.58,17 4,14.31 4,11C4,7.69 7.58,5 12,5C16.42,5 20,7.69 20,11C20,14.31 16.42,17 12,17Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Servers extends Page {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            interval: null,
            overrideRoute: 1,
        };

    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.context.getRegistryServers();
            }, 10000)
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    async importServer() {
        await this.context.serverImport();
    }

    getContent() {
        return (
            <div className="flex flex-col w-full">
                <div className="relative | p-4 | space-y-6 | flex flex-col | w-full">

                    <Recently />

                    <div className="flex justify-between items-center">
                        <div className={classNames(
                            "flex items-center justify-start | space-x-4"
                        )}>
                            <h4 className="font-bold | text-3xl">
                                Servers
                            </h4>
                            <button
                                className={classNames(
                                    "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                    "bg-gradient-to-tr from-blue-800 to-blue-500 text-white",
                                    "btn btn-sm capitalize",
                                    "border-0",
                                    "hover:shadow-blue-900 hover:shadow-md"
                                )}
                            >
                                Create
                            </button>
                            <button
                                className={classNames(
                                    "flex items-center justify-center | px-4 py-2 | text-md | rounded-md | font-bold",
                                    "bg-gradient-to-tr from-orange-800 to-orange-500 text-white",
                                    "btn btn-sm capitalize",
                                    "border-0",
                                    "hover:shadow-orange-900 hover:shadow-md"
                                )}
                                onClick={() => this.importServer()}
                            >
                                Import
                            </button>
                        </div>
                        <div>
                            <button type="button" class="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-gray-700 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-none text-slate-300 dark:text-slate-400" aria-hidden="true"><path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6"></circle></svg><span class="flex-auto">Quick search...</span><kbd class="font-sans font-semibold dark:text-slate-500"><abbr title="Command" class="no-underline text-slate-300 dark:text-slate-500">⌘</abbr> K</kbd></button>
                        </div>
                    </div>

                    <div className="w-full | flex flex-col justify-start items-center | space-y-4">
                        {
                            this.context.registryServers && this.context.registryServers.objects.length > 0 ?
                                (
                                    this.context.registryServers.objects.map((server, index) => {
                                        return <Server data={server} key={index} />
                                    })
                                ) : null
                        }
                    </div>

                </div>

                {/* <div className="flex items-center justify-center | mb-5 | w-full">
                    <div class="btn-group">
                        <button class="btn">«</button>
                        <button class="btn">Page 22</button>
                        <button class="btn">»</button>
                    </div>
                </div> */}

            </div>
        )
    }

}
Servers.contextType = Context;

export default Servers;