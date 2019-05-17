AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        iconFontSize: {type: 'string', default: '400px'},
        text: {type: 'string', default: ''},
        toggle: {type: 'boolean', default: false},
        fontSize: {type: 'string', default: '150px'},
        fontFamily: {type: 'string', default: 'Arial'},
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
        var toggleState = this.toggleState = data.toggle;

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor};`);

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

        var multiplier = 1024; // POT conversion
        if(data.text != ''){
            var multiplier = 512;
        }

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var iconCanvasWidth = guiItem.height*multiplier; //square
        var iconCanvasHeight = guiItem.height*multiplier;
        var iconCanvas = document.createElement("canvas");
        this.iconCanvas = iconCanvas;
        iconCanvas.className = "visuallyhidden";
        iconCanvas.setAttribute('width', iconCanvasWidth);
        iconCanvas.setAttribute('height', iconCanvasHeight);
        iconCanvas.id = getUniqueId('canvasIcon');
        canvasContainer.appendChild(iconCanvas);

        var ctxIcon = this.ctxIcon = iconCanvas.getContext('2d');
        drawIcon(ctxIcon, iconCanvas, data.iconFontSize, data.icon, data.fontColor, 1);

        var iconEntityX = 0;
        if(data.text != ''){
            iconEntityX = -guiItem.width*0.5 + guiItem.height*0.5;
        }

        var iconEntity = document.createElement("a-entity");

        if(data.text != ''){
            iconEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        }else{
            iconEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/2}; height: ${guiItem.height/2};`);
        }
        iconEntity.setAttribute('material', `shader: flat; src: #${iconCanvas.id}; transparent: true; opacity: 1; side:front;`);
        iconEntity.setAttribute('position', `${iconEntityX} 0 0.041`);
        el.appendChild(iconEntity);

        if(data.text != ''){

            var labelWidth = guiItem.width - guiItem.height;
            var canvasWidth = labelWidth*multiplier;
            var canvasHeight = guiItem.height*multiplier;
            var labelCanvas = document.createElement("canvas");
            this.labelCanvas = labelCanvas;
            labelCanvas.setAttribute('width', canvasWidth);
            labelCanvas.setAttribute('height', canvasHeight);
            labelCanvas.id = getUniqueId('canvasLabel');
            canvasContainer.appendChild(labelCanvas);

            var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
            drawText(this.ctxLabel, this.labelCanvas, data.text, data.fontSize, data.fontFamily, data.fontColor, 1,'left','middle');

            var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
            var labelEntity = document.createElement("a-entity");
            labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
            labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:front;`);
            labelEntity.setAttribute('position', `${labelEntityX} 0 0.041`);
            el.appendChild(labelEntity);

        }

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
                buttonEntity.setAttribute('animation__click', `property: material.color; from: ${data.activeColor}; to:${data.backgroundColor}; dur:400; easing: easeOutQuad;`);
            }else{
                buttonEntity.setAttribute('material', 'color', data.activeColor);
            }
            var guiInteractable = el.getAttribute("gui-interactable");
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
});

AFRAME.registerPrimitive( 'a-gui-icon-label-button', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'icon-label-button' },
        'gui-icon-label-button': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-icon-label-button.on',
        'font-color': 'gui-icon-label-button.fontColor',
        'font-family': 'gui-icon-label-button.fontFamily',
        'font-size': 'gui-icon-label-button.fontSize',
        'border-color': 'gui-icon-label-button.borderColor',
        'background-color': 'gui-icon-label-button.backgroundColor',
        'hover-color': 'gui-icon-label-button.hoverColor',
        'active-color': 'gui-icon-label-button.activeColor',
        'toggle': 'gui-icon-label-button.toggle',
        'icon': 'gui-icon-label-button.icon',
        'icon-active': 'gui-icon-label-button.iconActive',
        'icon-font-size': 'gui-icon-label-button.iconFontSize',
        'value': 'gui-icon-label-button.text'
    }
});
