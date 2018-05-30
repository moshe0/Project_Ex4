// import {DB} from "../dataBase/DB";
import StateStore from "../state/StateStore";
import * as $ from "jquery";
import {Data} from "../Model/Data";


export class InitTree {
    state = StateStore.getInstance().get('TreeData');
    constructor(public element : any){
        let ul = document.querySelector("ul");
        if(ul)
            ul.addEventListener('keyup', this.keyup);
        this.Load();
    }


    public Load(){
        this.clear();
        this._Load(this.state, null, 0);
    }


    private _Load(data : Data, parent : any, indentation : number) {

        let image = document.createElement("img");
        image.style.margin = "5px";
        image.style.verticalAlign = "middle";
        image.src = "/TreeImages/singleUser.png";

        let img = $(image);
        let span = $("<span>");
        img.appendTo(span);

        let liTmp = document.createElement("li");
        liTmp.style.textIndent = indentation + "px";
        let li = $(liTmp);

        span.appendTo(li);
        li.addClass(data.type);
        li.append(data.name);
        li.appendTo(this.element);
        li.on('dblclick', () =>{
            this.dblclick();
        });
        li.on('click', this.click);
        li.data('parent', parent);

        if (indentation > 0) {
            li.addClass('hidden');
            if (!parent.data('items')) {
                parent.data('items', []);
                parent.data('items').push(li);
            }
            else
                parent.data('items').push(li);
        }

        if (!!data.items) {
            img.attr("src", "/TreeImages/multipleUsers.png");

            for(let i=0 ; i<data.items.length ; i++)
                this._Load(data.items[i], li, indentation + 25);
            }
        }

    clear(){
        this.element[0].innerHTML = '';
    }

    dblclick(){
        let parent = this.element.find('.inFocus');
        if(parent.length === 0)
            return;
        else{
            let children = $(parent).data('items');
            if(!!children){
                for(let item of children){
                    item.toggleClass('hidden');
                    InitTree.hiddenChildrenRecursive($(item).data('items'));
                }
            }
        }
    }

    static hiddenChildrenRecursive(items : any){
        if(!items)
            return;
        for(let item of items){
            item.addClass('hidden');
            InitTree.hiddenChildrenRecursive($(item).data('items'));
        }
    }

    click(){
        InitTree.clearFocusClass();

        $(this).addClass('inFocus');
        console.log('click');
        this.SetReciver(this);
    }

     static clearFocusClass() {
         let itemFocused = $('.inFocus');
         itemFocused.removeClass('inFocus');
     }

     SetReciver(item : any){
         StateStore.getInstance().set('Reciver', 'qqqq');
     }




    keyup = (e: any) => {
        switch(e.key){
            case 'ArrowRight':
                this.ArrowRight();
                break;
            case 'ArrowLeft':
                this.ArrowLeft();
                break;
            case 'ArrowUp':
                this.ArrowUp();
                break;
            case 'ArrowDown':
                this.ArrowDown();
                break;
            case 'Enter':
                this.Enter();
                break;
        }
        console.log('keypress');
    };


    ArrowRight(){
        let parent = this.element.find('.inFocus');
        let children = $(parent).data('items');
        if(parent.length > 0 && !!children){
            for(let item of children){
                item.removeClass('hidden');
            }
        }
    }

    ArrowLeft(){
        let parent = this.element.find('.inFocus');
        let children = $(parent).data('items');

        if(parent.length === 0)
            return;
        else if(!children || children[0].hasClass('hidden')){
            if(!!$(parent).data('parent')) {
                InitTree.clearFocusClass();
                $(parent).data('parent').addClass('inFocus');
            }
        }
        else{
            for(let item of children){
                item.addClass('hidden');
                InitTree.hiddenChildrenRecursive($(item).data('items'));
            }
        }
    }

    ArrowUp(){
        let current = this.element.find('.inFocus');
        if(current.length === 0)
            return;
        else {
            let arrLi =  this.element.find('li');
            let index = arrLi.length-1;

            for( ; index >= 0 ; index--){
                if($(arrLi[index]).text() === current.text())
                    break;
            }
            for(let i=--index ; i>=0 ; i--){
                if(!$(arrLi[i]).hasClass('hidden')){
                    InitTree.clearFocusClass();
                    $(arrLi[i]).addClass('inFocus');
                    break;
                }
            }
        }
    }

    ArrowDown(){
        let current = this.element.find('.inFocus');
        if(current.length === 0)
            $(this.element.find('li')[0]).addClass('inFocus');
        else {
            let arrLi =  this.element.find('li');
            let index = 0;

            for( ; index <arrLi.length ; index++){
                if($(arrLi[index]).text() === current.text())
                    break;
            }
            for(let i=++index ; i<arrLi.length ; i++){
                if(!$(arrLi[i]).hasClass('hidden')){
                    InitTree.clearFocusClass();
                    $(arrLi[i]).addClass('inFocus');
                    break;
                }
            }
        }
    }

    Enter(){
        this.dblclick();
    }

}


