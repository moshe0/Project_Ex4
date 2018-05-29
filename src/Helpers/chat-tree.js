

function ChatTree(element) {
    element.addEventListener('keyup', keyup);


    function load(items) {
        clear();
        _load(items, null, 0);
    }

    function _load(items, parent, indentation) {
        for(item of items){
            let image = document.createElement("img");
            image.style.margin= "5px";
            image.style.verticalAlign = "middle";
            image.src = "images/singleUser.png";

            var img = $(image);
            var span = $("<span>");
            img.appendTo(span);

            var liTmp = document.createElement("li");
            liTmp.style.textIndent = indentation + "px";
            var li = $(liTmp);

            span.appendTo(li);
            li.addClass(item.type);
            li.append(item.name);
            li.appendTo(element);
            li.on('dblclick', dblclick);
            li.on('click', click);
            li.data('parent', parent);

            if(indentation > 0) {
                li.addClass('hidden');
                if(!parent.data('items')) {
                    parent.data('items', []);
                    parent.data('items').push(li);
                }
                else
                    parent.data('items').push(li);
            }

            if(!!item.items) {
                img.attr("src", "images/multipleUsers.png");
                _load(item.items, li, indentation + 25);
            }
        }
    }

    function clear() {
        element.innerHTML = '';
    }


    function Enter(){
        dblclick();
    }

    function dblclick(){
        var parent = $(element).find('.inFocus');
        if(parent.length === 0)
            return;
        else{
            var children = $(parent).data('items');
            if(!!children){
                for(item of children){
                    item.toggleClass('hidden');
                    hiddenChildrenRecursive($(item).data('items'));
                }
            }
        }
    }

    function hiddenChildrenRecursive(items){
        if(!items)
            return;
        for(item of items){
            item.addClass('hidden');
            hiddenChildrenRecursive($(item).data('items'));
        }
    }

    function click(){
        clearFocusClass();
        $(this).addClass('inFocus');
        console.log('click');
    }

    function keyup(e){
        switch(e.key){
            case 'ArrowRight':
                ArrowRight();
                break;
            case 'ArrowLeft':
                ArrowLeft();
                break;
            case 'ArrowUp':
                ArrowUp();
                break;
            case 'ArrowDown':
                ArrowDown();
                break;
            case 'Enter':
                Enter();
                break;
        }
        console.log('keypress');
    }


    function ArrowRight(){
        var parent = $(element).find('.inFocus');
        var children = $(parent).data('items');
        if(parent.length > 0 && !!children){
            for(item of children){
                item.removeClass('hidden');
            }
        }
    }

    function ArrowLeft(){
        var parent = $(element).find('.inFocus');
        var children = $(parent).data('items');

        if(parent.length === 0)
            return;
        else if(!children || children[0].hasClass('hidden')){
            if(!!$(parent).data('parent')) {
                clearFocusClass();
                $(parent).data('parent').addClass('inFocus');
            }
        }
        else{
            for(item of children){
                item.addClass('hidden');
                hiddenChildrenRecursive($(item).data('items'));
            }
        }
    }

    function ArrowUp(){
        var current = $(element).find('.inFocus');
        if(current.length === 0)
            return;
        else {
            var arrLi =  $(element).find('li');
            var index = arrLi.length-1;

            for( ; index >= 0 ; index--){
                if($(arrLi[index]).text() === current.text())
                    break;
            }
            for(i=--index ; i>=0 ; i--){
                if($(arrLi[i]).hasClass('hidden') === false){
                    clearFocusClass();
                    $(arrLi[i]).addClass('inFocus');
                    break;
                }
            }
        }
    }

    function ArrowDown(){
        var current = $(element).find('.inFocus');
        if(current.length === 0)
            $($(element).find('li')[0]).addClass('inFocus');
        else {
            var arrLi =  $(element).find('li');
            var index = 0;

            for( ; index <arrLi.length ; index++){
                if($(arrLi[index]).text() === current.text())
                    break;
            }
            for(i=++index ; i<arrLi.length ; i++){
                if($(arrLi[i]).hasClass('hidden') === false){
                    clearFocusClass();
                    $(arrLi[i]).addClass('inFocus');
                    break;
                }
            }
        }
    }


    function clearFocusClass(){
        var arr = $('.inFocus');
        for(item of  arr)
            $(item).removeClass('inFocus');
    }


    return {
        load,
        clear,
        element,
    };
}
