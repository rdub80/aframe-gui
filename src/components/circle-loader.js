AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        loaded: {type: 'number', default: 0.5 },
        fontSize: {type: 'number', default: 0.2},
        fontFamily: {type: 'string', default: ''},
        fontColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;

        //fallback for old font-sizing
        if(data.fontSize > 20) { // 150/1000
          var newSize = data.fontSize/750;
          data.fontSize = newSize;        
        }

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:back; color:${data.backgroundColor};`);

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        loaderContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        loaderContainer.setAttribute('rotation', '90 0 0');
        loaderContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(loaderContainer);

        // var countLoaded = document.createElement("a-entity");
        // countLoaded.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.5}; height: ${guiItem.height/1.5};`);
        // countLoaded.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:front;`);
        // countLoaded.setAttribute('position', '0 0 0.022');
        // countLoaded.id = "loader_ring_count";
        // el.appendChild(countLoaded);

        var loaderRing = document.createElement("a-ring");
        loaderRing.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.activeColor}`);
        loaderRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        loaderRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', `${data.loaded*-360}`);
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

        this.setText(data.loaded);


    },
    play: function () {
    },
    update: function (oldData) {
        var data = this.data;
        var el = this.el;

        if(this.textEntity){
            console.log("has textEntity: "+this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.loaded);
   
        }else{
            console.log("no textEntity!");   
        }        
    },
    setText: function (newLoaded) {
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', `value: ${Math.round(newLoaded*100)}; 
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
    }
});

AFRAME.registerPrimitive( 'a-gui-circle-loader', {
    defaultComponents: {
        'gui-item': { type: 'circle-loader' },
        'gui-circle-loader': { }
    },
    mappings: {
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui loader specific
        'loaded': 'gui-circle-loader.loaded',
        'font-size': 'gui-circle-loader.fontSize',
        'font-family': 'gui-circle-loader.fontFamily',
        'font-color': 'gui-circle-loader.fontColor',
        'background-color': 'gui-circle-loader.backgroundColor',
        'active-color': 'gui-circle-loader.activeColor'
    }
});
