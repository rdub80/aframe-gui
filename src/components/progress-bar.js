AFRAME.registerComponent('gui-progressbar', {
    schema: {
        backgroundColor: {type: 'string', default: key_grey},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function () {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);

        var progressMeter = document.createElement("a-entity");
        progressMeter.setAttribute('geometry', `primitive: box; width: 0.04; height: ${guiItem.height}; depth: 0.02;`);
        progressMeter.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        progressMeter.setAttribute('position', -guiItem.width/2 +' 0 0.01');
        progressMeter.id = "progress_meter";
        el.appendChild(progressMeter);

        // <a-entity id="progress_meter"
        //           geometry="primitive: box; width: 0.04; height: 0.3; depth: 0.004;"
        //           material="shader: flat; opacity: 1; color: blue;"
        //             position="-1.23  0 0.0">
        // </a-entity>

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

AFRAME.registerPrimitive( 'a-gui-progressbar', {
    defaultComponents: {
        'gui-item': { type: 'progressbar' },
        'gui-progressbar': { }
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'background-color': 'gui-progressbar.backgroundColor',
        'active-color': 'gui-progressbar.activeColor'
    }
});
