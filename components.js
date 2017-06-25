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

        el.setAttribute('material', 'color', data.backgroundColor);
        el.setAttribute('geometry', 'width', guiItem.width);
        el.setAttribute('geometry', 'height', guiItem.height);

        var toggleBoxWidth = 0.50
        var toggleBoxX = -guiItem.width*0.5 + toggleBoxWidth*0.5 + 0.1;
        var toggleBox = document.createElement("a-box");
        toggleBox.setAttribute('width', `${toggleBoxWidth}`);
        toggleBox.setAttribute('height', '0.35');
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', 'color:lightgray; shader: flat;');
        toggleBox.setAttribute('position', `${toggleBoxX} 0 0`);
        this.el.appendChild(toggleBox);

        var toggleColorAnimation = document.createElement("a-animation");
        toggleColorAnimation.setAttribute('begin', 'toggleAnimation');
        toggleColorAnimation.setAttribute('direction', 'alternate');
        toggleColorAnimation.setAttribute('attribute', 'material.color');
        toggleColorAnimation.setAttribute('from', 'gray');
        toggleColorAnimation.setAttribute('to', 'green');
        toggleColorAnimation.setAttribute('dur', '500');
        toggleColorAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleBox.appendChild(toggleColorAnimation);

        var toggleHandleWidth = 0.15
        var toggleHandleX = -toggleBoxWidth*0.5 + toggleHandleWidth*0.5 + 0.05;
        var toggleHandle = document.createElement("a-box");
        toggleHandle.setAttribute('width', `${toggleHandleWidth}`);
        toggleHandle.setAttribute('height', '0.30');
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', 'color:grey');
        toggleHandle.setAttribute('position', `${toggleHandleX} 0 0`);
        toggleBox.appendChild(toggleHandle);

        var toggleHandleAnimation = document.createElement("a-animation");
        toggleHandleAnimation.setAttribute('begin', 'toggleAnimation');
        toggleHandleAnimation.setAttribute('direction', 'alternate');
        toggleHandleAnimation.setAttribute('attribute', 'position');
        toggleHandleAnimation.setAttribute('from', `${toggleHandleX} 0 0`);
        toggleHandleAnimation.setAttribute('to', `${toggleHandleX + toggleBoxWidth - 0.25} 0 0`);
        toggleHandleAnimation.setAttribute('dur', '500');
        toggleHandleAnimation.setAttribute('easing', 'ease-in-out-cubic');
        toggleHandle.appendChild(toggleHandleAnimation);


        var labelWidth = guiItem.width - toggleBoxWidth;
        var multiplier = 350;
        var canvasWidth = labelWidth*multiplier;
        var canvasHeight = guiItem.height*multiplier;
        var labelCanvas = document.createElement("canvas");
        this.labelCanvas = labelCanvas
        labelCanvas.setAttribute('width', canvasWidth);
        labelCanvas.setAttribute('height', canvasHeight);
        labelCanvas.id = getUniqueId('canvas');
        document.body.appendChild(labelCanvas);

        var ctxLabel = this.ctxLabel = labelCanvas.getContext('2d');

        drawLabel(this.ctxLabel, this.labelCanvas, this.data.text, '100px Arial', this.data.fontColor);

        var labelEntity = document.createElement("a-entity");
        labelEntity.setAttribute('material', `shader: flat; src: #${labelCanvas.id}; transparent: true; opacity: 1; side:double;`);
        labelEntity.setAttribute('geometry', `primitive: plane; width: ${labelWidth}; height: ${guiItem.height};`);
        labelEntity.setAttribute('position', '0 0 0.02');
        this.el.appendChild(labelEntity);

        /*

         <a-box id="togglebox" width="0.75" height="0.5" depth="0.01" material="color:white" position="-1 0 0">
         <a-animation begin="toggleAnimation" direction="alternate" attribute="material.color" from="white" to="green"
         dur="500" easing="ease-in-out-cubic"></a-animation>
         <a-box id="togglehandle" width="0.15" height="0.45" depth="0.02" material="color:grey"  position="-0.25 0 0">
         <a-animation begin="toggleAnimation" direction="alternate" attribute="position" from="-0.25 0 0"
         to="0.25 0 0" dur="500" easing="ease-in-out-cubic"></a-animation>
         </a-box>
         </a-box>

         */




        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('material', 'color', data.backgroundColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            toggleColorAnimation.emit('toggleAnimation');
            toggleHandleAnimation.emit('toggleAnimation');
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
        cursorColor: {type: 'string', default: 'white'},
        cursorActiveColor: {type: 'string', default: 'green'},
    },
    init: function () {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

        var el = this.el;

        var cursorShadow = document.createElement("a-entity");
        cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
        cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.02; radiusOuter:0.0225');
        this.el.appendChild(cursorShadow);

        var defaultHoverAnimationDuration = 500;
        var hoverGuiAnimation = document.createElement("a-animation");
        hoverGuiAnimation.setAttribute('begin', 'hovergui');
        hoverGuiAnimation.setAttribute('easing', 'linear');
        hoverGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        hoverGuiAnimation.setAttribute('fill', 'forwards');
        hoverGuiAnimation.setAttribute('from', '0.00015');
        hoverGuiAnimation.setAttribute('to', '0.015');
        hoverGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation);

        var leaveGuiAnimation = document.createElement("a-animation");
        leaveGuiAnimation.setAttribute('begin', 'leavegui');
        leaveGuiAnimation.setAttribute('easing', 'linear');
        leaveGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        leaveGuiAnimation.setAttribute('fill', 'forwards');
        leaveGuiAnimation.setAttribute('from', '0.015');
        leaveGuiAnimation.setAttribute('to', '0.00015');
        leaveGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation);

        var fuseScaleAnimation = document.createElement("a-animation");
        fuseScaleAnimation.setAttribute('begin', 'cursor-fusing');
        fuseScaleAnimation.setAttribute('easing', 'linear');
        fuseScaleAnimation.setAttribute('attribute', 'scale');
        fuseScaleAnimation.setAttribute('fill', 'forwards');
        fuseScaleAnimation.setAttribute('from', '1 1 1');
        fuseScaleAnimation.setAttribute('to', '2 2 2');
        fuseScaleAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseScaleAnimation.setAttribute('dur', '100');
        this.el.appendChild(fuseScaleAnimation);

        var fuseColorAnimation = document.createElement("a-animation");
        fuseColorAnimation.setAttribute('begin', 'cursor-fusing');
        fuseColorAnimation.setAttribute('easing', 'linear');
        fuseColorAnimation.setAttribute('attribute', 'material.color');
        fuseColorAnimation.setAttribute('fill', 'forwards');
        fuseColorAnimation.setAttribute('from', this.data.cursorColor);
        fuseColorAnimation.setAttribute('to', this.data.cursorActiveColor);
        fuseColorAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseColorAnimation.setAttribute('dur', '100');
        this.el.appendChild(fuseColorAnimation);

        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;
        var fuseFillAnimation = document.createElement("a-animation");
        fuseFillAnimation.setAttribute('begin', 'cursor-fusing');
        fuseFillAnimation.setAttribute('easing', 'linear');
        fuseFillAnimation.setAttribute('attribute', 'geometry.thetaLength');
        fuseFillAnimation.setAttribute('fill', 'forwards');
        fuseFillAnimation.setAttribute('from', '0');
        fuseFillAnimation.setAttribute('to', '360');
        fuseFillAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseFillAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
        this.el.appendChild(fuseFillAnimation);

        var clickAnimation = document.createElement("a-animation");
        clickAnimation.setAttribute('begin', 'click');
        clickAnimation.setAttribute('easing', 'ease-in');
        clickAnimation.setAttribute('attribute', 'scale');
        clickAnimation.setAttribute('fill', 'forwards');
        clickAnimation.setAttribute('from', '2 2 2');
        clickAnimation.setAttribute('to', '4 4 4');
        clickAnimation.setAttribute('dur', '300');
        this.el.appendChild(clickAnimation);

        el.addEventListener('mouseenter', function () {
            console.log("in gui-cursor mousenter, el: "+el);
            el.emit('hovergui');
        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: "+el);
            el.emit('leavegui');
        });

        //this.el.addEventListener("mouseenter", this.hovergui());
        //this.el.addEventListener("mouseleave", this.leavegui());
        // this.el.addEventListener("stateremoved", this.reset(this.ev)); 

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
    hovergui: function () {
        //this.cursor.emit('hovergui');
    },
    leavegui: function (evt) {
       // this.cursor.emit('leavegui');
    },
    resetcursor: function(){
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }        
    }
});

AFRAME.registerComponent('gui-interactable', {
    schema: {
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


// Reset cursor
var cursor = document.querySelector("#cursor");
if (cursor) {
  cursor.addEventListener("stateremoved", function (evt) {
    if (evt.detail.state === 'cursor-fusing') {
      AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
      AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
      AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
    }
  });
}