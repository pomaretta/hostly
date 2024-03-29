import { Component } from "react";

import Context from '../../context/App';
import { classNames } from "../../utils/Utils";

class ProgressBar extends Component {

    render() {
        return (
            <div className={classNames(
                this.context.progressBarWidth > 0 ? '' : 'hidden',
                "w-full h-2 absolute bottom-0 left-0 z-10"
            )}>
                <div className="h-full bg-primary dark:bg-blue-500" style={{
                    width: `${this.context.progressBarWidth}%`,
                    transition: 'width 0.5s ease-in-out'
                }} />
            </div>
        )
    }

}
ProgressBar.contextType = Context;

export default ProgressBar;