import Header from './Header';
import Main from './Main';
import * as React from 'react'
import StateStore from "../state/StateStore";


interface IAppUserState{
    currentUser : string
}

class App extends React.Component<{}, IAppUserState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            currentUser : StateStore.getInstance().state['Users'][0]
        };

        StateStore.getInstance().set('currentUser', this.state.currentUser);
        StateStore.getInstance().subscribe(()=>{
            this.forceUpdate();
        });

        this.forceUpdate();
    }

    public render() {
      return (
          <div className="bodyClass">
              <Header/>
              <Main currentUser={this.state.currentUser}/>
          </div>
      );
    }
}

export default App;