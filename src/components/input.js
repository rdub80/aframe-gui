AFRAME.registerComponent('gui-input', {
    schema: {
        on: {default: 'click'},
        inputText: {type: 'string', default: 'Placeholder'},
        toggle: {type: 'boolean', default: false},

        fontFamily: {type: 'string', default: 'Helvetica'},
        fontColor: {type: 'string', default: key_grey_dark},
        borderColor: {type: 'string', default: key_grey_dark},
        borderHoverColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        hoverColor: {type: 'string', default: key_white},
        activeColor: {type: 'string', default: key_orange},
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
        el.setAttribute('material', `shader: flat; transparent: false; side:front; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.inputText, '100px ' + data.fontFamily, data.fontColor, 1);


        var inputEntity = document.createElement("a-entity");
        inputEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        inputEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        inputEntity.setAttribute('position', '0 0 0.01');
        el.appendChild(inputEntity);

        var borderTopEntity = document.createElement("a-entity");
        borderTopEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width)}; height: 0.05; depth: 0.02;`);
        borderTopEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderTopEntity.setAttribute('position', `0 -${(guiItem.height/2)-0.025} 0.01`);
        el.appendChild(borderTopEntity);
        var borderBottomEntity = document.createElement("a-entity");
        borderBottomEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width)}; height: 0.05; depth: 0.02;`);
        borderBottomEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderBottomEntity.setAttribute('position', `0 ${(guiItem.height/2)-0.025} 0.01`);
        el.appendChild(borderBottomEntity);
        var borderLeftEntity = document.createElement("a-entity");
        borderLeftEntity.setAttribute('geometry', `primitive: box; width: 0.05; height: ${(guiItem.height)}; depth: 0.02;`);
        borderLeftEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderLeftEntity.setAttribute('position', `-${(guiItem.width/2)-0.025} 0 0.01`);
        el.appendChild(borderLeftEntity);
        var borderRightEntity = document.createElement("a-entity");
        borderRightEntity.setAttribute('geometry', `primitive: box; width: 0.05; height: ${(guiItem.height)}; depth: 0.02;`);
        borderRightEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        borderRightEntity.setAttribute('position', `${(guiItem.width/2)-0.025} 0 0.01`);
        el.appendChild(borderRightEntity);

        ////WAI ARIA Support
        el.setAttribute('role', 'input');

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.hoverColor);
            borderTopEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderRightEntity.setAttribute('material', 'color', data.borderHoverColor);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', data.backgroundColor);
            borderTopEntity.setAttribute('material', 'color', data.borderColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderColor);
            borderRightEntity.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction();
        });


    },
    play: function () {

    },
    update: function (oldData) {

    },
});

AFRAME.registerPrimitive( 'a-gui-input', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'input' },
        'gui-input': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-input.on',
        'value': 'gui-input.inputText',
        'toggle': 'gui-input.toggle',
        'font-color': 'gui-input.fontColor',
        'font-family': 'gui-input.fontFamily',
        'border-color': 'gui-input.borderColor',
        'border-hover-color': 'gui-input.borderHoverColor',
        'background-color': 'gui-input.backgroundColor',
        'hover-color': 'gui-input.hoverColor',
        'active-color': 'gui-input.activeColor',
    }
});