function getUniqueId(stringPrefix) {
    var datestr = new Date().getTime().toString();
    var randomstr = Math.random().toString().replace('.', '');
    return stringPrefix + '_' + datestr + randomstr;
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

AFRAME.registerComponent('gui-item', {
    schema: {
        type: {type: 'string'},
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1}
    },
    init: function () {
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

AFRAME.registerComponent('gui-flex-container', {
  schema: {
      flexDirection: { type: 'string' },
      justifyContent: { type: 'string' },
      alignItems: { type: 'string' },
      componentPadding: { type: 'number' },
      fontColor: {type: 'string', default: 'rgba(0,0,0,1)'},
      borderColor: {type: 'string', default: 'rgba(0,0,0,1)'},
      backgroundColor: {type: 'string', default: 'rgba(215,215,215,0.5)'},
      opacity: { type: 'number', default: 1.0 }
  },
  init: function () {
	  console.log("in aframe-gui-component init");
	  var guiItem = this.el.getAttribute("gui-item")
      console.log("container gui-item: "+guiItem);
      this.el.setAttribute("geometry", `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
      this.el.setAttribute('material', `shader: flat; transparent: true; opacity: ${this.data.opacity}; color: ${this.data.backgroundColor};`);
      var cursorX = 0;
      var cursorY = guiItem.height*0.5 - this.data.componentPadding
      if (this.data.flexDirection == 'column') {
          if (this.data.justifyContent == 'center') {
              cursorX = 0; // centered implies cursor X  is 0
          } else if (this.data.justifyContent == 'left') {
              cursorX = -guiItem.width*0.5 + this.data.componentPadding;
          }
      }
      console.log("initial cursor position: "+`${cursorX} ${cursorY} 0.01`)
	  this.children = this.el.getChildEntities();
	  console.log("childElements: "+this.children);
	  for (var i = 0; i < this.children.length; i++) {
          var childElement = this.children[i];
          // TODO: change this to call gedWidth() and setWidth() of component
          var childPositionX = 0;
          var childPositionY = 0;
          var childPositionZ = 0.01;
          var childGuiItem = childElement.getAttribute("gui-item");
		  //console.log("childElement button-text: "+ childElement.getAttribute("button-text"));
          //console.log("childElement data width: "+ childElement.getAttribute("button-text").width);
		  // get object position
          if (this.data.flexDirection == 'column') {
              if (this.data.justifyContent == 'center') {
                  childPositionX = 0; // child position is always 0 to center
              } else if (this.data.justifyContent == 'left') {
                  childPositionX = cursorX + childGuiItem.width*0.5;
              }
              var childPositionY = cursorY - childGuiItem.height*0.5
              if (this.data.alignItems == 'stretch') {
                  // stretch width since we are laying out in column
                  childGuiItem.width = guiItem.width - this.data.componentPadding*2;
                  console.log("childElementWidth: "+childGuiItem.width);
                  // TODO: change this to call setWidth() of component
              }
              // going down column so advance cursorY
              cursorY = cursorY - childGuiItem.height - this.data.componentPadding;
          }
          childElement.setAttribute('position', `${childPositionX} ${childPositionY} ${childPositionZ}`)
          childElement.setAttribute('geometry', `primitive: plane; height: ${childGuiItem.height}; width: ${childGuiItem.width};`)
	  }
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
  getElementSize: function () {}
});

function roundedOutline(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function roundedRect(ctx, x, y, width, height, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawText(ctx, canvas, text, font, color, size) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.width/2, canvas.height/2); // position x, y

}


function drawLabel(ctx, canvas, text, font, color, size,) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "left";
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;
    ctx.scale(1, 1);
    ctx.fillText(text, canvas.width/2 - canvas.width/4, canvas.height/2, canvas.width - canvas.width/4); // position x, y
}

AFRAME.registerComponent('gui-button', {
    schema: {
        on: {default: 'click'},
//    	emit: {default:null},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: 'rgba(0,0,0,1)'},
        borderColor: {type: 'string', default: 'rgba(0,0,0,1)'},
        backgroundColor: {type: 'string', default: 'rgba(215,215,215,1)'},
        hoverColor: {type: 'string', default: 'rgba(122,122,122,1)'},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;

        var canvasBg = document.createElement("canvas");
        this.canvasBg = canvasBg
        canvasBg.setAttribute('width', canvasWidth);
        canvasBg.setAttribute('height', canvasHeight);
        canvasBg.id = getUniqueId('canvasObjBack');
        document.body.appendChild(canvasBg);

        var canvasFg = document.createElement("canvas");
        this.canvasFg = canvasFg
        canvasFg.setAttribute('width', canvasWidth);
        canvasFg.setAttribute('height', canvasHeight);
        canvasFg.id = getUniqueId('canvasObjFront');
        document.body.appendChild(canvasFg);

        var ctxFg = this.ctxFg = canvasFg.getContext('2d');
        var ctxBg = this.ctxBg = canvasBg.getContext('2d');

        el.setAttribute('material', 'color', data.backgroundColor);
        el.setAttribute('geometry', 'width', guiItem.width);
        el.setAttribute('geometry', 'height', guiItem.height);



        roundedOutline(ctxBg, 10, 10, canvasBg.width - 20, canvasBg.height - 20, 5, data.borderColor);
        roundedRect(ctxBg, 20, 20, canvasBg.width - 40, canvasBg.height - 40, 10, data.backgroundColor);
        drawText(ctxFg, canvasFg, data.text, '100px Arial', data.fontColor, 1);
        var textWidth = getTextWidth(data.text, '50px Arial');
        console.log("textWidth: "+textWidth);

        var bgEntity = document.createElement("a-entity");
        bgEntity.setAttribute('material', `shader: flat; src: #${canvasBg.id}; transparent: true; opacity: 1; side:double;`);
        bgEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width}; height: ${guiItem.height};`);
        bgEntity.setAttribute('position', '0 0 0.001');
        this.el.appendChild(bgEntity);

        var fgEntity = document.createElement("a-entity");
        fgEntity.setAttribute('material', `shader: flat; src: #${canvasFg.id}; transparent: true; opacity: 1; side:double;`);
        fgEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width}; height: ${guiItem.height};`);
        fgEntity.setAttribute('position', '0 0 0.002');
        this.el.appendChild(fgEntity);


        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            this.setAttribute('material', 'color', data.fontColor);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });


    },
    play: function () {

    },
});

AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: {default: 'click'},
        text: {type: 'string', default: 'text'},
        fontColor: {type: 'string', default: 'black'},
        borderColor: {type: 'string', default: 'black'},
        borderWidth: {type: 'number', default: 1},
        toggleColor: {type: 'string', default: 'black'},
        toggleOnColor: {type: 'string', default: 'green'},
        toggleOffColor: {type: 'string', default: 'grey'},
        hoverColor: {type: 'string', default: 'red'},
        active: {type: 'boolean', default: true}
    },
    init: function() {

        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var data = this.data;
        var multiplier = 350;
        var canvasWidth = guiItem.width*multiplier;
        var canvasHeight = guiItem.height*multiplier;


        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');

        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px Arial', this.data.fontColor);


        el.setAttribute('material', 'color', data.backgroundColor);
        el.setAttribute('geometry', 'width', guiItem.width);
        el.setAttribute('geometry', 'height', guiItem.height);

        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:double;`);
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width}; height: ${guiItem.height};`);
        labelEntity.setAttribute('position', '0 0 0.02');
        this.el.appendChild(labelEntity);

        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            document.querySelector('#togglebox').emit('toggleAnimation');
            document.querySelector('#togglehandle').emit('toggleAnimation');
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

    }

});

AFRAME.registerComponent('gui-cursor', {
    schema: {
    },
    init: function () {
        var cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);
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
