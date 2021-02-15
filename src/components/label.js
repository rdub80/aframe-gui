AFRAME.registerComponent('gui-label', {
  schema: {
    value: {type: 'string', default: ''},
    align: {type: 'string', default: 'center'},
    anchor: {type: 'string', default: 'center'},
    fontSize: {type: 'number', default: 0.2},
    lineHeight: {type: 'number', default: 0.2},
    letterSpacing: {type: 'number', default: 0},
    fontFamily: {type: 'string', default: ''},
    fontColor: {type: 'string', default: key_grey_dark},
    backgroundColor: {type: 'string', default: key_offwhite},
    opacity: { type: 'number', default: 1.0 },
    textDepth: { type: 'number', default: 0.01 },
  },
  init: function() {
    var data = this.data;
    var el = this.el;
    var guiItem = el.getAttribute("gui-item");
    this.guiItem = guiItem;

    el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
    el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor}; transparent: true; opacity: ${data.opacity}; alphaTest: 0.5;`);
    
    //fallback for old font-sizing
    if(data.fontSize > 20) { // 150/750
      var newSize = data.fontSize/750;
      data.fontSize = newSize;        
    }

    this.setText(data.value);

    ////WAI ARIA Support

    // if(data.labelFor){
    //   // el.setAttribute('role', 'button');
    // }


    },
    update: function (oldData) {
        var data = this.data;
        var el = this.el;

        if(this.textEntity){
            console.log("has textEntity: "+this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
   
        }else{
            console.log("no textEntity!");   
        }
    },
    setText: function (newText) {
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', `value: ${newText}; 
                                                align: ${this.data.align}; 
                                                anchor: ${this.data.anchor}; 
                                                baseline:center;
                                                letterSpacing:0;
                                                lineHeight: ${this.data.lineHeight};
                                                color:${this.data.fontColor};
                                                font:${this.data.fontFamily};
                                                fontSize:${this.data.fontSize};
                                                depthOffset:1;
                                                maxWidth:${this.guiItem.width/1.05};
                                                `);
        textEntity.setAttribute('position', `0 0 ${this.data.textDepth}`);
//        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    }
});

AFRAME.registerPrimitive( 'a-gui-label', {
  defaultComponents: {
    'gui-item': { type: 'label' },
    'gui-label': { }
  },
  mappings: {
    'width': 'gui-item.width',
    'height': 'gui-item.height',
    'margin': 'gui-item.margin',
    'align': 'gui-label.align',
    'anchor': 'gui-label.anchor',
    'value': 'gui-label.value',
    'font-size': 'gui-label.fontSize',
    'line-height': 'gui-label.lineHeight',
    'letter-spacing': 'gui-label.letterSpacing',
    'font-color': 'gui-label.fontColor',
    'font-family': 'gui-label.fontFamily',
    'background-color': 'gui-label.backgroundColor',
    'opacity': 'gui-label.opacity',
    'text-depth': 'gui-label.textDepth'
  }
 });
