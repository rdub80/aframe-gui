AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: {default: 'click'},
        toggle: {type: 'boolean', default: false},
        toggleState: {type: 'boolean', default: false},
        icon: {type: 'string', default: 'f0f3'},
        iconActive: {type: 'string', default: ''},
        iconFontSize: {type: 'number', default: 0.35},
        iconFont: {type: 'string', default: 'assets/fonts/fa-regular-400.ttf'},
        value: {type: 'string', default: ''},
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: ''},
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
        if(data.iconFontSize > 20) { // 150/750
          var newSize = data.iconFontSize/750;
          data.iconFontSize = newSize;        
        }
        if(data.fontSize > 20) { // 150/750
          var newSize = data.fontSize/750;
          data.fontSize = newSize;        
        }

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
        buttonEntity.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.toggleState ? data.activeColor : data.backgroundColor}`);
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        this.setIcon(data.icon);

        if(data.value != ''){ this.setText(data.value) }

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

        if(this.textEntity){
            console.log("has textEntity: "+this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
   
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
    setIcon: function (unicode) {
        var hex = parseInt(unicode, 16);
        var char = String.fromCharCode(hex);

        var iconEntity = document.createElement("a-entity");
        var iconEntityX = 0;
        if(this.data.value != ''){
            iconEntityX = -this.guiItem.width*0.5 + this.guiItem.height*0.5;
        }
        this.iconEntity = iconEntity;
        iconEntity.setAttribute('troika-text', `value:${char}; 
                                                align:center; 
                                                anchor:center; 
                                                baseline:center;
                                                color:${this.data.fontColor};
                                                font:${this.data.iconFont};
                                                fontSize:${this.data.iconFontSize};
                                                depthOffset:1;
                                                `);
        iconEntity.setAttribute('position', `${iconEntityX} 0 0.05`); // 0.05 y axis adjustment for fontawesome
//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(iconEntity);
    },
    setText: function (newText) {
        var textEntityX = this.guiItem.height - this.guiItem.width*0.5;
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', `value: ${newText}; 
                                                align:left; 
                                                anchor:left; 
                                                baseline:center;
                                                letterSpacing:0;
                                                color:${this.data.fontColor};
                                                font:${this.data.fontFamily};
                                                fontSize:${this.data.fontSize};
                                                depthOffset:1;
                                                maxWidth:${this.guiItem.width/1.05};
                                                `);
        textEntity.setAttribute('position', `${textEntityX} 0 0.05`);

//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    },
});

AFRAME.registerPrimitive( 'a-gui-icon-label-button', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'icon-label-button' },
        'gui-icon-label-button': { }
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
        'on': 'gui-icon-label-button.on',
        'font-color': 'gui-icon-label-button.fontColor',
        'font-family': 'gui-icon-label-button.fontFamily',
        'font-size': 'gui-icon-label-button.fontSize',
        'border-color': 'gui-icon-label-button.borderColor',
        'background-color': 'gui-icon-label-button.backgroundColor',
        'hover-color': 'gui-icon-label-button.hoverColor',
        'active-color': 'gui-icon-label-button.activeColor',
        'icon': 'gui-icon-label-button.icon',
        'icon-active': 'gui-icon-label-button.iconActive',
        'icon-font': 'gui-icon-label-button.iconFont',
        'icon-font-size': 'gui-icon-label-button.iconFontSize',
        'value': 'gui-icon-label-button.value',
        'toggle': 'gui-icon-label-button.toggle',
        'toggle-state': 'gui-icon-label-button.toggleState'        
    }
});
