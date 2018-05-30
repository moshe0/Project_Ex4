import * as React from "react";
import {Message} from "../Model/Message";
import {DB} from "../dataBase/DB";
import StateStore from "../state/StateStore";


interface IMessageState{
    Messages: Message[];
}

class MessageHistory extends React.Component <{}, IMessageState>{

    stateStore = StateStore.getInstance();
    messagesBlock : any;

    constructor(props: {}) {
        super(props);
        this.messagesBlock = React.createRef();
        this.state = {
            Messages : DB.GetMessages(this.stateStore.get('currentUser').getName(), this.stateStore.get('Reciver').getName()),
        };

        this.stateStore.subscribe(()=>{
            this.setState({
                Messages: DB.GetMessages(this.stateStore.get('currentUser').getName(), this.stateStore.get('Reciver').getName())
            })
        });
    }


    componentDidMount(){
        this.messagesBlock.current.scrollTop = this.messagesBlock.current.scrollHeight;
    }

    componentDidUpdate(){
        this.messagesBlock.current.scrollTop = this.messagesBlock.current.scrollHeight;
    }

    public render() {
        const listMessages = this.state.Messages.map((item, idx) => {
            const itemClassName = this.stateStore.get('currentUser').Name === item.SendingUser? 'MineMessage MessageHistory' : 'OtherMessage MessageHistory';
            return (
                <div className={'message'} key={idx}>
                    <div className={itemClassName}>
                        {item.Content}
                        <br/>
                        <div className={'MessageTime'}>{item.TimeSent}</div>
                    </div>
                </div>
            );
        });

        return (
            <div className="content" ref={this.messagesBlock}>
                {listMessages}
            </div>
        );
    }
}

export default MessageHistory;