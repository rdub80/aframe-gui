AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        value: {type: 'string', default: ''},
        toggle: {type: 'boolean', default: false},
        toggleState: {type: 'boolean', default: false},
        active: {type: 'boolean', default: true },
        checked: {type: 'boolean', default: false },
        borderWidth: {type: 'number', default: 1 },
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_grey_dark},
        borderColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        hoverColor: {type: 'string', default: key_grey_light},
        activeColor: {type: 'string', default: key_orange},
        handleColor: {type: 'string', default: key_offwhite},
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
        if(data.fontSize > 20) { // 150/750
          var newSize = data.fontSize/750;
          data.fontSize = newSize;        
        }

        el.setAttribute('material', `shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        var toggleBoxWidth = guiItem.height/1.75;
        var toggleBoxX = -guiItem.width*0.5 + guiItem.height/2;
        var toggleBox = document.createElement("a-box");

        toggleBox.setAttribute('width', toggleBoxWidth);
        toggleBox.setAttribute('height', guiItem.height*0.5);
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', `color:${data.borderColor}; shader: flat;`);
        toggleBox.setAttribute('position', `${toggleBoxX} 0 0`);
        el.appendChild(toggleBox);

        var toggleHandleWidth = guiItem.height/5;
        var toggleHandleXStart = -guiItem.height*0.5 + toggleHandleWidth*2;
        var toggleHandleXEnd = guiItem.height*0.5 - toggleHandleWidth*2;
        var toggleHandle = document.createElement("a-box");

        toggleHandle.setAttribute('width', `${toggleHandleWidth}`);
        toggleHandle.setAttribute('height', guiItem.height*0.4);
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', `color:${data.handleColor}`);
        toggleHandle.setAttribute('position', `${toggleHandleXStart} 0 0.02`);
        toggleBox.appendChild(toggleHandle);

        this.setText(data.value);

        this.updateToggle(data.active);


        el.addEventListener('mouseenter', function(evt) {
            toggleHandle.removeAttribute('animation__leave');
            toggleHandle.setAttribute('animation__enter', `property: material.color; from: ${data.handleColor}; to:${data.hoverColor}; dur:200;`);
        });
        el.addEventListener('mouseleave', function(evt) {
            toggleHandle.removeAttribute('animation__enter');
            toggleHandle.setAttribute('animation__leave', `property: material.color; from: ${data.hoverColor}; to:${data.handleColor}; dur:200; easing: easeOutQuad;`);
        });

        el.addEventListener("check", function (evt) {
            if(!data.checked){
                data.checked = true;
            }
        });
        el.addEventListener("uncheck", function (evt) { // a
              if(data.checked){
                data.checked = false;
              }
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            if(data.checked){
                toggleBox.removeAttribute('animation__colorOut');
                toggleHandle.removeAttribute('animation__positionOut');
                toggleBox.setAttribute('animation__colorIn', `property: material.color; from: ${data.borderColor}; to:${data.activeColor}; dur:200; easing:easeInOutCubic;`);
                toggleHandle.setAttribute('animation__positionIn', `property: position; from: ${toggleHandleXStart} 0 0.02; to:${toggleHandleXEnd} 0 0.02; dur:200; easing:easeInOutCubic;`);
            }else{
                toggleBox.removeAttribute('animation__colorIn');
                toggleHandle.removeAttribute('animation__positionIn');
                toggleBox.setAttribute('animation__colorOut', `property: material.color; from: ${data.activeColor}; to:${data.borderColor}; dur:200; easing:easeInOutCubic;`);
                toggleHandle.setAttribute('animation__positionOut', `property: position; from: ${toggleHandleXEnd} 0 0.02; to:${toggleHandleXStart} 0 0.02; dur:200; easing:easeInOutCubic;`);
            }
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
});

    },
    update: function(){
        var data = this.data;
        var el = this.el;
        this.updateToggle(data.active)

        if(this.textEntity){
            console.log("has textEntity: "+this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
   
        }else{
            console.log("no textEntity!");   
        }
        
    },


    updateToggle: function(active){

        if(active){

        }else{
        }

    },
    setText: function (newText) {
        var textEntityX = this.guiItem.height  - this.guiItem.width*0.5;
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
    }
});

AFRAME.registerPrimitive( 'a-gui-toggle', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'toggle' },
        'gui-toggle': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-toggle.on',
        'active': 'gui-toggle.active',
        'checked': 'gui-toggle.checked',
        'value': 'gui-toggle.value',
        'font-color': 'gui-toggle.fontColor',
        'font-family': 'gui-toggle.fontFamily',
        'font-size': 'gui-toggle.fontSize',
        'border-width': 'gui-toggle.borderWidth',
        'border-color': 'gui-toggle.borderColor',
        'background-color': 'gui-toggle.backgroundColor',
        'hover-color': 'gui-toggle.hoverColor',
        'active-color': 'gui-toggle.activeColor',
        'handle-color': 'gui-toggle.handleColor'
    }
});
