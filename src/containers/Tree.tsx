import * as React from "react";
import * as $ from 'jquery';
import {InitTree} from "../Helpers/InitTree";



class Tree extends React.Component <{}, {}>{
    ref : any;

    constructor(props: {}) {
        super(props);
        this.ref = null;
    }


    componentDidMount() {
        new InitTree($(this.ref));

    }

    componentWillUnmount() {
        $(this.ref).off();
    }


    setRef = (ulElement : any)=> {
        this.ref = ulElement;
    };

    public render() {
        return (
            <ul className="left tree" ref={this.setRef} tabIndex={0}/>
        );
    }
}

export default Tree;