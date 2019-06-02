AFRAME.registerComponent('gui-vertical-slider', {
    schema: {
        activeColor: {type: 'string', default: key_orange},
        backgroundColor: {type: 'string', default: key_offwhite},
        borderColor: {type: 'string', default: key_grey},
        handleColor: {type: 'string', default: key_white},
        handleInnerDepth: {type: 'number', default: 0.02},
        handleInnerRadius: {type: 'number', default: 0.13},
        handleOuterDepth: {type: 'number', default: 0.04},
        handleOuterRadius: {type: 'number', default: 0.17},
        hoverColor: {type: 'string', default: key_grey_light},
        hoverFontSize: {type: 'string', default: '180px'},
        hoverHeight: {type: 'number', default: 1.0},
        hoverPercent: {type: 'number'},
        hoverWidth: {type: 'number', default: 1.0},
        hoverMargin: {type: 'vec4', default: {x: 0, y: 0, z: 0, w: 0}},
        leftRightPadding: {type: 'number', default: 0.125},
        percent: {type: 'number', default: 0.5},
        opacity: { type: 'number', default: 1.0 },
        outputFontSize: {type: 'string', default: '180px'},
        outputFunction: {type: 'string'},
        outputHeight: {type: 'number', default: 1.0},
        outputMargin: {type: 'vec4', default: {x: 0, y: 0, z: 0, w: 0}},
        outputTextDepth: {type: 'number', default: 0.25},
        outputWidth: {type: 'number', default: 1.0},
        sliderBarDepth: {type: 'number', default: 0.03},
        sliderBarWidth: {type: 'number', default: 0.08},
        topBottomPadding: {type: 'number', default: 0.25},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding*2.0
        var sliderHeight = guiItem.height - data.topBottomPadding*2.0
        this.sliderHeight = sliderHeight;

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; opacity: ${data.opacity};  alphaTest: 0.5; color: ${data.backgroundColor}; side:front;`);

        console.log('**** in vertical slider init, percent: ' + data.percent + ', sliderHeight: ' + sliderHeight);
        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', `primitive: box; height: ${data.percent*sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
        sliderActiveBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        sliderActiveBar.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5 - data.percent *sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
        this.sliderActiveBar = sliderActiveBar;
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', `primitive: box; height: ${sliderHeight - data.percent * sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
        sliderBar.setAttribute('material', `shader: flat; opacity: 1; alphaTest: 0.5; side:double; color:${data.borderColor};`);
        sliderBar.setAttribute('position', `0 ${data.percent * sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
        this.sliderBar = sliderBar;
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', `primitive: cylinder; radius: ${data.handleOuterRadius}; height: ${data.handleOuterDepth};`);
        handleContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5} ${data.handleOuterDepth - 0.01}`);
        this.handleContainer = handleContainer;
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', `primitive: cylinder; radius: ${data.handleInnerRadius}; height: ${data.handleInnerDepth};`);
        handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleColor};`);
        handle.setAttribute('position', `0 ${data.handleInnerDepth} 0`);
        handleContainer.appendChild(handle);

        var valueLabel = document.createElement('a-gui-label');
        valueLabel.setAttribute('width', `${guiItem.width * 1.4}`);
        valueLabel.setAttribute('height', `${guiItem.width * 0.7}`);
        // TODO: use function to calculate display value
        valueLabel.setAttribute('value', '');
        valueLabel.setAttribute('opacity', '1.0');
        valueLabel.setAttribute('position', `${guiItem.width * 1.4} 0 ${data.sliderBarDepth}`);
        valueLabel.setAttribute('rotation', '-90 0 0');
        valueLabel.setAttribute('font-color', data.activeColor);
        valueLabel.setAttribute('font-size', `${guiItem.width * 240}px`);
        valueLabel.setAttribute('font-weight', 'bold');
        valueLabel.setAttribute('text-depth', data.outputTextDepth);
        this.valueLabel = valueLabel;
        handleContainer.appendChild(valueLabel);

        var hoverIndicator = document.createElement("a-entity");
        hoverIndicator.setAttribute('geometry', `primitive: box; height: 0.02; width: ${guiItem.width * 0.5}; depth: ${data.sliderBarDepth};`);
        hoverIndicator.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        hoverIndicator.setAttribute('position', `${-guiItem.width * 0.5} 0 ${data.sliderBarDepth - 0.01}`);
        hoverIndicator.setAttribute('visible', 'false');
        this.hoverIndicator = hoverIndicator;
        el.appendChild(hoverIndicator);

        var hoverLabel = document.createElement('a-gui-label');
        hoverLabel.setAttribute('width', `${guiItem.width * 0.7}`);
        hoverLabel.setAttribute('height', `${guiItem.width * 0.35}`);
        hoverLabel.setAttribute('value', '');
        hoverLabel.setAttribute('opacity', '0.5');
        hoverLabel.setAttribute('position', `${-guiItem.width * 0.7} 0 ${data.sliderBarDepth}`);
        hoverLabel.setAttribute('font-color', data.borderColor);
        hoverLabel.setAttribute('font-size', `${guiItem.width * 100}px`);
        hoverLabel.setAttribute('text-depth', data.outputTextDepth);
        this.hoverLabel = hoverLabel;
        hoverIndicator.appendChild(hoverLabel);

        el.addEventListener('mouseenter', function () {
            handle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            handle.setAttribute('material', 'color', data.handleColor);
        });

        el.addEventListener('click', function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var localCoordinates = el.object3D.worldToLocal(evt.detail.intersection.point);
            console.log('click local coordinates: ', localCoordinates);
            console.log('current percent: '+data.percent);
            var newPercent = null;
            if (localCoordinates.y <= (-sliderHeight / 2)) {
                newPercent = 0;
            } else if (localCoordinates.y >= (sliderHeight / 2)) {
                newPercent = 1.0;
            } else {
                newPercent = (localCoordinates.y + (sliderHeight /2)) / sliderHeight;
            }
            console.log('new percent: '+newPercent);
            el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
            el.setAttribute('gui-vertical-slider', 'hoverPercent', String(newPercent));
            console.log("handle container: "+handleContainer);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(data.percent);
        });

        this.el.addEventListener('raycaster-intersected', evt => {
            console.log('***** in raycaster-intersected');
            this.raycaster = evt.detail.el;
        });
        this.el.addEventListener('raycaster-intersected-cleared', evt => {
            console.log('****** in raycaster-intersected-cleared');
            this.raycaster = null;
            this.hoverIndicator.setAttribute('visible', false);
            this.hoverLabel.setAttribute('visible', false);
        });


    },
    update: function (oldData) {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding*2.0
        var sliderHeight = guiItem.height - data.topBottomPadding*2.0
        //console.log('in vertical slider update, oldData: ' + JSON.stringify(oldData) + ', data: ' + JSON.stringify(data))
        if (data.percent != oldData.percent && this.sliderActiveBar && this.sliderBar && this.handleContainer) {
            var sliderHeight = guiItem.height - data.topBottomPadding*2.0;
            this.sliderActiveBar.setAttribute('geometry', `primitive: box; height: ${data.percent*sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
            this.sliderActiveBar.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5 - data.percent *sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
            this.sliderBar.setAttribute('geometry', `primitive: box; width: ${data.sliderBarWidth}; height: ${sliderHeight - data.percent * sliderHeight}; depth: ${data.sliderBarDepth};`);
            this.sliderBar.setAttribute('position', `0 ${data.percent * sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
            this.handleContainer.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5} ${data.handleOuterDepth - 0.01}`);
            var outputValue = this.getOutputValue(false);
            if (outputValue) {
                this.valueLabel.setAttribute('value', outputValue);
            }
            this.hoverIndicator.setAttribute('visible', false);
            this.hoverLabel.setAttribute('visible', false);
        } else if (data.hoverPercent != oldData.hoverPercent && data.hoverPercent != data.percent && this.hoverIndicator) {
            var hoverOutputValue = this.getOutputValue(true);
            if (hoverOutputValue) {
                this.hoverLabel.setAttribute('value', hoverOutputValue);
            }
            this.hoverIndicator.setAttribute('position', `0 ${data.hoverPercent*sliderHeight - sliderHeight*0.5} ${data.sliderBarDepth - 0.01}`)
            this.hoverIndicator.setAttribute('visible', true);
            this.hoverLabel.setAttribute('visible', true);
        }
    },
    tick: function () {
        if (!this.raycaster) { return; }  // Not intersecting.

        var el = this.el;
        var data = this.data;
        var sliderHeight = this.sliderHeight;
        var handleContainer = this.handleContainer;
        let intersection = this.raycaster.components.raycaster.getIntersection(el);
        if (!intersection) {
            return;
        } else {
           console.log('1: hover intersection point: ' + JSON.stringify(intersection.point));
           if (this.previousLocalY && this.previousLocalY == intersection.point.y) {
               this.hoverIndicator.setAttribute('visible', false);
               this.hoverLabel.setAttribute('visible', false);
               return;
           }
            var mesh = this.el.object3D;
            mesh.updateMatrixWorld();

            var pos = new THREE.Vector3();
            var rot = new THREE.Quaternion();
            var scale = new THREE.Vector3();

            mesh.matrixWorld.decompose(pos, rot, scale);

           console.log('2: hover world position: ' + JSON.stringify(pos));
            var localCoordinates = new THREE.Vector3();
            localCoordinates.x = intersection.point.x - pos.x;
            localCoordinates.y = intersection.point.y - pos.y;
            localCoordinates.z = intersection.point.z - pos.z;
            this.previousLocalY = localCoordinates.y;
            console.log('3: hover local position: ' + JSON.stringify(localCoordinates));
            // var localCoordinates = el.object3D.worldToLocal(intersection.point);
              //console.log('local coordinates: ', localCoordinates);
              //console.log('current percent: '+data.percent);
              var hoverPercent = null;
              if (localCoordinates.y <= (-sliderHeight / 2)) {
                  hoverPercent = 0;
              } else if (localCoordinates.y >= (sliderHeight / 2)) {
                  hoverPercent = 1.0;
              } else {
                  hoverPercent = (localCoordinates.y + (sliderHeight /2)) / sliderHeight;
              }
              //console.log('hoverPercent: '+hoverPercent);
              if (hoverPercent != this.data.hoverPercent) {
                  //console.log('**** hoverPercent changed: ' + hoverPercent);
                  el.setAttribute('gui-vertical-slider', 'hoverPercent', String(hoverPercent));
              }
              // el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
              //console.log("handle container: "+handleContainer);
              var guiInteractable = el.getAttribute("gui-interactable");
              //console.log("guiInteractable: "+guiInteractable);
              var hoverActionFunctionName = guiInteractable.hoverAction;
              //console.log("hoverActionFunctionName: "+hoverActionFunctionName);
              // find object
              var hoverActionFunction = window[hoverActionFunctionName];
              //console.log("clickActionFunction: "+clickActionFunction);
              // is object a function?
              if (typeof hoverActionFunction === "function") hoverActionFunction(hoverPercent);

        }
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
    getOutputValue: function (hover) {
        var outputValueFunction = window[this.data.outputFunction];
        //console.log("clickActionFunction: "+clickActionFunction);
        // is object a function?
        if (typeof outputValueFunction === "function") {
            var outputValue = outputValueFunction(hover ? this.data.hoverPercent : this.data.percent);
            return outputValue
        }
        return null;
    },
});

AFRAME.registerPrimitive( 'a-gui-vertical-slider', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'slider' },
        'gui-vertical-slider': { }
    },
    mappings: {
        'active-color': 'gui-vertical-slider.activeColor',
        'background-color': 'gui-vertical-slider.backgroundColor',
        'border-color': 'gui-vertical-slider.borderColor',
        'handle-color': 'gui-vertical-slider.handleColor',
        'handle-inner-depth': 'gui-vertical-slider.handleInnerDepth',
        'handle-inner-radius': 'gui-vertical-slider.handleInnerRadius',
        'handle-outer-depth': 'gui-vertical-slider.handleOuterDepth',
        'handle-outer-radius': 'gui-vertical-slider.handleOuterRadius',
        'height': 'gui-item.height',
        'hover-color': 'gui-vertical-slider.hoverColor',
        'hover-font-size': 'gui-vertical-slider.hoverFontSize',
        'hover-height': 'gui-vertical-slider.hoverHeight',
        'hover-margin': 'gui-vertical-slider.hoverMargin',
        'hover-percent': 'gui-vertical-slider.hoverPercent',
        'hover-width': 'gui-vertical-slider.hoverWidth',
       'key-code': 'gui-interactable.keyCode',
        'left-right-padding': 'gui-vertical-slider.leftRightPadding',
        'margin': 'gui-item.margin',
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'opacity': 'gui-vertical-slider.opacity',
        'output-font-size': 'gui-vertical-slider.outputFontSize',
        'output-function': 'gui-vertical-slider.outputFunction',
        'output-height': 'gui-vertical-slider.outputHeight',
        'output-margin': 'gui-vertical-slider.outputMargin',
        'output-text-depth': 'gui-vertical-slider.outputTextDepth',
        'output-width': 'gui-vertical-slider.outputWidth',
        'percent': 'gui-vertical-slider.percent',
        'slider-bar-depth': 'gui-vertical-slider.sliderBarDepth',
        'slider-bar-width': 'gui-vertical-slider.sliderBarWidth',
        'top-bottom-padding': 'gui-vertical-slider.topBottomPadding',
        'width': 'gui-item.width',
    }
});
