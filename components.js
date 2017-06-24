
AFRAME.registerComponent('aframe-gui-container', {
  schema: {
      width: { type: 'number' },
      height: { type: 'number' },
      flexDirection: { type: 'string' },
      justifyContent: { type: 'string' },
      alignItems: { type: 'string' },
      componentPadding: { type: 'number' }
  },
  init: function () {
	  console.log("in aframe-gui-component init");
      this.el.setAttribute("geometry", `primitive: plane; height: ${this.data.height}; width: ${this.data.width};`);
      var cursorX = 0;
      var cursorY = this.data.height*0.5 - this.data.componentPadding
      if (this.data.flexDirection == 'column') {
          if (this.data.justifyContent == 'center') {
              cursorX = 0; // centered implies cursor X  is 0
          } else if (this.data.justifyContent == 'left') {
              cursorX = -this.data.width*0.5 + this.data.componentPadding;
          }
      }
      console.log("initial cursor position: "+`${cursorX} ${cursorY} 0.01`)
	  this.children = this.el.getChildEntities();
	  console.log("childElements: "+this.children);
	  for (var i = 0; i < this.children.length; i++) {
          // TODO: change this to call gedWidth() and setWidth() of component
          var childPositionX = 0;
          var childPositionY = 0;
          var childPositionZ = 0.01;
          var childElementWidth = 1.0;
          var childElementHeight = 0.5;
		  var childElement = this.children[i];
		  // get object position
          if (this.data.flexDirection == 'column') {
              if (this.data.justifyContent == 'center') {
                  childPositionX = 0; // child position is always 0 to center
              } else if (this.data.justifyContent == 'left') {
                  childPositionX = cursorX + childElementWidth*0.5;
              }
              var childPositionY = cursorY - childElementHeight*0.5
              if (this.data.alignItems == 'stretch') {
                  // stretch width since we are laying out in column
                  childElementWidth = this.data.width - this.data.componentPadding*2;
                  console.log("childElementWidth: "+childElementWidth);
                  // TODO: change this to call setWidth() of component
              }
              // going down column so advance cursorY
              cursorY = cursorY - childElementHeight - this.data.componentPadding;
          }
          childElement.setAttribute('position', `${childPositionX} ${childPositionY} ${childPositionZ}`)
          childElement.setAttribute('geometry', `primitive: plane; height: 0.5; width: ${childElementWidth};`)
	  }
  },
  update: function () {},
  tick: function () {},
  remove: function () {},
  pause: function () {},
  play: function () {},
  getElementSize: function () {}
});