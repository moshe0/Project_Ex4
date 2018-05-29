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
        //  jQuery
        $(this.ref).append($('<h3>Im jQuery</h3>'));
/*        $(this.ref).bind('click', () => {
            console.log('sdf')
        });*/
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
            <ul className="left tree" ref={this.setRef}/>
        );
    }
}

export default Tree;