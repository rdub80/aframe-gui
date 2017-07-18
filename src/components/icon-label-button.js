AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: {default: 'click'},
        icon: {type: 'string', default: ''},
        iconActive: {type: 'string', default: ''},
        text: {type: 'string', default: 'label'},
        fontColor: {type: 'string', default: key_offwhite},
        fontFamily: {type: 'string', default: 'Helvetica'},
        borderColor: {type: 'string', default: key_offwhite},
        backgroundColor: {type: 'string', default: key_grey},
        hoverColor: {type: 'string', default: key_grey_dark},
        activeColor: {type: 'string', default: key_orange},
        toggle: {type: 'boolean', default: false},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

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

        var multiplier = 350;

        var iconCanvasWidth = guiItem.height*multiplier; //square
        var iconCanvasHeight = guiItem.height*multiplier;
        var iconCanvas = document.createElement("canvas");
        this.iconCanvas = iconCanvas;
        iconCanvas.setAttribute('width', iconCanvasWidth);
        iconCanvas.setAttribute('height', iconCanvasHeight);
        iconCanvas.id = getUniqueId('canvasIcon');
        document.body.appendChild(iconCanvas);

        var ctxIcon = this.ctxIcon = iconCanvas.getContext('2d');
        drawIcon(ctxIcon, iconCanvas, data.icon, data.fontColor, 1);

        var iconEntityX = -guiItem.width*0.5 + guiItem.height*0.5;
        var iconEntity = document.createElement("a-entity");
        iconEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/2}; height: ${guiItem.height/2};`);
        iconEntity.setAttribute('material', `shader: flat; src: #${iconCanvas.id}; transparent: true; opacity: 1; side:front;`);
        iconEntity.setAttribute('position', `${iconEntityX} 0 0.041`);
        el.appendChild(iconEntity);

        var labelWidth = guiItem.width - guiItem.height;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas;
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvasLabel');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');
        drawLabel(this.ctxLabel, this.labelCanvas, data.text, '100px '+ data.fontFamily, data.fontColor);

        var labelEntityX = guiItem.height*0.5 - guiItem.width*0.05;
        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height/1.05};`);
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:front;`);
        labelEntity.setAttribute('position', `${labelEntityX} 0 0.041`);
        el.appendChild(labelEntity);

        el.addEventListener('mouseenter', function () {
            buttonEntity.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            buttonEntity.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
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
    play: function () {

    },
    update: function (oldData) {

    },
});

