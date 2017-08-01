AFRAME.registerComponent('gui-slider', {
    schema: {
        percent: {type: 'number', default: '0.5'},
        backgroundColor: {type: 'string', default: key_offwhite},
        barColor: {type: 'string', default: key_grey},
        activeColor: {type: 'string', default: key_orange},
        handleContainerColor: {type: 'string', default: key_grey},
        handleColor: {type: 'string', default: key_white},
        hoverColor: {type: 'string', default: key_grey_light},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; opacity: 1;  color: ${data.backgroundColor}; side:front;`);

        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', `primitive: box; width: ${data.percent*2}; height: 0.05; depth: 0.03;`);
        sliderActiveBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor};`);
        sliderActiveBar.setAttribute('position', `${data.percent-1} 0 0.02`);
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', `primitive: box; width: ${2-data.percent*2}; height: 0.05; depth: 0.03;`);
        sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.barColor};`);
        sliderBar.setAttribute('position', `${data.percent*1} 0 0.02`);
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', `primitive: cylinder; radius: 0.17; height: 0.04;`);
        handleContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleContainerColor};`);
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', `${data.percent*2-1} 0 0.03`);
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', `primitive: cylinder; radius: 0.13; height: 0.02;`);
        handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.handleColor};`);
        handle.setAttribute('position', '0 0.02 0');
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
            if (typeof clickActionFunction === "function") clickActionFunction();
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
