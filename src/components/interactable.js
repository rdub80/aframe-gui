AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: {type: 'string'},
        hoverAction: {type: 'string'},
    },
    init: function () {
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
        this.data.clickAction = action;
    },
});
