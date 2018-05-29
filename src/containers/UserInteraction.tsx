import * as React from "react";
import MessageHistory from "./MessageHistory";
import SendingMessage from "./SendingMessage";

interface IUserInteractionProps {
    currentUser : string
}

class UserInteraction extends React.Component<IUserInteractionProps, {}> {
    constructor(props: IUserInteractionProps) {
        super(props);
    }

    public render() {
        return (
            <div className="right">
                <MessageHistory currentUser={this.props.currentUser}/>
                <SendingMessage/>
            </div>
        );
    }
}

export default UserInteraction;