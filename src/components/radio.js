AFRAME.registerComponent('gui-radio', {
    schema: {
        on: {default: 'click'},
        value: {type: 'string', default: ''},
        active: {type: 'boolean', default: true },
        toggle: {type: 'boolean', default: false},
        toggleState: {type: 'boolean', default: false},
        checked: {type: 'boolean', default: false },
        radiosizecoef: {type: 'number', default: 1 },
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_grey_dark},
        borderColor: {type: 'string', default: key_white},
        backgroundColor: {type: 'string', default: key_offwhite},
        hoverColor: {type: 'string', default: key_grey_light},
        activeColor: {type: 'string', default: key_orange},
        handleColor: {type: 'string', default: key_grey},
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

        var radioBoxWidth = 0.50
        var radioBoxX = -guiItem.width*0.5 + guiItem.height*0.5;
        var radioBox = document.createElement("a-cylinder");
        radioBox.setAttribute('radius', guiItem.height*0.2*data.radiosizecoef);
        radioBox.setAttribute('height', '0.01');
        radioBox.setAttribute('rotation', '90 0 0');
        radioBox.setAttribute('material', `color:${data.handleColor}; shader: flat;`);
        radioBox.setAttribute('position', `${radioBoxX} 0 0`);
        el.appendChild(radioBox);

        var radioborder = document.createElement("a-torus");
        radioborder.setAttribute('radius', guiItem.height*0.19*data.radiosizecoef);
        radioborder.setAttribute('radius-tubular', '0.01');
        radioborder.setAttribute('rotation', '90 0 0');
        radioborder.setAttribute('material', `color:${data.borderColor}; shader: flat;`);
        radioBox.appendChild(radioborder);

        var radioCenter = document.createElement("a-cylinder");
        radioCenter.setAttribute('radius', guiItem.height*0.18*data.radiosizecoef);
        radioCenter.setAttribute('height', '0.02');
        radioCenter.setAttribute('rotation', '0 0 0');
        radioCenter.setAttribute('material', `color:${data.handleColor}; shader: flat;`);
        radioBox.appendChild(radioCenter);

        this.setText(data.value);

        this.updateToggle(data.active);
        el.setAttribute("checked",data.active);

        el.addEventListener('mouseenter', function(evt) {
            radioborder.removeAttribute('animation__leave');
            radioborder.setAttribute('animation__enter', `property: material.color; from: ${data.borderColor}; to:${data.hoverColor}; dur:200;`);
        });
        el.addEventListener('mouseleave', function(evt) {
            radioborder.removeAttribute('animation__enter');
            radioborder.setAttribute('animation__leave', `property: material.color; from: ${data.hoverColor}; to:${data.borderColor}; dur:200; easing: easeOutQuad;`);
        });
        el.addEventListener(data.on, function (evt) {
            // console.log('I was clicked at: ', evt.detail.intersection.point); // Commented out to use own made click event without defining detail
            data.checked = !data.checked;
            if (data.checked) {
                radioCenter.removeAttribute('animation__colorOut');
                radioCenter.removeAttribute('animation__rotationOut');
                radioCenter.removeAttribute('animation__position1Out');
                radioCenter.removeAttribute('animation__position2Out');
                radioCenter.setAttribute('animation__colorIn', `property: material.color; from: ${data.handleColor}; to:${data.activeColor}; dur:500; easing:easeInOutCubic;`);
                radioCenter.setAttribute('animation__rotationIn', `property: rotation; from: 0 0 0; to:-180 0 0; dur:500; easing:easeInOutCubic;`);
                radioCenter.setAttribute('animation__position1In', `property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic;`);
                radioCenter.setAttribute('animation__position2In', `property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;`);
            }else{
                radioCenter.removeAttribute('animation__colorIn');
                radioCenter.removeAttribute('animation__rotationIn');
                radioCenter.removeAttribute('animation__position1In');
                radioCenter.removeAttribute('animation__position2In');
                radioCenter.setAttribute('animation__colorOut', `property: material.color; from: ${data.activeColor}; to:${data.handleColor}; dur:500; easing:easeInOutCubic;`);
                radioCenter.setAttribute('animation__rotationOut', `property: rotation; from: -180 0 0; to:0 0 0; dur:500; easing:easeInOutCubic;`);
                radioCenter.setAttribute('animation__position1Out', `property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic; `);
                radioCenter.setAttribute('animation__position2Out', `property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;`);
            }

            var guiInteractable = el.getAttribute("gui-interactable");
            //console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            //console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'radio');

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

AFRAME.registerPrimitive( 'a-gui-radio', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'radio' },
        'gui-radio': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-radio.on',
        'value': 'gui-radio.value',
        'active': 'gui-radio.active',
        'checked': 'gui-radio.checked',
        'font-color': 'gui-radio.fontColor',
        'font-size': 'gui-radio.fontSize',
        'font-family': 'gui-radio.fontFamily',
        'border-color': 'gui-radio.borderColor',
        'background-color': 'gui-radio.backgroundColor',
        'hover-color': 'gui-radio.hoverColor',
        'active-color': 'gui-radio.activeColor',
        'handle-color': 'gui-radio.handleColor',
        'radiosizecoef': 'gui-radio.radiosizecoef'
    }
});
