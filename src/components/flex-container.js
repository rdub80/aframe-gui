require('../scripts/vars.js')

/*  //trying to figure out global styles that customize gui items
var styles = StyleSheet.create({
    fontFamily: {
        type: 'string',
        default: 'Helvetica'
    },
    fontColor: {
        type: 'string',
        default: key_offwhite
    },
    borderColor: {
        type: 'string',
        default: key_offwhite
    },
    backgroundColor: {
        type: 'string',
        default: key_grey
    },
    hoverColor: {
        type: 'string',
        default: key_grey_dark
    },
    activeColor: {
        type: 'string',
        default: key_orange
    },
    handleColor: {
        type: 'string',
        default: key_offwhite
    },
});
*/

var onAppendChildToContainer = function(elem, f) {
   // console.log("in onAppend, elem: "+elem);
  var observer = new MutationObserver(function(mutations, me) {
      //console.log("in mutationObserver, me: "+me);
      mutations.forEach(function(m) {
        console.log(m);
        if (m.addedNodes.length) {
            f(m.target, m.addedNodes)
        }
    })
  })
  observer.observe(elem, {childList: true})
}

AFRAME.registerComponent('gui-flex-container', {
    schema: {
        flexDirection: { type: 'string', default: 'row' },
        justifyContent: { type: 'string', default: 'flexStart' },
        alignItems: { type: 'string', default: 'flexStart' },
        itemPadding: { type: 'number', default: 0.0 },
        opacity: { type: 'number', default: 0.0 },
        isTopContainer: {type: 'boolean', default: false},
        panelColor: {type: 'string', default: key_grey},

//global settings for GUI items
        styles: {
            fontFamily: {type: 'string', default: 'Helvetica'},
            fontColor: {type: 'string', default: key_offwhite},
            borderColor: {type: 'string', default: key_offwhite},
            backgroundColor: {type: 'string', default: key_grey},
            hoverColor: {type: 'string', default: key_grey_dark},
            activeColor: {type: 'string', default: key_orange},
            handleColor: {type: 'string', default: key_offwhite},
        }

    },
    init: function () {
        console.log("in aframe-gui-component init for: "+this.el.getAttribute("id"));
        var containerGuiItem = this.el.getAttribute("gui-item");

        if (this.data.isTopContainer) {
            this.setBackground();
        }

        this.el.setAttribute('geometry', `primitive: plane; height: ${containerGuiItem.height}; width: ${containerGuiItem.width};`);
        this.el.setAttribute('material', `shader: flat; transparent: true; opacity: ${this.data.opacity}; alphaTest: 0.5; color: ${this.data.panelColor}; side:front;`);

        this.children = this.el.getChildEntities();
        //console.log("childElements: "+this.children);
        //console.log("num child Elements: "+this.children.length);

        // coordinate system is 0, 0 in the top left
        var cursorX = 0;
        var cursorY = 0;
        if (this.data.flexDirection == 'row') {
            // first figure out cursor position on main X axis
            if (this.data.justifyContent == 'flexStart') {
                cursorX = 0;
            } else if (this.data.justifyContent == 'center' || this.data.justifyContent == 'flexEnd') {
                var rowWidth = 0;
                for (var i = 0; i < this.children.length; i++) {
                    var childElement = this.children[i];
                    var childGuiItem = childElement.getAttribute("gui-item");
                    rowWidth = rowWidth + childGuiItem.margin.w + childGuiItem.width + childGuiItem.margin.y;
                }
                if (this.data.justifyContent == 'center') {
                    cursorX = (containerGuiItem.width - rowWidth)*0.5;
                } else if (this.data.justifyContent == 'flexEnd') {
                    cursorX = containerGuiItem.width - rowWidth;
                }
            }
            // then figure out baseline / cursor position on cross Y axis
            if (this.data.alignItems == 'center') {
                cursorY = containerGuiItem.height; // baseline is center
            } else if (this.data.alignItems == 'flexStart') {
                cursorY = 0; // baseline is top of container
            } else if (this.data.alignItems == 'flexEnd') {
                cursorY = containerGuiItem.height; // baseline is bottom of container
            }
        } else if (this.data.flexDirection == 'column') {
            // first figure out cursor position on main Y axis
            if (this.data.justifyContent == 'flexStart') {
                cursorY = 0;
            } else if (this.data.justifyContent == 'center' || this.data.justifyContent == 'flexEnd') {
                var columnHeight = 0;
                for (var i = 0; i < this.children.length; i++) {
                    var childElement = this.children[i];
                    //console.log("childElement: "+childElement);
                    var childGuiItem = childElement.getAttribute("gui-item");
                    //console.log("childGuiItem: "+childGuiItem);
                    columnHeight = columnHeight + childGuiItem.margin.x + childGuiItem.height + childGuiItem.margin.z;
                }
                if (this.data.justifyContent == 'center') {
                    cursorY = (containerGuiItem.height - columnHeight)*0.5;
                } else if (this.data.justifyContent == 'flexEnd') {
                    cursorY = containerGuiItem.height - columnHeight;
                }
            }
            // then figure out baseline / cursor position on cross X axis
            if (this.data.alignItems == 'flexStart') {
                cursorX = 0; // baseline is left
            } else if (this.data.alignItems == 'center') {
                cursorX = containerGuiItem.width*0.5; // baseline is center
            } else if (this.data.alignItems == 'flexEnd') {
                cursorX = 0; // baseline is right
            }
        }
        //console.log(`initial cursor position for ${this.el.getAttribute("id")}: ${cursorX} ${cursorY} 0.01`)

        // not that cursor positions are determined, loop through and lay out items
        var wrapOffsetX = 0; // not used yet since wrapping isn't supported
        var wrapOffsetY = 0; // not used yet since wrapping isn't supported
        for (var i = 0; i < this.children.length; i++) {
            var childElement = this.children[i];
            // TODO: change this to call gedWidth() and setWidth() of component
            var childPositionX = 0;
            var childPositionY = 0;
            var childPositionZ = 0.01;
            var childGuiItem = childElement.getAttribute("gui-item");

            // now get object position in aframe container cordinates (0, 0 is center)
            if (childGuiItem) {
                if (this.data.flexDirection == 'row') {
                    if (this.data.alignItems == 'center') {
                        childPositionY = 0; // child position is always 0 for center vertical alignment
                    } else if (this.data.alignItems == 'flexStart') {
                        childPositionY = containerGuiItem.height * 0.5 - childGuiItem.margin.x - childGuiItem.height;
                    } else if (this.data.alignItems == 'flexEnd') {
                        childPositionY = -containerGuiItem.height * 0.5 + childGuiItem.margin.z + childGuiItem.height;
                    }
                    childPositionX = -containerGuiItem.width*0.5 + cursorX + childGuiItem.margin.w + childGuiItem.width * 0.5
                    cursorX = cursorX + childGuiItem.margin.w + childGuiItem.width + childGuiItem.margin.y;
                } else if (this.data.flexDirection == 'column') {
                    if (this.data.alignItems == 'center') {
                        childPositionX = 0; // child position is always 0 to center
                    } else if (this.data.alignItems == 'flexStart') {
                        childPositionX = -containerGuiItem.width*0.5 + childGuiItem.margin.w + childGuiItem.width * 0.5;
                    } else if (this.data.alignItems == 'flexEnd') {
                        childPositionX = containerGuiItem.width*0.5 - childGuiItem.margin.y - childGuiItem.width * 0.5;
                    }
                    childPositionY = containerGuiItem.height*0.5 - cursorY -  - childGuiItem.margin.x - childGuiItem.height * 0.5
                    cursorY = cursorY + childGuiItem.margin.x + childGuiItem.height + childGuiItem.margin.z;
                }
                //console.log(`child element position for ${childElement.id}: ${childPositionX} ${childPositionY} ${childPositionZ}`)
                childElement.setAttribute('position', `${childPositionX} ${childPositionY} ${childPositionZ}`)
                childElement.setAttribute('geometry', `primitive: plane; height: ${childGuiItem.height}; width: ${childGuiItem.width};`)
                var childFlexContainer = childElement.components['gui-flex-container']
                if (childFlexContainer) {
                    childFlexContainer.setBackground();
                }
            }
        }

      onAppendChildToContainer(this.el, function(containerElement, addedChildren) {
        //console.log('****** containerElement: ' + containerElement);
        //console.log('****** addedChildren: ' + addedChildren.length);
        // containerElement.components['gui-flex-container'].init();
        var addedChild = addedChildren[0];
        addedChildren[0].addEventListener("loaded", (e) => {
          //console.log('in appended element loaded handler: '+e);
          //console.log('addedChild: '+addedChild);
          //console.log('****** containerElement: ' + containerElement);
          containerElement.components['gui-flex-container'].init();
        })
      })

    },
    update: function () {},
    tick: function () {},
    remove: function () {},
    pause: function () {},
    play: function () {},
    getElementSize: function () {},
    setBackground: function () {
        if (this.data.opacity > 0) {
            console.log("panel position: " + JSON.stringify(this.el.getAttribute("position")));
            var guiItem = this.el.getAttribute("gui-item");
            var panelBackground = document.createElement("a-entity");

            panelBackground.setAttribute('geometry', `primitive: box; height: ${guiItem.height}; width: ${guiItem.width}; depth:0.025;`);
            console.log("about to set panel background color to: : " + this.data.panelColor);
            panelBackground.setAttribute('material', `shader: standard; depthTest: true; opacity: ${this.data.opacity}; color: ${this.data.panelColor};`);
            panelBackground.setAttribute('position', this.el.getAttribute("position").x + ' ' + this.el.getAttribute("position").y + ' ' + (this.el.getAttribute("position").z - 0.0125));
            panelBackground.setAttribute('rotation', this.el.getAttribute("rotation").x + ' ' + this.el.getAttribute("rotation").y + ' ' + this.el.getAttribute("rotation").z);
            this.el.parentNode.insertBefore(panelBackground, this.el);
        }

    },

});

AFRAME.registerPrimitive( 'a-gui-flex-container', {
    defaultComponents: {
        'gui-item': { type: 'flex-container' },
        'gui-flex-container': { }
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'flex-direction': 'gui-flex-container.flexDirection',
        'justify-content': 'gui-flex-container.justifyContent',
        'align-items': 'gui-flex-container.alignItems',
        'item-padding': 'gui-flex-container.itemPadding',
        'opacity': 'gui-flex-container.opacity',
        'is-top-container': 'gui-flex-container.isTopContainer',
        'panel-color': 'gui-flex-container.panelColor',
        'font-family': 'gui-flex-container.styles.fontFamily',
        'font-color': 'gui-flex-container.styles.fontColor',
        'border-color': 'gui-flex-container.styles.borderColor',
        'background-color': 'gui-flex-container.styles.backgroundColor',
        'hover-color': 'gui-flex-container.styles.hoverColor',
        'active-color': 'gui-flex-container.styles.activeColor',
        'handle-color': 'gui-flex-container.styles.handleColor',
    }
});
