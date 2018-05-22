import * as React from "react";
import Actions from './Actions';
import MessageHistory from "./MessageHistory";
import SendingMessage from "./SendingMessage";



class UserInteraction extends React.Component {
    public render() {
        return (
            <div className="right">
                <Actions/>
                <MessageHistory/>
                <SendingMessage/>
            </div>
        );
    }
}

export default UserInteraction;