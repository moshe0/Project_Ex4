import * as React from "react";
import Modal from "../containers/Modal";
import {Link} from "react-router-dom";

interface ILogOutProps{
    YesCallback : any,
    NoCallback : any
}


class LogOut extends React.Component<ILogOutProps, {}> {
    constructor(props : ILogOutProps){
        super(props);
    }

    Yes = () => {
        this.props.YesCallback();
    };

    No = () => {
        this.props.NoCallback();
    };

    render() {
        return (
            <Modal style={styles.modal}>
                <p style={styles.p}>
                    Do you want to logout?
                </p>
                <button style={styles.button} onClick={this.Yes}>Yes</button>
                <Link to='/'><button style={styles.button} onClick={this.No}>No</button></Link>
            </Modal>
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


export default LogOut;
