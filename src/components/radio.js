AFRAME.registerComponent('gui-radio', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false},

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
        radioBox.setAttribute('radius', '0.17');
        radioBox.setAttribute('height', '0.01');
        radioBox.setAttribute('rotation', '90 0 0');
        radioBox.setAttribute('material', `color:${data.handleColor}; shader: flat;`);
        radioBox.setAttribute('position', `${radioBoxX} 0 0`);
        el.appendChild(radioBox);

        var radioborder = document.createElement("a-torus");
        radioborder.setAttribute('radius', '0.16');
        radioborder.setAttribute('radius-tubular', '0.01');
        radioborder.setAttribute('rotation', '90 0 0');
        radioborder.setAttribute('material', `color:${data.borderColor}; shader: flat;`);
        radioBox.appendChild(radioborder);

        var radioCenter = document.createElement("a-cylinder");
        radioCenter.setAttribute('radius', '0.15');
        radioCenter.setAttribute('height', '0.02');
        radioCenter.setAttribute('rotation', '0 0 0');
        radioCenter.setAttribute('material', `color:${data.handleColor}; shader: flat;`);
        radioBox.appendChild(radioCenter);

        var radioColorAnimation = document.createElement("a-animation");
        radioColorAnimation.setAttribute('begin', 'radioAnimation');
        radioColorAnimation.setAttribute('direction', 'alternate');
        radioColorAnimation.setAttribute('attribute', 'material.color');
        radioColorAnimation.setAttribute('from', `${data.handleColor}`);
        radioColorAnimation.setAttribute('to', `${data.activeColor}`);
        radioColorAnimation.setAttribute('dur', '500');
        radioColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioColorAnimation);

        var radioRotationAnimation = document.createElement("a-animation");
        radioRotationAnimation.setAttribute('begin', 'radioAnimation');
        radioRotationAnimation.setAttribute('direction', 'alternate');
        radioRotationAnimation.setAttribute('attribute', 'rotation');
        radioRotationAnimation.setAttribute('from', '0 0 0');
        radioRotationAnimation.setAttribute('to', '-180 0 0');
        radioRotationAnimation.setAttribute('dur', '500');
        radioRotationAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioRotationAnimation);

        var radioShiftOutAnimation = document.createElement("a-animation");
        radioShiftOutAnimation.setAttribute('begin', 'radioAnimation');
        radioShiftOutAnimation.setAttribute('direction', 'normal');
        radioShiftOutAnimation.setAttribute('attribute', 'position');
        radioShiftOutAnimation.setAttribute('from', '0 0 0');
        radioShiftOutAnimation.setAttribute('to', '0 0.3 0 ');
        radioShiftOutAnimation.setAttribute('dur', '300');
        radioShiftOutAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioShiftOutAnimation);

        var radioShiftInAnimation = document.createElement("a-animation");
        radioShiftInAnimation.setAttribute('begin', 'radioAnimation');
        radioShiftInAnimation.setAttribute('direction', 'normal');
        radioShiftInAnimation.setAttribute('attribute', 'position');
        radioShiftInAnimation.setAttribute('from', '0 0.3 0');
        radioShiftInAnimation.setAttribute('to', '0 0 0 ');
        radioShiftInAnimation.setAttribute('delay', '300');
        radioShiftInAnimation.setAttribute('dur', '200');
        radioShiftInAnimation.setAttribute('easing', 'ease-in-out-cubic');
        radioCenter.appendChild(radioShiftInAnimation);

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
        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px '+ data.fontFamily, this.data.fontColor);

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.02`);
        el.appendChild(labelEntity);


        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            radioborder.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            radioborder.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            radioColorAnimation.emit('radioAnimation');
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
        'handle-color': 'gui-radio.handleColor'
    }
});