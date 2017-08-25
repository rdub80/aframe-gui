AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: {type: 'string'},
        hoverAction: {type: 'string'},
        keyCode: {type: 'number', default: null},
    },
    init: function () {
        var _this = this;
        var data = this.data;
        var el = this.el;

        if(data.keyCode){
            window.addEventListener("keydown", function (event) {
                if(event.keyCode == data.keyCode){                  
                    console.log("key press by gui-interactable : " + data.keyCode);
                    el.emit('click');
                }
                event.preventDefault();
            }, true);
        }
    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
    setClickAction: function (action) {
        this.data.clickAction = action; //change function dynamically
    },
});
