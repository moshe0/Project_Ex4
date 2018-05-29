import {DB} from "../dataBase/DB";
import {User} from "../Model/User";
import {NTree} from "../Model/NTree";
import {Group} from "../Model/Group";
import {Data} from "../Model/Data";


interface IStateStore {
    state: {};
    set(key: string, val: any): void
    get(key: string): any | null
    subscribe(listener :any) : void
}

export class StateStore implements IStateStore {
    listeners: Function[];
    private DB = new DB();
    static instance: IStateStore;

    Users : User[];
    Groups : Group[];
    RootNode : NTree;
    TreeData : Data;
    currentUser : User;
    Reciver : User | Group;

    state: {} = {
        Users : this.DB.GetUsers(),
        Groups : this.DB.GetGroups(),
        RootNode : this.DB.GetRootNode(),
        TreeData : this.DB.GetTreeData(),
        currentUser : null,
        Reciver : null,
    };

    constructor(){
        this.listeners = [];
    }

    set(key: string, val: any) {
        this.state[key] = val;
        this.onStoreChanged();
    }

    get(key: string) {
        return this.state[key] || null;
    }

    subscribe(listener :any){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }

    static getInstance() {
        if (!StateStore.instance)
            StateStore.instance = new StateStore();
        return StateStore.instance;
    }
}

export default StateStore;