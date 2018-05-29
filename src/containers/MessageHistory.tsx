import * as React from "react";
import {Message} from "../Model/Message";
import {DB} from "../dataBase/DB";
import StateStore from "../state/StateStore";


interface IMessageState{
    Messages: Message[];
}

class MessageHistory extends React.Component <{}, IMessageState>{

    StateStore = StateStore.getInstance();

    constructor(props: {}) {
        super(props);

        this.state = {
            Messages : new DB().GetMessages(),
        }
    }

    public render() {
        const listMessages = this.state.Messages.map((item, idx) => {
            const itemClassName = this.StateStore.get('currentUser').Name === item.SendingUser? 'MineMessage MessageHistory' : 'OtherMessage MessageHistory';
            if(this.StateStore.get('currentUser') === item.SendingUser){
                return (
                    <div className={'message'} key={idx}>
                        <div className={itemClassName}>
                            {item.Content}
                            <br/>
                            <div className={'MessageTime'}>{item.TimeSent}</div>
                        </div>
                    </div>
                );
            }

            else{
                return (
                    <div className={'message'} key={idx}>
                        <div className={itemClassName}>
                            {item.Content}
                            <br/>
                            <div className={'MessageTime'}>{item.TimeSent}</div>
                        </div>
                    </div>
                );
            }

        });

        return (
            <div className="content">
                {/* <div className={'Date'}>aaaa</div> */}
                {listMessages}
            </div>
        );
    }
}

export default MessageHistory;