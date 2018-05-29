import {DB} from "../dataBase/DB";


interface IStateStore {
    state: {};
    set(key: string, val: any): void
    get(key: string): any | null
    subscribe(listener :any) : void
}

export class StateStore implements IStateStore {
    constructor(){
        this.listeners = [];
    }

    listeners: Function[];
    private DB = new DB();
    static instance: IStateStore;

    state: {} = {
        Users : this.DB.GetUsers(),
        Groups : this.DB.GetGroups(),
        RootNode : this.DB.GetRootNode(),
        currentUser : null,
        Reciver : null,
    };

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