AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false},
        borderWidth: {type: 'number', default: 1},

        fontFamily: {type: 'string', default: 'Helvetica'},
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

        el.setAttribute('material', `shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        var toggleBoxWidth = guiItem.height/1.75;
        var toggleBoxX = -guiItem.width*0.5 + guiItem.height/2;
        var toggleBox = document.createElement("a-box");
        toggleBox.setAttribute('width', `${toggleBoxWidth}`);
        toggleBox.setAttribute('height', '0.35');
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', `color:${data.borderColor}; shader: flat;`);
        toggleBox.setAttribute('position', `${toggleBoxX} 0 0`);
        el.appendChild(toggleBox);

        var toggleColorAnimation = document.createElement("a-animation");
        toggleColorAnimation.setAttribute('begin', 'toggleAnimation');
        toggleColorAnimation.setAttribute('direction', 'alternate');
        toggleColorAnimation.setAttribute('attribute', 'material.color');
        toggleColorAnimation.setAttribute('from', `${data.borderColor}`);
        toggleColorAnimation.setAttribute('to', `${data.activeColor}`);
        toggleColorAnimation.setAttribute('dur', '500');
        toggleColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleBox.appendChild(toggleColorAnimation);

        var toggleHandleWidth = guiItem.height/6;
        var toggleHandleXStart = -toggleBoxWidth*0.5 + toggleHandleWidth*0.5 + 0.05;
        var toggleHandleXEnd = toggleHandleXStart + toggleBoxWidth - toggleHandleWidth - 0.1;
        var toggleHandle = document.createElement("a-box");
        toggleHandle.setAttribute('width', `${toggleHandleWidth}`);
        toggleHandle.setAttribute('height', '0.3');
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', `color:${data.handleColor}`);
        toggleHandle.setAttribute('position', `${toggleHandleXStart} 0 0.02`);
        toggleBox.appendChild(toggleHandle);

        var toggleHandleAnimation = document.createElement("a-animation");
        toggleHandleAnimation.setAttribute('begin', 'toggleAnimation');
        toggleHandleAnimation.setAttribute('direction', 'alternate');
        toggleHandleAnimation.setAttribute('attribute', 'position');
        toggleHandleAnimation.setAttribute('from', `${toggleHandleXStart} 0 0.02`);
        toggleHandleAnimation.setAttribute('to', `${toggleHandleXEnd} 0 0.02`);
        toggleHandleAnimation.setAttribute('dur', '500');
        toggleHandleAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleHandle.appendChild(toggleHandleAnimation);

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
            toggleHandle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            toggleHandle.setAttribute('material', 'color', data.handleColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            toggleColorAnimation.emit('toggleAnimation');
            toggleHandleAnimation.emit('toggleAnimation');
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
        'value': 'gui-toggle.text',
        'font-color': 'gui-toggle.fontColor',
        'font-family': 'gui-toggle.fontFamily',
        'border-width': 'gui-toggle.borderWidth',
        'border-color': 'gui-toggle.borderColor',
        'background-color': 'gui-toggle.backgroundColor',
        'hover-color': 'gui-toggle.hoverColor',
        'active-color': 'gui-toggle.activeColor',
        'handle-color': 'gui-toggle.handleColor'
    }
});

