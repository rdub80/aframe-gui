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
        

        // This will add a tabindex to the element if there is none yet, and listen for the mouseenter event.
        // Once this happens, the element will receive focus.
        // ARIA Integration: set tabindex
        console.log(this.el.getAttribute('tabindex'));
        if(this.el.getAttribute('tabindex') === null) {
            this.el.setAttribute('tabindex', '-1');
        }
        this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this));

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
    onMouseEnter: function() {
        console.log('focus');
        this.el.focus();
    },
});