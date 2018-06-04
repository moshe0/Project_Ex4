import * as React from "react";
import * as $ from 'jquery';
import {InitTree} from "../Helpers/InitTree";
import StateStore from "../state/StateStore";
import Imember from "../Model/Imember";


interface ITreeProps{
    data : Imember[]
}


class Tree extends React.Component <ITreeProps, {}>{
    ref : any;

    constructor(props: ITreeProps) {
        super(props);
        this.ref = null;
    }


    //After first render
    componentDidMount() {
        if(!!StateStore.getInstance().get('currentUser'))
            new InitTree($(this.ref), StateStore.getInstance().get('Data'));
    }

    componentDidUpdate() {
        if(!StateStore.getInstance().get('currentUser')){
            new InitTree($(this.ref), StateStore.getInstance().get('Data'));
            console.log('componentDidUpdate');
        }
    }

    //Befor component dead
    componentWillUnmount() {
        if(StateStore.getInstance().get('LogOutState') === true)
            StateStore.getInstance().set('TreeState', $(this.ref).find('li'));
        $(this.ref).off();
    }


    setRef = (ulElement : any)=> {
        this.ref = ulElement;
    };

    public render() {
        // console.log("Component will render.", StateStore.getInstance().get('Data'));
        // if(!!StateStore.getInstance().get('currentUser'))
        //     return (<ul className="left tree" ref={this.setRef} tabIndex={0}/>);
        // return (<div className="left tree"/>);

        console.log("Component will render.", StateStore.getInstance().get('Data'));
        return (<ul className="left tree" ref={this.setRef} tabIndex={0}/>);
    }
}

export default Tree;