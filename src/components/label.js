AFRAME.registerComponent('gui-label', {
  schema: {
    text: {type: 'string', default: 'label text'},
    align: {type: 'string', default: 'center'},
    labelFor: {type: 'selector', default: null},
    fontSize: {type: 'string', default: '150px'},
    fontFamily: {type: 'string', default: 'Helvetica'},
    fontColor: {type: 'string', default: key_grey_dark},
    fontWeight: {type: 'string', default: 'normal'},
    backgroundColor: {type: 'string', default: key_offwhite},
    opacity: { type: 'number', default: 1.0 },
    textDepth: { type: 'number', default: 0.001 },
  },
  init: function() {
    var data = this.data;
    var el = this.el;
    var guiItem = el.getAttribute("gui-item");
    var multiplier = 500;
    var canvasWidth = guiItem.width*multiplier;
    var canvasHeight = guiItem.height*multiplier;

      var canvasContainer = document.createElement('div');
      this.canvasContainer = canvasContainer;
      canvasContainer.setAttribute('class', 'visuallyhidden');
      canvasContainer.id = getUniqueId('canvasContainer');
      document.body.appendChild(canvasContainer);


      var canvas = document.createElement("canvas");
      this.canvas = canvas;
      canvas.className = "visuallyhidden";
      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);
      canvas.id = getUniqueId('canvas');
      canvasContainer.appendChild(canvas);

    var ctx = this.ctx = canvas.getContext('2d');

    el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
    el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor}; transparent: true; opacity: ${data.opacity}; alphaTest: 0.5;`);

    this.oldText = data.text;

   //  drawText(ctx, canvas, data.text, guiItem.fontSize+' ' + data.fontFamily, data.fontColor, 1);

    drawText(ctx, canvas, data.text, data.fontSize, data.fontFamily, data.fontColor, 1,data.align,'middle', data.fontWeight);

    if (this.textEntity) {
      el.removeChild(this.textEntity);
    }
      var textEntity = document.createElement("a-entity");
      this.textEntity = textEntity;
      textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
      textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1.0; alphaTest: 0.5; side:front;`);
      textEntity.setAttribute('position', `0 0 ${data.textDepth}`);
      el.appendChild(textEntity);

    ////WAI ARIA Support

    if(data.labelFor){
      // el.setAttribute('role', 'button');
    }


  },
  update: function (oldData) {
    // console.log("In label update, toggle");
   this.init();
  },
  tick() {
    if (this.data.text !== this.oldText) {
      // console.log('text was changed, about to draw text: ' + this.data.text);
      this.oldText = this.data.text;
     //  drawText(this.ctx, this.canvas, this.data.text, '100px ' + this.data.fontFamily, this.data.fontColor, 1);
      drawText(this.ctx, this.canvas, this.data.text, this.data.fontSize, this.data.fontFamily, this.data.fontColor, 1,data.align,'middle', this.data.fontWeight);
    }
  },
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
    'on': 'gui-button.on',
    'align': 'gui-label.align',
    'value': 'gui-label.text',
    'label-for': 'gui-label.labelFor',
    'font-size': 'gui-label.fontSize',
    'font-color': 'gui-label.fontColor',
    'font-family': 'gui-label.fontFamily',
    'font-weight': 'gui-label.fontWeight',
    'background-color': 'gui-label.backgroundColor',
    'opacity': 'gui-label.opacity',
    'text-depth': 'gui-label.textDepth'
  }
 });
