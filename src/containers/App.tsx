import * as React from 'react'
import '../App.css';
import Tree from './Tree';
// import UserInteraction from "./UserInteraction";
import UserInteraction from './UserInteraction';



class App extends React.Component {
  public render() {
    return (
        <div className="bodyClass">
            <Tree/>
            <UserInteraction/>
        </div>
    );
  }
}

export default App;
