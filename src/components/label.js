AFRAME.registerComponent('gui-label', {
    schema: {
        text: {type: 'string', default: 'label text'},
        labelFor: {type: 'selector', default: null},

        fontFamily: {type: 'string', default: 'Helvetica'},
        fontColor: {type: 'string', default: key_grey_dark},
        backgroundColor: {type: 'string', default: key_offwhite},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.className = "visuallyhidden";
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor};`);

        this.oldText = data.text;

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.001');
        el.appendChild(textEntity);

        ////WAI ARIA Support

        if(data.labelFor){
            // el.setAttribute('role', 'button');
        }


    },

    tick() {
        if (this.data.text !== this.oldText) {
          drawText(this.ctx, this.canvas, this.data.text, '100px ' + this.data.fontFamily, this.data.fontColor, 1);
        }
    },
});

AFRAME.registerPrimitive( 'a-gui-label', {
    defaultComponents: {
        'gui-item': { type: 'label' },
        'gui-label': { }
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-button.on',
        'value': 'gui-label.text',
        'label-for': 'gui-label.labelFor',
        'font-color': 'gui-label.fontColor',
        'font-family': 'gui-label.fontFamily',
        'background-color': 'gui-label.backgroundColor'
    }
});
