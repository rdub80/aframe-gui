AFRAME.registerComponent('gui-button', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        text: {type: 'string', default: 'text'},
        fontFamily: {type: 'string', default: 'Helvetica'},
        fontColor: {type: 'string', default: key_offwhite},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        console.log("in button, guiItem: "+JSON.stringify(guiItem));
        var guiInteractable = el.getAttribute("gui-interactable");
        console.log("in button, guiInteractable: "+JSON.stringify(guiInteractable));
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var toggleState = this.toggleState = data.toggle;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);
        console.log("in gui-button init, data: "+JSON.stringify(data));
        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvas');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:double; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.text, '100px ' + data.fontFamily, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-0.025)}; height: ${(guiItem.height-0.025)}; depth: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        var buttonAnimation = document.createElement("a-animation");
        buttonAnimation.setAttribute('attribute', 'material.color');
        buttonAnimation.setAttribute('begin', 'fadeOut');
        buttonAnimation.setAttribute('from', data.activeColor);
        buttonAnimation.setAttribute('to', data.backgroundColor);
        buttonAnimation.setAttribute('dur', '400');
        buttonEntity.appendChild(buttonAnimation);

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);


        ////WAI ARIA Support
        el.setAttribute('role', 'button');

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            if (!(data.toggle)) {
                buttonEntity.setAttribute('material', 'color', data.backgroundColor);
            }
        });

        el.addEventListener(data.on, function (evt) {            
            if (!(data.toggle)) { // if not toggling flashing active state
                buttonEntity.emit('fadeOut');
            }else{
                buttonEntity.setAttribute('material', 'color', data.activeColor);
            }
//            this.toggleState = !(this.toggleState);

//            console.log('I was clicked at: ', evt.detail.intersection.point);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
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
        console.log("In button update, toggle: "+this.toggleState);
    },
    setActiveState: function (activeState) {
        console.log("in setActiveState function");
        this.data.toggle = this.toggleState = activeState;
        if (!activeState) {
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {

        }
    },
    setText: function (newText) {
        drawText(this.ctx, this.canvas, newText, '100px ' + this.data.fontFamily, this.data.fontColor, 1);
    },
});


AFRAME.registerPrimitive( 'a-gui-button', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'button' },
        'gui-button': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-intexractable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-button.on',
        'value': 'gui-button.text',
        'font-color': 'gui-button.fontColor',
        'font-family': 'gui-button.fontFamily',
        'border-color': 'gui-button.borderColor',
        'background-color': 'gui-button.backgroundColor',
        'hover-color': 'gui-button.hoverColor',
        'active-color': 'gui-button.activeColor',
        'toggle': 'gui-button.toggle'
    }
});

