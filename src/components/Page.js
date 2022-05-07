import React, { Component } from "react";
import { Helmet } from "react-helmet";
import ProgressBar from "./base/ProgressBar";
import Navbar from "../components/base/Navbar";
import Sidebar from "../components/base/Sidebar";
import Modal from "../components/base/Modal";
import Context from "../context/App";


class Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            heading: "",
            highlight: "hostly",
            overrideRoute: null,
            title: "",
        }
        this.state = this.getState(this.state);

        this.setHeading = this.setHeading.bind(this);
        this.setHighlight = this.setHighlight.bind(this);
    }

    componentDidMount() {
        this.getOnMount();
    }

    getState(currentState) {
        return currentState;
    }

    getOnMount() {}

    getContent() {}

    setHeading(heading) {
        this.setState({
            heading: heading
        });
    }

    setHighlight(highlight) {
        this.setState({
            highlight: highlight
        });
    }

    render() {
        return (
            <div className="w-screen h-screen min-h-screen flex flex-row flex-auto flex-shrink-0 antialiased | bg-gray-50 text-gray-800 | dark:bg-zinc-900 dark:text-white">
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>
                <Sidebar overrideRoute={this.state.overrideRoute} />
                <Modal />
                <div className="relative w-full h-full | overflow-scroll | no-scrollbar | flex flex-col justify-start items-start">
                    <Navbar title={this.state.heading} highlight={this.state.highlight} />
                    {this.getContent()}
                    <ProgressBar />
                </div>
            </div>
        )
    }
}
Page.contextType = Context;

export default Page;