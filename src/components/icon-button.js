AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        toggleState: {type: 'boolean', default: false},
        icon: {type: 'string', default: 'f0f3'},
        iconActive: {type: 'string', default: ''},
        iconFontSize: {type: 'number', default: 0.4},
        iconFont: {type: 'string', default: 'assets/fonts/fa-regular-400.ttf'},
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
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if(data.iconFontSize > 20) { // 150/1000
          var newSize = data.iconFontSize/750;
          data.iconFontSize = newSize;        
        }

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 0.0; alphaTest: 0.5; side:double; color:${data.backgroundColor};`);

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

        this.setIcon(data.icon);

        el.addEventListener('mouseenter', function(evt) {
            buttonEntity.removeAttribute('animation__leave');
            if (!(data.toggle)) {
                buttonEntity.setAttribute('animation__enter', `property: material.color; from: ${data.backgroundColor}; to:${data.hoverColor}; dur:200;`);
            }
        });
        el.addEventListener('mouseleave', function(evt) {
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
        console.log("In button update, toggle: "+this.toggleState);
        var data = this.data;
        var el = this.el;

        if(this.iconEntity){
            console.log("has iconEntity: "+this.iconEntity);

            var oldEntity = this.iconEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setIcon(this.data.icon);
   
        }else{
            console.log("no iconEntity!");   
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
    setIcon: function (unicode) {
        var hex = parseInt(unicode, 16);
        var char = String.fromCharCode(hex);

        var iconEntity = document.createElement("a-entity");
        this.iconEntity = iconEntity;
        iconEntity.setAttribute('troika-text', `value:${char}; 
                                                align:center; 
                                                anchor:center; 
                                                baseline:center;
                                                lineHeight:${this.guiItem.height};
                                                maxWidth:${this.guiItem.width};
                                                color:${this.data.fontColor};
                                                font:${this.data.iconFont};
                                                fontSize:${this.data.iconFontSize};
                                                depthOffset:1;
                                                `);
        iconEntity.setAttribute('position', `0 0 0.05`); // 0.05 y axis adjustment for fontawesome
//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(iconEntity);
    }
});

AFRAME.registerPrimitive( 'a-gui-icon-button', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'icon-button' },
        'gui-icon-button': { }
    },
    mappings: {
        //gui interactable general
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui button specific
        'on': 'gui-icon-button.on',
        'font-color': 'gui-icon-button.fontColor',
        'font-family': 'gui-icon-button.fontFamily',
        'border-color': 'gui-icon-button.borderColor',
        'background-color': 'gui-icon-button.backgroundColor',
        'hover-color': 'gui-icon-button.hoverColor',
        'active-color': 'gui-icon-button.activeColor',
        'icon': 'gui-icon-button.icon',
        'icon-active': 'gui-icon-button.iconActive',
        'icon-font': 'gui-icon-button.iconFont',
        'icon-font-size': 'gui-icon-button.iconFontSize',
        'toggle': 'gui-icon-button.toggle',
        'toggle-state': 'gui-icon-button.toggleState'        
    }
});
