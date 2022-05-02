import Page from "../components/Page";
import Context from "../context/App";
import { classNames } from "../utils/Utils";

class Dashboard extends Page {

    title = "Dashboard";
    heading = "Dashboard";

    getContent() {
        return (
            <div>
            </div>
        )
    }

}
Dashboard.contextType = Context;

export default Dashboard;