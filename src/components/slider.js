AFRAME.registerComponent('gui-slider', {
    schema: {
        activeColor: {type: 'string', default: key_orange},
        backgroundColor: {type: 'string', default: key_offwhite},
        borderColor: {type: 'string', default: key_grey},
        handleColor: {type: 'string', default: key_white},
        handleInnerDepth: {type: 'number', default: '0.02'},
        handleInnerRadius: {type: 'number', default: '0.13'},
        handleOuterDepth: {type: 'number', default: '0.04'},
        handleOuterRadius: {type: 'number', default: '0.17'},
        hoverColor: {type: 'string', default: key_grey_light},
        leftRightPadding: {type: 'number', default: '0.25'},
        percent: {type: 'number', default: '0.5'},
        sliderBarHeight: {type: 'number', default: '0.05'},
        sliderBarDepth: {type: 'number', default: '0.03'},
        topBottomPadding: {type: 'number', default: '0.125'},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var sliderWidth = guiItem.width - data.leftRightPadding*2.0
        var sliderHeight = guiItem.height - data.topBottomPadding*2.0

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);

        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', `primitive: box; width: ${data.percent*sliderWidth}; height: ${data.sliderBarHeight}; depth: ${data.sliderBarDepth};`);
        sliderActiveBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        sliderActiveBar.setAttribute('position', `${data.percent - sliderWidth*0.5} 0 ${data.sliderBarDepth - 0.01}`);
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', `primitive: box; width: ${sliderWidth - data.percent * sliderWidth}; height: ${data.sliderBarHeight}; depth: ${data.sliderBarDepth};`);
        sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor};`);
        sliderBar.setAttribute('position', `${data.percent * sliderWidth * 0.5} 0 ${data.sliderBarDepth - 0.01}`);
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', `primitive: cylinder; radius: ${data.handleOuterRadius}; height: ${data.handleOuterDepth};`);
        handleContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor};`);
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', `${data.percent*sliderWidth - sliderWidth*0.5} 0 ${data.handleOuterDepth - 0.01}`);
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
            var sliderBarWidth = 2; // total width of slider bar
            if (localCoordinates.x <= (-sliderBarWidth / 2)) {
                data.percent = 0;
            } else if (localCoordinates.x >= (sliderBarWidth / 2)) {
                data.percent = 1.0;
            } else {
                data.percent = (localCoordinates.x + (sliderBarWidth /2)) / sliderBarWidth;
            }
            console.log("handle container: "+handleContainer);
            sliderActiveBar.setAttribute('geometry', `primitive: box; width: ${data.percent*2}; height: 0.05; depth: 0.03;`);
            sliderActiveBar.setAttribute('position', `${data.percent-1} 0 0.02`);
            sliderBar.setAttribute('geometry', `primitive: box; width: ${2-data.percent*2}; height: 0.05; depth: 0.03;`);
            sliderBar.setAttribute('position', `${data.percent*1} 0 0.02`);
            handleContainer.setAttribute('position', `${data.percent*2-1} 0 0.03`);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt, data.percent);
        });


    },
    update: function () {
    },
    tick: function () {
    },
    remove: function () {
    },
    pause: function () {
    },
    play: function () {
    },
});

AFRAME.registerPrimitive( 'a-gui-slider', {
    defaultComponents: {
        'gui-interactable': { },
        'gui-item': { type: 'slider' },
        'gui-slider': { }
    },
    mappings: {
        'active-color': 'gui-slider.activeColor',
        'background-color': 'gui-slider.backgroundColor',
        'border-color': 'gui-slider.borderColor',
        'handle-color': 'gui-slider.handleColor',
        'handle-inner-depth': 'gui-slider.handleInnerDepth',
        'handle-inner-radius': 'gui-slider.handleInnerRadius',
        'handle-outer-depth': 'gui-slider.handleOuterDepth',
        'handle-outer-radius': 'gui-slider.handleOuterRadius',
        'height': 'gui-item.height',
        'hover-color': 'gui-slider.hoverColor',
        'key-code': 'gui-interactable.keyCode',
        'left-right-padding': 'gui-slider.leftRightPadding',
        'margin': 'gui-item.margin',
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'percent': 'gui-slider.percent',
        'slider-bar-depth': 'gui-slider.sliderBarDepth',
        'slider-bar-height': 'gui-slider.sliderBarHeight',
        'top-bottom-padding': 'gui-slider.topBottomPadding',
        'width': 'gui-item.width',
    }
});
