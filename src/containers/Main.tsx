import * as React from 'react'
import '../App.css';
import Tree from './Tree';
import UserInteraction from './UserInteraction';


interface IMainProps {
    currentUser : string
}

class Main extends React.Component<IMainProps, {}> {
    constructor(props: IMainProps) {
        super(props);
    }

    public render() {
        return (
            <div className="MainClass">
                <Tree/>
                <UserInteraction currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

export default Main;
