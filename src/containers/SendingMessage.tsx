import * as React from "react";
import Btn from "../components/Btn";


class SendingMessage extends React.Component {
    public render() {
        return (
            <div className={'SendingMessage'}>
                <input type='text' className='MessageInput'/>
                <Btn/>
            </div>
        );
    }
}

export default SendingMessage;