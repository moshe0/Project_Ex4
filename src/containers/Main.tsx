import * as React from 'react'
import '../App.css';
import Tree from './Tree';
import UserInteraction from './UserInteraction';
import Imember from "../Model/Imember";
import StateStore from "../state/StateStore";

interface IMainState{
    data : Imember[]
}


class Main extends React.Component<{}, IMainState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            data : StateStore.getInstance().get('Data')
        };
    }

    public render() {
        return (
            <div className="MainClass">
                <Tree data={this.state.data}/>
                <UserInteraction/>
            </div>
        );
    }
}

export default Main;
