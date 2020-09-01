AFRAME.registerComponent('gui-button', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        toggleState: {type: 'boolean', default: false},
        text: {type: 'string', default: ''},
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: 'sans-serif'},
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
        this.guiItem = guiItem;
        //console.log("in button, guiItem: "+JSON.stringify(guiItem));
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:double; color:${data.backgroundColor};`);

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: ${guiItem.baseDepth};`);
        buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', `0 0 ${guiItem.baseDepth/2}`);
        el.appendChild(buttonContainer);
        this.buttonContainer = buttonContainer;

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-guiItem.gap)}; height: ${(guiItem.height-guiItem.gap)}; depth: ${guiItem.depth};`);
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.toggleState ? data.activeColor : data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', `0 0 ${guiItem.depth/2}`);
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        this.setText(data.text);

        el.addEventListener('mouseenter', function(event) {
            buttonEntity.removeAttribute('animation__leave');
            if (!(data.toggle)) {
                buttonEntity.setAttribute('animation__enter', `property: material.color; from: ${data.backgroundColor}; to:${data.hoverColor}; dur:200;`);
            }
        });
        el.addEventListener('mouseleave', function(event) {
            if (!(data.toggle)) {
                buttonEntity.removeAttribute('animation__click');
                buttonEntity.setAttribute('animation__leave', `property: material.color; from: ${data.hoverColor}; to:${data.backgroundColor}; dur:200; easing: easeOutQuad;`);
            }
            buttonEntity.removeAttribute('animation__enter');
        });
        el.addEventListener(data.on, function(event) {
            if (!(data.toggle)) { // if not toggling flashing active state
                buttonEntity.setAttribute('animation__click', `property: material.color; from: ${data.activeColor}; to:${data.backgroundColor}; dur:400; easing: easeOutQuad;`);
            }else{
                var guiButton = el.components['gui-button']
                // console.log("about to toggle, current state: " + guiButton.data.toggleState);
                guiButton.setActiveState(!guiButton.data.toggleState);
               //  buttonEntity.setAttribute('material', 'color', data.activeColor);
            }

            var clickActionFunctionName = guiInteractable.clickAction;
            // console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(event);
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'button');


    },
    play: function () {

    },
    update: function (oldData) {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.5; side:double; color:${data.backgroundColor};`);

        this.buttonContainer.setAttribute('geometry', `primitive: box; width: ${guiItem.width}; height: ${guiItem.height}; depth: ${guiItem.baseDepth};`);
        this.buttonContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        this.buttonContainer.setAttribute('position', `0 0 ${guiItem.baseDepth/2}`);

        this.buttonEntity.setAttribute('geometry', `primitive: box; width: ${(guiItem.width-guiItem.gap)}; height: ${(guiItem.height-guiItem.gap)}; depth: ${guiItem.depth};`);
        this.buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.toggleState ? data.activeColor : data.backgroundColor}`);
        this.buttonEntity.setAttribute('position', `0 0 ${guiItem.depth/2}`);

        if(this.textEntity){
            console.log("has textEntity: "+this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.text);
   
        }else{
            console.log("no textEntity!");   
        }

    },
    setActiveState: function (activeState) {
        // console.log("in setActiveState function, new state: " + activeState);
        this.data.toggleState = activeState;
        if (!activeState) {
            console.log('not active, about to set background color');
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {
            console.log('active, about to set active color');
            this.buttonEntity.setAttribute('material', 'color', this.data.activeColor);
        }
    },
    setText: function (newText) {
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', `value: ${newText}; 
                                                align:center; 
                                                anchor:center; 
                                                baseline:center;
                                                letterSpacing:0;
                                                color:${this.data.fontColor};
                                                font:${this.data.fontFamily};
                                                fontSize:${this.data.fontSize};
                                                depthOffset:1;
                                                maxWidth:${this.guiItem.width/1.05};
                                                `);
        textEntity.setAttribute('position', `0 0 ${(this.guiItem.depth/2)+0.05}`);
//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.buttonEntity.appendChild(textEntity);
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
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'depth': 'gui-item.depth',
        'base-depth': 'gui-item.baseDepth',
        'gap': 'gui-item.gap',
        'radius': 'gui-item.radius',
        'margin': 'gui-item.margin',
        'on': 'gui-button.on',
        'value': 'gui-button.text',
        'font-color': 'gui-button.fontColor',
        'font-size': 'gui-button.fontSize',
        'font-family': 'gui-button.fontFamily',
        'border-color': 'gui-button.borderColor',
        'background-color': 'gui-button.backgroundColor',
        'hover-color': 'gui-button.hoverColor',
        'active-color': 'gui-button.activeColor',
        'toggle': 'gui-button.toggle',
        'toggle-state': 'gui-button.toggleState'
    }
});
