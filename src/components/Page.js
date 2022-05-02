import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ProgressBar from "./base/ProgressBar";
import Navbar from "../components/base/Navbar";
import Sidebar from "../components/base/Sidebar";


class Page extends Component {

    title = "";
    heading = "";

    getContent() {
        throw new Error("Method not implemented");
    }

    render() {
        return (
            <div className="w-screen h-screen min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased | bg-gray-50 text-gray-800 | dark:bg-zinc-900 dark:text-white">
                <Helmet>
                    <title>{this.title}</title>
                </Helmet>
                <Sidebar />
                <div className="relative w-full h-full | overflow-scroll | no-scrollbar">
                    <Navbar title={this.heading} />
                    {this.getContent()}
                    <ProgressBar />
                </div>
            </div>
        )
    }
}

export default Page;