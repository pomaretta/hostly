import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Sidebar from './base/Sidebar';
import Navbar from './base/Navbar';
import ProgressBar from "./base/ProgressBar";

class Test extends Component {
    render() {
        return (
            <div className="w-screen h-screen min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased | bg-gray-50 text-gray-800 | dark:bg-zinc-900 dark:text-white">
                <Helmet>
                    <title>Test</title>
                </Helmet>
                <Sidebar />
                <div className="relative w-full h-full">
                    <Navbar title="Testing" />
                    <ProgressBar />
                </div>
            </div>
        );
    }
}

export default Test;