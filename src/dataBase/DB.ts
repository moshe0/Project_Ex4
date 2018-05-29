import * as moment from 'moment'
import {Group} from './../Model/Group'
import {User} from './../Model/User'
import {Message} from './../Model/Message'
import {NTree} from "../Model/NTree";

export class DB {
    constructor(public Messages?: Message[], public Users?: User[], public Groups?: Group[], public RootNode?: NTree) {
        Messages = [
            new Message("שלום", 'Moshe', 'Yosef', moment().format('h:mm:ss')),
            new Message("מה עניינים?", 'Yosef', 'Moshe', moment().format('h:mm:ss')),
            new Message("מצוין", 'Moshe', 'Yosef', moment().format('h:mm:ss')),
            new Message("יופי, להתראות", 'Yosef', 'Yosef', moment().format('h:mm:ss'))
        ];

        Users = [
            new User('Moshe', '11', '28' ),
            new User('Raz', '22', '27' ),
            new User('Yosef', '33', '23' ),
        ];

        Groups = [
            new Group('Friends', []),
            new Group('Best Friends', []),
            new Group('All Friends',[])
        ];

        Groups[0].Users.push(Users[0]);
        Groups[1].Users.push(Users[0], Users[2]);
        Groups[2].Users.push(Users[0], Users[1], Users[2]);
    }

    public GetMessages() : Message[]{
        if(! this.Messages)
            return [];
        else
            return this.Messages;
    }


    public GetUsers() : User[] {
        if(! this.Users)
            return [];
        else
            return this.Users;
    }


    public GetGroups() : Group[]{
        if(! this.Groups)
            return [];
        else
            return this.Groups;
    }

    public GetRootNode() : NTree | null{
        if(! this.RootNode)
            return null;
        else
            return this.RootNode;
    }


}

