AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        toggle: {type: 'boolean', default: false},

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
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;
        var toggleState = this.toggleState = data.toggle;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.className = "visuallyhidden";
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasIcon');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:back; color:${data.backgroundColor};`);

        drawIcon(ctx, canvas, data.icon, data.fontColor, 1);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: cylinder; radius: ${(guiItem.height/2.05)}; height: 0.04;`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '90 0 0');
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
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
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
            this.toggleState = !(this.toggleState);

            //console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            //console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            //console.log("clickActionFunctionName: "+clickActionFunctionName);
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
});

AFRAME.registerPrimitive( 'a-gui-icon-button', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'icon-button' },
        'gui-icon-button': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-icon-button.on',
        'font-color': 'gui-icon-button.fontColor',
        'font-family': 'gui-icon-button.fontFamily',
        'border-color': 'gui-icon-button.borderColor',
        'background-color': 'gui-icon-button.backgroundColor',
        'hover-color': 'gui-icon-button.hoverColor',
        'active-color': 'gui-icon-button.activeColor',
        'toggle': 'gui-icon-button.toggle',
        'icon': 'gui-icon-button.icon',
        'icon-active': 'gui-icon-button.iconActive',
    }
});