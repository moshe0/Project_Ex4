import {Group} from "./Group";

export class NTree{
    constructor(public data : Group, public parent : NTree, public children : NTree[], public count : number)
    {}
}