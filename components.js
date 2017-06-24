
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


// Component to change to random color on click.
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        var COLORS = ['red', 'green', 'blue'];
        this.el.addEventListener('click', function (evt) {
            var randomIndex = Math.floor(Math.random() * COLORS.length);
            this.setAttribute('material', 'color', COLORS[randomIndex]);
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
    }
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


AFRAME.registerComponent('a-button', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        color: {type: 'color', default: '#AAA'}
    },
    /**
     * Initial creation and setting of the mesh.
     */
    init: function () {
        var data = this.data;
        var el = this.el;
        // Create geometry.
        this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        // Create material.
        this.material = new THREE.MeshStandardMaterial({color: data.color});
        // Create mesh.
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        // Set mesh on entity.
        el.setObject3D('mesh', this.mesh);
    }
});


AFRAME.registerComponent('gui-button', {
    schema: {
        targetFg: {type: 'selector', default: '#canvasObjFront'},
        targetBg: {type: 'selector', default: '#canvasObjBack'},
        text: {type: 'string', default: 'button'},
        fontColor: {type: 'string', default: 'rgba(0,0,0,1)'},
        borderColor: {type: 'string', default: 'rgba(0,0,0,1)'},
        backgroundColor: {type: 'string', default: 'rgba(215,215,215,1)'},
    },
    init: function() {
        var data = this.data;
        var el = this.el;
        var canvasFg = this.canvasFg = data.targetFg;
        var canvasBg = this.canvasBg = data.targetBg;
        var ctxFg = this.ctxFg = canvasFg.getContext('2d');
        var ctxBg = this.ctxBg = canvasBg.getContext('2d');
        var textLayer = document.getElementById('canvasObjFront');

        this.el.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:double;`);
        this.el.setAttribute('opacity', 0.95);
        this.el.setAttribute('geometry', 'primitive: plane;');


        roundedOutline(ctxBg, 10, 10, canvasBg.width - 20, canvasBg.height - 20, 5, data.borderColor);
        roundedRect(ctxBg, 20, 20, canvasBg.width - 40, canvasBg.height - 40, 10, data.backgroundColor);
        drawText(ctxFg, canvasFg, data.text, '100px Arial', data.fontColor, 1);

        //el.setAttribute()

    },
    update: function () {
        // var data = this.data;
        // var canvas = this.canvas = data.target;
        // var ctx = this.ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.fillText(data.text, canvas.width/2, canvas.height/2); // position x, y
    }
});
