import * as React from "react";
import StateStore from "../State/StateStore";
import {User} from "../Model/User";

interface IHeaderState {
    currentUser : User
}


class Header extends React.Component<{},IHeaderState>  {


    constructor(props: {}) {
        super(props);

        this.state = {
            currentUser: StateStore.getInstance().get('currentUser')
        };

        StateStore.getInstance().subscribe(() => {
            this.setState({
                currentUser: StateStore.getInstance().get('currentUser'),
            });
        });
    }


    public render() {
        let userName = 'Not connected';
        if(!! this.state.currentUser)
            userName = this.state.currentUser.Name;
        return (
            <div className="Header">
                <div className="LoginImage"/>
                <div className="LoginStatus">{userName}</div>
            </div>
        );
    }
}

export default Header;