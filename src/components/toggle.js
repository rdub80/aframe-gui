AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        active: {type: 'boolean', default: true},
        checked: {type: 'boolean', default: false},
        borderWidth: {type: 'number', default: 1},
        fontSize: {type: 'string', default: '150px'},
        fontFamily: {type: 'string', default: 'Arial'},
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

        var labelWidth = guiItem.width - guiItem.height;
        var multiplier = 512; // POT conversion
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

        el.setAttribute('material', `shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ${this.data.backgroundColor}; side:front;`);
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);

        drawText(ctxLabel, labelCanvas, data.text, data.fontSize, data.fontFamily, data.fontColor, 1,'left','middle');

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.02`);
        el.appendChild(labelEntity);

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
        'font-size': 'gui-toggle.fontSize',
        'border-width': 'gui-toggle.borderWidth',
        'border-color': 'gui-toggle.borderColor',
        'background-color': 'gui-toggle.backgroundColor',
        'hover-color': 'gui-toggle.hoverColor',
        'active-color': 'gui-toggle.activeColor',
        'handle-color': 'gui-toggle.handleColor'
    }
});
