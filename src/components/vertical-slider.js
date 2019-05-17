AFRAME.registerComponent('gui-vertical-slider', {
    schema: {
        percent: {type: 'number', default: '0.5'},
        handleOuterRadius: {type: 'number', default: '0.17'},
        handleInnerRadius: {type: 'number', default: '0.13'},
        handleOuterDepth: {type: 'number', default: '0.04'},
        handleInnerDepth: {type: 'number', default: '0.02'},
        sliderBarWidth: {type: 'number', default: '0.08'},
        sliderBarDepth: {type: 'number', default: '0.03'},
        leftRightPadding: {type: 'number', default: '0.125'},
        topBottomPadding: {type: 'number', default: '0.25'},

        borderColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        hoverColor: {type: 'string', default: key_grey_light},
        activeColor: {type: 'string', default: key_orange},
        handleColor: {type: 'string', default: key_white},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding*2.0
        var sliderHeight = guiItem.height - data.topBottomPadding*2.0
        this.sliderHeight = sliderHeight;
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);

        console.log('**** in vertical slider init, percent: ' + data.percent + ', sliderHeight: ' + sliderHeight);
        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', `primitive: box; height: ${data.percent*sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
        sliderActiveBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        sliderActiveBar.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5 - data.percent *sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
        this.sliderActiveBar = sliderActiveBar;
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', `primitive: box; height: ${sliderHeight - data.percent * sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
        sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor};`);
        sliderBar.setAttribute('position', `0 ${data.percent * sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
        this.sliderBar = sliderBar;
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', `primitive: cylinder; radius: ${data.handleOuterRadius}; height: ${data.handleOuterDepth};`);
        handleContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor};`);
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5} ${data.handleOuterDepth - 0.01}`);
        this.handleContainer = handleContainer;
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', `primitive: cylinder; radius: ${data.handleInnerRadius}; height: ${data.handleInnerDepth};`);
        handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleColor};`);
        handle.setAttribute('position', `0 ${data.handleInnerDepth} 0`);
        handleContainer.appendChild(handle);

        el.addEventListener('mouseenter', function () {
            handle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            handle.setAttribute('material', 'color', data.handleColor);
        });

        el.addEventListener('click', function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var localCoordinates = el.object3D.worldToLocal(evt.detail.intersection.point);
            console.log('local coordinates: ', localCoordinates);
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
        });

        el.addEventListener('blah', function (evt) {
            console.log('in onmouseover: ', evt.detail.intersection.point);
            var localCoordinates = el.object3D.worldToLocal(evt.detail.intersection.point);
            console.log('local coordinates: ', localCoordinates);
            console.log('current percent: '+data.percent);
            var hoverPercent = null;
            if (localCoordinates.y <= (-sliderHeight / 2)) {
                hoverPercent = 0;
            } else if (localCoordinates.y >= (sliderHeight / 2)) {
                hoverPercent = 1.0;
            } else {
                hoverPercent = (localCoordinates.y + (sliderHeight /2)) / sliderHeight;
            }
            console.log('hoverPercent: '+hoverPercent);
            // el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
            console.log("handle container: "+handleContainer);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var hoverActionFunctionName = guiInteractable.hoverAction;
            console.log("hoverActionFunctionName: "+hoverActionFunctionName);
            // find object
            var hoverActionFunction = window[hoverActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof hoverActionFunction === "function") hoverActionFunction(hoverPercent);
        });


    },
    update: function (oldData) {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding*2.0
        var sliderHeight = guiItem.height - data.topBottomPadding*2.0
        console.log('in vertical slider update, oldData: ' + JSON.stringify(oldData) + ', data: ' + JSON.stringify(data))
        if (data.percent != oldData.percent && this.sliderActiveBar && this.sliderBar && this.handleContainer) {
            var sliderHeight = guiItem.height - data.topBottomPadding*2.0;
            this.sliderActiveBar.setAttribute('geometry', `primitive: box; height: ${data.percent*sliderHeight}; width: ${data.sliderBarWidth}; depth: ${data.sliderBarDepth};`);
            this.sliderActiveBar.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5 - data.percent *sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
            this.sliderBar.setAttribute('geometry', `primitive: box; width: ${data.sliderBarWidth}; height: ${sliderHeight - data.percent * sliderHeight}; depth: ${data.sliderBarDepth};`);
            this.sliderBar.setAttribute('position', `0 ${data.percent * sliderHeight * 0.5} ${data.sliderBarDepth - 0.01}`);
            this.handleContainer.setAttribute('position', `0 ${data.percent*sliderHeight - sliderHeight*0.5} ${data.handleOuterDepth - 0.01}`);
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
          //  console.log('intersection point: ' + JSON.stringify(intersection.point));
            var mesh = this.el.object3D;
            mesh.updateMatrixWorld();

            var pos = new THREE.Vector3();
            var rot = new THREE.Quaternion();
            var scale = new THREE.Vector3();

            mesh.matrixWorld.decompose(pos, rot, scale);

           // console.log('world position: ' + JSON.stringify(pos));
            var localCoordinates = new THREE.Vector3();
            localCoordinates.x = intersection.point.x - pos.x;
            localCoordinates.y = intersection.point.y - pos.y;
            localCoordinates.z = intersection.point.z - pos.z;
            console.log('local position: ' + JSON.stringify(localCoordinates));
            // var localCoordinates = el.object3D.worldToLocal(intersection.point);
              console.log('local coordinates: ', localCoordinates);
              console.log('current percent: '+data.percent);
              var hoverPercent = null;
              if (localCoordinates.y <= (-sliderHeight / 2)) {
                  hoverPercent = 0;
              } else if (localCoordinates.y >= (sliderHeight / 2)) {
                  hoverPercent = 1.0;
              } else {
                  hoverPercent = (localCoordinates.y + (sliderHeight /2)) / sliderHeight;
              }
              console.log('hoverPercent: '+hoverPercent);
        /*      // el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
              console.log("handle container: "+handleContainer);
              var guiInteractable = el.getAttribute("gui-interactable");
              console.log("guiInteractable: "+guiInteractable);
              var hoverActionFunctionName = guiInteractable.hoverAction;
              console.log("hoverActionFunctionName: "+hoverActionFunctionName);
              // find object
              var hoverActionFunction = window[hoverActionFunctionName];
              //console.log("clickActionFunction: "+clickActionFunction);
              // is object a function?
              if (typeof hoverActionFunction === "function") hoverActionFunction(hoverPercent);
  */
        }
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});

AFRAME.registerPrimitive( 'a-gui-vertical-slider', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'slider' },
        'gui-vertical-slider': { }
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'percent': 'gui-vertical-slider.percent',
        'handle-outer-radius': 'gui-vertical-slider.handleOuterRadius',
        'handle-inner-radius': 'gui-vertical-slider.handleInnerRadius',
        'handle-outer-depth': 'gui-vertical-slider.handleOuterDepth',
        'handle-inner-depth': 'gui-vertical-slider.handleInnerDepth',
        'slider-bar-height': 'gui-vertical-slider.sliderBarHeight',
        'slider-bar-depth': 'gui-vertical-slider.sliderBarDepth',
        'left-right-padding': 'gui-vertical-slider.leftRightPadding',
        'top-bottom-padding': 'gui-vertical-slider.topBottomPadding',
        'border-color': 'gui-vertical-slider.borderColor',
        'background-color': 'gui-vertical-slider.backgroundColor',
        'hover-color': 'gui-vertical-slider.hoverColor',
        'active-color': 'gui-vertical-slider.activeColor',
        'handle-color': 'gui-vertical-slider.handleColor'
    }
});
