AFRAME.registerComponent('gui-circle-timer', {
    schema: {
        countDown: {type: 'number', default: 10 },
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_grey},
        borderColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var guiInteractable = el.getAttribute("gui-interactable");
        console.log("in timer callback, guiInteractable: "+JSON.stringify(guiInteractable));

        //fallback for old font-sizing
        if(data.fontSize > 20) { // 150/750
          var newSize = data.fontSize/750;
          data.fontSize = newSize;        
        }
        
        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:back; color:${data.backgroundColor};`);

        var timerContainer = document.createElement("a-entity");
        timerContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        timerContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerContainer.setAttribute('rotation', '90 0 0');
        timerContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(timerContainer);

        var timerIndicator1 = document.createElement("a-ring");
        timerIndicator1.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator1.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator1.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator1.setAttribute('theta-start', '-1');
        timerIndicator1.setAttribute('theta-length', '3');
        timerIndicator1.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator1);
        var timerIndicator2 = document.createElement("a-ring");
        timerIndicator2.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator2.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator2.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator2.setAttribute('theta-start', '89');
        timerIndicator2.setAttribute('theta-length', '3');
        timerIndicator2.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator2);
        var timerIndicator3 = document.createElement("a-ring");
        timerIndicator3.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator3.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator3.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator3.setAttribute('theta-start', '179');
        timerIndicator3.setAttribute('theta-length', '3');
        timerIndicator3.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator3);
        var timerIndicator4 = document.createElement("a-ring");
        timerIndicator4.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator4.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator4.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator4.setAttribute('theta-start', '269');
        timerIndicator4.setAttribute('theta-length', '3');
        timerIndicator4.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator4);

        var timerRing = document.createElement("a-ring");
        timerRing.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        timerRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerRing.setAttribute('theta-start', '0');
        timerRing.setAttribute('theta-length', '0'); // this has to increase 0 to 360 when running the countdown
        timerRing.setAttribute('rotation', '0 180 90');
        timerRing.setAttribute('position', '0 0 0.03');
        el.appendChild(timerRing);
        this.timerRing = timerRing;

        var initCount = this.initCount = data.countDown;
        this.setText(data.countDown);

    },
    update: function (oldData) {
        var data = this.data;
        var el = this.el;
        if (Object.keys(oldData).length === 0) { return; }
        if (data.countDown !== oldData.countDown) {
            el.getObject3D('mesh').material.color = data.color;
            var left = data.countDown,
                count_down = this.initCount;
            var elapsed = (Math.round(((count_down - left) * 100 ) / count_down) / 100) * 360;
            this.timerRing.setAttribute('theta-length', elapsed); // this has to increase 0 to 360 when running the count_down

            this.textEntity.setAttribute('troika-text', `value: ${data.countDown};`);

            if(left == 1){
                console.log('fire callback on the last second');
            }
        }
    },
    setText: function (newTime) {

        // if (this.textEntity) {
        //     el.removeChild(this.textEntity);
        // }//clear old text

        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', `value: ${newTime}; 
                                                align:center; 
                                                anchor:center; 
                                                baseline:center;
                                                letterSpacing:0;
                                                color:${this.data.fontColor};
                                                font:${this.data.fontFamily};
                                                fontSize:${this.data.fontSize};
                                                depthOffset:1;
                                                maxWidth:${this.guiItem.width/1.05};
                                                `);
        textEntity.setAttribute('position', '0 0 0.05');
//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);           
 
    },
    callback: function () {
        var guiInteractable = this.el.getAttribute("gui-interactable");
        var clickActionFunctionName = guiInteractable.clickAction;
        console.log("in timer callback, guiInteractable: "+JSON.stringify(guiInteractable));
        console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
        // find object
        var clickActionFunction = window[clickActionFunctionName];
        //console.log("clickActionFunction: "+clickActionFunction);
        // is object a function?
        if (typeof clickActionFunction === "function") clickActionFunction();
    }
});

AFRAME.registerPrimitive( 'a-gui-circle-timer', {
    defaultComponents: {
        'gui-item': { type: 'circle-timer' },
        'gui-circle-timer': { }
    },
    mappings: {
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui timer specific
        'count-down': 'gui-circle-timer.countDown',
        'font-size': 'gui-circle-timer.fontSize',
        'font-family': 'gui-circle-timer.fontFamily',
        'font-color': 'gui-circle-timer.fontColor',
        'border-color': 'gui-circle-timer.borderColor',
        'background-color': 'gui-circle-timer.backgroundColor',
        'active-color': 'gui-circle-timer.activeColor',
        'callback': 'gui-interactable.clickAction',
    }
});
