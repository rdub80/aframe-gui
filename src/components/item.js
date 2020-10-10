AFRAME.registerComponent('gui-item', {
    schema: {
        type: {type: 'string'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        baseDepth: {type: 'number', default: 0.01},
        depth: {type: 'number', default: 0.02},
        gap: {type: 'number', default: 0.025},
        radius: {type: 'number', default: 0},
        margin: { type: 'vec4', default: {x: 0, y: 0, z: 0, w: 0}},

        bevelEnabled: {type: 'boolean', default: false},
        bevelSegments: {type: 'number', default: 5},
        steps: {type: 'number', default: 2},
        bevelSize: {type: 'number', default: 4},
        bevelThickness: {type: 'number', default: 2}

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
});

