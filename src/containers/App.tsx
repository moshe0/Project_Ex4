import Header from './Header';
import Main from './Main';
import * as React from 'react'
import StateStore from "../state/StateStore";
import Modal from "./Modal";
import {DB} from "../dataBase/DB";



interface IAppUserState{
    userLogin : string,
    passwordLogin : string
}

class App extends React.Component<{}, IAppUserState>{
    constructor(props: {}) {
        super(props);

        this.state = {
            userLogin: 'Moshe',
            passwordLogin: '11'
        };

        StateStore.getInstance().subscribe(()=>{
            this.forceUpdate();
        });
    }

    Login = () => {
        const LoginUser = DB.GetSpecificUser(this.state.userLogin, this.state.passwordLogin);
        if(!!LoginUser) {
            StateStore.FirstUse = 1;
            StateStore.getInstance().setMany({
                'currentUser' : LoginUser,
                'Data' : DB.GetData(),
                'LogOutState': false,
                'LogInState': false
            });
        }
    };

    Yes = () => {
        StateStore.getInstance().setMany({
            'HoldReciver': null,
            'currentUser': null,
            'Data' : [],
            'LogInState': true,
        });
    };

    No = () => {
        StateStore.getInstance().setMany({
            'LogOutState': false,
            'Reciver': StateStore.getInstance().get('HoldReciver'),
            'HoldReciver': null,
        });
    };


    private InputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name = event.target.name;
        const value = event.target.value;

        if(name === 'userLogin')
            this.setState({ userLogin: value });
        else
            this.setState({ passwordLogin: value });

    };

    public render() {
        let HtmlRet;

        if(StateStore.getInstance().get('currentUser') === null){
            const canLogin = !!this.state.userLogin && !!this.state.passwordLogin;
            HtmlRet = (
                <Modal style={styles.modal}>
                    <p style={styles.p}>
                        <label style={styles.label} htmlFor="userLogin">Username</label>
                        <input style={styles.input} type="text" name="userLogin" value={this.state.userLogin} onChange={this.InputChangedHandler} />
                    </p>
                    <p>
                        <label style={styles.label} htmlFor="passwordLogin">Password</label>
                        <input style={styles.input} type="password" name="passwordLogin" value={this.state.passwordLogin} onChange={this.InputChangedHandler} />
                    </p>
                    <button style={canLogin ? styles.button : styles.buttonDisabled} disabled={!canLogin} onClick={this.Login}>Login</button>
                </Modal>
            );
        }

        else if(StateStore.getInstance().get('LogOutState') === true) {
            HtmlRet = (
                <Modal style={styles.modal}>
                    <p style={styles.p}>
                        Do you want to logout?
                    </p>
                    <button style={styles.button} onClick={this.Yes}>Yes</button>
                    <button style={styles.button} onClick={this.No}>No</button>
                </Modal>
            );
        }

        else {
            HtmlRet = (
                <span/>
            );
        }

        return (
            <div className="bodyClass">
                {HtmlRet}
                <Header/>
                <Main/>
            </div>
        );
    }
}


const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        minWidth: '50px'
    },
    p: {
        margin: "0 0 0.5em 0",
        fontSize: '20px'
    },
    label: {
        display: "inline-block",
        marginBottom: ".5rem",
        fontSize: '20px'
    },
    input: {
        display: "block",
        width: "100%",
        outline: 'none',
        fontSize: '20px',
        borderRadius: '5px',
    },
    button: {
        background: '#5077bb',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '5px'
    },
};

styles.buttonDisabled = {
    background: '#DDDDDD',
    color: '#444753',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px'
};

export default App;