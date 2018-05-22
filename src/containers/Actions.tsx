import * as React from "react";

class Actions extends React.Component {
    public render() {
        return (
            <div className="toolbar">
                <button className="load">Load</button>
                <button className="clear">Clear</button>
            </div>
        );
    }
}

export default Actions;