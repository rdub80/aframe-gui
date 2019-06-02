AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        fontFamily: {type: 'string', default: 'Arial'},
        iconFontSize: {type: 'string', default: '400px'},
        fontSize: {type: 'string', default: '150px'},
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
        //console.log("in icon button, guiItem: "+JSON.stringify(guiItem));
        var guiInteractable = el.getAttribute("gui-interactable");
        //console.log("in button, guiInteractable: "+JSON.stringify(guiInteractable));
        var multiplier = 512; // POT conversion
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;
        var toggleState = this.toggleState = data.toggle;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);
        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.id = getUniqueId('canvasIcon');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.0; alphaTest: 0.5; side:double; color:${data.backgroundColor};`);

        drawIcon(ctx, canvas, data.iconFontSize, data.icon, data.fontColor, 1);

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

        var textEntity = document.createElement("a-entity");
        textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; alphaTest: 0.5; side:front;`);
        textEntity.setAttribute('position', '0 0 0.041');
        el.appendChild(textEntity);

        el.addEventListener('mouseenter', function(evt) {
            buttonEntity.removeAttribute('animation__leave');
            buttonEntity.setAttribute('animation__enter', `property: material.color; from: ${data.backgroundColor}; to:${data.hoverColor}; dur:200;`);
        });
        el.addEventListener('mouseleave', function(evt) {
            if (!(data.toggle)) {
                buttonEntity.removeAttribute('animation__click');
            }
            buttonEntity.removeAttribute('animation__enter');
            buttonEntity.setAttribute('animation__leave', `property: material.color; from: ${data.hoverColor}; to:${data.backgroundColor}; dur:200; easing: easeOutQuad;`);
        });
        el.addEventListener(data.on, function(evt) {
            if (!(data.toggle)) { // if not toggling flashing active state
                buttonEntity.setAttribute('animation__click', `property: material.color; from: ${data.activeColor}; to:${data.backgroundColor}; dur:400; easing: easeOutBack;`);
            }else{
                buttonEntity.setAttribute('material', 'color', data.activeColor);
            }

            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'button');


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
        'icon-font-size': 'gui-icon-button.iconFontSize',
        'icon-active': 'gui-icon-button.iconActive',
    }
});
