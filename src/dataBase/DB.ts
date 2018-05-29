import * as moment from 'moment'
import {Group} from './../Model/Group'
import {User} from './../Model/User'
import {Message} from './../Model/Message'
import {NTree} from "../Model/NTree";
import {Data} from "../Model/Data";

export class DB {
    constructor(public Messages?: Message[], public Users?: User[], public Groups?: Group[], public RootNode?: NTree, public TreeData ?: Data) {
        this.Messages = [
            new Message("שלום", 'Moshe', 'Yosef', moment().format('h:mm:ss')),
            new Message("מה עניינים?", 'Yosef', 'Moshe', moment().format('h:mm:ss')),
            new Message("מצוין", 'Moshe', 'Yosef', moment().format('h:mm:ss')),
            new Message("יופי, להתראות", 'Yosef', 'Yosef', moment().format('h:mm:ss')),
        ];

        this.Users = [
            new User('Moshe', '11', '28' ),
            new User('Raz', '22', '27' ),
            new User('Yosef', '33', '23' ),
        ];

        this.TreeData = new Data('group', 'Friends',[
                        new Data('group', 'Best Friends', [
                            new Data('user', 'Tommy')
                           ]),
                        new Data('user', 'Udi'),
                        new Data('user', 'Ori'),
                        new Data('user', 'Roni')
                        ]);


        this.Groups = [
            new Group('Friends', []),
            new Group('Best Friends', []),
            new Group('All Friends',[])
        ];

        this.Groups[0].Users.push(this.Users[0]);
        this.Groups[1].Users.push(this.Users[0], this.Users[2]);
        this.Groups[2].Users.push(this.Users[0], this.Users[1], this.Users[2]);
    }



    public GetMessages() : Message[]{
        if(! this.Messages)
            return [];
        else
            return this.Messages;
    }


    public  GetUsers() : User[] {
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

    public GetTreeData() : Data | null{
        if(! this.TreeData)
            return null;
        else
            return this.TreeData;
    }


}

