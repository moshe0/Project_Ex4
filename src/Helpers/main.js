(function() {
    init();

    function init() {
        var tree = ChatTree(getElement(".tree"));
        var content = Content(getElement(".content"));

        tree.load(content.get());
        tree.element.focus();
        tree.clear();

/*        toolbar.on("load", function() {
            tree.load(content.get());
            tree.element.focus();
        });

        toolbar.on("clear", function() {
            tree.clear();
        });*/
    }
})();
