AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        count: {type: 'number', default: '100'},
        fontFamily: {type: 'string', default: 'Arial'},
        fontSize: {type: 'string', default: '150px'},
        fontColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 512; // POT conversion
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.className = "visuallyhidden";
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.className = 'visuallyhidden';
        canvas.id = getUniqueId('canvas');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:back; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.count+'%', data.fontSize, data.fontFamily, data.fontColor, 1,'center','middle');

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        loaderContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        loaderContainer.setAttribute('rotation', '90 0 0');
        loaderContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(loaderContainer);

        var countLoaded = document.createElement("a-entity");
        countLoaded.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.5}; height: ${guiItem.height/1.5};`);
        countLoaded.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        countLoaded.setAttribute('position', '0 0 0.022');
        countLoaded.id = "loader_ring_count";
        el.appendChild(countLoaded);

        var loaderRing = document.createElement("a-ring");
        loaderRing.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        loaderRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        loaderRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', '10'); // this has to count 0 to 360 when loading
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

    },
    play: function () {

    },
    update: function (oldData) {
    },
});

AFRAME.registerPrimitive( 'a-gui-circle-loader', {
    defaultComponents: {
        'gui-item': { type: 'circle-loader' },
        'gui-circle-loader': { }
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'count': 'gui-circle-loader.count',
        'font-size': 'gui-circle-loader.fontSize',
        'font-family': 'gui-circle-loader.fontFamily',
        'font-color': 'gui-circle-loader.fontColor',
        'background-color': 'gui-circle-loader.backgroundColor',
        'active-color': 'gui-circle-loader.activeColor'
    }
});
