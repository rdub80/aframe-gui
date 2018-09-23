AFRAME.registerComponent('gui-radio', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false},
        radiosizecoef: {type: 'number', default: 1},
        
        fontFamily: {type: 'string', default: 'Helvetica'},
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
        radioCenter.setAttribute('animation__color', `property: material.color; from: ${data.handleColor}; to:${data.activeColor}; dur:500; easing:easeInOutCubic; dir:alternate; startEvents: radioAnimation`);
        radioCenter.setAttribute('animation__rotation', `property: rotation; from: 0 0 0; to:-180 0 0; dur:500; easing:easeInOutCubic; dir:alternate; startEvents: radioAnimation`);
        radioCenter.setAttribute('animation__positionIn', `property: position; from: 0 0 0; to:0 0.3 0; dur:300; easing:easeInOutCubic; dir:normal; startEvents: radioAnimation`);
        radioCenter.setAttribute('animation__positionOut', `property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; dir:normal; delay:300; startEvents: radioAnimation`);
        radioBox.appendChild(radioCenter);

//        var labelWidth = guiItem.width - radioBoxWidth;
        var labelWidth = guiItem.width - guiItem.height;
        var multiplier = 350;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.className = "visuallyhidden";
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        canvasContainer.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawText(this.ctxLabel, this.labelCanvas, this.data.text, guiItem.fontSize+' ' + data.fontFamily, this.data.fontColor, 1,'left','middle');

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.02`);
        el.appendChild(labelEntity);


        this.updateToggle(data.active);
        el.setAttribute("checked",data.active);

        el.addEventListener('mouseenter', function () {
            radioborder.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            radioborder.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            // console.log('I was clicked at: ', evt.detail.intersection.point); // Commented out to use own made click event without defining detail
            data.checked = !data.checked;

            radioCenter.emit('radioAnimation');
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
    update: function(){
        var data = this.data;
        this.updateToggle(data.active)
    },


    updateToggle: function(active){

        if(active){

        }else{
        }

    },


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
        'font-size': 'gui-item.fontSize',
        'on': 'gui-radio.on',
        'value': 'gui-radio.text',
        'active': 'gui-radio.active',
        'checked': 'gui-radio.checked',
        'font-color': 'gui-radio.fontColor',
        'font-family': 'gui-radio.fontFamily',
        'border-color': 'gui-radio.borderColor',
        'background-color': 'gui-radio.backgroundColor',
        'hover-color': 'gui-radio.hoverColor',
        'active-color': 'gui-radio.activeColor',
        'handle-color': 'gui-radio.handleColor',
        'radiosizecoef': 'gui-radio.radiosizecoef'
    }
});
