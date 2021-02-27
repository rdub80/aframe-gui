/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('bevelbox', {
  schema: {
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    depth: { type: 'number', default: 1 },

    topLeftRadius: { type: 'number', default: 0.00001 },
    topRightRadius: { type: 'number', default: 0.00001 },
    bottomLeftRadius: { type: 'number', default: 0.00001 },
    bottomRightRadius: { type: 'number', default: 0.00001 },

    bevelEnabled: { type: 'boolean', default: true },
    bevelSegments: { type: 'number', default: 2 },
    steps: { type: 'number', default: 1 },
    bevelSize: { type: 'number', default: 0.1 },
    bevelOffset: { type: 'number', default: 0 },
    bevelThickness: { type: 'number', default: 0.1 }
  },

  multiple: false,

  init: function init() {
    var el = this.el;
    var data = this.data;

    var _w = data.width;
    var _h = data.height;
    var _x = -data.width / 2;
    var _y = -data.height / 2;

    var shape = new THREE.Shape();
    shape.moveTo(_x, _y + data.topLeftRadius);
    shape.lineTo(_x, _y + _h - data.topLeftRadius);
    shape.quadraticCurveTo(_x, _y + _h, _x + data.topLeftRadius, _y + _h);
    shape.lineTo(_x + _w - data.topRightRadius, _y + _h);
    shape.quadraticCurveTo(_x + _w, _y + _h, _x + _w, _y + _h - data.topRightRadius);
    shape.lineTo(_x + _w, _y + data.bottomRightRadius);
    shape.quadraticCurveTo(_x + _w, _y, _x + _w - data.bottomRightRadius, _y);
    shape.lineTo(_x + data.bottomLeftRadius, _y);
    shape.quadraticCurveTo(_x, _y, _x, _y + data.bottomLeftRadius);

    var extrudedShape = this.extrude(shape);

    el.setObject3D('mesh', extrudedShape);
  },

  extrude: function extrude(roundedBase) {
    var el = this.el;
    var data = this.data;

    var extrudeSettings = {
      steps: data.steps,
      depth: data.depth,
      bevelEnabled: data.bevelEnabled,
      bevelThickness: data.bevelThickness,
      bevelSize: data.bevelSize,
      bevelOffset: data.bevelOffset,
      bevelSegments: data.bevelSegments
    };

    var extrudedGeometry = new THREE.ExtrudeGeometry(roundedBase, extrudeSettings);
    return new THREE.Mesh(extrudedGeometry, new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide
    }));
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function update(oldData) {},

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function remove() {},

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function pause() {},

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function play() {}
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-button', {
    schema: {
        on: { default: 'click' },
        value: { type: 'string', default: '' },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_offwhite },
        focusColor: { type: 'string', default: key_orange_light },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false }
    },

    dependencies: ['aframe-troika-text'],

    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        /* gui item parameters
            type: {type: 'string'},
            width: {type: 'number', default: 1},
            height: {type: 'number', default: 1},
            baseDepth: {type: 'number', default: 0.01},
            depth: {type: 'number', default: 0.02},
            gap: {type: 'number', default: 0.025},
            radius: {type: 'number', default: 0},
            margin: { type: 'vec4', default: {x: 0, y: 0, z: 0, w: 0}},
             bevelEnabled: {type: 'boolean', default: true},
            bevelSegments: {type: 'number', default: 5},
            steps: {type: 'number', default: 2},
            bevelSize: {type: 'number', default: 4},
            bevelThickness: {type: 'number', default: 2}
        */

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/1000
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;
        /* gui interactable parameters
            clickAction: {type: 'string'},
            hoverAction: {type: 'string'},
            keyCode: {type: 'number', default: -1},
            key: {type: 'string'},
        */

        el.setAttribute('geometry', 'primitive: plane; \n                                     height: ' + guiItem.height + '; \n                                     width: ' + guiItem.width + ';\n                                     ');
        el.setAttribute('material', 'shader: flat; \n                                     transparent: true; \n                                     opacity: 0.5; \n                                     side:double; \n                                     color:' + data.backgroundColor + ';\n                                     ');

        var buttonContainer = document.createElement("a-entity");

        if (guiItem.bevel) {
            var bevelsize_adjust = guiItem.bevelSize * 1;
            var bevelthickness_adjust = guiItem.bevelThickness;
            buttonContainer.setAttribute('bevelbox', 'width: ' + (guiItem.width - guiItem.width * bevelsize_adjust) + '; \n                                                      height: ' + (guiItem.height - guiItem.height * bevelsize_adjust) + '; \n                                                      depth: ' + (guiItem.baseDepth - guiItem.baseDepth * bevelthickness_adjust) + ';\n                                                      bevelThickness: 0;\n                                                      bevelSize: ' + guiItem.bevelSize + ';\n                                                      ');
            buttonContainer.setAttribute('position', '0 0 0');
        } else {
            buttonContainer.setAttribute('geometry', 'primitive: box; \n                                                      width: ' + guiItem.width + '; \n                                                      height: ' + guiItem.height + '; \n                                                      depth: ' + guiItem.baseDepth + ';\n                                                      ');
            buttonContainer.setAttribute('position', '0 0 ' + guiItem.baseDepth / 2);
        }
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('material', 'shader: flat; \n                                                  opacity: 1; \n                                                  side:double; \n                                                  color: ' + data.borderColor + '\n                                                  ');
        el.appendChild(buttonContainer);
        this.buttonContainer = buttonContainer;

        var buttonEntity = document.createElement("a-entity");
        if (guiItem.bevel) {
            var bevelsize_adjust = guiItem.bevelSize * 1;
            var bevelthickness_adjust = guiItem.bevelThickness;
            buttonEntity.setAttribute('bevelbox', 'width: ' + (guiItem.width - guiItem.gap - (guiItem.width - guiItem.gap) * bevelsize_adjust) + '; \n                                                   height: ' + (guiItem.height - guiItem.gap - (guiItem.height - guiItem.gap) * bevelsize_adjust) + '; \n                                                   depth: ' + (guiItem.depth - guiItem.depth * bevelthickness_adjust) + ';\n                                                   bevelThickness: ' + guiItem.bevelThickness + ';\n                                                   bevelSize: ' + guiItem.bevelSize + ';\n                                                   ');
            buttonEntity.setAttribute('position', '0 0 0');
        } else {
            buttonEntity.setAttribute('geometry', 'primitive: box; \n                                               width: ' + (guiItem.width - guiItem.gap) + '; \n                                               height: ' + (guiItem.height - guiItem.gap) + '; \n                                               depth: ' + guiItem.depth + ';');
            buttonEntity.setAttribute('position', '0 0 ' + guiItem.depth / 2);
        }
        buttonEntity.setAttribute('material', 'shader: flat; \n                                               opacity: 1; \n                                               side:double; \n                                               color: ' + (data.toggleState ? data.activeColor : data.backgroundColor) + '\n                                               ');
        buttonEntity.setAttribute('rotation', '0 0 0');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        this.setText(data.value);

        el.addEventListener('mouseenter', function (event) {
            buttonEntity.removeAttribute('animation__leave');
            if (!data.toggle) {
                buttonEntity.setAttribute('animation__enter', 'property: material.color; from: ' + data.backgroundColor + '; to:' + data.hoverColor + '; dur:200;');
            }
        });
        el.addEventListener('mouseleave', function (event) {
            if (!data.toggle) {
                buttonEntity.removeAttribute('animation__click');
                buttonEntity.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.backgroundColor + '; dur:200; easing: easeOutQuad;');
            }
            buttonEntity.removeAttribute('animation__enter');
        });

        el.addEventListener('focus', function (event) {
            buttonContainer.setAttribute('material', 'color', '' + data.focusColor);
        });

        el.addEventListener('blur', function (event) {
            buttonContainer.setAttribute('material', 'color', '' + data.borderColor);
            if (!data.toggle) {
                buttonEntity.removeAttribute('animation__click');
                buttonEntity.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.backgroundColor + '; dur:200; easing: easeOutQuad;');
            }
            buttonEntity.removeAttribute('animation__enter');
        });

        el.addEventListener(data.on, function (event) {
            if (!data.toggle) {
                // if not toggling flashing active state
                buttonEntity.setAttribute('animation__click', 'property: material.color; from: ' + data.activeColor + '; to:' + data.backgroundColor + '; dur:400; easing: easeOutQuad;');
            } else {
                var guiButton = el.components['gui-button'];
                // console.log("about to toggle, current state: " + guiButton.data.toggleState);
                guiButton.setActiveState(!guiButton.data.toggleState);
                //  buttonEntity.setAttribute('material', 'color', data.activeColor);
            }

            var clickActionFunctionName = guiInteractable.clickAction;
            // console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(event);
        });

        el.addEventListener("keyup", function (event) {
            if (event.isComposing || event.keyCode === 229) {
                return;
            }

            if (event.keyCode == 13 || event.keyCode == 32) {
                el.emit(data.on);
            }
            event.preventDefault();
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', data.value);
    },
    play: function play() {},
    update: function update(oldData) {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;

        el.setAttribute('geometry', 'primitive: plane; \n                                     height: ' + guiItem.height + '; \n                                     width: ' + guiItem.width + ';\n                                     ');
        el.setAttribute('material', 'shader: flat; \n                                     transparent: true; \n                                     opacity: 0.5; \n                                     side:double; \n                                     color:' + data.backgroundColor + ';\n                                     ');

        if (guiItem.bevel) {
            var bevelsize_adjust = guiItem.bevelSize * 1;
            var bevelthickness_adjust = guiItem.bevelThickness;
            this.buttonContainer.setAttribute('bevelbox', 'width: ' + (guiItem.width - guiItem.width * bevelsize_adjust) + '; \n                                                           height: ' + (guiItem.height - guiItem.height * bevelsize_adjust) + '; \n                                                           depth: ' + (guiItem.baseDepth - guiItem.baseDepth * bevelthickness_adjust) + ';\n                                                           bevelThickness: 0;\n                                                           bevelSize: ' + guiItem.bevelSize + ';\n                                                           ');
            this.buttonContainer.setAttribute('position', '0 0 0');
        } else {
            this.buttonContainer.setAttribute('geometry', 'primitive: box; \n                                                       width: ' + guiItem.width + '; \n                                                       height: ' + guiItem.height + '; \n                                                       depth: ' + guiItem.baseDepth + ';\n                                                       ');
            this.buttonContainer.setAttribute('position', '0 0 ' + guiItem.baseDepth / 2);
        }
        this.buttonContainer.setAttribute('material', 'shader: flat; \n                                                       opacity: 1; \n                                                       side:double; \n                                                       color: ' + data.borderColor + '\n                                                       ');

        if (guiItem.bevel) {
            var bevelsize_adjust = guiItem.bevelSize * 1;
            var bevelthickness_adjust = guiItem.bevelThickness;
            this.buttonEntity.setAttribute('bevelbox', 'width: ' + (guiItem.width - guiItem.gap - (guiItem.width - guiItem.gap) * bevelsize_adjust) + '; \n                                                        height: ' + (guiItem.height - guiItem.gap - (guiItem.height - guiItem.gap) * bevelsize_adjust) + '; \n                                                        depth: ' + (guiItem.depth - guiItem.depth * bevelthickness_adjust) + ';\n                                                        bevelThickness: ' + guiItem.bevelThickness + ';\n                                                        bevelSize: ' + guiItem.bevelSize + ';\n                                                        ');
            this.buttonEntity.setAttribute('position', '0 0 0');
        } else {
            this.buttonEntity.setAttribute('geometry', 'primitive: box; \n                                               width: ' + (guiItem.width - guiItem.gap) + '; \n                                               height: ' + (guiItem.height - guiItem.gap) + '; \n                                               depth: ' + guiItem.depth + ';\n                                               ');
            this.buttonEntity.setAttribute('position', '0 0 ' + guiItem.depth / 2);
        }
        this.buttonEntity.setAttribute('material', 'shader: flat; \n                                                    opacity: 1; \n                                                    side:double; \n                                                    color: ' + (data.toggleState ? data.activeColor : data.backgroundColor) + '\n                                                    ');

        if (this.textEntity) {
            console.log("has textEntity: " + this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
        } else {
            console.log("no textEntity!");
        }
    },
    setActiveState: function setActiveState(activeState) {
        // console.log("in setActiveState function, new state: " + activeState);
        this.data.toggleState = activeState;
        if (!activeState) {
            console.log('not active, about to set background color');
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {
            console.log('active, about to set active color');
            this.buttonEntity.setAttribute('material', 'color', this.data.activeColor);
        }
    },
    setText: function setText(newText) {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + data.fontColor + ';                                                \n                                                font:' + data.fontFamily + ';\n                                                fontSize:' + data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('troika-text-material', 'shader: flat;');

        if (guiItem.bevel) {
            textEntity.setAttribute('position', '0 0 ' + (guiItem.depth + guiItem.bevelThickness / 2 + 0.05));
        } else {
            textEntity.setAttribute('position', '0 0 ' + (guiItem.depth / 2 + 0.05));
        }
        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.buttonEntity.appendChild(textEntity);
    }
});

AFRAME.registerPrimitive('a-gui-button', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'button' },
        'gui-button': {}
    },
    mappings: {
        //gui interactable general
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'depth': 'gui-item.depth',
        'base-depth': 'gui-item.baseDepth',
        'gap': 'gui-item.gap',
        'radius': 'gui-item.radius',
        'margin': 'gui-item.margin',
        //gui item bevelbox
        'bevel': 'gui-item.bevel',
        'bevel-segments': 'gui-item.bevelSegments',
        'steps': 'gui-item.steps',
        'bevel-size': 'gui-item.bevelSize',
        'bevel-offset': 'gui-item.bevelOffset',
        'bevel-thickness': 'gui-item.bevelThickness',
        //gui button specific
        'on': 'gui-button.on',
        'value': 'gui-button.value',
        'font-size': 'gui-button.fontSize',
        'font-family': 'gui-button.fontFamily',
        'font-color': 'gui-button.fontColor',
        'border-color': 'gui-button.borderColor',
        'focus-color': 'gui-button.focusColor',
        'background-color': 'gui-button.backgroundColor',
        'hover-color': 'gui-button.hoverColor',
        'active-color': 'gui-button.activeColor',
        'toggle': 'gui-button.toggle',
        'toggle-state': 'gui-button.toggleState'
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-circle-loader', {
    schema: {
        loaded: { type: 'number', default: 0.5 },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_grey },
        backgroundColor: { type: 'string', default: key_offwhite },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/1000
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 1; side:back; color:' + data.backgroundColor + ';');

        var loaderContainer = document.createElement("a-entity");
        loaderContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        loaderContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
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
        loaderRing.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor);
        loaderRing.setAttribute('radius-inner', '' + guiItem.height / 3);
        loaderRing.setAttribute('radius-outer', '' + guiItem.height / 2);
        loaderRing.setAttribute('theta-start', '90');
        loaderRing.setAttribute('theta-length', '' + data.loaded * -360);
        loaderRing.setAttribute('rotation', '0 0 0');
        loaderRing.setAttribute('position', '0 0 0.04');
        loaderRing.id = "loader_ring";
        el.appendChild(loaderRing);

        this.setText(data.loaded);
    },
    play: function play() {},
    update: function update(oldData) {
        var data = this.data;
        var el = this.el;

        if (this.textEntity) {
            console.log("has textEntity: " + this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.loaded);
        } else {
            console.log("no textEntity!");
        }
    },
    setText: function setText(newLoaded) {
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + Math.round(newLoaded * 100) + '; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', '0 0 0.05');
        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    }
});

AFRAME.registerPrimitive('a-gui-circle-loader', {
    defaultComponents: {
        'gui-item': { type: 'circle-loader' },
        'gui-circle-loader': {}
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-circle-timer', {
    schema: {
        countDown: { type: 'number', default: 10 },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_grey },
        borderColor: { type: 'string', default: key_grey },
        backgroundColor: { type: 'string', default: key_offwhite },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var guiInteractable = el.getAttribute("gui-interactable");
        console.log("in timer callback, guiInteractable: " + JSON.stringify(guiInteractable));

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/750
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 1; side:back; color:' + data.backgroundColor + ';');

        var timerContainer = document.createElement("a-entity");
        timerContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        timerContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        timerContainer.setAttribute('rotation', '90 0 0');
        timerContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(timerContainer);

        var timerIndicator1 = document.createElement("a-ring");
        timerIndicator1.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        timerIndicator1.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator1.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator1.setAttribute('theta-start', '-1');
        timerIndicator1.setAttribute('theta-length', '3');
        timerIndicator1.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator1);
        var timerIndicator2 = document.createElement("a-ring");
        timerIndicator2.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        timerIndicator2.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator2.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator2.setAttribute('theta-start', '89');
        timerIndicator2.setAttribute('theta-length', '3');
        timerIndicator2.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator2);
        var timerIndicator3 = document.createElement("a-ring");
        timerIndicator3.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        timerIndicator3.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator3.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator3.setAttribute('theta-start', '179');
        timerIndicator3.setAttribute('theta-length', '3');
        timerIndicator3.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator3);
        var timerIndicator4 = document.createElement("a-ring");
        timerIndicator4.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        timerIndicator4.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerIndicator4.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerIndicator4.setAttribute('theta-start', '269');
        timerIndicator4.setAttribute('theta-length', '3');
        timerIndicator4.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator4);

        var timerRing = document.createElement("a-ring");
        timerRing.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor);
        timerRing.setAttribute('radius-inner', '' + guiItem.height / 3);
        timerRing.setAttribute('radius-outer', '' + guiItem.height / 2);
        timerRing.setAttribute('theta-start', '0');
        timerRing.setAttribute('theta-length', '0'); // this has to increase 0 to 360 when running the countdown
        timerRing.setAttribute('rotation', '0 180 90');
        timerRing.setAttribute('position', '0 0 0.03');
        el.appendChild(timerRing);
        this.timerRing = timerRing;

        var initCount = this.initCount = data.countDown;
        this.setText(data.countDown);
    },
    update: function update(oldData) {
        var data = this.data;
        var el = this.el;
        if (Object.keys(oldData).length === 0) {
            return;
        }
        if (data.countDown !== oldData.countDown) {
            el.getObject3D('mesh').material.color = data.color;
            var left = data.countDown,
                count_down = this.initCount;
            var elapsed = Math.round((count_down - left) * 100 / count_down) / 100 * 360;
            this.timerRing.setAttribute('theta-length', elapsed); // this has to increase 0 to 360 when running the count_down

            this.textEntity.setAttribute('troika-text', 'value: ' + data.countDown + ';');

            if (left == 1) {
                console.log('fire callback on the last second');
            }
        }
    },
    setText: function setText(newTime) {

        // if (this.textEntity) {
        //     el.removeChild(this.textEntity);
        // }//clear old text

        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newTime + '; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', '0 0 0.05');
        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    },
    callback: function callback() {
        var guiInteractable = this.el.getAttribute("gui-interactable");
        var clickActionFunctionName = guiInteractable.clickAction;
        console.log("in timer callback, guiInteractable: " + JSON.stringify(guiInteractable));
        console.log("in button, clickActionFunctionName: " + clickActionFunctionName);
        // find object
        var clickActionFunction = window[clickActionFunctionName];
        //console.log("clickActionFunction: "+clickActionFunction);
        // is object a function?
        if (typeof clickActionFunction === "function") clickActionFunction();
    }
});

AFRAME.registerPrimitive('a-gui-circle-timer', {
    defaultComponents: {
        'gui-item': { type: 'circle-timer' },
        'gui-circle-timer': {}
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
        'callback': 'gui-interactable.clickAction'
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-cursor', {
    schema: {
        color: { type: 'string', default: key_white },
        hoverColor: { type: 'string', default: key_white },
        activeColor: { type: 'string', default: key_orange },
        distance: { type: 'number', default: -1 },
        design: { type: 'string', default: 'dot' }
    },
    init: function init() {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = this.fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value

        var el = this.el;
        var data = this.data;
        var defaultHoverAnimationDuration = 200;
        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;

        AFRAME.utils.entity.setComponentProperty(el, 'raycaster.interval', '500');

        console.log("fuse: " + fuse + ", fuseTimeout: " + fuseTimeout);

        if (data.design == 'dot') {

            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.025');
            el.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            el.setAttribute('position', '0 0 ' + data.distance);
            el.setAttribute('animation__radiusInnerIn', 'property: geometry.radiusInner; from: 0.000001; to:0.0225; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__radiusOuterIn', 'property: geometry.radiusOuter; from: 0.025; to:0.0275; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__colorIn', 'property: material.color; from: ' + data.color + '; to:' + data.hoverColor + '; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__radiusInnerOut', 'property: geometry.radiusInner; from: 0.0225; to:0.000001; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__radiusOuterOut', 'property: geometry.radiusOuter; from: 0.0275; to:0.025; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__colorOut', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.color + '; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__scale', 'property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click');

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0275; radiusOuter:0.03; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__radiusInnerIn', 'property: geometry.radiusInner; from: 0.0275; to:0.03; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__radiusOuterIn', 'property: geometry.radiusOuter; from: 0.03; to:0.0325; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__radiusInnerOut', 'property: geometry.radiusInner; from: 0.03; to:0.0275; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            cursorShadow.setAttribute('animation__radiusOuterOut', 'property: geometry.radiusOuter; from: 0.0325; to:0.03; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            if (fuse) {
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0375; thetaLength:0');
                fuseLoader.setAttribute('material', 'color: ' + data.activeColor + '; shader: flat; opacity:1;');
                fuseLoader.setAttribute('position', '0 0 0');
                fuseLoader.setAttribute('animation', 'property: geometry.thetaLength; from: 0; to:360; dur:' + fuseAnimationDuration + '; delay: ' + defaultHoverAnimationDuration + '; easing:linear; autoplay:false;');
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end dot design
        } else if (data.design == 'ring') {
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.0225; radiusOuter:0.0275');
            el.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            el.setAttribute('position', '0 0 ' + data.distance);
            el.setAttribute('animation__radiusInnerIn', 'property: geometry.radiusInner; from: 0.0225; to:0.025; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__radiusOuterIn', 'property: geometry.radiusOuter; from: 0.0275; to:0.0325; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__colorIn', 'property: material.color; from: ' + data.color + '; to:' + data.hoverColor + '; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__radiusInnerOut', 'property: geometry.radiusInner; from: 0.025; to:0.0225; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__radiusOuterOut', 'property: geometry.radiusOuter; from: 0.0325; to:0.0275; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__colorOut', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.color + '; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.setAttribute('animation__scale', 'property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click');

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0325; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__radiusInnerIn', 'property: geometry.radiusInner; from: 0.03; to:0.0325; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__radiusOuterIn', 'property: geometry.radiusOuter; from: 0.0325; to:0.0375; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__radiusInnerOut', 'property: geometry.radiusInner; from: 0.0325; to:0.03; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            cursorShadow.setAttribute('animation__radiusOuterOut', 'property: geometry.radiusOuter; from: 0.0375; to:0.0325; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            if (fuse) {
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0425; thetaLength:0');
                fuseLoader.setAttribute('material', 'color: ' + data.activeColor + '; shader: flat; opacity:1;');
                fuseLoader.setAttribute('position', '0 0 0');
                fuseLoader.setAttribute('animation', 'property: geometry.thetaLength; from: 0; to:360; dur:' + fuseAnimationDuration + '; delay: ' + defaultHoverAnimationDuration + '; easing:linear; autoplay:false;');
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end ring design
        } else if (data.design == 'reticle') {
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180;');
            el.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            el.setAttribute('position', '0 0 ' + data.distance);
            el.setAttribute('animation__opacityIn', 'property: material.opacity; from: 1; to: 0; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__opacityOut', 'property: material.opacity; from: 0; to: 1; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');

            var cursorCenter = document.createElement("a-entity");
            cursorCenter.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180; thetaStart:180;');
            cursorCenter.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorCenter.setAttribute('position', '0 0 0');
            cursorCenter.setAttribute('animation__opacityIn', 'property: material.opacity; from: 0.25; to: 0; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorCenter.setAttribute('animation__opacityOut', 'property: material.opacity; from: 0; to: 0.25; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorCenter);
            this.cursorCenter = cursorCenter;

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0125; radiusOuter:0.0145');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__colorIn', 'property: material.color; from: #000000; to: ' + data.color + '; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__opacityIn', 'property: material.opacity; from: 0.25; to: 1; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorShadow.setAttribute('animation__colorOut', 'property: material.color; from: ' + data.color + '; to: #000000; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            cursorShadow.setAttribute('animation__opacityOut', 'property: material.opacity; from: 1; to: 0.25; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var cursorShadowTL = document.createElement("a-entity");
            cursorShadowTL.setAttribute('geometry', 'primitive: plane; width:0.005; height:0.005;');
            cursorShadowTL.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadowTL.setAttribute('position', '-0.0325 0.0325 0');
            el.appendChild(cursorShadowTL);
            this.cursorShadowTL = cursorShadowTL;
            var cursorShadowBL = document.createElement("a-entity");
            cursorShadowBL.setAttribute('geometry', 'primitive: plane; width:0.005; height:0.005;');
            cursorShadowBL.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadowBL.setAttribute('position', '-0.0325 -0.0325 0');
            el.appendChild(cursorShadowBL);
            this.cursorShadowBL = cursorShadowBL;
            var cursorShadowTR = document.createElement("a-entity");
            cursorShadowTR.setAttribute('geometry', 'primitive: plane; width:0.005; height:0.005;');
            cursorShadowTR.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadowTR.setAttribute('position', '0.0325 0.0325 0');
            el.appendChild(cursorShadowTR);
            this.cursorShadowTR = cursorShadowTR;
            var cursorShadowBR = document.createElement("a-entity");
            cursorShadowBR.setAttribute('geometry', 'primitive: plane; width:0.005; height:0.005;');
            cursorShadowBR.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadowBR.setAttribute('position', '0.0325 -0.0325 0');
            el.appendChild(cursorShadowBR);
            this.cursorShadowBR = cursorShadowBR;

            var cursorBoundTL = document.createElement("a-entity");
            cursorBoundTL.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundTL.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundTL.setAttribute('position', '-0.03 0.0375 0');
            el.appendChild(cursorBoundTL);
            this.cursorBoundTL = cursorBoundTL;
            var cursorBoundTL2 = document.createElement("a-entity");
            cursorBoundTL2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundTL2.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundTL2.setAttribute('position', '-0.0375 0.03 0');
            el.appendChild(cursorBoundTL2);
            this.cursorBoundTL2 = cursorBoundTL2;

            var cursorBoundTR = document.createElement("a-entity");
            cursorBoundTR.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundTR.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundTR.setAttribute('position', '0.03 0.0375 0');
            el.appendChild(cursorBoundTR);
            this.cursorBoundTR = cursorBoundTR;
            var cursorBoundTR2 = document.createElement("a-entity");
            cursorBoundTR2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundTR2.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundTR2.setAttribute('position', '0.0375 0.03 0');
            el.appendChild(cursorBoundTR2);
            this.cursorBoundTR2 = cursorBoundTR2;

            var cursorBoundBL = document.createElement("a-entity");
            cursorBoundBL.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundBL.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundBL.setAttribute('position', '-0.03 -0.0375 0');
            el.appendChild(cursorBoundBL);
            this.cursorBoundBL = cursorBoundBL;
            var cursorBoundBL2 = document.createElement("a-entity");
            cursorBoundBL2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundBL2.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundBL2.setAttribute('position', '-0.0375 -0.03 0');
            el.appendChild(cursorBoundBL2);
            this.cursorBoundBL2 = cursorBoundBL2;

            var cursorBoundBR = document.createElement("a-entity");
            cursorBoundBR.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundBR.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundBR.setAttribute('position', '0.03 -0.0375 0');
            el.appendChild(cursorBoundBR);
            this.cursorBoundBR = cursorBoundBR;
            var cursorBoundBR2 = document.createElement("a-entity");
            cursorBoundBR2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundBR2.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorBoundBR2.setAttribute('position', '0.0375 -0.03 0');
            el.appendChild(cursorBoundBR2);
            this.cursorBoundBR2 = cursorBoundBR2;

            if (fuse) {
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: plane; width:0.000001; height:0.01;');
                fuseLoader.setAttribute('material', 'color: ' + data.activeColor + '; shader: flat; opacity:1;');
                fuseLoader.setAttribute('position', '0 -0.05 0');
                fuseLoader.setAttribute('animation', 'property: geometry.width; from: 0; to: 0.075; dur:' + fuseAnimationDuration + '; delay:' + defaultHoverAnimationDuration + '; easing:linear; autoplay:false;');
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end reticle design
        } else if (data.design == 'cross') {
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0375');
            el.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            el.setAttribute('position', '0 0 ' + data.distance);
            el.setAttribute('animation__radiusInnerIn', 'property: geometry.radiusInner; from: 0.035; to: 0.0315; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: hovergui');
            el.setAttribute('animation__radiusInnerOut', 'property: geometry.radiusInner; from: 0.0315; to: 0.035; dur:' + defaultHoverAnimationDuration + '; easing:linear; startEvents: leavegui');

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0375; radiusOuter:0.04; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var cursorVerticalTop = document.createElement("a-entity");
            cursorVerticalTop.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.01875');
            cursorVerticalTop.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorVerticalTop.setAttribute('position', '0 0.028125 0');
            cursorVerticalTop.setAttribute('animation__widthIn', 'property: geometry.width; from: 0.0035; to: 0.007; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorVerticalTop.setAttribute('animation__widthOut', 'property: geometry.width; from: 0.007; to: 0.0035; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorVerticalTop);
            this.cursorVerticalTop = cursorVerticalTop;

            var cursorVerticalBottom = document.createElement("a-entity");
            cursorVerticalBottom.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.01875');
            cursorVerticalBottom.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorVerticalBottom.setAttribute('position', '0 -0.028125 0');
            cursorVerticalBottom.setAttribute('animation__widthIn', 'property: geometry.width; from: 0.0035; to: 0.007; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorVerticalBottom.setAttribute('animation__widthOut', 'property: geometry.width; from: 0.007; to: 0.0035; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorVerticalBottom);
            this.cursorVerticalBottom = cursorVerticalBottom;

            var cursorHorizontalLeft = document.createElement("a-entity");
            cursorHorizontalLeft.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalLeft.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorHorizontalLeft.setAttribute('position', '-0.028125 0 0');
            cursorHorizontalLeft.setAttribute('animation__heightIn', 'property: geometry.height; from: 0.0035; to: 0.007; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorHorizontalLeft.setAttribute('animation__heightOut', 'property: geometry.height; from: 0.007; to: 0.0035; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorHorizontalLeft);
            this.cursorHorizontalLeft = cursorHorizontalLeft;

            var cursorHorizontalRight = document.createElement("a-entity");
            cursorHorizontalRight.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalRight.setAttribute('material', 'color: ' + data.color + '; shader: flat; opacity:1;');
            cursorHorizontalRight.setAttribute('position', '0.028125 0 0');
            cursorHorizontalRight.setAttribute('animation__heightIn', 'property: geometry.height; from: 0.0035; to: 0.007; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: hovergui');
            cursorHorizontalRight.setAttribute('animation__heightOut', 'property: geometry.height; from: 0.007; to: 0.0035; dur:' + fuseAnimationDuration + '; easing:linear; startEvents: leavegui');
            el.appendChild(cursorHorizontalRight);
            this.cursorHorizontalRight = cursorHorizontalRight;

            if (fuse) {
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.0415; radiusOuter:0.0485; thetaLength:0');
                fuseLoader.setAttribute('material', 'color: ' + data.activeColor + '; shader: flat; opacity:1;');
                fuseLoader.setAttribute('position', '0 0 0');
                fuseLoader.setAttribute('animation', 'property: geometry.thetaLength; from: 0; to: 360; dur:' + fuseAnimationDuration + '; delay:' + defaultHoverAnimationDuration + '; easing:linear; autoplay:false;');
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end cross design        
        }

        el.addEventListener('mouseenter', function () {
            console.log("in gui-cursor mousenter, el: " + el);
            el.emit('hovergui');
            if (data.design == 'dot' || data.design == 'ring') {
                cursorShadow.emit('hovergui');
            } else if (data.design == 'cross') {
                cursorShadow.emit('hovergui');
                cursorVerticalTop.emit('hovergui');
                cursorVerticalBottom.emit('hovergui');
                cursorHorizontalLeft.emit('hovergui');
                cursorHorizontalRight.emit('hovergui');
            } else if (data.design == 'reticle') {
                centerHoverAniOpacity.emit('hovergui');
                cursorHoverAniColor.emit('hovergui');
                cursorHoverAniOpacity.emit('hovergui');
            }
        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: " + el);
            el.emit('leavegui');
            if (data.design == 'dot' || data.design == 'ring') {
                cursorShadow.emit('leavegui');
            } else if (data.design == 'cross') {
                cursorVerticalTop.emit('leavegui');
                cursorVerticalBottom.emit('leavegui');
                cursorHorizontalLeft.emit('leavegui');
                cursorHorizontalRight.emit('leavegui');
            } else if (data.design == 'reticle') {
                centerHoverAniOpacity.emit('leavegui');
                cursorHoverAniColor.emit('leavegui');
                cursorHoverAniOpacity.emit('leavegui');
            }

            if (fuse) {
                fuseLoader.object3D.el.components.animation.animation.pause();
                fuseLoader.object3D.el.components.animation.animation.seek(0);
            }

            el.setAttribute('scale', '1 1 1');
        });

        if (fuse) {
            el.addEventListener('fusing', function () {
                fuseLoader.object3D.el.components.animation.animation.play();
            });
        }

        el.addEventListener("stateremoved", function (evt) {
            console.log("evt.detail " + evt.detail);
            if (evt.detail.state === 'cursor-fusing' || evt.detail === 'cursor-fusing') {
                if (data.design == 'dot' || data.design == 'ring' || data.design == 'cross') {
                    if (fuse) {
                        fuseLoader.object3D.el.components.animation.animation.pause();
                        fuseLoader.object3D.el.components.animation.animation.seek(0);
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                } else if (data.design == 'reticle') {
                    if (fuse) {
                        fuseLoader.object3D.el.components.animation.animation.pause();
                        fuseLoader.object3D.el.components.animation.animation.seek(0);
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.width', '0.000001');
                    }
                }
            } else if (evt.detail.state === 'cursor-hovering' || evt.detail === 'cursor-hovering') {
                if (data.design == 'dot' || data.design == 'ring') {
                    AFRAME.utils.entity.setComponentProperty(this, 'scale', '1 1 1');
                    if (fuse) {
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                } else if (data.design == 'cross') {
                    if (fuse) {
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                } else if (data.design == 'reticle') {
                    if (fuse) {
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.width', '0.000001');
                    }
                }
            }
        });
    },
    update: function update() {
        /*
                var oldEntity = this.cursor;
                oldEntity.parentNode.removeChild(oldEntity);
        
                function removeAllChildNodes(parent) {
                    while (parent.firstChild) {
                        parent.removeChild(parent.firstChild);
                    }
                }
                const oldEntity = this.cursor;
                removeAllChildNodes(oldEntity);
        
                this.init();
        */
    },
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

AFRAME.registerPrimitive('a-gui-cursor', {
    defaultComponents: {
        'cursor': {},
        'gui-cursor': {}
    },
    mappings: {
        'fuse': 'cursor.fuse',
        'fuse-timeout': 'cursor.fuseTimeout',
        'color': 'gui-cursor.color',
        'hover-color': 'gui-cursor.hoverColor',
        'active-color': 'gui-cursor.activeColor',
        'distance': 'gui-cursor.distance',
        'design': 'gui-cursor.design'
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

var onAppendChildToContainer = function onAppendChildToContainer(elem, f) {
    // console.log("in onAppend, elem: "+elem);
    var observer = new MutationObserver(function (mutations, me) {
        //console.log("in mutationObserver, me: "+me);
        mutations.forEach(function (m) {
            console.log(m);
            if (m.addedNodes.length) {
                f(m.target, m.addedNodes);
            }
        });
    });
    observer.observe(elem, { childList: true });
};

AFRAME.registerComponent('gui-flex-container', {
    schema: {
        flexDirection: { type: 'string', default: 'row' },
        justifyContent: { type: 'string', default: 'flexStart' },
        alignItems: { type: 'string', default: 'flexStart' },
        itemPadding: { type: 'number', default: 0.0 },
        opacity: { type: 'number', default: 0.0 },
        isTopContainer: { type: 'boolean', default: false },
        panelColor: { type: 'string', default: key_grey },
        panelRounded: { type: 'number', default: 0.05 },

        //global settings for GUI items
        styles: {
            fontFamily: { type: 'string', default: 'Helvetica' },
            fontColor: { type: 'string', default: key_offwhite },
            borderColor: { type: 'string', default: key_offwhite },
            backgroundColor: { type: 'string', default: key_grey },
            hoverColor: { type: 'string', default: key_grey_dark },
            activeColor: { type: 'string', default: key_orange },
            handleColor: { type: 'string', default: key_offwhite }
        }

    },
    init: function init() {
        console.log("in aframe-gui-component init for: " + this.el.getAttribute("id"));
        var containerGuiItem = this.el.getAttribute("gui-item");

        if (this.data.isTopContainer) {
            this.setBackground();
        } else {
            //          this.el.setAttribute('material', `shader: flat; transparent: true; alphaTest: 0.5; side:front;`);
            this.el.setAttribute('rounded', 'height: ' + containerGuiItem.height + '; width: ' + containerGuiItem.width + '; opacity: ' + this.data.opacity + '; color: ' + this.data.panelColor + '; radius:' + this.data.panelRounded + '; depthWrite:false; polygonOffset:true; polygonOffsetFactor: 1;');
        }

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
                    cursorX = (containerGuiItem.width - rowWidth) * 0.5;
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
                    cursorY = (containerGuiItem.height - columnHeight) * 0.5;
                } else if (this.data.justifyContent == 'flexEnd') {
                    cursorY = containerGuiItem.height - columnHeight;
                }
            }
            // then figure out baseline / cursor position on cross X axis
            if (this.data.alignItems == 'flexStart') {
                cursorX = 0; // baseline is left
            } else if (this.data.alignItems == 'center') {
                cursorX = containerGuiItem.width * 0.5; // baseline is center
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
                    childPositionX = -containerGuiItem.width * 0.5 + cursorX + childGuiItem.margin.w + childGuiItem.width * 0.5;
                    cursorX = cursorX + childGuiItem.margin.w + childGuiItem.width + childGuiItem.margin.y;
                } else if (this.data.flexDirection == 'column') {
                    if (this.data.alignItems == 'center') {
                        childPositionX = 0; // child position is always 0 to center
                    } else if (this.data.alignItems == 'flexStart') {
                        childPositionX = -containerGuiItem.width * 0.5 + childGuiItem.margin.w + childGuiItem.width * 0.5;
                    } else if (this.data.alignItems == 'flexEnd') {
                        childPositionX = containerGuiItem.width * 0.5 - childGuiItem.margin.y - childGuiItem.width * 0.5;
                    }
                    childPositionY = containerGuiItem.height * 0.5 - cursorY - -childGuiItem.margin.x - childGuiItem.height * 0.5;
                    cursorY = cursorY + childGuiItem.margin.x + childGuiItem.height + childGuiItem.margin.z;
                }
                //console.log(`child element position for ${childElement.id}: ${childPositionX} ${childPositionY} ${childPositionZ}`)
                childElement.setAttribute('position', childPositionX + ' ' + childPositionY + ' ' + childPositionZ);
                childElement.setAttribute('geometry', 'primitive: plane; height: ' + childGuiItem.height + '; width: ' + childGuiItem.width + ';');

                var childFlexContainer = childElement.components['gui-flex-container'];
                if (childFlexContainer) {
                    childFlexContainer.setBackground();
                }
            }
        }

        onAppendChildToContainer(this.el, function (containerElement, addedChildren) {
            //console.log('****** containerElement: ' + containerElement);
            //console.log('****** addedChildren: ' + addedChildren.length);
            // containerElement.components['gui-flex-container'].init();
            var addedChild = addedChildren[0];
            addedChildren[0].addEventListener("loaded", function (e) {
                //console.log('in appended element loaded handler: '+e);
                //console.log('addedChild: '+addedChild);
                //console.log('****** containerElement: ' + containerElement);
                containerElement.components['gui-flex-container'].init();
            });
        });
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},
    getElementSize: function getElementSize() {},
    setBackground: function setBackground() {
        if (this.data.opacity > 0) {
            console.log("panel position: " + JSON.stringify(this.el.getAttribute("position")));
            var guiItem = this.el.getAttribute("gui-item");
            var panelBackground = document.createElement("a-entity");
            panelBackground.setAttribute('rounded', 'height: ' + guiItem.height + '; width: ' + guiItem.width + '; opacity: ' + this.data.opacity + '; color: ' + this.data.panelColor + '; radius:' + this.data.panelRounded + '; depthWrite:false; polygonOffset:true; polygonOffsetFactor: 2;');
            //            panelBackground.setAttribute('geometry', `primitive: box; height: ${guiItem.height}; width: ${guiItem.width}; depth:0.025;`);
            console.log("about to set panel background color to: : " + this.data.panelColor);
            //            panelBackground.setAttribute('material', `shader: standard; depthTest: true; opacity: ${this.data.opacity}; color: ${this.data.panelColor};`);
            panelBackground.setAttribute('position', this.el.getAttribute("position").x + ' ' + this.el.getAttribute("position").y + ' ' + (this.el.getAttribute("position").z - 0.0125));
            panelBackground.setAttribute('rotation', this.el.getAttribute("rotation").x + ' ' + this.el.getAttribute("rotation").y + ' ' + this.el.getAttribute("rotation").z);
            this.el.parentNode.insertBefore(panelBackground, this.el);
        }
    }

});

AFRAME.registerPrimitive('a-gui-flex-container', {
    defaultComponents: {
        'gui-item': { type: 'flex-container' },
        'gui-flex-container': {}
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
        'panel-rounded': 'gui-flex-container.panelRounded',
        'font-family': 'gui-flex-container.styles.fontFamily',
        'font-color': 'gui-flex-container.styles.fontColor',
        'border-color': 'gui-flex-container.styles.borderColor',
        'background-color': 'gui-flex-container.styles.backgroundColor',
        'hover-color': 'gui-flex-container.styles.hoverColor',
        'active-color': 'gui-flex-container.styles.activeColor',
        'handle-color': 'gui-flex-container.styles.handleColor'
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-icon-button', {
    schema: {
        on: { default: 'click' },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false },
        icon: { type: 'string', default: 'f0f3' },
        iconActive: { type: 'string', default: '' },
        iconFontSize: { type: 'number', default: 0.4 },
        iconFont: { type: 'string', default: 'assets/fonts/fa-regular-400.ttf' },
        fontColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if (data.iconFontSize > 20) {
            // 150/1000
            var newSize = data.iconFontSize / 750;
            data.iconFontSize = newSize;
        }

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.0; alphaTest: 0.5; side:double; color:' + data.backgroundColor + ';');

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2 + '; height: 0.02;');
        buttonContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        buttonContainer.setAttribute('rotation', '90 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', 'primitive: cylinder; radius: ' + guiItem.height / 2.05 + '; height: 0.04;');
        buttonEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.backgroundColor);
        buttonEntity.setAttribute('rotation', '90 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        this.setIcon(data.icon);

        el.addEventListener('mouseenter', function (evt) {
            buttonEntity.removeAttribute('animation__leave');
            if (!data.toggle) {
                buttonEntity.setAttribute('animation__enter', 'property: material.color; from: ' + data.backgroundColor + '; to:' + data.hoverColor + '; dur:200;');
            }
        });
        el.addEventListener('mouseleave', function (evt) {
            if (!data.toggle) {
                buttonEntity.removeAttribute('animation__click');
                buttonEntity.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.backgroundColor + '; dur:200; easing: easeOutQuad;');
            }
            buttonEntity.removeAttribute('animation__enter');
        });
        el.addEventListener(data.on, function (event) {
            if (!data.toggle) {
                // if not toggling flashing active state
                buttonEntity.setAttribute('animation__click', 'property: material.color; from: ' + data.activeColor + '; to:' + data.backgroundColor + '; dur:400; easing: easeOutQuad;');
            } else {
                var guiButton = el.components['gui-button'];
                // console.log("about to toggle, current state: " + guiButton.data.toggleState);
                guiButton.setActiveState(!guiButton.data.toggleState);
                //  buttonEntity.setAttribute('material', 'color', data.activeColor);
            }

            var clickActionFunctionName = guiInteractable.clickAction;
            // console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(event);
        });
        ////WAI ARIA Support
        el.setAttribute('role', 'button');
    },
    play: function play() {},
    update: function update(oldData) {
        console.log("In button update, toggle: " + this.toggleState);
        var data = this.data;
        var el = this.el;

        if (this.iconEntity) {
            console.log("has iconEntity: " + this.iconEntity);

            var oldEntity = this.iconEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setIcon(this.data.icon);
        } else {
            console.log("no iconEntity!");
        }
    },
    setActiveState: function setActiveState(activeState) {
        // console.log("in setActiveState function, new state: " + activeState);
        this.data.toggleState = activeState;
        if (!activeState) {
            console.log('not active, about to set background color');
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {
            console.log('active, about to set active color');
            this.buttonEntity.setAttribute('material', 'color', this.data.activeColor);
        }
    },
    setIcon: function setIcon(unicode) {
        var hex = parseInt(unicode, 16);
        var char = String.fromCharCode(hex);

        var iconEntity = document.createElement("a-entity");
        this.iconEntity = iconEntity;
        iconEntity.setAttribute('troika-text', 'value:' + char + '; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                lineHeight:' + this.guiItem.height + ';\n                                                maxWidth:' + this.guiItem.width + ';\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.iconFont + ';\n                                                fontSize:' + this.data.iconFontSize + ';\n                                                depthOffset:1;\n                                                ');
        iconEntity.setAttribute('position', '0 0 0.05'); // 0.05 y axis adjustment for fontawesome
        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(iconEntity);
    }
});

AFRAME.registerPrimitive('a-gui-icon-button', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'icon-button' },
        'gui-icon-button': {}
    },
    mappings: {
        //gui interactable general
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui button specific
        'on': 'gui-icon-button.on',
        'font-color': 'gui-icon-button.fontColor',
        'font-family': 'gui-icon-button.fontFamily',
        'border-color': 'gui-icon-button.borderColor',
        'background-color': 'gui-icon-button.backgroundColor',
        'hover-color': 'gui-icon-button.hoverColor',
        'active-color': 'gui-icon-button.activeColor',
        'icon': 'gui-icon-button.icon',
        'icon-active': 'gui-icon-button.iconActive',
        'icon-font': 'gui-icon-button.iconFont',
        'icon-font-size': 'gui-icon-button.iconFontSize',
        'toggle': 'gui-icon-button.toggle',
        'toggle-state': 'gui-icon-button.toggleState'
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-icon-label-button', {
    schema: {
        on: { default: 'click' },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false },
        icon: { type: 'string', default: 'f0f3' },
        iconActive: { type: 'string', default: '' },
        iconFontSize: { type: 'number', default: 0.35 },
        iconFont: { type: 'string', default: 'assets/fonts/fa-regular-400.ttf' },
        value: { type: 'string', default: '' },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_offwhite },
        backgroundColor: { type: 'string', default: key_grey },
        hoverColor: { type: 'string', default: key_grey_dark },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if (data.iconFontSize > 20) {
            // 150/750
            var newSize = data.iconFontSize / 750;
            data.iconFontSize = newSize;
        }
        if (data.fontSize > 20) {
            // 150/750
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; side:front; color:' + data.backgroundColor + ';');

        var buttonContainer = document.createElement("a-entity");
        buttonContainer.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: ' + guiItem.height + '; depth: 0.02;');
        buttonContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        buttonContainer.setAttribute('rotation', '0 0 0');
        buttonContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(buttonContainer);

        var buttonEntity = document.createElement("a-entity");
        buttonEntity.setAttribute('geometry', 'primitive: box; width: ' + (guiItem.width - 0.025) + '; height: ' + (guiItem.height - 0.025) + '; depth: 0.04;');
        buttonEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + (data.toggleState ? data.activeColor : data.backgroundColor));
        buttonEntity.setAttribute('rotation', '0 0 0');
        buttonEntity.setAttribute('position', '0 0 0.02');
        el.appendChild(buttonEntity);
        this.buttonEntity = buttonEntity;

        this.setIcon(data.icon);

        if (data.value != '') {
            this.setText(data.value);
        }

        el.addEventListener('mouseenter', function (event) {
            buttonEntity.removeAttribute('animation__leave');
            if (!data.toggle) {
                buttonEntity.setAttribute('animation__enter', 'property: material.color; from: ' + data.backgroundColor + '; to:' + data.hoverColor + '; dur:200;');
            }
        });
        el.addEventListener('mouseleave', function (event) {
            if (!data.toggle) {
                buttonEntity.removeAttribute('animation__click');
                buttonEntity.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.backgroundColor + '; dur:200; easing: easeOutQuad;');
            }
            buttonEntity.removeAttribute('animation__enter');
        });
        el.addEventListener(data.on, function (event) {
            if (!data.toggle) {
                // if not toggling flashing active state
                buttonEntity.setAttribute('animation__click', 'property: material.color; from: ' + data.activeColor + '; to:' + data.backgroundColor + '; dur:400; easing: easeOutQuad;');
            } else {
                var guiButton = el.components['gui-button'];
                // console.log("about to toggle, current state: " + guiButton.data.toggleState);
                guiButton.setActiveState(!guiButton.data.toggleState);
                //  buttonEntity.setAttribute('material', 'color', data.activeColor);
            }

            var clickActionFunctionName = guiInteractable.clickAction;
            // console.log("in button, clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(event);
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'button');
    },
    play: function play() {},
    update: function update(oldData) {
        console.log("In button update, toggle: " + this.toggleState);
        var data = this.data;
        var el = this.el;

        if (this.iconEntity) {
            console.log("has iconEntity: " + this.iconEntity);

            var oldEntity = this.iconEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setIcon(this.data.icon);
        } else {
            console.log("no iconEntity!");
        }

        if (this.textEntity) {
            console.log("has textEntity: " + this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
        } else {
            console.log("no textEntity!");
        }
    },
    setActiveState: function setActiveState(activeState) {
        // console.log("in setActiveState function, new state: " + activeState);
        this.data.toggleState = activeState;
        if (!activeState) {
            console.log('not active, about to set background color');
            this.buttonEntity.setAttribute('material', 'color', this.data.backgroundColor);
        } else {
            console.log('active, about to set active color');
            this.buttonEntity.setAttribute('material', 'color', this.data.activeColor);
        }
    },
    setIcon: function setIcon(unicode) {
        var hex = parseInt(unicode, 16);
        var char = String.fromCharCode(hex);

        var iconEntity = document.createElement("a-entity");
        var iconEntityX = 0;
        if (this.data.value != '') {
            iconEntityX = -this.guiItem.width * 0.5 + this.guiItem.height * 0.5;
        }
        this.iconEntity = iconEntity;
        iconEntity.setAttribute('troika-text', 'value:' + char + '; \n                                                align:center; \n                                                anchor:center; \n                                                baseline:center;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.iconFont + ';\n                                                fontSize:' + this.data.iconFontSize + ';\n                                                depthOffset:1;\n                                                ');
        iconEntity.setAttribute('position', iconEntityX + ' 0 0.05'); // 0.05 y axis adjustment for fontawesome
        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(iconEntity);
    },
    setText: function setText(newText) {
        var textEntityX = this.guiItem.height - this.guiItem.width * 0.5;
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', textEntityX + ' 0 0.05');

        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    }
});

AFRAME.registerPrimitive('a-gui-icon-label-button', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'icon-label-button' },
        'gui-icon-label-button': {}
    },
    mappings: {
        //gui interactable general
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui button specific
        'on': 'gui-icon-label-button.on',
        'font-color': 'gui-icon-label-button.fontColor',
        'font-family': 'gui-icon-label-button.fontFamily',
        'font-size': 'gui-icon-label-button.fontSize',
        'border-color': 'gui-icon-label-button.borderColor',
        'background-color': 'gui-icon-label-button.backgroundColor',
        'hover-color': 'gui-icon-label-button.hoverColor',
        'active-color': 'gui-icon-label-button.activeColor',
        'icon': 'gui-icon-label-button.icon',
        'icon-active': 'gui-icon-label-button.iconActive',
        'icon-font': 'gui-icon-label-button.iconFont',
        'icon-font-size': 'gui-icon-label-button.iconFontSize',
        'value': 'gui-icon-label-button.value',
        'toggle': 'gui-icon-label-button.toggle',
        'toggle-state': 'gui-icon-label-button.toggleState'
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-input', {
    schema: {
        align: { type: 'string', default: 'left' },
        on: { default: 'click' },
        value: { type: 'string', default: '' },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_grey_dark },
        borderColor: { type: 'string', default: key_grey_dark },
        borderHoverColor: { type: 'string', default: key_grey },
        backgroundColor: { type: 'string', default: key_offwhite },
        hoverColor: { type: 'string', default: key_white },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/750
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; transparent: false; side:front; color:' + data.backgroundColor + ';');

        var borderTopEntity = document.createElement("a-entity");
        borderTopEntity.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: 0.05; depth: 0.02;');
        borderTopEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderTopEntity.setAttribute('position', '0 -' + (guiItem.height / 2 - 0.025) + ' 0.01');
        el.appendChild(borderTopEntity);
        var borderBottomEntity = document.createElement("a-entity");
        borderBottomEntity.setAttribute('geometry', 'primitive: box; width: ' + guiItem.width + '; height: 0.05; depth: 0.02;');
        borderBottomEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderBottomEntity.setAttribute('position', '0 ' + (guiItem.height / 2 - 0.025) + ' 0.01');
        el.appendChild(borderBottomEntity);
        var borderLeftEntity = document.createElement("a-entity");
        borderLeftEntity.setAttribute('geometry', 'primitive: box; width: 0.05; height: ' + guiItem.height + '; depth: 0.02;');
        borderLeftEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderLeftEntity.setAttribute('position', '-' + (guiItem.width / 2 - 0.025) + ' 0 0.01');
        el.appendChild(borderLeftEntity);
        var borderRightEntity = document.createElement("a-entity");
        borderRightEntity.setAttribute('geometry', 'primitive: box; width: 0.05; height: ' + guiItem.height + '; depth: 0.02;');
        borderRightEntity.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor);
        borderRightEntity.setAttribute('position', guiItem.width / 2 - 0.025 + ' 0 0.01');
        el.appendChild(borderRightEntity);

        this.setText(data.value);

        ////WAI ARIA Support
        el.setAttribute('role', 'input');

        el.addEventListener('mouseenter', function (evt) {
            el.setAttribute('material', 'color', data.hoverColor);
            borderTopEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderHoverColor);
            borderRightEntity.setAttribute('material', 'color', data.borderHoverColor);
        });

        el.addEventListener('mouseleave', function (evt) {
            el.setAttribute('material', 'color', data.backgroundColor);
            borderTopEntity.setAttribute('material', 'color', data.borderColor);
            borderBottomEntity.setAttribute('material', 'color', data.borderColor);
            borderLeftEntity.setAttribute('material', 'color', data.borderColor);
            borderRightEntity.setAttribute('material', 'color', data.borderColor);
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
        });
    },
    setText: function setText(newText) {
        var textEntityX = this.guiItem.height * 0.25 - this.guiItem.width * 0.5;
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', textEntityX + ' 0 0.05');

        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    },
    play: function play() {},
    update: function update(oldData) {
        var data = this.data;
        var el = this.el;
        this.textEntity.setAttribute('troika-text', 'value: ' + data.value + ';');
    },
    appendText: function appendText(text) {
        var newText = this.data.value + text;
        this.el.setAttribute('gui-input', 'text', newText);
    },
    delete: function _delete() {
        if (this.data.value && this.data.value.length > 0) {
            var newText = this.data.value.slice(0, -1);
            this.el.setAttribute('gui-input', 'text', newText);
        }
    }
});

AFRAME.registerPrimitive('a-gui-input', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'input' },
        'gui-input': {}
    },
    mappings: {
        //gui interactable general
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        //gui item general
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        //gui input specific
        'value': 'gui-input.value',
        'font-size': 'gui-input.fontSize',
        'font-family': 'gui-input.fontFamily',
        'font-color': 'gui-input.fontColor',
        'background-color': 'gui-input.backgroundColor',
        'hover-color': 'gui-input.hoverColor',
        'border-color': 'gui-input.borderColor',
        'border-hover-color': 'gui-input.borderHoverColor'
    }
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-interactable', {
    schema: {
        clickAction: { type: 'string' },
        hoverAction: { type: 'string' },
        keyCode: { type: 'number', default: -1 },
        key: { type: 'string' }
    },
    init: function init() {
        var _this = this;
        var data = this.data;
        var el = this.el;

        if (data.keyCode > 0) {
            window.addEventListener("keydown", function (event) {
                // console.log('in keydown handler, event key: ' + event.key);
                if (event.key == data.key) {
                    //    console.log("key press by gui-interactable, key: " + data.key);
                    el.emit('click');
                } else if (event.keyCode == data.keyCode) {
                    //    console.log("key press by gui-interactable, keyCode: " + data.keyCode);
                    el.emit('click');
                }
                event.preventDefault();
            }, true);
        }
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},
    setClickAction: function setClickAction(action) {
        this.data.clickAction = action; //change function dynamically
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-item', {
    schema: {
        type: { type: 'string' },
        width: { type: 'number', default: 1 },
        height: { type: 'number', default: 1 },
        baseDepth: { type: 'number', default: 0.01 },
        depth: { type: 'number', default: 0.02 },
        gap: { type: 'number', default: 0.025 },
        radius: { type: 'number', default: 0 },
        margin: { type: 'vec4', default: { x: 0, y: 0, z: 0, w: 0 } },

        bevel: { type: 'boolean', default: false },
        bevelSegments: { type: 'number', default: 5 },
        steps: { type: 'number', default: 2 },
        bevelSize: { type: 'number', default: 0.1 },
        bevelOffset: { type: 'number', default: 0 },
        bevelThickness: { type: 'number', default: 0.1 }

    },
    init: function init() {},
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-label', {
  schema: {
    value: { type: 'string', default: '' },
    align: { type: 'string', default: 'center' },
    anchor: { type: 'string', default: 'center' },
    fontSize: { type: 'number', default: 0.2 },
    lineHeight: { type: 'number', default: 0.2 },
    letterSpacing: { type: 'number', default: 0 },
    fontFamily: { type: 'string', default: '' },
    fontColor: { type: 'string', default: key_grey_dark },
    backgroundColor: { type: 'string', default: key_offwhite },
    opacity: { type: 'number', default: 1.0 },
    textDepth: { type: 'number', default: 0.01 }
  },
  init: function init() {
    var data = this.data;
    var el = this.el;
    var guiItem = el.getAttribute("gui-item");
    this.guiItem = guiItem;

    el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
    el.setAttribute('material', 'shader: flat; side:front; color:' + data.backgroundColor + '; transparent: true; opacity: ' + data.opacity + '; alphaTest: 0.5;');

    //fallback for old font-sizing
    if (data.fontSize > 20) {
      // 150/750
      var newSize = data.fontSize / 750;
      data.fontSize = newSize;
    }

    this.setText(data.value);

    ////WAI ARIA Support

    // if(data.labelFor){
    //   // el.setAttribute('role', 'button');
    // }

  },
  update: function update(oldData) {
    var data = this.data;
    var el = this.el;

    if (this.textEntity) {
      console.log("has textEntity: " + this.textEntity);

      var oldEntity = this.textEntity;
      oldEntity.parentNode.removeChild(oldEntity);

      this.setText(this.data.value);
    } else {
      console.log("no textEntity!");
    }
  },
  setText: function setText(newText) {
    var textEntity = document.createElement("a-entity");
    this.textEntity = textEntity;
    textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align: ' + this.data.align + '; \n                                                anchor: ' + this.data.anchor + '; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                lineHeight: ' + this.data.lineHeight + ';\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
    textEntity.setAttribute('position', '0 0 ' + this.data.textDepth);
    //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
    this.el.appendChild(textEntity);
  }
});

AFRAME.registerPrimitive('a-gui-label', {
  defaultComponents: {
    'gui-item': { type: 'label' },
    'gui-label': {}
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-progressbar', {
    schema: {
        backgroundColor: { type: 'string', default: key_grey },
        activeColor: { type: 'string', default: key_orange }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; opacity: 1;  color: ' + data.backgroundColor + '; side:front;');

        var progressMeter = document.createElement("a-entity");
        progressMeter.setAttribute('geometry', 'primitive: box; width: 0.04; height: ' + guiItem.height + '; depth: 0.02;');
        progressMeter.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor);
        progressMeter.setAttribute('position', -guiItem.width / 2 + ' 0 0.01');
        progressMeter.id = "progress_meter";
        el.appendChild(progressMeter);

        // <a-entity id="progress_meter"
        //           geometry="primitive: box; width: 0.04; height: 0.3; depth: 0.004;"
        //           material="shader: flat; opacity: 1; color: blue;"
        //             position="-1.23  0 0.0">
        // </a-entity>
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

AFRAME.registerPrimitive('a-gui-progressbar', {
    defaultComponents: {
        'gui-item': { type: 'progressbar' },
        'gui-progressbar': {}
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'background-color': 'gui-progressbar.backgroundColor',
        'active-color': 'gui-progressbar.activeColor'
    }
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-radio', {
    schema: {
        on: { default: 'click' },
        value: { type: 'string', default: '' },
        active: { type: 'boolean', default: true },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false },
        checked: { type: 'boolean', default: false },
        radiosizecoef: { type: 'number', default: 1 },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_grey_dark },
        borderColor: { type: 'string', default: key_white },
        backgroundColor: { type: 'string', default: key_offwhite },
        hoverColor: { type: 'string', default: key_grey_light },
        activeColor: { type: 'string', default: key_orange },
        handleColor: { type: 'string', default: key_grey }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/750
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('material', 'shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');

        var radioBoxWidth = 0.50;
        var radioBoxX = -guiItem.width * 0.5 + guiItem.height * 0.5;
        var radioBox = document.createElement("a-cylinder");
        radioBox.setAttribute('radius', guiItem.height * 0.2 * data.radiosizecoef);
        radioBox.setAttribute('height', '0.01');
        radioBox.setAttribute('rotation', '90 0 0');
        radioBox.setAttribute('material', 'color:' + data.handleColor + '; shader: flat;');
        radioBox.setAttribute('position', radioBoxX + ' 0 0');
        el.appendChild(radioBox);

        var radioborder = document.createElement("a-torus");
        radioborder.setAttribute('radius', guiItem.height * 0.19 * data.radiosizecoef);
        radioborder.setAttribute('radius-tubular', '0.01');
        radioborder.setAttribute('rotation', '90 0 0');
        radioborder.setAttribute('material', 'color:' + data.borderColor + '; shader: flat;');
        radioBox.appendChild(radioborder);

        var radioCenter = document.createElement("a-cylinder");
        radioCenter.setAttribute('radius', guiItem.height * 0.18 * data.radiosizecoef);
        radioCenter.setAttribute('height', '0.02');
        radioCenter.setAttribute('rotation', '0 0 0');
        radioCenter.setAttribute('material', 'color:' + data.handleColor + '; shader: flat;');
        radioBox.appendChild(radioCenter);

        this.setText(data.value);

        this.updateToggle(data.active);
        el.setAttribute("checked", data.active);

        el.addEventListener('mouseenter', function (evt) {
            radioborder.removeAttribute('animation__leave');
            radioborder.setAttribute('animation__enter', 'property: material.color; from: ' + data.borderColor + '; to:' + data.hoverColor + '; dur:200;');
        });
        el.addEventListener('mouseleave', function (evt) {
            radioborder.removeAttribute('animation__enter');
            radioborder.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.borderColor + '; dur:200; easing: easeOutQuad;');
        });
        el.addEventListener(data.on, function (evt) {
            // console.log('I was clicked at: ', evt.detail.intersection.point); // Commented out to use own made click event without defining detail
            data.checked = !data.checked;
            if (data.checked) {
                radioCenter.removeAttribute('animation__colorOut');
                radioCenter.removeAttribute('animation__rotationOut');
                radioCenter.removeAttribute('animation__position1Out');
                radioCenter.removeAttribute('animation__position2Out');
                radioCenter.setAttribute('animation__colorIn', 'property: material.color; from: ' + data.handleColor + '; to:' + data.activeColor + '; dur:500; easing:easeInOutCubic;');
                radioCenter.setAttribute('animation__rotationIn', 'property: rotation; from: 0 0 0; to:-180 0 0; dur:500; easing:easeInOutCubic;');
                radioCenter.setAttribute('animation__position1In', 'property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic;');
                radioCenter.setAttribute('animation__position2In', 'property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;');
            } else {
                radioCenter.removeAttribute('animation__colorIn');
                radioCenter.removeAttribute('animation__rotationIn');
                radioCenter.removeAttribute('animation__position1In');
                radioCenter.removeAttribute('animation__position2In');
                radioCenter.setAttribute('animation__colorOut', 'property: material.color; from: ' + data.activeColor + '; to:' + data.handleColor + '; dur:500; easing:easeInOutCubic;');
                radioCenter.setAttribute('animation__rotationOut', 'property: rotation; from: -180 0 0; to:0 0 0; dur:500; easing:easeInOutCubic;');
                radioCenter.setAttribute('animation__position1Out', 'property: position; from: 0 0 0; to:0 0.3 0; dur:200; easing:easeInOutCubic; ');
                radioCenter.setAttribute('animation__position2Out', 'property: position; from: 0 0.3 0; to:0 0 0; dur:200; easing:easeInOutCubic; delay:300;');
            }

            var guiInteractable = el.getAttribute("gui-interactable");
            //console.log("guiInteractable: "+guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            //console.log("clickActionFunctionName: "+clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
        });

        ////WAI ARIA Support
        el.setAttribute('role', 'radio');
    },
    update: function update() {
        var data = this.data;
        var el = this.el;
        this.updateToggle(data.active);

        if (this.textEntity) {
            console.log("has textEntity: " + this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
        } else {
            console.log("no textEntity!");
        }
    },

    updateToggle: function updateToggle(active) {

        if (active) {} else {}
    },
    setText: function setText(newText) {
        var textEntityX = this.guiItem.height - this.guiItem.width * 0.5;
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', textEntityX + ' 0 0.05');

        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    }

});

AFRAME.registerPrimitive('a-gui-radio', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'radio' },
        'gui-radio': {}
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-radio.on',
        'value': 'gui-radio.value',
        'active': 'gui-radio.active',
        'checked': 'gui-radio.checked',
        'font-color': 'gui-radio.fontColor',
        'font-size': 'gui-radio.fontSize',
        'font-family': 'gui-radio.fontFamily',
        'border-color': 'gui-radio.borderColor',
        'background-color': 'gui-radio.backgroundColor',
        'hover-color': 'gui-radio.hoverColor',
        'active-color': 'gui-radio.activeColor',
        'handle-color': 'gui-radio.handleColor',
        'radiosizecoef': 'gui-radio.radiosizecoef'
    }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('rounded', {
  schema: {
    enabled: { default: true },
    width: { type: 'number', default: 1 },
    height: { type: 'number', default: 1 },
    radius: { type: 'number', default: 0.3 },
    topLeftRadius: { type: 'number', default: -1 },
    topRightRadius: { type: 'number', default: -1 },
    bottomLeftRadius: { type: 'number', default: -1 },
    bottomRightRadius: { type: 'number', default: -1 },
    depthWrite: { default: true },
    polygonOffset: { default: false },
    polygonOffsetFactor: { type: 'number', default: 0 },
    color: { type: 'color', default: "#F0F0F0" },
    opacity: { type: 'number', default: 1 }
  },
  init: function init() {
    this.rounded = new THREE.Mesh(this.draw(), new THREE.MeshStandardMaterial({ color: new THREE.Color(this.data.color) }));
    this.updateOpacity();
    this.el.setObject3D('mesh', this.rounded);
  },
  update: function update() {
    if (this.data.enabled) {
      if (this.rounded) {
        this.rounded.visible = true;
        this.rounded.geometry = this.draw();
        this.rounded.material.color = new THREE.Color(this.data.color);
        this.updateOpacity();
      }
    } else {
      this.rounded.visible = false;
    }
  },
  updateOpacity: function updateOpacity() {
    if (this.data.opacity < 0) {
      this.data.opacity = 0;
    }
    if (this.data.opacity > 1) {
      this.data.opacity = 1;
    }
    if (this.data.opacity < 1) {
      this.rounded.material.transparent = true;
      this.rounded.material.opacity = this.data.opacity;
      this.rounded.material.alphaTest = 0;
    } else {
      this.rounded.material.transparent = false;
    }
  },
  tick: function tick() {},
  remove: function remove() {
    if (!this.rounded) {
      return;
    }
    this.el.object3D.remove(this.rounded);
    this.rounded = null;
  },
  draw: function draw() {
    var roundedRectShape = new THREE.Shape();
    function roundedRect(ctx, x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius) {
      if (!topLeftRadius) {
        topLeftRadius = 0.00001;
      }
      if (!topRightRadius) {
        topRightRadius = 0.00001;
      }
      if (!bottomLeftRadius) {
        bottomLeftRadius = 0.00001;
      }
      if (!bottomRightRadius) {
        bottomRightRadius = 0.00001;
      }
      ctx.moveTo(x, y + topLeftRadius);
      ctx.lineTo(x, y + height - topLeftRadius);
      ctx.quadraticCurveTo(x, y + height, x + topLeftRadius, y + height);
      ctx.lineTo(x + width - topRightRadius, y + height);
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - topRightRadius);
      ctx.lineTo(x + width, y + bottomRightRadius);
      ctx.quadraticCurveTo(x + width, y, x + width - bottomRightRadius, y);
      ctx.lineTo(x + bottomLeftRadius, y);
      ctx.quadraticCurveTo(x, y, x, y + bottomLeftRadius);
    }

    var corners = [this.data.radius, this.data.radius, this.data.radius, this.data.radius];
    if (this.data.topLeftRadius != -1) {
      corners[0] = this.data.topLeftRadius;
    }
    if (this.data.topRightRadius != -1) {
      corners[1] = this.data.topRightRadius;
    }
    if (this.data.bottomLeftRadius != -1) {
      corners[2] = this.data.bottomLeftRadius;
    }
    if (this.data.bottomRightRadius != -1) {
      corners[3] = this.data.bottomRightRadius;
    }

    roundedRect(roundedRectShape, -this.data.width / 2, -this.data.height / 2, this.data.width, this.data.height, corners[0], corners[1], corners[2], corners[3]);
    return new THREE.ShapeBufferGeometry(roundedRectShape);
  },
  pause: function pause() {},
  play: function play() {}
});

AFRAME.registerPrimitive('a-rounded', {
  defaultComponents: {
    rounded: {}
  },
  mappings: {
    enabled: 'rounded.enabled',
    width: 'rounded.width',
    height: 'rounded.height',
    radius: 'rounded.radius',
    'depth-write': 'rounded.depthWrite',
    'polygon-offset': 'rounded.polygonOffset',
    'polygon-offset-factor': 'rounded.polygonOffsetFactor',
    'top-left-radius': 'rounded.topLeftRadius',
    'top-right-radius': 'rounded.topRightRadius',
    'bottom-left-radius': 'rounded.bottomLeftRadius',
    'bottom-right-radius': 'rounded.bottomRightRadius',
    color: 'rounded.color',
    opacity: 'rounded.opacity'
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-slider', {
    schema: {
        activeColor: { type: 'string', default: key_orange },
        backgroundColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_grey },
        handleColor: { type: 'string', default: key_white },
        handleInnerDepth: { type: 'number', default: 0.02 },
        handleInnerRadius: { type: 'number', default: 0.13 },
        handleOuterDepth: { type: 'number', default: 0.04 },
        handleOuterRadius: { type: 'number', default: 0.17 },
        hoverColor: { type: 'string', default: key_grey_light },
        leftRightPadding: { type: 'number', default: 0.25 },
        percent: { type: 'number', default: 0.5 },
        sliderBarHeight: { type: 'number', default: 0.05 },
        sliderBarDepth: { type: 'number', default: 0.03 },
        topBottomPadding: { type: 'number', default: 0.125 }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var sliderWidth = guiItem.width - data.leftRightPadding * 2.0;
        var sliderHeight = guiItem.height - data.topBottomPadding * 2.0;

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');
        el.setAttribute('material', 'shader: flat; opacity: 1;  color: ' + data.backgroundColor + '; side:front;');

        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', 'primitive: box; width: ' + data.percent * sliderWidth + '; height: ' + data.sliderBarHeight + '; depth: ' + data.sliderBarDepth + ';');
        sliderActiveBar.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor + ';');
        sliderActiveBar.setAttribute('position', data.percent - sliderWidth * 0.5 + ' 0 ' + (data.sliderBarDepth - 0.01));
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', 'primitive: box; width: ' + (sliderWidth - data.percent * sliderWidth) + '; height: ' + data.sliderBarHeight + '; depth: ' + data.sliderBarDepth + ';');
        sliderBar.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor + ';');
        sliderBar.setAttribute('position', data.percent * sliderWidth * 0.5 + ' 0 ' + (data.sliderBarDepth - 0.01));
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + data.handleOuterRadius + '; height: ' + data.handleOuterDepth + ';');
        handleContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.borderColor + ';');
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', data.percent * sliderWidth - sliderWidth * 0.5 + ' 0 ' + (data.handleOuterDepth - 0.01));
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', 'primitive: cylinder; radius: ' + data.handleInnerRadius + '; height: ' + data.handleInnerDepth + ';');
        handle.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.handleColor + ';');
        handle.setAttribute('position', '0 ' + data.handleInnerDepth + ' 0');
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
            console.log('current percent: ' + data.percent);
            var sliderBarWidth = 2; // total width of slider bar
            if (localCoordinates.x <= -sliderBarWidth / 2) {
                data.percent = 0;
            } else if (localCoordinates.x >= sliderBarWidth / 2) {
                data.percent = 1.0;
            } else {
                data.percent = (localCoordinates.x + sliderBarWidth / 2) / sliderBarWidth;
            }
            console.log("handle container: " + handleContainer);
            sliderActiveBar.setAttribute('geometry', 'primitive: box; width: ' + data.percent * 2 + '; height: 0.05; depth: 0.03;');
            sliderActiveBar.setAttribute('position', data.percent - 1 + ' 0 0.02');
            sliderBar.setAttribute('geometry', 'primitive: box; width: ' + (2 - data.percent * 2) + '; height: 0.05; depth: 0.03;');
            sliderBar.setAttribute('position', data.percent * 1 + ' 0 0.02');
            handleContainer.setAttribute('position', data.percent * 2 - 1 + ' 0 0.03');
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt, data.percent);
        });
    },
    update: function update() {},
    tick: function tick() {},
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {}
});

AFRAME.registerPrimitive('a-gui-slider', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'slider' },
        'gui-slider': {}
    },
    mappings: {
        'active-color': 'gui-slider.activeColor',
        'background-color': 'gui-slider.backgroundColor',
        'border-color': 'gui-slider.borderColor',
        'handle-color': 'gui-slider.handleColor',
        'handle-inner-depth': 'gui-slider.handleInnerDepth',
        'handle-inner-radius': 'gui-slider.handleInnerRadius',
        'handle-outer-depth': 'gui-slider.handleOuterDepth',
        'handle-outer-radius': 'gui-slider.handleOuterRadius',
        'height': 'gui-item.height',
        'hover-color': 'gui-slider.hoverColor',
        'key-code': 'gui-interactable.keyCode',
        'left-right-padding': 'gui-slider.leftRightPadding',
        'margin': 'gui-item.margin',
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'percent': 'gui-slider.percent',
        'slider-bar-depth': 'gui-slider.sliderBarDepth',
        'slider-bar-height': 'gui-slider.sliderBarHeight',
        'top-bottom-padding': 'gui-slider.topBottomPadding',
        'width': 'gui-item.width'
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-toggle', {
    schema: {
        on: { default: 'click' },
        value: { type: 'string', default: '' },
        toggle: { type: 'boolean', default: false },
        toggleState: { type: 'boolean', default: false },
        active: { type: 'boolean', default: true },
        checked: { type: 'boolean', default: false },
        borderWidth: { type: 'number', default: 1 },
        fontSize: { type: 'number', default: 0.2 },
        fontFamily: { type: 'string', default: '' },
        fontColor: { type: 'string', default: key_grey_dark },
        borderColor: { type: 'string', default: key_grey },
        backgroundColor: { type: 'string', default: key_offwhite },
        hoverColor: { type: 'string', default: key_grey_light },
        activeColor: { type: 'string', default: key_orange },
        handleColor: { type: 'string', default: key_offwhite }
    },
    init: function init() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        this.guiItem = guiItem;
        var toggleState = this.toggleState = data.toggle;
        var guiInteractable = el.getAttribute("gui-interactable");
        this.guiInteractable = guiInteractable;

        //fallback for old font-sizing
        if (data.fontSize > 20) {
            // 150/750
            var newSize = data.fontSize / 750;
            data.fontSize = newSize;
        }

        el.setAttribute('material', 'shader: flat; depthTest:true;transparent: false; opacity: 1;  color: ' + this.data.backgroundColor + '; side:front;');
        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.height + ';');

        var toggleBoxWidth = guiItem.height / 1.75;
        var toggleBoxX = -guiItem.width * 0.5 + guiItem.height / 2;
        var toggleBox = document.createElement("a-box");

        toggleBox.setAttribute('width', toggleBoxWidth);
        toggleBox.setAttribute('height', guiItem.height * 0.5);
        toggleBox.setAttribute('depth', '0.01');
        toggleBox.setAttribute('material', 'color:' + data.borderColor + '; shader: flat;');
        toggleBox.setAttribute('position', toggleBoxX + ' 0 0');
        el.appendChild(toggleBox);

        var toggleHandleWidth = guiItem.height / 5;
        var toggleHandleXStart = -guiItem.height * 0.5 + toggleHandleWidth * 2;
        var toggleHandleXEnd = guiItem.height * 0.5 - toggleHandleWidth * 2;
        var toggleHandle = document.createElement("a-box");

        toggleHandle.setAttribute('width', '' + toggleHandleWidth);
        toggleHandle.setAttribute('height', guiItem.height * 0.4);
        toggleHandle.setAttribute('depth', '0.02');
        toggleHandle.setAttribute('material', 'color:' + data.handleColor);
        toggleHandle.setAttribute('position', toggleHandleXStart + ' 0 0.02');
        toggleBox.appendChild(toggleHandle);

        this.setText(data.value);

        this.updateToggle(data.active);

        el.addEventListener('mouseenter', function (evt) {
            toggleHandle.removeAttribute('animation__leave');
            toggleHandle.setAttribute('animation__enter', 'property: material.color; from: ' + data.handleColor + '; to:' + data.hoverColor + '; dur:200;');
        });
        el.addEventListener('mouseleave', function (evt) {
            toggleHandle.removeAttribute('animation__enter');
            toggleHandle.setAttribute('animation__leave', 'property: material.color; from: ' + data.hoverColor + '; to:' + data.handleColor + '; dur:200; easing: easeOutQuad;');
        });

        el.addEventListener("check", function (evt) {
            if (!data.checked) {
                data.checked = true;
            }
        });
        el.addEventListener("uncheck", function (evt) {
            // a
            if (data.checked) {
                data.checked = false;
            }
        });

        el.addEventListener(data.on, function (evt) {
            console.log('I was clicked at: ', evt.detail.intersection.point);
            data.checked = !data.checked;
            if (data.checked) {
                toggleBox.removeAttribute('animation__colorOut');
                toggleHandle.removeAttribute('animation__positionOut');
                toggleBox.setAttribute('animation__colorIn', 'property: material.color; from: ' + data.borderColor + '; to:' + data.activeColor + '; dur:200; easing:easeInOutCubic;');
                toggleHandle.setAttribute('animation__positionIn', 'property: position; from: ' + toggleHandleXStart + ' 0 0.02; to:' + toggleHandleXEnd + ' 0 0.02; dur:200; easing:easeInOutCubic;');
            } else {
                toggleBox.removeAttribute('animation__colorIn');
                toggleHandle.removeAttribute('animation__positionIn');
                toggleBox.setAttribute('animation__colorOut', 'property: material.color; from: ' + data.activeColor + '; to:' + data.borderColor + '; dur:200; easing:easeInOutCubic;');
                toggleHandle.setAttribute('animation__positionOut', 'property: position; from: ' + toggleHandleXEnd + ' 0 0.02; to:' + toggleHandleXStart + ' 0 0.02; dur:200; easing:easeInOutCubic;');
            }
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(evt);
        });
    },
    update: function update() {
        var data = this.data;
        var el = this.el;
        this.updateToggle(data.active);

        if (this.textEntity) {
            console.log("has textEntity: " + this.textEntity);

            var oldEntity = this.textEntity;
            oldEntity.parentNode.removeChild(oldEntity);

            this.setText(this.data.value);
        } else {
            console.log("no textEntity!");
        }
    },

    updateToggle: function updateToggle(active) {

        if (active) {} else {}
    },
    setText: function setText(newText) {
        var textEntityX = this.guiItem.height - this.guiItem.width * 0.5;
        var textEntity = document.createElement("a-entity");
        this.textEntity = textEntity;
        textEntity.setAttribute('troika-text', 'value: ' + newText + '; \n                                                align:left; \n                                                anchor:left; \n                                                baseline:center;\n                                                letterSpacing:0;\n                                                color:' + this.data.fontColor + ';\n                                                font:' + this.data.fontFamily + ';\n                                                fontSize:' + this.data.fontSize + ';\n                                                depthOffset:1;\n                                                maxWidth:' + this.guiItem.width / 1.05 + ';\n                                                ');
        textEntity.setAttribute('position', textEntityX + ' 0 0.05');

        //        textEntity.setAttribute('troika-text-material', `shader: flat;`);
        this.el.appendChild(textEntity);
    }
});

AFRAME.registerPrimitive('a-gui-toggle', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'toggle' },
        'gui-toggle': {}
    },
    mappings: {
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'key-code': 'gui-interactable.keyCode',
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'on': 'gui-toggle.on',
        'active': 'gui-toggle.active',
        'checked': 'gui-toggle.checked',
        'value': 'gui-toggle.value',
        'font-color': 'gui-toggle.fontColor',
        'font-family': 'gui-toggle.fontFamily',
        'font-size': 'gui-toggle.fontSize',
        'border-width': 'gui-toggle.borderWidth',
        'border-color': 'gui-toggle.borderColor',
        'background-color': 'gui-toggle.backgroundColor',
        'hover-color': 'gui-toggle.hoverColor',
        'active-color': 'gui-toggle.activeColor',
        'handle-color': 'gui-toggle.handleColor'
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


AFRAME.registerComponent('gui-vertical-slider', {
    schema: {
        activeColor: { type: 'string', default: key_orange },
        backgroundColor: { type: 'string', default: key_offwhite },
        borderColor: { type: 'string', default: key_grey },
        handleColor: { type: 'string', default: key_white },
        handleInnerDepth: { type: 'number', default: 0.02 },
        handleInnerRadius: { type: 'number', default: 0.13 },
        handleOuterDepth: { type: 'number', default: 0.04 },
        handleOuterRadius: { type: 'number', default: 0.17 },
        hoverColor: { type: 'string', default: key_grey_light },
        hoverFontSize: { type: 'number', default: 100.0 },
        hoverHeight: { type: 'number', default: 0.35 },
        hoverPercent: { type: 'number' },
        hoverWidth: { type: 'number', default: 0.7 },
        hoverMargin: { type: 'vec4', default: { x: 0, y: 0, z: 0, w: 0 } },
        leftRightPadding: { type: 'number', default: 0.125 },
        percent: { type: 'number', default: 0.5 },
        opacity: { type: 'number', default: 1.0 },
        outputFontSize: { type: 'string', default: '0.2' },
        outputFunction: { type: 'string' },
        outputHeight: { type: 'number', default: 1.0 },
        outputMargin: { type: 'vec4', default: { x: 0, y: 0, z: 0, w: 0 } },
        outputTextDepth: { type: 'number', default: 0.25 },
        outputWidth: { type: 'number', default: 1.0 },
        sliderBarDepth: { type: 'number', default: 0.03 },
        sliderBarWidth: { type: 'number', default: 0.08 },
        topBottomPadding: { type: 'number', default: 0.25 }
    },
    init: function init() {
        var _this = this;

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding * 2.0;
        var sliderHeight = guiItem.height - data.topBottomPadding * 2.0;
        this.sliderHeight = sliderHeight;

        el.setAttribute('geometry', 'primitive: plane; height: ' + guiItem.height + '; width: ' + guiItem.width + ';');
        el.setAttribute('material', 'shader: flat; opacity: ' + data.opacity + ';  alphaTest: 0.5; color: ' + data.backgroundColor + '; side:front;');

        console.log('**** in vertical slider init, percent: ' + data.percent + ', sliderHeight: ' + sliderHeight);
        var sliderActiveBar = document.createElement("a-entity");
        sliderActiveBar.setAttribute('geometry', 'primitive: box; height: ' + data.percent * sliderHeight + '; width: ' + data.sliderBarWidth + '; depth: ' + data.sliderBarDepth + ';');
        sliderActiveBar.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor + ';');
        sliderActiveBar.setAttribute('position', '0 ' + (data.percent * sliderHeight - sliderHeight * 0.5 - data.percent * sliderHeight * 0.5) + ' ' + (data.sliderBarDepth - 0.01));
        this.sliderActiveBar = sliderActiveBar;
        el.appendChild(sliderActiveBar);

        var sliderBar = document.createElement("a-entity");
        sliderBar.setAttribute('geometry', 'primitive: box; height: ' + (sliderHeight - data.percent * sliderHeight) + '; width: ' + data.sliderBarWidth + '; depth: ' + data.sliderBarDepth + ';');
        sliderBar.setAttribute('material', 'shader: flat; opacity: 1; alphaTest: 0.5; side:double; color:' + data.borderColor + ';');
        sliderBar.setAttribute('position', '0 ' + data.percent * sliderHeight * 0.5 + ' ' + (data.sliderBarDepth - 0.01));
        this.sliderBar = sliderBar;
        el.appendChild(sliderBar);

        var handleContainer = document.createElement("a-entity");
        handleContainer.setAttribute('geometry', 'primitive: cylinder; radius: ' + data.handleOuterRadius + '; height: ' + data.handleOuterDepth + ';');
        handleContainer.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor + ';');
        handleContainer.setAttribute('rotation', '90 0 0');
        handleContainer.setAttribute('position', '0 ' + (data.percent * sliderHeight - sliderHeight * 0.5) + ' ' + (data.handleOuterDepth - 0.01));
        this.handleContainer = handleContainer;
        el.appendChild(handleContainer);

        var handle = document.createElement("a-entity");
        handle.setAttribute('geometry', 'primitive: cylinder; radius: ' + data.handleInnerRadius + '; height: ' + data.handleInnerDepth + ';');
        handle.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.handleColor + ';');
        handle.setAttribute('position', '0 ' + data.handleInnerDepth + ' 0');
        handleContainer.appendChild(handle);

        var valueLabel = document.createElement('a-gui-label');
        valueLabel.setAttribute('width', '' + guiItem.width * 1.4 * data.outputWidth);
        valueLabel.setAttribute('height', '' + guiItem.width * 0.7);
        // TODO: use function to calculate display value
        valueLabel.setAttribute('value', '0.0');
        valueLabel.setAttribute('opacity', '1.0');
        valueLabel.setAttribute('position', guiItem.width * 1.4 + ' 0 ' + data.sliderBarDepth);
        valueLabel.setAttribute('rotation', '-90 0 0');
        valueLabel.setAttribute('font-color', data.activeColor);
        valueLabel.setAttribute('font-size', guiItem.width * 240 + 'px');
        valueLabel.setAttribute('font-weight', 'bold');
        valueLabel.setAttribute('text-depth', data.outputTextDepth);
        this.valueLabel = valueLabel;
        handleContainer.appendChild(valueLabel);

        var hoverIndicator = document.createElement("a-entity");
        hoverIndicator.setAttribute('geometry', 'primitive: box; height: 0.02; width: ' + guiItem.width * 0.5 + '; depth: ' + data.sliderBarDepth + ';');
        hoverIndicator.setAttribute('material', 'shader: flat; opacity: 1; side:double; color: ' + data.activeColor + ';');
        hoverIndicator.setAttribute('position', -guiItem.width * 0.5 + ' 0 ' + (data.sliderBarDepth - 0.01));
        hoverIndicator.setAttribute('visible', 'false');
        this.hoverIndicator = hoverIndicator;
        el.appendChild(hoverIndicator);

        var hoverLabel = document.createElement('a-gui-label');
        hoverLabel.setAttribute('width', '' + guiItem.width * data.hoverWidth);
        hoverLabel.setAttribute('height', '' + guiItem.width * data.hoverHeight);
        hoverLabel.setAttribute('value', '');
        hoverLabel.setAttribute('opacity', '0.5');
        hoverLabel.setAttribute('position', -guiItem.width * data.hoverWidth + ' 0 ' + data.sliderBarDepth);
        hoverLabel.setAttribute('font-color', data.borderColor);
        hoverLabel.setAttribute('font-size', guiItem.width * data.hoverFontSize + 'px');
        hoverLabel.setAttribute('text-depth', data.outputTextDepth);
        this.hoverLabel = hoverLabel;
        hoverIndicator.appendChild(hoverLabel);

        el.addEventListener('mouseenter', function () {
            handle.setAttribute('material', 'color', data.hoverColor);
        });

        el.addEventListener('mouseleave', function () {
            handle.setAttribute('material', 'color', data.handleColor);
        });

        el.addEventListener('click', function (evt) {
            // console.log('I was clicked at: ', evt.detail.intersection.point);
            var localCoordinates = el.object3D.worldToLocal(evt.detail.intersection.point);
            console.log('click local coordinates: ', localCoordinates);
            console.log('current percent: ' + data.percent);
            var newPercent = null;
            if (localCoordinates.y <= -sliderHeight / 2) {
                newPercent = 0;
            } else if (localCoordinates.y >= sliderHeight / 2) {
                newPercent = 1.0;
            } else {
                newPercent = (localCoordinates.y + sliderHeight / 2) / sliderHeight;
            }
            console.log('new percent: ' + newPercent);
            el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
            el.setAttribute('gui-vertical-slider', 'hoverPercent', String(newPercent));
            console.log("handle container: " + handleContainer);
            var guiInteractable = el.getAttribute("gui-interactable");
            console.log("guiInteractable: " + guiInteractable);
            var clickActionFunctionName = guiInteractable.clickAction;
            console.log("clickActionFunctionName: " + clickActionFunctionName);
            // find object
            var clickActionFunction = window[clickActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof clickActionFunction === "function") clickActionFunction(data.percent);
        });

        this.el.addEventListener('raycaster-intersected', function (evt) {
            // console.log('***** in raycaster-intersected');
            _this.raycaster = evt.detail.el;
        });
        this.el.addEventListener('raycaster-intersected-cleared', function (evt) {
            // console.log('****** in raycaster-intersected-cleared');
            _this.raycaster = null;
            _this.hoverIndicator.setAttribute('visible', false);
            _this.hoverLabel.setAttribute('visible', false);
        });
    },
    update: function update(oldData) {
        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute('gui-item');
        var sliderWidth = guiItem.width - data.leftRightPadding * 2.0;
        var sliderHeight = guiItem.height - data.topBottomPadding * 2.0;
        //console.log('in vertical slider update, oldData: ' + JSON.stringify(oldData) + ', data: ' + JSON.stringify(data))
        if (data.percent != oldData.percent && this.sliderActiveBar && this.sliderBar && this.handleContainer) {
            var sliderHeight = guiItem.height - data.topBottomPadding * 2.0;
            this.sliderActiveBar.setAttribute('geometry', 'primitive: box; height: ' + data.percent * sliderHeight + '; width: ' + data.sliderBarWidth + '; depth: ' + data.sliderBarDepth + ';');
            this.sliderActiveBar.setAttribute('position', '0 ' + (data.percent * sliderHeight - sliderHeight * 0.5 - data.percent * sliderHeight * 0.5) + ' ' + (data.sliderBarDepth - 0.01));
            this.sliderBar.setAttribute('geometry', 'primitive: box; width: ' + data.sliderBarWidth + '; height: ' + (sliderHeight - data.percent * sliderHeight) + '; depth: ' + data.sliderBarDepth + ';');
            this.sliderBar.setAttribute('position', '0 ' + data.percent * sliderHeight * 0.5 + ' ' + (data.sliderBarDepth - 0.01));
            this.handleContainer.setAttribute('position', '0 ' + (data.percent * sliderHeight - sliderHeight * 0.5) + ' ' + (data.handleOuterDepth - 0.01));
            var outputValue = this.getOutputValue(false);
            if (outputValue) {
                this.valueLabel.setAttribute('value', outputValue);
            }
            this.hoverIndicator.setAttribute('visible', false);
            this.hoverLabel.setAttribute('visible', false);
        } else if (data.hoverPercent != oldData.hoverPercent && data.hoverPercent != data.percent && this.hoverIndicator) {
            var hoverOutputValue = this.getOutputValue(true);
            if (hoverOutputValue) {
                this.hoverLabel.setAttribute('value', hoverOutputValue);
            }
            this.hoverIndicator.setAttribute('position', '0 ' + (data.hoverPercent * sliderHeight - sliderHeight * 0.5) + ' ' + (data.sliderBarDepth - 0.01));
            this.hoverIndicator.setAttribute('visible', true);
            this.hoverLabel.setAttribute('visible', true);
        }
    },
    tick: function tick() {
        if (!this.raycaster) {
            return;
        } // Not intersecting.

        var el = this.el;
        var data = this.data;
        var sliderHeight = this.sliderHeight;
        var handleContainer = this.handleContainer;
        var intersection = this.raycaster.components.raycaster.getIntersection(el);
        if (!intersection) {
            return;
        } else {
            //  console.log('1: hover intersection point: ' + JSON.stringify(intersection.point));
            if (this.previousLocalY && this.previousLocalY == intersection.point.y) {
                this.hoverIndicator.setAttribute('visible', false);
                this.hoverLabel.setAttribute('visible', false);
                return;
            }
            var mesh = this.el.object3D;
            mesh.updateMatrixWorld();

            var pos = new THREE.Vector3();
            var rot = new THREE.Quaternion();
            var scale = new THREE.Vector3();

            mesh.matrixWorld.decompose(pos, rot, scale);

            // console.log('2: hover world position: ' + JSON.stringify(pos));
            var localCoordinates = new THREE.Vector3();
            localCoordinates.x = intersection.point.x - pos.x;
            localCoordinates.y = intersection.point.y - pos.y;
            localCoordinates.z = intersection.point.z - pos.z;
            this.previousLocalY = localCoordinates.y;
            //    console.log('3: hover local position: ' + JSON.stringify(localCoordinates));
            // var localCoordinates = el.object3D.worldToLocal(intersection.point);
            //console.log('local coordinates: ', localCoordinates);
            //console.log('current percent: '+data.percent);
            var hoverPercent = null;
            if (localCoordinates.y <= -sliderHeight / 2) {
                hoverPercent = 0;
            } else if (localCoordinates.y >= sliderHeight / 2) {
                hoverPercent = 1.0;
            } else {
                hoverPercent = (localCoordinates.y + sliderHeight / 2) / sliderHeight;
            }
            //console.log('hoverPercent: '+hoverPercent);
            if (hoverPercent != this.data.hoverPercent) {
                //console.log('**** hoverPercent changed: ' + hoverPercent);
                el.setAttribute('gui-vertical-slider', 'hoverPercent', String(hoverPercent));
            }
            // el.setAttribute('gui-vertical-slider', 'percent', String(newPercent));
            //console.log("handle container: "+handleContainer);
            var guiInteractable = el.getAttribute("gui-interactable");
            //console.log("guiInteractable: "+guiInteractable);
            var hoverActionFunctionName = guiInteractable.hoverAction;
            //console.log("hoverActionFunctionName: "+hoverActionFunctionName);
            // find object
            var hoverActionFunction = window[hoverActionFunctionName];
            //console.log("clickActionFunction: "+clickActionFunction);
            // is object a function?
            if (typeof hoverActionFunction === "function") hoverActionFunction(hoverPercent);
        }
    },
    remove: function remove() {},
    pause: function pause() {},
    play: function play() {},
    getOutputValue: function getOutputValue(hover) {
        var outputValueFunction = window[this.data.outputFunction];
        //console.log("clickActionFunction: "+clickActionFunction);
        // is object a function?
        if (typeof outputValueFunction === "function") {
            var outputValue = outputValueFunction(hover ? this.data.hoverPercent : this.data.percent);
            return outputValue;
        }
        return null;
    }
});

AFRAME.registerPrimitive('a-gui-vertical-slider', {
    defaultComponents: {
        'gui-interactable': {},
        'gui-item': { type: 'slider' },
        'gui-vertical-slider': {}
    },
    mappings: {
        'active-color': 'gui-vertical-slider.activeColor',
        'background-color': 'gui-vertical-slider.backgroundColor',
        'border-color': 'gui-vertical-slider.borderColor',
        'handle-color': 'gui-vertical-slider.handleColor',
        'handle-inner-depth': 'gui-vertical-slider.handleInnerDepth',
        'handle-inner-radius': 'gui-vertical-slider.handleInnerRadius',
        'handle-outer-depth': 'gui-vertical-slider.handleOuterDepth',
        'handle-outer-radius': 'gui-vertical-slider.handleOuterRadius',
        'height': 'gui-item.height',
        'hover-color': 'gui-vertical-slider.hoverColor',
        'hover-font-size': 'gui-vertical-slider.hoverFontSize',
        'hover-height': 'gui-vertical-slider.hoverHeight',
        'hover-margin': 'gui-vertical-slider.hoverMargin',
        'hover-percent': 'gui-vertical-slider.hoverPercent',
        'hover-width': 'gui-vertical-slider.hoverWidth',
        'key-code': 'gui-interactable.keyCode',
        'left-right-padding': 'gui-vertical-slider.leftRightPadding',
        'margin': 'gui-item.margin',
        'onclick': 'gui-interactable.clickAction',
        'onhover': 'gui-interactable.hoverAction',
        'opacity': 'gui-vertical-slider.opacity',
        'output-font-size': 'gui-vertical-slider.outputFontSize',
        'output-function': 'gui-vertical-slider.outputFunction',
        'output-height': 'gui-vertical-slider.outputHeight',
        'output-margin': 'gui-vertical-slider.outputMargin',
        'output-text-depth': 'gui-vertical-slider.outputTextDepth',
        'output-width': 'gui-vertical-slider.outputWidth',
        'percent': 'gui-vertical-slider.percent',
        'slider-bar-depth': 'gui-vertical-slider.sliderBarDepth',
        'slider-bar-width': 'gui-vertical-slider.sliderBarWidth',
        'top-bottom-padding': 'gui-vertical-slider.topBottomPadding',
        'width': 'gui-item.width'
    }
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Reset cursor
var cursor = document.querySelector("#cursor");
if (cursor) {
    cursor.addEventListener("stateremoved", function (evt) {
        if (evt.detail.state === 'cursor-fusing') {
            AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
            AFRAME.utils.entity.setComponentProperty(this, "material.color", key_white);
            AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        }
    });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.nearestPow2 = function (n) {
  Math.pow(2, Math.round(Math.log(n) / Math.log(2)));
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.normalYPosition = 1.5;
window.hiddenYPosition = 1000;

//default colors
window.key_orange = '#ed5b21'; // rgb(237, 91, 33) Light orange
window.key_orange_light = '#ef8c60'; // rgb (239, 140, 96) Extra Light Orange
window.key_grey = '#22252a'; // rgb(34, 37, 42) Standard grey
window.key_grey_dark = '#2c3037'; // rgb(44, 48, 55) Medium grey
window.key_grey_light = '#606876'; // rgb(96, 104, 118) Light grey
window.key_offwhite = '#d3d3d4'; // rgb(211, 211, 212) Extra Light grey
window.key_white = '#fff';

//icon font variables
window.icon_font = { "alert": '\uF101', "alert-circled": '\uF100', "android-add": '\uF2C7', "android-add-circle": '\uF359', "android-alarm-clock": '\uF35A', "android-alert": '\uF35B', "android-apps": '\uF35C', "android-archive": '\uF2C9', "android-arrow-back": '\uF2CA', "android-arrow-down": '\uF35D', "android-arrow-dropdown": '\uF35F', "android-arrow-dropdown-circle": '\uF35E', "android-arrow-dropleft": '\uF361', "android-arrow-dropleft-circle": '\uF360', "android-arrow-dropright": '\uF363', "android-arrow-dropright-circle": '\uF362', "android-arrow-dropup": '\uF365', "android-arrow-dropup-circle": '\uF364', "android-arrow-forward": '\uF30F', "android-arrow-up": '\uF366', "android-attach": '\uF367', "android-bar": '\uF368', "android-bicycle": '\uF369', "android-boat": '\uF36A', "android-bookmark": '\uF36B', "android-bulb": '\uF36C', "android-bus": '\uF36D', "android-calendar": '\uF2D1', "android-call": '\uF2D2', "android-camera": '\uF2D3', "android-cancel": '\uF36E', "android-car": '\uF36F', "android-cart": '\uF370', "android-chat": '\uF2D4', "android-checkbox": '\uF374', "android-checkbox-blank": '\uF371', "android-checkbox-outline": '\uF373', "android-checkbox-outline-blank": '\uF372', "android-checkmark-circle": '\uF375', "android-clipboard": '\uF376', "android-close": '\uF2D7', "android-cloud": '\uF37A', "android-cloud-circle": '\uF377', "android-cloud-done": '\uF378', "android-cloud-outline": '\uF379', "android-color-palette": '\uF37B', "android-compass": '\uF37C', "android-contact": '\uF2D8', "android-contacts": '\uF2D9', "android-contract": '\uF37D', "android-create": '\uF37E', "android-delete": '\uF37F', "android-desktop": '\uF380', "android-document": '\uF381', "android-done": '\uF383', "android-done-all": '\uF382', "android-download": '\uF2DD', "android-drafts": '\uF384', "android-exit": '\uF385', "android-expand": '\uF386', "android-favorite": '\uF388', "android-favorite-outline": '\uF387', "android-film": '\uF389', "android-folder": '\uF2E0', "android-folder-open": '\uF38A', "android-funnel": '\uF38B', "android-globe": '\uF38C', "android-hand": '\uF2E3', "android-hangout": '\uF38D', "android-happy": '\uF38E', "android-home": '\uF38F', "android-image": '\uF2E4', "android-laptop": '\uF390', "android-list": '\uF391', "android-locate": '\uF2E9', "android-lock": '\uF392', "android-mail": '\uF2EB', "android-map": '\uF393', "android-menu": '\uF394', "android-microphone": '\uF2EC', "android-microphone-off": '\uF395', "android-more-horizontal": '\uF396', "android-more-vertical": '\uF397', "android-navigate": '\uF398', "android-notifications": '\uF39B', "android-notifications-none": '\uF399', "android-notifications-off": '\uF39A', "android-open": '\uF39C', "android-options": '\uF39D', "android-people": '\uF39E', "android-person": '\uF3A0', "android-person-add": '\uF39F', "android-phone-landscape": '\uF3A1', "android-phone-portrait": '\uF3A2', "android-pin": '\uF3A3', "android-plane": '\uF3A4', "android-playstore": '\uF2F0', "android-print": '\uF3A5', "android-radio-button-off": '\uF3A6', "android-radio-button-on": '\uF3A7', "android-refresh": '\uF3A8', "android-remove": '\uF2F4', "android-remove-circle": '\uF3A9', "android-restaurant": '\uF3AA', "android-sad": '\uF3AB', "android-search": '\uF2F5', "android-send": '\uF2F6', "android-settings": '\uF2F7', "android-share": '\uF2F8', "android-share-alt": '\uF3AC', "android-star": '\uF2FC', "android-star-half": '\uF3AD', "android-star-outline": '\uF3AE', "android-stopwatch": '\uF2FD', "android-subway": '\uF3AF', "android-sunny": '\uF3B0', "android-sync": '\uF3B1', "android-textsms": '\uF3B2', "android-time": '\uF3B3', "android-train": '\uF3B4', "android-unlock": '\uF3B5', "android-upload": '\uF3B6', "android-volume-down": '\uF3B7', "android-volume-mute": '\uF3B8', "android-volume-off": '\uF3B9', "android-volume-up": '\uF3BA', "android-walk": '\uF3BB', "android-warning": '\uF3BC', "android-watch": '\uF3BD', "android-wifi": '\uF305', "aperture": '\uF313', "archive": '\uF102', "arrow-down-a": '\uF103', "arrow-down-b": '\uF104', "arrow-down-c": '\uF105', "arrow-expand": '\uF25E', "arrow-graph-down-left": '\uF25F', "arrow-graph-down-right": '\uF260', "arrow-graph-up-left": '\uF261', "arrow-graph-up-right": '\uF262', "arrow-left-a": '\uF106', "arrow-left-b": '\uF107', "arrow-left-c": '\uF108', "arrow-move": '\uF263', "arrow-resize": '\uF264', "arrow-return-left": '\uF265', "arrow-return-right": '\uF266', "arrow-right-a": '\uF109', "arrow-right-b": '\uF10A', "arrow-right-c": '\uF10B', "arrow-shrink": '\uF267', "arrow-swap": '\uF268', "arrow-up-a": '\uF10C', "arrow-up-b": '\uF10D', "arrow-up-c": '\uF10E', "asterisk": '\uF314', "at": '\uF10F', "backspace": '\uF3BF', "backspace-outline": '\uF3BE', "bag": '\uF110', "battery-charging": '\uF111', "battery-empty": '\uF112', "battery-full": '\uF113', "battery-half": '\uF114', "battery-low": '\uF115', "beaker": '\uF269', "beer": '\uF26A', "bluetooth": '\uF116', "bonfire": '\uF315', "bookmark": '\uF26B', "bowtie": '\uF3C0', "briefcase": '\uF26C', "bug": '\uF2BE', "calculator": '\uF26D', "calendar": '\uF117', "camera": '\uF118', "card": '\uF119', "cash": '\uF316', "chatbox": '\uF11B', "chatbox-working": '\uF11A', "chatboxes": '\uF11C', "chatbubble": '\uF11E', "chatbubble-working": '\uF11D', "chatbubbles": '\uF11F', "checkmark": '\uF122', "checkmark-circled": '\uF120', "checkmark-round": '\uF121', "chevron-down": '\uF123', "chevron-left": '\uF124', "chevron-right": '\uF125', "chevron-up": '\uF126', "clipboard": '\uF127', "clock": '\uF26E', "close": '\uF12A', "close-circled": '\uF128', "close-round": '\uF129', "closed-captioning": '\uF317', "cloud": '\uF12B', "code": '\uF271', "code-download": '\uF26F', "code-working": '\uF270', "coffee": '\uF272', "compass": '\uF273', "compose": '\uF12C', "connection-bars": '\uF274', "contrast": '\uF275', "crop": '\uF3C1', "cube": '\uF318', "disc": '\uF12D', "document": '\uF12F', "document-text": '\uF12E', "drag": '\uF130', "earth": '\uF276', "easel": '\uF3C2', "edit": '\uF2BF', "egg": '\uF277', "eject": '\uF131', "email": '\uF132', "email-unread": '\uF3C3', "erlenmeyer-flask": '\uF3C5', "erlenmeyer-flask-bubbles": '\uF3C4', "eye": '\uF133', "eye-disabled": '\uF306', "female": '\uF278', "filing": '\uF134', "film-marker": '\uF135', "fireball": '\uF319', "flag": '\uF279', "flame": '\uF31A', "flash": '\uF137', "flash-off": '\uF136', "folder": '\uF139', "fork": '\uF27A', "fork-repo": '\uF2C0', "forward": '\uF13A', "funnel": '\uF31B', "gear-a": '\uF13D', "gear-b": '\uF13E', "grid": '\uF13F', "hammer": '\uF27B', "happy": '\uF31C', "happy-outline": '\uF3C6', "headphone": '\uF140', "heart": '\uF141', "heart-broken": '\uF31D', "help": '\uF143', "help-buoy": '\uF27C', "help-circled": '\uF142', "home": '\uF144', "icecream": '\uF27D', "image": '\uF147', "images": '\uF148', "information": '\uF14A', "information-circled": '\uF149', "ionic": '\uF14B', "ios-alarm": '\uF3C8', "ios-alarm-outline": '\uF3C7', "ios-albums": '\uF3CA', "ios-albums-outline": '\uF3C9', "ios-americanfootball": '\uF3CC', "ios-americanfootball-outline": '\uF3CB', "ios-analytics": '\uF3CE', "ios-analytics-outline": '\uF3CD', "ios-arrow-back": '\uF3CF', "ios-arrow-down": '\uF3D0', "ios-arrow-forward": '\uF3D1', "ios-arrow-left": '\uF3D2', "ios-arrow-right": '\uF3D3', "ios-arrow-thin-down": '\uF3D4', "ios-arrow-thin-left": '\uF3D5', "ios-arrow-thin-right": '\uF3D6', "ios-arrow-thin-up": '\uF3D7', "ios-arrow-up": '\uF3D8', "ios-at": '\uF3DA', "ios-at-outline": '\uF3D9', "ios-barcode": '\uF3DC', "ios-barcode-outline": '\uF3DB', "ios-baseball": '\uF3DE', "ios-baseball-outline": '\uF3DD', "ios-basketball": '\uF3E0', "ios-basketball-outline": '\uF3DF', "ios-bell": '\uF3E2', "ios-bell-outline": '\uF3E1', "ios-body": '\uF3E4', "ios-body-outline": '\uF3E3', "ios-bolt": '\uF3E6', "ios-bolt-outline": '\uF3E5', "ios-book": '\uF3E8', "ios-book-outline": '\uF3E7', "ios-bookmarks": '\uF3EA', "ios-bookmarks-outline": '\uF3E9', "ios-box": '\uF3EC', "ios-box-outline": '\uF3EB', "ios-briefcase": '\uF3EE', "ios-briefcase-outline": '\uF3ED', "ios-browsers": '\uF3F0', "ios-browsers-outline": '\uF3EF', "ios-calculator": '\uF3F2', "ios-calculator-outline": '\uF3F1', "ios-calendar": '\uF3F4', "ios-calendar-outline": '\uF3F3', "ios-camera": '\uF3F6', "ios-camera-outline": '\uF3F5', "ios-cart": '\uF3F8', "ios-cart-outline": '\uF3F7', "ios-chatboxes": '\uF3FA', "ios-chatboxes-outline": '\uF3F9', "ios-chatbubble": '\uF3FC', "ios-chatbubble-outline": '\uF3FB', "ios-checkmark": '\uF3FF', "ios-checkmark-empty": '\uF3FD', "ios-checkmark-outline": '\uF3FE', "ios-circle-filled": '\uF400', "ios-circle-outline": '\uF401', "ios-clock": '\uF403', "ios-clock-outline": '\uF402', "ios-close": '\uF406', "ios-close-empty": '\uF404', "ios-close-outline": '\uF405', "ios-cloud": '\uF40C', "ios-cloud-download": '\uF408', "ios-cloud-download-outline": '\uF407', "ios-cloud-outline": '\uF409', "ios-cloud-upload": '\uF40B', "ios-cloud-upload-outline": '\uF40A', "ios-cloudy": '\uF410', "ios-cloudy-night": '\uF40E', "ios-cloudy-night-outline": '\uF40D', "ios-cloudy-outline": '\uF40F', "ios-cog": '\uF412', "ios-cog-outline": '\uF411', "ios-color-filter": '\uF414', "ios-color-filter-outline": '\uF413', "ios-color-wand": '\uF416', "ios-color-wand-outline": '\uF415', "ios-compose": '\uF418', "ios-compose-outline": '\uF417', "ios-contact": '\uF41A', "ios-contact-outline": '\uF419', "ios-copy": '\uF41C', "ios-copy-outline": '\uF41B', "ios-crop": '\uF41E', "ios-crop-strong": '\uF41D', "ios-download": '\uF420', "ios-download-outline": '\uF41F', "ios-drag": '\uF421', "ios-email": '\uF423', "ios-email-outline": '\uF422', "ios-eye": '\uF425', "ios-eye-outline": '\uF424', "ios-fastforward": '\uF427', "ios-fastforward-outline": '\uF426', "ios-filing": '\uF429', "ios-filing-outline": '\uF428', "ios-film": '\uF42B', "ios-film-outline": '\uF42A', "ios-flag": '\uF42D', "ios-flag-outline": '\uF42C', "ios-flame": '\uF42F', "ios-flame-outline": '\uF42E', "ios-flask": '\uF431', "ios-flask-outline": '\uF430', "ios-flower": '\uF433', "ios-flower-outline": '\uF432', "ios-folder": '\uF435', "ios-folder-outline": '\uF434', "ios-football": '\uF437', "ios-football-outline": '\uF436', "ios-game-controller-a": '\uF439', "ios-game-controller-a-outline": '\uF438', "ios-game-controller-b": '\uF43B', "ios-game-controller-b-outline": '\uF43A', "ios-gear": '\uF43D', "ios-gear-outline": '\uF43C', "ios-glasses": '\uF43F', "ios-glasses-outline": '\uF43E', "ios-grid-view": '\uF441', "ios-grid-view-outline": '\uF440', "ios-heart": '\uF443', "ios-heart-outline": '\uF442', "ios-help": '\uF446', "ios-help-empty": '\uF444', "ios-help-outline": '\uF445', "ios-home": '\uF448', "ios-home-outline": '\uF447', "ios-infinite": '\uF44A', "ios-infinite-outline": '\uF449', "ios-information": '\uF44D', "ios-information-empty": '\uF44B', "ios-information-outline": '\uF44C', "ios-ionic-outline": '\uF44E', "ios-keypad": '\uF450', "ios-keypad-outline": '\uF44F', "ios-lightbulb": '\uF452', "ios-lightbulb-outline": '\uF451', "ios-list": '\uF454', "ios-list-outline": '\uF453', "ios-location": '\uF456', "ios-location-outline": '\uF455', "ios-locked": '\uF458', "ios-locked-outline": '\uF457', "ios-loop": '\uF45A', "ios-loop-strong": '\uF459', "ios-medical": '\uF45C', "ios-medical-outline": '\uF45B', "ios-medkit": '\uF45E', "ios-medkit-outline": '\uF45D', "ios-mic": '\uF461', "ios-mic-off": '\uF45F', "ios-mic-outline": '\uF460', "ios-minus": '\uF464', "ios-minus-empty": '\uF462', "ios-minus-outline": '\uF463', "ios-monitor": '\uF466', "ios-monitor-outline": '\uF465', "ios-moon": '\uF468', "ios-moon-outline": '\uF467', "ios-more": '\uF46A', "ios-more-outline": '\uF469', "ios-musical-note": '\uF46B', "ios-musical-notes": '\uF46C', "ios-navigate": '\uF46E', "ios-navigate-outline": '\uF46D', "ios-nutrition": '\uF470', "ios-nutrition-outline": '\uF46F', "ios-paper": '\uF472', "ios-paper-outline": '\uF471', "ios-paperplane": '\uF474', "ios-paperplane-outline": '\uF473', "ios-partlysunny": '\uF476', "ios-partlysunny-outline": '\uF475', "ios-pause": '\uF478', "ios-pause-outline": '\uF477', "ios-paw": '\uF47A', "ios-paw-outline": '\uF479', "ios-people": '\uF47C', "ios-people-outline": '\uF47B', "ios-person": '\uF47E', "ios-person-outline": '\uF47D', "ios-personadd": '\uF480', "ios-personadd-outline": '\uF47F', "ios-photos": '\uF482', "ios-photos-outline": '\uF481', "ios-pie": '\uF484', "ios-pie-outline": '\uF483', "ios-pint": '\uF486', "ios-pint-outline": '\uF485', "ios-play": '\uF488', "ios-play-outline": '\uF487', "ios-plus": '\uF48B', "ios-plus-empty": '\uF489', "ios-plus-outline": '\uF48A', "ios-pricetag": '\uF48D', "ios-pricetag-outline": '\uF48C', "ios-pricetags": '\uF48F', "ios-pricetags-outline": '\uF48E', "ios-printer": '\uF491', "ios-printer-outline": '\uF490', "ios-pulse": '\uF493', "ios-pulse-strong": '\uF492', "ios-rainy": '\uF495', "ios-rainy-outline": '\uF494', "ios-recording": '\uF497', "ios-recording-outline": '\uF496', "ios-redo": '\uF499', "ios-redo-outline": '\uF498', "ios-refresh": '\uF49C', "ios-refresh-empty": '\uF49A', "ios-refresh-outline": '\uF49B', "ios-reload": '\uF49D', "ios-reverse-camera": '\uF49F', "ios-reverse-camera-outline": '\uF49E', "ios-rewind": '\uF4A1', "ios-rewind-outline": '\uF4A0', "ios-rose": '\uF4A3', "ios-rose-outline": '\uF4A2', "ios-search": '\uF4A5', "ios-search-strong": '\uF4A4', "ios-settings": '\uF4A7', "ios-settings-strong": '\uF4A6', "ios-shuffle": '\uF4A9', "ios-shuffle-strong": '\uF4A8', "ios-skipbackward": '\uF4AB', "ios-skipbackward-outline": '\uF4AA', "ios-skipforward": '\uF4AD', "ios-skipforward-outline": '\uF4AC', "ios-snowy": '\uF4AE', "ios-speedometer": '\uF4B0', "ios-speedometer-outline": '\uF4AF', "ios-star": '\uF4B3', "ios-star-half": '\uF4B1', "ios-star-outline": '\uF4B2', "ios-stopwatch": '\uF4B5', "ios-stopwatch-outline": '\uF4B4', "ios-sunny": '\uF4B7', "ios-sunny-outline": '\uF4B6', "ios-telephone": '\uF4B9', "ios-telephone-outline": '\uF4B8', "ios-tennisball": '\uF4BB', "ios-tennisball-outline": '\uF4BA', "ios-thunderstorm": '\uF4BD', "ios-thunderstorm-outline": '\uF4BC', "ios-time": '\uF4BF', "ios-time-outline": '\uF4BE', "ios-timer": '\uF4C1', "ios-timer-outline": '\uF4C0', "ios-toggle": '\uF4C3', "ios-toggle-outline": '\uF4C2', "ios-trash": '\uF4C5', "ios-trash-outline": '\uF4C4', "ios-undo": '\uF4C7', "ios-undo-outline": '\uF4C6', "ios-unlocked": '\uF4C9', "ios-unlocked-outline": '\uF4C8', "ios-upload": '\uF4CB', "ios-upload-outline": '\uF4CA', "ios-videocam": '\uF4CD', "ios-videocam-outline": '\uF4CC', "ios-volume-high": '\uF4CE', "ios-volume-low": '\uF4CF', "ios-wineglass": '\uF4D1', "ios-wineglass-outline": '\uF4D0', "ios-world": '\uF4D3', "ios-world-outline": '\uF4D2', "ipad": '\uF1F9', "iphone": '\uF1FA', "ipod": '\uF1FB', "jet": '\uF295', "key": '\uF296', "knife": '\uF297', "laptop": '\uF1FC', "leaf": '\uF1FD', "levels": '\uF298', "lightbulb": '\uF299', "link": '\uF1FE', "load-a": '\uF29A', "load-b": '\uF29B', "load-c": '\uF29C', "load-d": '\uF29D', "location": '\uF1FF', "lock-combination": '\uF4D4', "locked": '\uF200', "log-in": '\uF29E', "log-out": '\uF29F', "loop": '\uF201', "magnet": '\uF2A0', "male": '\uF2A1', "man": '\uF202', "map": '\uF203', "medkit": '\uF2A2', "merge": '\uF33F', "mic-a": '\uF204', "mic-b": '\uF205', "mic-c": '\uF206', "minus": '\uF209', "minus-circled": '\uF207', "minus-round": '\uF208', "model-s": '\uF2C1', "monitor": '\uF20A', "more": '\uF20B', "mouse": '\uF340', "music-note": '\uF20C', "navicon": '\uF20E', "navicon-round": '\uF20D', "navigate": '\uF2A3', "network": '\uF341', "no-smoking": '\uF2C2', "nuclear": '\uF2A4', "outlet": '\uF342', "paintbrush": '\uF4D5', "paintbucket": '\uF4D6', "paper-airplane": '\uF2C3', "paperclip": '\uF20F', "pause": '\uF210', "person": '\uF213', "person-add": '\uF211', "person-stalker": '\uF212', "pie-graph": '\uF2A5', "pin": '\uF2A6', "pinpoint": '\uF2A7', "pizza": '\uF2A8', "plane": '\uF214', "planet": '\uF343', "play": '\uF215', "playstation": '\uF30A', "plus": '\uF218', "plus-circled": '\uF216', "plus-round": '\uF217', "podium": '\uF344', "pound": '\uF219', "power": '\uF2A9', "pricetag": '\uF2AA', "pricetags": '\uF2AB', "printer": '\uF21A', "pull-request": '\uF345', "qr-scanner": '\uF346', "quote": '\uF347', "radio-waves": '\uF2AC', "record": '\uF21B', "refresh": '\uF21C', "reply": '\uF21E', "reply-all": '\uF21D', "ribbon-a": '\uF348', "ribbon-b": '\uF349', "sad": '\uF34A', "sad-outline": '\uF4D7', "scissors": '\uF34B', "search": '\uF21F', "settings": '\uF2AD', "share": '\uF220', "shuffle": '\uF221', "skip-backward": '\uF222', "skip-forward": '\uF223', "social-android": '\uF225', "social-android-outline": '\uF224', "social-angular": '\uF4D9', "social-angular-outline": '\uF4D8', "social-apple": '\uF227', "social-apple-outline": '\uF226', "social-bitcoin": '\uF2AF', "social-bitcoin-outline": '\uF2AE', "social-buffer": '\uF229', "social-buffer-outline": '\uF228', "social-chrome": '\uF4DB', "social-chrome-outline": '\uF4DA', "social-codepen": '\uF4DD', "social-codepen-outline": '\uF4DC', "social-css3": '\uF4DF', "social-css3-outline": '\uF4DE', "social-designernews": '\uF22B', "social-designernews-outline": '\uF22A', "social-dribbble": '\uF22D', "social-dribbble-outline": '\uF22C', "social-dropbox": '\uF22F', "social-dropbox-outline": '\uF22E', "social-euro": '\uF4E1', "social-euro-outline": '\uF4E0', "social-facebook": '\uF231', "social-facebook-outline": '\uF230', "social-foursquare": '\uF34D', "social-foursquare-outline": '\uF34C', "social-freebsd-devil": '\uF2C4', "social-github": '\uF233', "social-github-outline": '\uF232', "social-google": '\uF34F', "social-google-outline": '\uF34E', "social-googleplus": '\uF235', "social-googleplus-outline": '\uF234', "social-hackernews": '\uF237', "social-hackernews-outline": '\uF236', "social-html5": '\uF4E3', "social-html5-outline": '\uF4E2', "social-instagram": '\uF351', "social-instagram-outline": '\uF350', "social-javascript": '\uF4E5', "social-javascript-outline": '\uF4E4', "social-linkedin": '\uF239', "social-linkedin-outline": '\uF238', "social-markdown": '\uF4E6', "social-nodejs": '\uF4E7', "social-octocat": '\uF4E8', "social-pinterest": '\uF2B1', "social-pinterest-outline": '\uF2B0', "social-python": '\uF4E9', "social-reddit": '\uF23B', "social-reddit-outline": '\uF23A', "social-rss": '\uF23D', "social-rss-outline": '\uF23C', "social-sass": '\uF4EA', "social-skype": '\uF23F', "social-skype-outline": '\uF23E', "social-snapchat": '\uF4EC', "social-snapchat-outline": '\uF4EB', "social-tumblr": '\uF241', "social-tumblr-outline": '\uF240', "social-tux": '\uF2C5', "social-twitch": '\uF4EE', "social-twitch-outline": '\uF4ED', "social-twitter": '\uF243', "social-twitter-outline": '\uF242', "social-usd": '\uF353', "social-usd-outline": '\uF352', "social-vimeo": '\uF245', "social-vimeo-outline": '\uF244', "social-whatsapp": '\uF4F0', "social-whatsapp-outline": '\uF4EF', "social-windows": '\uF247', "social-windows-outline": '\uF246', "social-wordpress": '\uF249', "social-wordpress-outline": '\uF248', "social-yahoo": '\uF24B', "social-yahoo-outline": '\uF24A', "social-yen": '\uF4F2', "social-yen-outline": '\uF4F1', "social-youtube": '\uF24D', "social-youtube-outline": '\uF24C', "soup-can": '\uF4F4', "soup-can-outline": '\uF4F3', "speakerphone": '\uF2B2', "speedometer": '\uF2B3', "spoon": '\uF2B4', "star": '\uF24E', "stats-bars": '\uF2B5', "steam": '\uF30B', "stop": '\uF24F', "thermometer": '\uF2B6', "thumbsdown": '\uF250', "thumbsup": '\uF251', "toggle": '\uF355', "toggle-filled": '\uF354', "transgender": '\uF4F5', "trash-a": '\uF252', "trash-b": '\uF253', "trophy": '\uF356', "tshirt": '\uF4F7', "tshirt-outline": '\uF4F6', "umbrella": '\uF2B7', "university": '\uF357', "unlocked": '\uF254', "upload": '\uF255', "usb": '\uF2B8', "videocamera": '\uF256', "volume-high": '\uF257', "volume-low": '\uF258', "volume-medium": '\uF259', "volume-mute": '\uF25A', "wand": '\uF358', "waterdrop": '\uF25B', "wifi": '\uF25C', "wineglass": '\uF2B9', "woman": '\uF25D', "wrench": '\uF2BA', "xbox": '\uF30C' };

window.getUniqueId = function (stringPrefix) {
	var datestr = new Date().getTime().toString();
	var randomstr = Math.random().toString().replace('.', '');
	return stringPrefix + '_' + datestr + randomstr;
};

window.getTextWidth = function (text, font) {
	// re-use canvas object for better performance
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
};

window.drawText = function (ctx, canvas, text, fontSize, fontFamily, color) {
	var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
	var align = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'center';
	var baseline = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 'middle';
	var fontWeight = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 'normal';

	ctx.font = fontWeight + ' ' + fontSize + ' ' + fontFamily;
	ctx.fillStyle = color;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;
	ctx.scale(scale, scale);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var textString = text + '';
	if (textString.match("char#")) {
		var char = textString.substring(textString.indexOf('#') + 1);
		if (align == 'left') {
			ctx.fillText(String.fromCharCode(char), canvas.height / 8, canvas.height / 2); // position x, y
		} else {
			ctx.fillText(String.fromCharCode(char), canvas.width / 2, canvas.height / 2); // position x, y
		}
	} else {
		if (align == 'left') {
			ctx.fillText(textString, canvas.height / 8, canvas.height / 2); // position x, y
		} else {
			ctx.fillText(textString, canvas.width / 2, canvas.height / 2); // position x, y
		}
	}
};

window.drawIcon = function (ctx, canvas, iconFontSize, icon, color) {
	var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

	ctx.font = iconFontSize + ' Ionicons';
	ctx.fillStyle = color;
	ctx.textAlign = "center";
	ctx.textBaseline = 'middle';
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.scale(scale, scale);
	if (icon_font[icon]) {
		ctx.fillText(icon_font[icon], canvas.width / 2, canvas.height / 2);
	} else {
		ctx.fillText('?', canvas.width / 2, canvas.height / 2);
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (THREE, aframe) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && 'default' in e ? e : { 'default': e };
  }

  function _interopNamespace(e) {
    if (e && e.__esModule) {
      return e;
    } else {
      var n = Object.create(null);
      if (e) {
        Object.keys(e).forEach(function (k) {
          if (k !== 'default') {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function get() {
                return e[k];
              }
            });
          }
        });
      }
      n['default'] = e;
      return Object.freeze(n);
    }
  }

  var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);
  var aframe__default = /*#__PURE__*/_interopDefaultLegacy(aframe);

  /**
   * Lightweight thenable implementation that is entirely self-contained within a single
   * function with no external dependencies so it can be easily shipped across to a WorkerModule.
   *
   * This implementation conforms fully to the Promises/A+ spec so it can safely interoperate
   * with other thenable implementations. https://github.com/promises-aplus/promises-spec
   *
   * *However*, it is _not_ a full implementation of ES2015 Promises, e.g. it does not
   * have the same constructor signature and does not expose a `catch` method or the static
   * `resolve`/`reject`/`all`/`race` initializer methods. If you need to hand a Thenable
   * instance off to consuming code that may expect a true Promise, you'll want to wrap it
   * in a native-or-polyfilled Promise first.
   *
   * (Why yet another Promises/A+ implementation? Great question. We needed a polyfill-like
   * thing that was (a) wrapped in a single function for easy serialization across to a Worker,
   * and (b) was as small as possible -- at ~900B minified (~500B gzipped) this is the smallest
   * implementation I've found. And also, exercises like this are challenging and fun.)
   */
  function BespokeThenable() {
    var state = 0; // 0=pending, 1=fulfilled, -1=rejected
    var queue = [];
    var value;
    var scheduled = 0;
    var completeCalled = 0;

    function then(onResolve, onReject) {
      var nextThenable = BespokeThenable();

      function handleNext() {
        var cb = state > 0 ? onResolve : onReject;
        if (isFn(cb)) {
          try {
            var result = cb(value);
            if (result === nextThenable) {
              recursiveError();
            }
            var resultThen = getThenableThen(result);
            if (resultThen) {
              resultThen.call(result, nextThenable.resolve, nextThenable.reject);
            } else {
              nextThenable.resolve(result);
            }
          } catch (err) {
            nextThenable.reject(err);
          }
        } else {
          nextThenable[state > 0 ? 'resolve' : 'reject'](value);
        }
      }

      queue.push(handleNext);
      if (state) {
        scheduleQueueFlush();
      }
      return nextThenable;
    }

    var resolve = oneTime(function (val) {
      if (!completeCalled) {
        complete(1, val);
      }
    });

    var reject = oneTime(function (reason) {
      if (!completeCalled) {
        complete(-1, reason);
      }
    });

    function complete(st, val) {
      completeCalled++;
      var ignoreThrow = 0;
      try {
        if (val === thenableObj) {
          recursiveError();
        }
        var valThen = st > 0 && getThenableThen(val);
        if (valThen) {
          valThen.call(val, oneTime(function (v) {
            ignoreThrow++;
            complete(1, v);
          }), oneTime(function (v) {
            ignoreThrow++;
            complete(-1, v);
          }));
        } else {
          state = st;
          value = val;
          scheduleQueueFlush();
        }
      } catch (e) {
        if (!state && !ignoreThrow) {
          complete(-1, e);
        }
      }
    }

    function scheduleQueueFlush() {
      if (!scheduled) {
        setTimeout(flushQueue, 0); //TODO setImmediate or postMessage approach if available?
        scheduled = 1;
      }
    }

    function flushQueue() {
      var q = queue;
      scheduled = 0;
      queue = [];
      q.forEach(callIt);
    }

    function callIt(fn) {
      fn();
    }

    function getThenableThen(val) {
      var valThen = val && (isFn(val) || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') && val.then;
      return isFn(valThen) && valThen;
    }

    function oneTime(fn) {
      var called = 0;
      return function () {
        var args = [],
            len = arguments.length;
        while (len--) {
          args[len] = arguments[len];
        }if (!called++) {
          fn.apply(this, args);
        }
      };
    }

    function recursiveError() {
      throw new TypeError('Chaining cycle detected');
    }

    var isFn = function isFn(v) {
      return typeof v === 'function';
    };

    var thenableObj = {
      then: then,
      resolve: resolve,
      reject: reject
    };
    return thenableObj;
  }

  /**
   * Thenable implementation that uses a native Promise under the covers. This implementation
   * is preferred if Promise is available, for better performance and dev tools integration.
   * @constructor
   */
  function NativePromiseThenable() {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
      resolve = res;
      reject = rej;
    });
    return {
      then: promise.then.bind(promise),
      resolve: resolve,
      reject: reject
    };
  }

  /**
   * Promise.all() impl:
   */
  BespokeThenable.all = NativePromiseThenable.all = function (items) {
    var resultCount = 0;
    var results = [];
    var out = DefaultThenable();
    if (items.length === 0) {
      out.resolve([]);
    } else {
      items.forEach(function (item, i) {
        var itemThenable = DefaultThenable();
        itemThenable.resolve(item);
        itemThenable.then(function (res) {
          resultCount++;
          results[i] = res;
          if (resultCount === items.length) {
            out.resolve(results);
          }
        }, out.reject);
      });
    }
    return out;
  };

  /**
   * Choose the best Thenable implementation and export it as the default.
   */
  var DefaultThenable = typeof Promise === 'function' ? NativePromiseThenable : BespokeThenable;

  /**
   * Main content for the worker that handles the loading and execution of
   * modules within it.
   */
  function workerBootstrap() {
    var modules = Object.create(null);

    // Handle messages for registering a module
    function registerModule(ref, callback) {
      var id = ref.id;
      var name = ref.name;
      var dependencies = ref.dependencies;if (dependencies === void 0) dependencies = [];
      var init = ref.init;if (init === void 0) init = function init() {};
      var getTransferables = ref.getTransferables;if (getTransferables === void 0) getTransferables = null;

      // Only register once
      if (modules[id]) {
        return;
      }

      try {
        // If any dependencies are modules, ensure they're registered and grab their value
        dependencies = dependencies.map(function (dep) {
          if (dep && dep.isWorkerModule) {
            registerModule(dep, function (depResult) {
              if (depResult instanceof Error) {
                throw depResult;
              }
            });
            dep = modules[dep.id].value;
          }
          return dep;
        });

        // Rehydrate functions
        init = rehydrate("<" + name + ">.init", init);
        if (getTransferables) {
          getTransferables = rehydrate("<" + name + ">.getTransferables", getTransferables);
        }

        // Initialize the module and store its value
        var value = null;
        if (typeof init === 'function') {
          value = init.apply(void 0, dependencies);
        } else {
          console.error('worker module init function failed to rehydrate');
        }
        modules[id] = {
          id: id,
          value: value,
          getTransferables: getTransferables
        };
        callback(value);
      } catch (err) {
        if (!(err && err.noLog)) {
          console.error(err);
        }
        callback(err);
      }
    }

    // Handle messages for calling a registered module's result function
    function callModule(ref, callback) {
      var ref$1;

      var id = ref.id;
      var args = ref.args;
      if (!modules[id] || typeof modules[id].value !== 'function') {
        callback(new Error("Worker module " + id + ": not found or its 'init' did not return a function"));
      }
      try {
        var result = (ref$1 = modules[id]).value.apply(ref$1, args);
        if (result && typeof result.then === 'function') {
          result.then(handleResult, function (rej) {
            return callback(rej instanceof Error ? rej : new Error('' + rej));
          });
        } else {
          handleResult(result);
        }
      } catch (err) {
        callback(err);
      }
      function handleResult(result) {
        try {
          var tx = modules[id].getTransferables && modules[id].getTransferables(result);
          if (!tx || !Array.isArray(tx) || !tx.length) {
            tx = undefined; //postMessage is very picky about not passing null or empty transferables
          }
          callback(result, tx);
        } catch (err) {
          console.error(err);
          callback(err);
        }
      }
    }

    function rehydrate(name, str) {
      var result = void 0;
      self.troikaDefine = function (r) {
        return result = r;
      };
      var url = URL.createObjectURL(new Blob(["/** " + name.replace(/\*/g, '') + " **/\n\ntroikaDefine(\n" + str + "\n)"], { type: 'application/javascript' }));
      try {
        importScripts(url);
      } catch (err) {
        console.error(err);
      }
      URL.revokeObjectURL(url);
      delete self.troikaDefine;
      return result;
    }

    // Handler for all messages within the worker
    self.addEventListener('message', function (e) {
      var ref = e.data;
      var messageId = ref.messageId;
      var action = ref.action;
      var data = ref.data;
      try {
        // Module registration
        if (action === 'registerModule') {
          registerModule(data, function (result) {
            if (result instanceof Error) {
              postMessage({
                messageId: messageId,
                success: false,
                error: result.message
              });
            } else {
              postMessage({
                messageId: messageId,
                success: true,
                result: { isCallable: typeof result === 'function' }
              });
            }
          });
        }
        // Invocation
        if (action === 'callModule') {
          callModule(data, function (result, transferables) {
            if (result instanceof Error) {
              postMessage({
                messageId: messageId,
                success: false,
                error: result.message
              });
            } else {
              postMessage({
                messageId: messageId,
                success: true,
                result: result
              }, transferables || undefined);
            }
          });
        }
      } catch (err) {
        postMessage({
          messageId: messageId,
          success: false,
          error: err.stack
        });
      }
    });
  }

  /**
   * Fallback for `defineWorkerModule` that behaves identically but runs in the main
   * thread, for when the execution environment doesn't support web workers or they
   * are disallowed due to e.g. CSP security restrictions.
   */
  function defineMainThreadModule(options) {
    var moduleFunc = function moduleFunc() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      }return moduleFunc._getInitResult().then(function (initResult) {
        if (typeof initResult === 'function') {
          return initResult.apply(void 0, args);
        } else {
          throw new Error('Worker module function was called but `init` did not return a callable function');
        }
      });
    };
    moduleFunc._getInitResult = function () {
      // We can ignore getTransferables in main thread. TODO workerId?
      var dependencies = options.dependencies;
      var init = options.init;

      // Resolve dependencies
      dependencies = Array.isArray(dependencies) ? dependencies.map(function (dep) {
        return dep && dep._getInitResult ? dep._getInitResult() : dep;
      }) : [];

      // Invoke init with the resolved dependencies
      var initThenable = DefaultThenable.all(dependencies).then(function (deps) {
        return init.apply(null, deps);
      });

      // Cache the resolved promise for subsequent calls
      moduleFunc._getInitResult = function () {
        return initThenable;
      };

      return initThenable;
    };
    return moduleFunc;
  }

  var _supportsWorkers = function supportsWorkers() {
    var supported = false;

    // Only attempt worker initialization in browsers; elsewhere it would just be
    // noise e.g. loading into a Node environment for SSR.
    if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
      try {
        // TODO additional checks for things like importScripts within the worker?
        //  Would need to be an async check.
        var worker = new Worker(URL.createObjectURL(new Blob([''], { type: 'application/javascript' })));
        worker.terminate();
        supported = true;
      } catch (err) {
        if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') ;else {
          console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + err.message + "]");
        }
      }
    }

    // Cached result
    _supportsWorkers = function supportsWorkers() {
      return supported;
    };
    return supported;
  };

  var _workerModuleId = 0;
  var _messageId = 0;
  var _allowInitAsString = false;
  var workers = Object.create(null);
  var openRequests = /*#__PURE__*/function () {
    var obj = Object.create(null);
    obj._count = 0;
    return obj;
  }();

  /**
   * Define a module of code that will be executed with a web worker. This provides a simple
   * interface for moving chunks of logic off the main thread, and managing their dependencies
   * among one another.
   *
   * @param {object} options
   * @param {function} options.init - The main function that initializes the module. This will be run
   *        within the worker, and will be passed the resolved dependencies as arguments. Its
   *        return value becomes the module's content, which can then be used by other modules
   *        that depend on it. This function can perform any logic using those dependencies, but
   *        must not depend on anything from its parent closures.
   * @param {array} [options.dependencies] - Provides any dependencies required by the init function:
   *        - Primitives like strings, numbers, booleans
   *        - Raw functions; these will be stringified and rehydrated within the worker so they
   *          must not depend on anything from their parent closures
   *        - Other worker modules; these will be resolved within the worker, and therefore modules
   *          that provide functions can be called without having to cross the worker/main thread
   *          boundary.
   * @param {function} [options.getTransferables] - An optional function that will be run in the worker
   *        just before posting the response value from a module call back to the main thread.
   *        It will be passed that response value, and if it returns an array then that will be
   *        used as the "transferables" parameter to `postMessage`. Use this if there are values
   *        in the response that can/should be transfered rather than cloned.
   * @param {string} [options.name] - A descriptive name for this module; this can be useful for
   *        debugging but is not currently used for anything else.
   * @param {string} [options.workerId] - By default all modules will run in the same dedicated worker,
   *        but if you want to use multiple workers you can pass a `workerId` to indicate a specific
   *        worker to spawn. Note that each worker is completely standalone and no data or state will
   *        be shared between them. If a worker module is used as a dependency by worker modules
   *        using different `workerId`s, then that dependency will be re-registered in each worker.
   * @return {function(...[*]): {then}}
   */
  function defineWorkerModule(options) {
    if ((!options || typeof options.init !== 'function') && !_allowInitAsString) {
      throw new Error('requires `options.init` function');
    }
    var dependencies = options.dependencies;
    var init = options.init;
    var getTransferables = options.getTransferables;
    var workerId = options.workerId;

    if (!_supportsWorkers()) {
      return defineMainThreadModule(options);
    }

    if (workerId == null) {
      workerId = '#default';
    }
    var id = "workerModule" + ++_workerModuleId;
    var name = options.name || id;
    var registrationThenable = null;

    dependencies = dependencies && dependencies.map(function (dep) {
      // Wrap raw functions as worker modules with no dependencies
      if (typeof dep === 'function' && !dep.workerModuleData) {
        _allowInitAsString = true;
        dep = defineWorkerModule({
          workerId: workerId,
          name: "<" + name + "> function dependency: " + dep.name,
          init: "function(){return (\n" + stringifyFunction(dep) + "\n)}"
        });
        _allowInitAsString = false;
      }
      // Grab postable data for worker modules
      if (dep && dep.workerModuleData) {
        dep = dep.workerModuleData;
      }
      return dep;
    });

    function moduleFunc() {
      var args = [],
          len = arguments.length;
      while (len--) {
        args[len] = arguments[len];
      } // Register this module if needed
      if (!registrationThenable) {
        registrationThenable = callWorker(workerId, 'registerModule', moduleFunc.workerModuleData);
      }

      // Invoke the module, returning a thenable
      return registrationThenable.then(function (ref) {
        var isCallable = ref.isCallable;

        if (isCallable) {
          return callWorker(workerId, 'callModule', { id: id, args: args });
        } else {
          throw new Error('Worker module function was called but `init` did not return a callable function');
        }
      });
    }
    moduleFunc.workerModuleData = {
      isWorkerModule: true,
      id: id,
      name: name,
      dependencies: dependencies,
      init: stringifyFunction(init),
      getTransferables: getTransferables && stringifyFunction(getTransferables)
    };
    return moduleFunc;
  }

  /**
   * Stringifies a function into a form that can be deserialized in the worker
   * @param fn
   */
  function stringifyFunction(fn) {
    var str = fn.toString();
    // If it was defined in object method/property format, it needs to be modified
    if (!/^function/.test(str) && /^\w+\s*\(/.test(str)) {
      str = 'function ' + str;
    }
    return str;
  }

  function getWorker(workerId) {
    var worker = workers[workerId];
    if (!worker) {
      // Bootstrap the worker's content
      var bootstrap = stringifyFunction(workerBootstrap);

      // Create the worker from the bootstrap function content
      worker = workers[workerId] = new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: " + workerId.replace(/\*/g, '') + " **/\n\n;(" + bootstrap + ")()"], { type: 'application/javascript' })));

      // Single handler for response messages from the worker
      worker.onmessage = function (e) {
        var response = e.data;
        var msgId = response.messageId;
        var callback = openRequests[msgId];
        if (!callback) {
          throw new Error('WorkerModule response with empty or unknown messageId');
        }
        delete openRequests[msgId];
        openRequests.count--;
        callback(response);
      };
    }
    return worker;
  }

  // Issue a call to the worker with a callback to handle the response
  function callWorker(workerId, action, data) {
    var thenable = DefaultThenable();
    var messageId = ++_messageId;
    openRequests[messageId] = function (response) {
      if (response.success) {
        thenable.resolve(response.result);
      } else {
        thenable.reject(new Error("Error in worker " + action + " call: " + response.error));
      }
    };
    openRequests._count++;
    if (openRequests.count > 1000) {
      //detect leaks
      console.warn('Large number of open WorkerModule requests, some may not be returning');
    }
    getWorker(workerId).postMessage({
      messageId: messageId,
      action: action,
      data: data
    });
    return thenable;
  }

  /**
   * Just the {@link Thenable} function wrapped as a worker module. If another worker
   * module needs Thenable as a dependency, it's better to pass this module rather than
   * the raw function in its `dependencies` array so it only gets registered once.
   */
  var ThenableWorkerModule = /*#__PURE__*/defineWorkerModule({
    name: 'Thenable',
    dependencies: [DefaultThenable],
    init: function init(Thenable) {
      return Thenable;
    }
  });

  /**
   * Regular expression for matching the `void main() {` opener line in GLSL.
   * @type {RegExp}
   */
  var voidMainRegExp = /\bvoid\s+main\s*\(\s*\)\s*{/g;

  /**
   * Recursively expands all `#include <xyz>` statements within string of shader code.
   * Copied from three's WebGLProgram#parseIncludes for external use.
   *
   * @param {string} source - The GLSL source code to evaluate
   * @return {string} The GLSL code with all includes expanded
   */
  function expandShaderIncludes(source) {
    var pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
    function replace(match, include) {
      var chunk = THREE.ShaderChunk[include];
      return chunk ? expandShaderIncludes(chunk) : match;
    }
    return source.replace(pattern, replace);
  }

  // Local assign polyfill to avoid importing troika-core
  var assign = Object.assign || function () /*target, ...sources*/{
    var target = arguments[0];
    for (var i = 1, len = arguments.length; i < len; i++) {
      var source = arguments[i];
      if (source) {
        for (var prop in source) {
          if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
          }
        }
      }
    }
    return target;
  };

  var epoch = Date.now();
  var CONSTRUCTOR_CACHE = new WeakMap();
  var SHADER_UPGRADE_CACHE = new Map();

  // Material ids must be integers, but we can't access the increment from Three's `Material` module,
  // so let's choose a sufficiently large starting value that should theoretically never collide.
  var materialInstanceId = 1e10;

  /**
   * A utility for creating a custom shader material derived from another material's
   * shaders. This allows you to inject custom shader logic and transforms into the
   * builtin ThreeJS materials without having to recreate them from scratch.
   *
   * @param {THREE.Material} baseMaterial - the original material to derive from
   *
   * @param {Object} options - How the base material should be modified.
   * @param {Object} options.defines - Custom `defines` for the material
   * @param {Object} options.extensions - Custom `extensions` for the material, e.g. `{derivatives: true}`
   * @param {Object} options.uniforms - Custom `uniforms` for use in the modified shader. These can
   *        be accessed and manipulated via the resulting material's `uniforms` property, just like
   *        in a ShaderMaterial. You do not need to repeat the base material's own uniforms here.
   * @param {String} options.timeUniform - If specified, a uniform of this name will be injected into
   *        both shaders, and it will automatically be updated on each render frame with a number of
   *        elapsed milliseconds. The "zero" epoch time is not significant so don't rely on this as a
   *        true calendar time.
   * @param {String} options.vertexDefs - Custom GLSL code to inject into the vertex shader's top-level
   *        definitions, above the `void main()` function.
   * @param {String} options.vertexMainIntro - Custom GLSL code to inject at the top of the vertex
   *        shader's `void main` function.
   * @param {String} options.vertexMainOutro - Custom GLSL code to inject at the end of the vertex
   *        shader's `void main` function.
   * @param {String} options.vertexTransform - Custom GLSL code to manipulate the `position`, `normal`,
   *        and/or `uv` vertex attributes. This code will be wrapped within a standalone function with
   *        those attributes exposed by their normal names as read/write values.
   * @param {String} options.fragmentDefs - Custom GLSL code to inject into the fragment shader's top-level
   *        definitions, above the `void main()` function.
   * @param {String} options.fragmentMainIntro - Custom GLSL code to inject at the top of the fragment
   *        shader's `void main` function.
   * @param {String} options.fragmentMainOutro - Custom GLSL code to inject at the end of the fragment
   *        shader's `void main` function. You can manipulate `gl_FragColor` here but keep in mind it goes
   *        after any of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), so if you
   *        want those to apply to your changes use `fragmentColorTransform` instead.
   * @param {String} options.fragmentColorTransform - Custom GLSL code to manipulate the `gl_FragColor`
   *        output value. Will be injected near the end of the `void main` function, but before any
   *        of ThreeJS's color postprocessing shader chunks (tonemapping, fog, etc.), and before the
   *        `fragmentMainOutro`.
   * @param {function<{vertexShader,fragmentShader}>:{vertexShader,fragmentShader}} options.customRewriter - A function
   *        for performing custom rewrites of the full shader code. Useful if you need to do something
   *        special that's not covered by the other builtin options. This function will be executed before
   *        any other transforms are applied.
   * @param {boolean} options.chained - Set to `true` to prototype-chain the derived material to the base
   *        material, rather than the default behavior of copying it. This allows the derived material to
   *        automatically pick up changes made to the base material and its properties. This can be useful
   *        where the derived material is hidden from the user as an implementation detail, allowing them
   *        to work with the original material like normal. But it can result in unexpected behavior if not
   *        handled carefully.
   *
   * @return {THREE.Material}
   *
   * The returned material will also have two new methods, `getDepthMaterial()` and `getDistanceMaterial()`,
   * which can be called to get a variant of the derived material for use in shadow casting. If the
   * target mesh is expected to cast shadows, then you can assign these to the mesh's `customDepthMaterial`
   * (for directional and spot lights) and/or `customDistanceMaterial` (for point lights) properties to
   * allow the cast shadow to honor your derived shader's vertex transforms and discarded fragments. These
   * will also set a custom `#define IS_DEPTH_MATERIAL` or `#define IS_DISTANCE_MATERIAL` that you can look
   * for in your derived shaders with `#ifdef` to customize their behavior for the depth or distance
   * scenarios, e.g. skipping antialiasing or expensive shader logic.
   */
  function createDerivedMaterial(baseMaterial, options) {
    // Generate a key that is unique to the content of these `options`. We'll use this
    // throughout for caching and for generating the upgraded shader code. This increases
    // the likelihood that the resulting shaders will line up across multiple calls so
    // their GL programs can be shared and cached.
    var optionsKey = getKeyForOptions(options);

    // First check to see if we've already derived from this baseMaterial using this
    // unique set of options, and if so reuse the constructor to avoid some allocations.
    var ctorsByDerivation = CONSTRUCTOR_CACHE.get(baseMaterial);
    if (!ctorsByDerivation) {
      CONSTRUCTOR_CACHE.set(baseMaterial, ctorsByDerivation = Object.create(null));
    }
    if (ctorsByDerivation[optionsKey]) {
      return new ctorsByDerivation[optionsKey]();
    }

    var privateBeforeCompileProp = '_onBeforeCompile' + optionsKey;

    // Private onBeforeCompile handler that injects the modified shaders and uniforms when
    // the renderer switches to this material's program
    var onBeforeCompile = function onBeforeCompile(shaderInfo) {
      baseMaterial.onBeforeCompile.call(this, shaderInfo);

      // Upgrade the shaders, caching the result by incoming source code
      var cacheKey = optionsKey + '|||' + shaderInfo.vertexShader + '|||' + shaderInfo.fragmentShader;
      var upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey];
      if (!upgradedShaders) {
        var upgraded = upgradeShaders(shaderInfo, options, optionsKey);
        upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey] = upgraded;
      }

      // Inject upgraded shaders and uniforms into the program
      shaderInfo.vertexShader = upgradedShaders.vertexShader;
      shaderInfo.fragmentShader = upgradedShaders.fragmentShader;
      assign(shaderInfo.uniforms, this.uniforms);

      // Inject auto-updating time uniform if requested
      if (options.timeUniform) {
        shaderInfo.uniforms[options.timeUniform] = {
          get value() {
            return Date.now() - epoch;
          }
        };
      }

      // Users can still add their own handlers on top of ours
      if (this[privateBeforeCompileProp]) {
        this[privateBeforeCompileProp](shaderInfo);
      }
    };

    var DerivedMaterial = function DerivedMaterial() {
      return derive(options.chained ? baseMaterial : baseMaterial.clone());
    };

    var derive = function derive(base) {
      // Prototype chain to the base material
      var derived = Object.create(base, descriptor);

      // Store the baseMaterial for reference; this is always the original even when cloning
      Object.defineProperty(derived, 'baseMaterial', { value: baseMaterial });

      // Needs its own ids
      Object.defineProperty(derived, 'id', { value: materialInstanceId++ });
      derived.uuid = THREE.MathUtils.generateUUID();

      // Merge uniforms, defines, and extensions
      derived.uniforms = assign({}, base.uniforms, options.uniforms);
      derived.defines = assign({}, base.defines, options.defines);
      derived.defines['TROIKA_DERIVED_MATERIAL_' + optionsKey] = ''; //force a program change from the base material
      derived.extensions = assign({}, base.extensions, options.extensions);

      // Don't inherit EventDispatcher listeners
      derived._listeners = undefined;

      return derived;
    };

    var descriptor = {
      constructor: { value: DerivedMaterial },
      isDerivedMaterial: { value: true },

      customProgramCacheKey: {
        value: function value() {
          return optionsKey;
        }
      },

      onBeforeCompile: {
        get: function get() {
          return onBeforeCompile;
        },
        set: function set(fn) {
          this[privateBeforeCompileProp] = fn;
        }
      },

      copy: {
        writable: true,
        configurable: true,
        value: function value(source) {
          baseMaterial.copy.call(this, source);
          if (!baseMaterial.isShaderMaterial && !baseMaterial.isDerivedMaterial) {
            assign(this.extensions, source.extensions);
            assign(this.defines, source.defines);
            assign(this.uniforms, THREE.UniformsUtils.clone(source.uniforms));
          }
          return this;
        }
      },

      clone: {
        writable: true,
        configurable: true,
        value: function value() {
          var newBase = new baseMaterial.constructor();
          return derive(newBase).copy(this);
        }
      },

      /**
       * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
       * transformations and discarded fragments.
       */
      getDepthMaterial: {
        writable: true,
        configurable: true,
        value: function value() {
          var depthMaterial = this._depthMaterial;
          if (!depthMaterial) {
            depthMaterial = this._depthMaterial = createDerivedMaterial(baseMaterial.isDerivedMaterial ? baseMaterial.getDepthMaterial() : new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking }), options);
            depthMaterial.defines.IS_DEPTH_MATERIAL = '';
            depthMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
          }
          return depthMaterial;
        }
      },

      /**
       * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
       * transformations and discarded fragments.
       */
      getDistanceMaterial: {
        writable: true,
        configurable: true,
        value: function value() {
          var distanceMaterial = this._distanceMaterial;
          if (!distanceMaterial) {
            distanceMaterial = this._distanceMaterial = createDerivedMaterial(baseMaterial.isDerivedMaterial ? baseMaterial.getDistanceMaterial() : new THREE.MeshDistanceMaterial(), options);
            distanceMaterial.defines.IS_DISTANCE_MATERIAL = '';
            distanceMaterial.uniforms = this.uniforms; //automatically recieve same uniform values
          }
          return distanceMaterial;
        }
      },

      dispose: {
        writable: true,
        configurable: true,
        value: function value() {
          var _depthMaterial = this._depthMaterial,
              _distanceMaterial = this._distanceMaterial;

          if (_depthMaterial) _depthMaterial.dispose();
          if (_distanceMaterial) _distanceMaterial.dispose();
          baseMaterial.dispose.call(this);
        }
      }
    };

    ctorsByDerivation[optionsKey] = DerivedMaterial;
    return new DerivedMaterial();
  }

  function upgradeShaders(_ref, options, key) {
    var vertexShader = _ref.vertexShader,
        fragmentShader = _ref.fragmentShader;
    var vertexDefs = options.vertexDefs,
        vertexMainIntro = options.vertexMainIntro,
        vertexMainOutro = options.vertexMainOutro,
        vertexTransform = options.vertexTransform,
        fragmentDefs = options.fragmentDefs,
        fragmentMainIntro = options.fragmentMainIntro,
        fragmentMainOutro = options.fragmentMainOutro,
        fragmentColorTransform = options.fragmentColorTransform,
        customRewriter = options.customRewriter,
        timeUniform = options.timeUniform;


    vertexDefs = vertexDefs || '';
    vertexMainIntro = vertexMainIntro || '';
    vertexMainOutro = vertexMainOutro || '';
    fragmentDefs = fragmentDefs || '';
    fragmentMainIntro = fragmentMainIntro || '';
    fragmentMainOutro = fragmentMainOutro || '';

    // Expand includes if needed
    if (vertexTransform || customRewriter) {
      vertexShader = expandShaderIncludes(vertexShader);
    }
    if (fragmentColorTransform || customRewriter) {
      // We need to be able to find postprocessing chunks after include expansion in order to
      // put them after the fragmentColorTransform, so mark them with comments first. Even if
      // this particular derivation doesn't have a fragmentColorTransform, other derivations may,
      // so we still mark them.
      fragmentShader = fragmentShader.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm, '\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n');
      fragmentShader = expandShaderIncludes(fragmentShader);
    }

    // Apply custom rewriter function
    if (customRewriter) {
      var res = customRewriter({ vertexShader: vertexShader, fragmentShader: fragmentShader });
      vertexShader = res.vertexShader;
      fragmentShader = res.fragmentShader;
    }

    // The fragmentColorTransform needs to go before any postprocessing chunks, so extract
    // those and re-insert them into the outro in the correct place:
    if (fragmentColorTransform) {
      var postChunks = [];
      fragmentShader = fragmentShader.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm, // [^]+? = non-greedy match of any chars including newlines
      function (match) {
        postChunks.push(match);
        return '';
      });
      fragmentMainOutro = fragmentColorTransform + '\n' + postChunks.join('\n') + '\n' + fragmentMainOutro;
    }

    // Inject auto-updating time uniform if requested
    if (timeUniform) {
      var code = '\nuniform float ' + timeUniform + ';\n';
      vertexDefs = code + vertexDefs;
      fragmentDefs = code + fragmentDefs;
    }

    // Inject a function for the vertexTransform and rename all usages of position/normal/uv
    if (vertexTransform) {
      vertexDefs = vertexDefs + '\nvec3 troika_position_' + key + ';\nvec3 troika_normal_' + key + ';\nvec2 troika_uv_' + key + ';\nvoid troikaVertexTransform' + key + '(inout vec3 position, inout vec3 normal, inout vec2 uv) {\n  ' + vertexTransform + '\n}\n';
      vertexMainIntro = '\ntroika_position_' + key + ' = vec3(position);\ntroika_normal_' + key + ' = vec3(normal);\ntroika_uv_' + key + ' = vec2(uv);\ntroikaVertexTransform' + key + '(troika_position_' + key + ', troika_normal_' + key + ', troika_uv_' + key + ');\n' + vertexMainIntro + '\n';
      vertexShader = vertexShader.replace(/\b(position|normal|uv)\b/g, function (match, match1, index, fullStr) {
        return (/\battribute\s+vec[23]\s+$/.test(fullStr.substr(0, index)) ? match1 : 'troika_' + match1 + '_' + key
        );
      });
    }

    // Inject defs and intro/outro snippets
    vertexShader = injectIntoShaderCode(vertexShader, key, vertexDefs, vertexMainIntro, vertexMainOutro);
    fragmentShader = injectIntoShaderCode(fragmentShader, key, fragmentDefs, fragmentMainIntro, fragmentMainOutro);

    return {
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    };
  }

  function injectIntoShaderCode(shaderCode, id, defs, intro, outro) {
    if (intro || outro || defs) {
      shaderCode = shaderCode.replace(voidMainRegExp, '\n' + defs + '\nvoid troikaOrigMain' + id + '() {');
      shaderCode += '\nvoid main() {\n  ' + intro + '\n  troikaOrigMain' + id + '();\n  ' + outro + '\n}';
    }
    return shaderCode;
  }

  function optionsJsonReplacer(key, value) {
    return key === 'uniforms' ? undefined : typeof value === 'function' ? value.toString() : value;
  }

  var _idCtr = 0;
  var optionsHashesToIds = new Map();
  function getKeyForOptions(options) {
    var optionsHash = JSON.stringify(options, optionsJsonReplacer);
    var id = optionsHashesToIds.get(optionsHash);
    if (id == null) {
      optionsHashesToIds.set(optionsHash, id = ++_idCtr);
    }
    return id;
  }

  /**
   * Initializes and returns a function to generate an SDF texture for a given glyph.
   * @param {function} createGlyphSegmentsIndex - factory for a GlyphSegmentsIndex implementation.
   * @param {number} config.sdfExponent
   * @param {number} config.sdfMargin
   *
   * @return {function(Object): {renderingBounds: [minX, minY, maxX, maxY], textureData: Uint8Array}}
   */
  function createSDFGenerator(createGlyphSegmentsIndex, config) {
    var sdfExponent = config.sdfExponent,
        sdfMargin = config.sdfMargin;

    /**
     * How many straight line segments to use when approximating a glyph's quadratic/cubic bezier curves.
     */

    var CURVE_POINTS = 16;

    /**
     * Find the point on a quadratic bezier curve at t where t is in the range [0, 1]
     */
    function pointOnQuadraticBezier(x0, y0, x1, y1, x2, y2, t) {
      var t2 = 1 - t;
      return {
        x: t2 * t2 * x0 + 2 * t2 * t * x1 + t * t * x2,
        y: t2 * t2 * y0 + 2 * t2 * t * y1 + t * t * y2
      };
    }

    /**
     * Find the point on a cubic bezier curve at t where t is in the range [0, 1]
     */
    function pointOnCubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, t) {
      var t2 = 1 - t;
      return {
        x: t2 * t2 * t2 * x0 + 3 * t2 * t2 * t * x1 + 3 * t2 * t * t * x2 + t * t * t * x3,
        y: t2 * t2 * t2 * y0 + 3 * t2 * t2 * t * y1 + 3 * t2 * t * t * y2 + t * t * t * y3
      };
    }

    /**
     * Generate an SDF texture segment for a single glyph.
     * @param {object} glyphObj
     * @param {number} sdfSize - the length of one side of the SDF image.
     *        Larger images encode more details. Must be a power of 2.
     * @return {{textureData: Uint8Array, renderingBounds: *[]}}
     */
    function generateSDF(glyphObj, sdfSize) {
      //console.time('glyphSDF')

      var textureData = new Uint8Array(sdfSize * sdfSize);

      // Determine mapping between glyph grid coords and sdf grid coords
      var glyphW = glyphObj.xMax - glyphObj.xMin;
      var glyphH = glyphObj.yMax - glyphObj.yMin;

      // Choose a maximum search distance radius in font units, based on the glyph's max dimensions
      var fontUnitsMaxSearchDist = Math.max(glyphW, glyphH);

      // Margin - add an extra 0.5 over the configured value because the outer 0.5 doesn't contain
      // useful interpolated values and will be ignored anyway.
      var fontUnitsMargin = Math.max(glyphW, glyphH) / sdfSize * (sdfMargin * sdfSize + 0.5);

      // Metrics of the texture/quad in font units
      var textureMinFontX = glyphObj.xMin - fontUnitsMargin;
      var textureMinFontY = glyphObj.yMin - fontUnitsMargin;
      var textureMaxFontX = glyphObj.xMax + fontUnitsMargin;
      var textureMaxFontY = glyphObj.yMax + fontUnitsMargin;
      var fontUnitsTextureWidth = textureMaxFontX - textureMinFontX;
      var fontUnitsTextureHeight = textureMaxFontY - textureMinFontY;
      var fontUnitsTextureMaxDim = Math.max(fontUnitsTextureWidth, fontUnitsTextureHeight);

      function textureXToFontX(x) {
        return textureMinFontX + fontUnitsTextureWidth * x / sdfSize;
      }

      function textureYToFontY(y) {
        return textureMinFontY + fontUnitsTextureHeight * y / sdfSize;
      }

      if (glyphObj.pathCommandCount) {
        //whitespace chars will have no commands, so we can skip all this
        // Decompose all paths into straight line segments and add them to a quadtree
        var lineSegmentsIndex = createGlyphSegmentsIndex(glyphObj);
        var firstX = void 0,
            firstY = void 0,
            prevX = void 0,
            prevY = void 0;
        glyphObj.forEachPathCommand(function (type, x0, y0, x1, y1, x2, y2) {
          switch (type) {
            case 'M':
              prevX = firstX = x0;
              prevY = firstY = y0;
              break;
            case 'L':
              if (x0 !== prevX || y0 !== prevY) {
                //yup, some fonts have zero-length line commands
                lineSegmentsIndex.addLineSegment(prevX, prevY, prevX = x0, prevY = y0);
              }
              break;
            case 'Q':
              {
                var prevPoint = { x: prevX, y: prevY };
                for (var i = 1; i < CURVE_POINTS; i++) {
                  var nextPoint = pointOnQuadraticBezier(prevX, prevY, x0, y0, x1, y1, i / (CURVE_POINTS - 1));
                  lineSegmentsIndex.addLineSegment(prevPoint.x, prevPoint.y, nextPoint.x, nextPoint.y);
                  prevPoint = nextPoint;
                }
                prevX = x1;
                prevY = y1;
                break;
              }
            case 'C':
              {
                var _prevPoint = { x: prevX, y: prevY };
                for (var _i = 1; _i < CURVE_POINTS; _i++) {
                  var _nextPoint = pointOnCubicBezier(prevX, prevY, x0, y0, x1, y1, x2, y2, _i / (CURVE_POINTS - 1));
                  lineSegmentsIndex.addLineSegment(_prevPoint.x, _prevPoint.y, _nextPoint.x, _nextPoint.y);
                  _prevPoint = _nextPoint;
                }
                prevX = x2;
                prevY = y2;
                break;
              }
            case 'Z':
              if (prevX !== firstX || prevY !== firstY) {
                lineSegmentsIndex.addLineSegment(prevX, prevY, firstX, firstY);
              }
              break;
          }
        });

        // For each target SDF texel, find the distance from its center to its nearest line segment,
        // map that distance to an alpha value, and write that alpha to the texel
        for (var sdfX = 0; sdfX < sdfSize; sdfX++) {
          for (var sdfY = 0; sdfY < sdfSize; sdfY++) {
            var signedDist = lineSegmentsIndex.findNearestSignedDistance(textureXToFontX(sdfX + 0.5), textureYToFontY(sdfY + 0.5), fontUnitsMaxSearchDist);

            // Use an exponential scale to ensure the texels very near the glyph path have adequate
            // precision, while allowing the distance field to cover the entire texture, given that
            // there are only 8 bits available. Formula visualized: https://www.desmos.com/calculator/uiaq5aqiam
            var alpha = Math.pow(1 - Math.abs(signedDist) / fontUnitsTextureMaxDim, sdfExponent) / 2;
            if (signedDist < 0) {
              alpha = 1 - alpha;
            }

            alpha = Math.max(0, Math.min(255, Math.round(alpha * 255))); //clamp
            textureData[sdfY * sdfSize + sdfX] = alpha;
          }
        }
      }

      //console.timeEnd('glyphSDF')

      return {
        textureData: textureData,

        renderingBounds: [textureMinFontX, textureMinFontY, textureMaxFontX, textureMaxFontY]
      };
    }

    return generateSDF;
  }

  /**
   * Creates a self-contained environment for processing text rendering requests.
   *
   * It is important that this function has no closure dependencies, so that it can be easily injected
   * into the source for a Worker without requiring a build step or complex dependency loading. All its
   * dependencies must be passed in at initialization.
   *
   * @param {function} fontParser - a function that accepts an ArrayBuffer of the font data and returns
   * a standardized structure giving access to the font and its glyphs:
   *   {
   *     unitsPerEm: number,
   *     ascender: number,
   *     descender: number,
   *     forEachGlyph(string, fontSize, letterSpacing, callback) {
   *       //invokes callback for each glyph to render, passing it an object:
   *       callback({
   *         index: number,
   *         advanceWidth: number,
   *         xMin: number,
   *         yMin: number,
   *         xMax: number,
   *         yMax: number,
   *         pathCommandCount: number,
   *         forEachPathCommand(callback) {
   *           //invokes callback for each path command, with args:
   *           callback(
   *             type: 'M|L|C|Q|Z',
   *             ...args //0 to 6 args depending on the type
   *           )
   *         }
   *       })
   *     }
   *   }
   * @param {function} sdfGenerator - a function that accepts a glyph object and generates an SDF texture
   * from it.
   * @param {Object} config
   * @return {Object}
   */
  function createFontProcessor(fontParser, sdfGenerator, config) {
    var defaultFontURL = config.defaultFontURL;

    /**
     * @private
     * Holds data about font glyphs and how they relate to SDF atlases
     *
     * {
     *   'fontUrl@sdfSize': {
     *     fontObj: {}, //result of the fontParser
     *     glyphs: {
     *       [glyphIndex]: {
     *         atlasIndex: 0,
     *         glyphObj: {}, //glyph object from the fontParser
     *         renderingBounds: [x0, y0, x1, y1]
     *       },
     *       ...
     *     },
     *     glyphCount: 123
     *   }
     * }
     */

    var fontAtlases = Object.create(null);

    /**
     * Holds parsed font objects by url
     */
    var fonts = Object.create(null);

    var INF = Infinity;

    /**
     * Load a given font url
     */
    function doLoadFont(url, callback) {
      function tryLoad() {
        var onError = function onError(err) {
          console.error('Failure loading font ' + url + (url === defaultFontURL ? '' : '; trying fallback'), err);
          if (url !== defaultFontURL) {
            url = defaultFontURL;
            tryLoad();
          }
        };
        try {
          var request = new XMLHttpRequest();
          request.open('get', url, true);
          request.responseType = 'arraybuffer';
          request.onload = function () {
            if (request.status >= 400) {
              onError(new Error(request.statusText));
            } else if (request.status > 0) {
              try {
                var fontObj = fontParser(request.response);
                callback(fontObj);
              } catch (e) {
                onError(e);
              }
            }
          };
          request.onerror = onError;
          request.send();
        } catch (err) {
          onError(err);
        }
      }
      tryLoad();
    }

    /**
     * Load a given font url if needed, invoking a callback when it's loaded. If already
     * loaded, the callback will be called synchronously.
     */
    function loadFont(fontUrl, callback) {
      if (!fontUrl) fontUrl = defaultFontURL;
      var font = fonts[fontUrl];
      if (font) {
        // if currently loading font, add to callbacks, otherwise execute immediately
        if (font.pending) {
          font.pending.push(callback);
        } else {
          callback(font);
        }
      } else {
        fonts[fontUrl] = { pending: [callback] };
        doLoadFont(fontUrl, function (fontObj) {
          var callbacks = fonts[fontUrl].pending;
          fonts[fontUrl] = fontObj;
          callbacks.forEach(function (cb) {
            return cb(fontObj);
          });
        });
      }
    }

    /**
     * Get the atlas data for a given font url, loading it from the network and initializing
     * its atlas data objects if necessary.
     */
    function getSdfAtlas(fontUrl, sdfGlyphSize, callback) {
      if (!fontUrl) fontUrl = defaultFontURL;
      var atlasKey = fontUrl + '@' + sdfGlyphSize;
      var atlas = fontAtlases[atlasKey];
      if (atlas) {
        callback(atlas);
      } else {
        loadFont(fontUrl, function (fontObj) {
          atlas = fontAtlases[atlasKey] || (fontAtlases[atlasKey] = {
            fontObj: fontObj,
            glyphs: {},
            glyphCount: 0
          });
          callback(atlas);
        });
      }
    }

    /**
     * Main entry point.
     * Process a text string with given font and formatting parameters, and return all info
     * necessary to render all its glyphs.
     */
    function process(_ref2, callback) {
      var _ref2$text = _ref2.text,
          text = _ref2$text === undefined ? '' : _ref2$text,
          _ref2$font = _ref2.font,
          font = _ref2$font === undefined ? defaultFontURL : _ref2$font,
          _ref2$sdfGlyphSize = _ref2.sdfGlyphSize,
          sdfGlyphSize = _ref2$sdfGlyphSize === undefined ? 64 : _ref2$sdfGlyphSize,
          _ref2$fontSize = _ref2.fontSize,
          fontSize = _ref2$fontSize === undefined ? 1 : _ref2$fontSize,
          _ref2$letterSpacing = _ref2.letterSpacing,
          letterSpacing = _ref2$letterSpacing === undefined ? 0 : _ref2$letterSpacing,
          _ref2$lineHeight = _ref2.lineHeight,
          lineHeight = _ref2$lineHeight === undefined ? 'normal' : _ref2$lineHeight,
          _ref2$maxWidth = _ref2.maxWidth,
          maxWidth = _ref2$maxWidth === undefined ? INF : _ref2$maxWidth,
          _ref2$textAlign = _ref2.textAlign,
          textAlign = _ref2$textAlign === undefined ? 'left' : _ref2$textAlign,
          _ref2$textIndent = _ref2.textIndent,
          textIndent = _ref2$textIndent === undefined ? 0 : _ref2$textIndent,
          _ref2$whiteSpace = _ref2.whiteSpace,
          whiteSpace = _ref2$whiteSpace === undefined ? 'normal' : _ref2$whiteSpace,
          _ref2$overflowWrap = _ref2.overflowWrap,
          overflowWrap = _ref2$overflowWrap === undefined ? 'normal' : _ref2$overflowWrap,
          _ref2$anchorX = _ref2.anchorX,
          anchorX = _ref2$anchorX === undefined ? 0 : _ref2$anchorX,
          _ref2$anchorY = _ref2.anchorY,
          anchorY = _ref2$anchorY === undefined ? 0 : _ref2$anchorY,
          _ref2$includeCaretPos = _ref2.includeCaretPositions,
          includeCaretPositions = _ref2$includeCaretPos === undefined ? false : _ref2$includeCaretPos,
          _ref2$chunkedBoundsSi = _ref2.chunkedBoundsSize,
          chunkedBoundsSize = _ref2$chunkedBoundsSi === undefined ? 8192 : _ref2$chunkedBoundsSi,
          _ref2$colorRanges = _ref2.colorRanges,
          colorRanges = _ref2$colorRanges === undefined ? null : _ref2$colorRanges;
      var metricsOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var mainStart = now();
      var timings = { total: 0, fontLoad: 0, layout: 0, sdf: {}, sdfTotal: 0 };

      // Ensure newlines are normalized
      if (text.indexOf('\r') > -1) {
        console.warn('FontProcessor.process: got text with \\r chars; normalizing to \\n');
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      }

      // Ensure we've got numbers not strings
      fontSize = +fontSize;
      letterSpacing = +letterSpacing;
      maxWidth = +maxWidth;
      lineHeight = lineHeight || 'normal';
      textIndent = +textIndent;

      getSdfAtlas(font, sdfGlyphSize, function (atlas) {
        var fontObj = atlas.fontObj;
        var hasMaxWidth = isFinite(maxWidth);
        var newGlyphs = null;
        var glyphBounds = null;
        var glyphAtlasIndices = null;
        var glyphColors = null;
        var caretPositions = null;
        var visibleBounds = null;
        var chunkedBounds = null;
        var maxLineWidth = 0;
        var renderableGlyphCount = 0;
        var canWrap = whiteSpace !== 'nowrap';
        var ascender = fontObj.ascender,
            descender = fontObj.descender,
            unitsPerEm = fontObj.unitsPerEm;

        timings.fontLoad = now() - mainStart;
        var layoutStart = now();

        // Find conversion between native font units and fontSize units; this will already be done
        // for the gx/gy values below but everything else we'll need to convert
        var fontSizeMult = fontSize / unitsPerEm;

        // Determine appropriate value for 'normal' line height based on the font's actual metrics
        // TODO this does not guarantee individual glyphs won't exceed the line height, e.g. Roboto; should we use yMin/Max instead?
        if (lineHeight === 'normal') {
          lineHeight = (ascender - descender) / unitsPerEm;
        }

        // Determine line height and leading adjustments
        lineHeight = lineHeight * fontSize;
        var halfLeading = (lineHeight - (ascender - descender) * fontSizeMult) / 2;
        var topBaseline = -(ascender * fontSizeMult + halfLeading);
        var caretHeight = Math.min(lineHeight, (ascender - descender) * fontSizeMult);
        var caretBottomOffset = (ascender + descender) / 2 * fontSizeMult - caretHeight / 2;

        // Distribute glyphs into lines based on wrapping
        var lineXOffset = textIndent;
        var currentLine = new TextLine();
        var lines = [currentLine];
        fontObj.forEachGlyph(text, fontSize, letterSpacing, function (glyphObj, glyphX, charIndex) {
          var char = text.charAt(charIndex);
          var glyphWidth = glyphObj.advanceWidth * fontSizeMult;
          var curLineCount = currentLine.count;
          var nextLine = void 0;

          // Calc isWhitespace and isEmpty once per glyphObj
          if (!('isEmpty' in glyphObj)) {
            glyphObj.isWhitespace = !!char && /\s/.test(char);
            glyphObj.isEmpty = glyphObj.xMin === glyphObj.xMax || glyphObj.yMin === glyphObj.yMax;
          }
          if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
            renderableGlyphCount++;
          }

          // If a non-whitespace character overflows the max width, we need to soft-wrap
          if (canWrap && hasMaxWidth && !glyphObj.isWhitespace && glyphX + glyphWidth + lineXOffset > maxWidth && curLineCount) {
            // If it's the first char after a whitespace, start a new line
            if (currentLine.glyphAt(curLineCount - 1).glyphObj.isWhitespace) {
              nextLine = new TextLine();
              lineXOffset = -glyphX;
            } else {
              // Back up looking for a whitespace character to wrap at
              for (var i = curLineCount; i--;) {
                // If we got the start of the line there's no soft break point; make hard break if overflowWrap='break-word'
                if (i === 0 && overflowWrap === 'break-word') {
                  nextLine = new TextLine();
                  lineXOffset = -glyphX;
                  break;
                }
                // Found a soft break point; move all chars since it to a new line
                else if (currentLine.glyphAt(i).glyphObj.isWhitespace) {
                    nextLine = currentLine.splitAt(i + 1);
                    var adjustX = nextLine.glyphAt(0).x;
                    lineXOffset -= adjustX;
                    for (var j = nextLine.count; j--;) {
                      nextLine.glyphAt(j).x -= adjustX;
                    }
                    break;
                  }
              }
            }
            if (nextLine) {
              currentLine.isSoftWrapped = true;
              currentLine = nextLine;
              lines.push(currentLine);
              maxLineWidth = maxWidth; //after soft wrapping use maxWidth as calculated width
            }
          }

          var fly = currentLine.glyphAt(currentLine.count);
          fly.glyphObj = glyphObj;
          fly.x = glyphX + lineXOffset;
          fly.width = glyphWidth;
          fly.charIndex = charIndex;

          // Handle hard line breaks
          if (char === '\n') {
            currentLine = new TextLine();
            lines.push(currentLine);
            lineXOffset = -(glyphX + glyphWidth + letterSpacing * fontSize) + textIndent;
          }
        });

        // Calculate width of each line (excluding trailing whitespace) and maximum block width
        lines.forEach(function (line) {
          for (var i = line.count; i--;) {
            var _line$glyphAt = line.glyphAt(i),
                glyphObj = _line$glyphAt.glyphObj,
                x = _line$glyphAt.x,
                width = _line$glyphAt.width;

            if (!glyphObj.isWhitespace) {
              line.width = x + width;
              if (line.width > maxLineWidth) {
                maxLineWidth = line.width;
              }
              return;
            }
          }
        });

        // Find overall position adjustments for anchoring
        var anchorXOffset = 0;
        var anchorYOffset = 0;
        if (anchorX) {
          if (typeof anchorX === 'number') {
            anchorXOffset = -anchorX;
          } else if (typeof anchorX === 'string') {
            anchorXOffset = -maxLineWidth * (anchorX === 'left' ? 0 : anchorX === 'center' ? 0.5 : anchorX === 'right' ? 1 : parsePercent(anchorX));
          }
        }
        if (anchorY) {
          if (typeof anchorY === 'number') {
            anchorYOffset = -anchorY;
          } else if (typeof anchorY === 'string') {
            var height = lines.length * lineHeight;
            anchorYOffset = anchorY === 'top' ? 0 : anchorY === 'top-baseline' ? -topBaseline : anchorY === 'middle' ? height / 2 : anchorY === 'bottom' ? height : anchorY === 'bottom-baseline' ? height - halfLeading + descender * fontSizeMult : parsePercent(anchorY) * height;
          }
        }

        if (!metricsOnly) {
          // Process each line, applying alignment offsets, adding each glyph to the atlas, and
          // collecting all renderable glyphs into a single collection.
          glyphBounds = new Float32Array(renderableGlyphCount * 4);
          glyphAtlasIndices = new Float32Array(renderableGlyphCount);
          visibleBounds = [INF, INF, -INF, -INF];
          chunkedBounds = [];
          var lineYOffset = topBaseline;
          if (includeCaretPositions) {
            caretPositions = new Float32Array(text.length * 3);
          }
          if (colorRanges) {
            glyphColors = new Uint8Array(renderableGlyphCount * 3);
          }
          var renderableGlyphIndex = 0;
          var prevCharIndex = -1;
          var colorCharIndex = -1;
          var chunk = void 0;
          var currentColor = void 0;
          lines.forEach(function (line) {
            var lineGlyphCount = line.count,
                lineWidth = line.width;

            // Ignore empty lines

            if (lineGlyphCount > 0) {
              // Find x offset for horizontal alignment
              var _lineXOffset = 0;
              var justifyAdjust = 0;
              if (textAlign === 'center') {
                _lineXOffset = (maxLineWidth - lineWidth) / 2;
              } else if (textAlign === 'right') {
                _lineXOffset = maxLineWidth - lineWidth;
              } else if (textAlign === 'justify' && line.isSoftWrapped) {
                // just count the non-trailing whitespace characters, and we'll adjust the offsets per
                // character in the next loop
                var whitespaceCount = 0;
                for (var i = lineGlyphCount; i--;) {
                  if (!line.glyphAt(i).glyphObj.isWhitespace) {
                    while (i--) {
                      if (!line.glyphAt(i).glyphObj) {
                        debugger;
                      }
                      if (line.glyphAt(i).glyphObj.isWhitespace) {
                        whitespaceCount++;
                      }
                    }
                    break;
                  }
                }
                justifyAdjust = (maxLineWidth - lineWidth) / whitespaceCount;
              }

              for (var _i2 = 0; _i2 < lineGlyphCount; _i2++) {
                var glyphInfo = line.glyphAt(_i2);
                var glyphObj = glyphInfo.glyphObj;

                // Apply position adjustments
                if (_lineXOffset) glyphInfo.x += _lineXOffset;

                // Expand whitespaces for justify alignment
                if (justifyAdjust !== 0 && glyphObj.isWhitespace) {
                  _lineXOffset += justifyAdjust;
                  glyphInfo.width += justifyAdjust;
                }

                // Add caret positions
                if (includeCaretPositions) {
                  var charIndex = glyphInfo.charIndex;

                  caretPositions[charIndex * 3] = glyphInfo.x + anchorXOffset; //left edge x
                  caretPositions[charIndex * 3 + 1] = glyphInfo.x + glyphInfo.width + anchorXOffset; //right edge x
                  caretPositions[charIndex * 3 + 2] = lineYOffset + caretBottomOffset + anchorYOffset; //common bottom y

                  // If we skipped any chars from the previous glyph (due to ligature subs), copy the
                  // previous glyph's info to those missing char indices. In the future we may try to
                  // use the font's LigatureCaretList table to get interior caret positions.
                  while (charIndex - prevCharIndex > 1) {
                    caretPositions[(prevCharIndex + 1) * 3] = caretPositions[prevCharIndex * 3 + 1];
                    caretPositions[(prevCharIndex + 1) * 3 + 1] = caretPositions[prevCharIndex * 3 + 1];
                    caretPositions[(prevCharIndex + 1) * 3 + 2] = caretPositions[prevCharIndex * 3 + 2];
                    prevCharIndex++;
                  }
                  prevCharIndex = charIndex;
                }

                // Track current color range
                if (colorRanges) {
                  var _charIndex = glyphInfo.charIndex;

                  while (_charIndex > colorCharIndex) {
                    colorCharIndex++;
                    if (colorRanges.hasOwnProperty(colorCharIndex)) {
                      currentColor = colorRanges[colorCharIndex];
                    }
                  }
                }

                // Get atlas data for renderable glyphs
                if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
                  var idx = renderableGlyphIndex++;

                  // If we haven't seen this glyph yet, generate its SDF
                  var glyphAtlasInfo = atlas.glyphs[glyphObj.index];
                  if (!glyphAtlasInfo) {
                    var sdfStart = now();
                    var glyphSDFData = sdfGenerator(glyphObj, sdfGlyphSize);
                    timings.sdf[text.charAt(glyphInfo.charIndex)] = now() - sdfStart;

                    // Assign this glyph the next available atlas index
                    glyphSDFData.atlasIndex = atlas.glyphCount++;

                    // Queue it up in the response's newGlyphs list
                    if (!newGlyphs) newGlyphs = [];
                    newGlyphs.push(glyphSDFData);

                    // Store its metadata (not the texture) in our atlas info
                    glyphAtlasInfo = atlas.glyphs[glyphObj.index] = {
                      atlasIndex: glyphSDFData.atlasIndex,
                      glyphObj: glyphObj,
                      renderingBounds: glyphSDFData.renderingBounds
                    };
                  }

                  // Determine final glyph quad bounds and add them to the glyphBounds array
                  var bounds = glyphAtlasInfo.renderingBounds;
                  var startIdx = idx * 4;
                  var xStart = glyphInfo.x + anchorXOffset;
                  var yStart = lineYOffset + anchorYOffset;
                  glyphBounds[startIdx] = xStart + bounds[0] * fontSizeMult;
                  glyphBounds[startIdx + 1] = yStart + bounds[1] * fontSizeMult;
                  glyphBounds[startIdx + 2] = xStart + bounds[2] * fontSizeMult;
                  glyphBounds[startIdx + 3] = yStart + bounds[3] * fontSizeMult;

                  // Track total visible bounds
                  var visX0 = xStart + glyphObj.xMin * fontSizeMult;
                  var visY0 = yStart + glyphObj.yMin * fontSizeMult;
                  var visX1 = xStart + glyphObj.xMax * fontSizeMult;
                  var visY1 = yStart + glyphObj.yMax * fontSizeMult;
                  if (visX0 < visibleBounds[0]) visibleBounds[0] = visX0;
                  if (visY0 < visibleBounds[1]) visibleBounds[1] = visY0;
                  if (visX1 > visibleBounds[2]) visibleBounds[2] = visX1;
                  if (visY1 > visibleBounds[3]) visibleBounds[3] = visY1;

                  // Track bounding rects for each chunk of N glyphs
                  if (idx % chunkedBoundsSize === 0) {
                    chunk = { start: idx, end: idx, rect: [INF, INF, -INF, -INF] };
                    chunkedBounds.push(chunk);
                  }
                  chunk.end++;
                  var chunkRect = chunk.rect;
                  if (visX0 < chunkRect[0]) chunkRect[0] = visX0;
                  if (visY0 < chunkRect[1]) chunkRect[1] = visY0;
                  if (visX1 > chunkRect[2]) chunkRect[2] = visX1;
                  if (visY1 > chunkRect[3]) chunkRect[3] = visY1;

                  // Add to atlas indices array
                  glyphAtlasIndices[idx] = glyphAtlasInfo.atlasIndex;

                  // Add colors
                  if (colorRanges) {
                    var start = idx * 3;
                    glyphColors[start] = currentColor >> 16 & 255;
                    glyphColors[start + 1] = currentColor >> 8 & 255;
                    glyphColors[start + 2] = currentColor & 255;
                  }
                }
              }
            }

            // Increment y offset for next line
            lineYOffset -= lineHeight;
          });
        }

        // Timing stats
        for (var ch in timings.sdf) {
          timings.sdfTotal += timings.sdf[ch];
        }
        timings.layout = now() - layoutStart - timings.sdfTotal;
        timings.total = now() - mainStart;

        callback({
          glyphBounds: glyphBounds, //rendering quad bounds for each glyph [x1, y1, x2, y2]
          glyphAtlasIndices: glyphAtlasIndices, //atlas indices for each glyph
          caretPositions: caretPositions, //x,y of bottom of cursor position before each char, plus one after last char
          caretHeight: caretHeight, //height of cursor from bottom to top
          glyphColors: glyphColors, //color for each glyph, if color ranges supplied
          chunkedBounds: chunkedBounds, //total rects per (n=chunkedBoundsSize) consecutive glyphs
          ascender: ascender * fontSizeMult, //font ascender
          descender: descender * fontSizeMult, //font descender
          lineHeight: lineHeight, //computed line height
          topBaseline: topBaseline, //y coordinate of the top line's baseline
          blockBounds: [//bounds for the whole block of text, including vertical padding for lineHeight
          anchorXOffset, anchorYOffset - lines.length * lineHeight, anchorXOffset + maxLineWidth, anchorYOffset],
          visibleBounds: visibleBounds, //total bounds of visible text paths, may be larger or smaller than totalBounds
          newGlyphSDFs: newGlyphs, //if this request included any new SDFs for the atlas, they'll be included here
          timings: timings
        });
      });
    }

    /**
     * For a given text string and font parameters, determine the resulting block dimensions
     * after wrapping for the given maxWidth.
     * @param args
     * @param callback
     */
    function measure(args, callback) {
      process(args, function (result) {
        var _result$blockBounds = _slicedToArray(result.blockBounds, 4),
            x0 = _result$blockBounds[0],
            y0 = _result$blockBounds[1],
            x1 = _result$blockBounds[2],
            y1 = _result$blockBounds[3];

        callback({
          width: x1 - x0,
          height: y1 - y0
        });
      }, { metricsOnly: true });
    }

    function parsePercent(str) {
      var match = str.match(/^([\d.]+)%$/);
      var pct = match ? parseFloat(match[1]) : NaN;
      return isNaN(pct) ? 0 : pct / 100;
    }

    function now() {
      return (self.performance || Date).now();
    }

    // Array-backed structure for a single line's glyphs data
    function TextLine() {
      this.data = [];
    }
    TextLine.prototype = {
      width: 0,
      isSoftWrapped: false,
      get count() {
        return Math.ceil(this.data.length / 4);
      },
      glyphAt: function glyphAt(i) {
        var fly = TextLine.flyweight;
        fly.data = this.data;
        fly.index = i;
        return fly;
      },
      splitAt: function splitAt(i) {
        var newLine = new TextLine();
        newLine.data = this.data.splice(i * 4);
        return newLine;
      }
    };
    TextLine.flyweight = ['glyphObj', 'x', 'width', 'charIndex'].reduce(function (obj, prop, i, all) {
      Object.defineProperty(obj, prop, {
        get: function get() {
          return this.data[this.index * 4 + i];
        },
        set: function set(val) {
          this.data[this.index * 4 + i] = val;
        }
      });
      return obj;
    }, { data: null, index: 0 });

    return {
      process: process,
      measure: measure,
      loadFont: loadFont
    };
  }

  /**
   * Index for performing fast spatial searches of a glyph's line segments.
   * @return {{addLineSegment:function, findNearestSignedDistance:function}}
   */
  function createGlyphSegmentsIndex() {
    var needsSort = false;
    var segments = [];

    function sortSegments() {
      if (needsSort) {
        // sort by maxX, this will let us short-circuit some loops below
        segments.sort(function (a, b) {
          return a.maxX - b.maxX;
        });
        needsSort = false;
      }
    }

    /**
     * Add a line segment to the index.
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     */
    function addLineSegment(x0, y0, x1, y1) {
      var segment = {
        x0: x0, y0: y0, x1: x1, y1: y1,
        minX: Math.min(x0, x1),
        minY: Math.min(y0, y1),
        maxX: Math.max(x0, x1),
        maxY: Math.max(y0, y1)
      };
      segments.push(segment);
      needsSort = true;
    }

    /**
     * For a given x/y, search the index for the closest line segment and return
     * its signed distance. Negative = inside, positive = outside, zero = on edge
     * @param x
     * @param y
     * @returns {number}
     */
    function findNearestSignedDistance(x, y) {
      sortSegments();
      var closestDistSq = Infinity;
      var closestDist = Infinity;

      for (var i = segments.length; i--;) {
        var seg = segments[i];
        if (seg.maxX + closestDist <= x) break; //sorting by maxX means no more can be closer, so we can short-circuit
        if (x + closestDist > seg.minX && y - closestDist < seg.maxY && y + closestDist > seg.minY) {
          var distSq = absSquareDistanceToLineSegment(x, y, seg.x0, seg.y0, seg.x1, seg.y1);
          if (distSq < closestDistSq) {
            closestDistSq = distSq;
            closestDist = Math.sqrt(closestDistSq);
          }
        }
      }

      // Flip to negative distance if inside the poly
      if (isPointInPoly(x, y)) {
        closestDist = -closestDist;
      }
      return closestDist;
    }

    // Determine whether the given point lies inside or outside the glyph. Uses a simple
    // ray casting algorithm using a ray pointing east from the point.
    function isPointInPoly(x, y) {
      sortSegments();
      var inside = false;
      for (var i = segments.length; i--;) {
        var seg = segments[i];
        if (seg.maxX <= x) break; //sorting by maxX means no more can cross, so we can short-circuit
        if (seg.minY < y && seg.maxY > y) {
          var intersects = seg.y0 > y !== seg.y1 > y && x < (seg.x1 - seg.x0) * (y - seg.y0) / (seg.y1 - seg.y0) + seg.x0;
          if (intersects) {
            inside = !inside;
          }
        }
      }
      return inside;
    }

    // Find the absolute distance from a point to a line segment at closest approach
    function absSquareDistanceToLineSegment(x, y, lineX0, lineY0, lineX1, lineY1) {
      var ldx = lineX1 - lineX0;
      var ldy = lineY1 - lineY0;
      var lengthSq = ldx * ldx + ldy * ldy;
      var t = lengthSq ? Math.max(0, Math.min(1, ((x - lineX0) * ldx + (y - lineY0) * ldy) / lengthSq)) : 0;
      var dx = x - (lineX0 + t * ldx);
      var dy = y - (lineY0 + t * ldy);
      return dx * dx + dy * dy;
    }

    return {
      addLineSegment: addLineSegment,
      findNearestSignedDistance: findNearestSignedDistance
    };
  }

  // Custom bundle of Typr.js (https://github.com/photopea/Typr.js) for use in troika-3d-text. 
  // Original MIT license applies: https://github.com/photopea/Typr.js/blob/gh-pages/LICENSE

  function typrFactory() {

    var window = self;

    // Begin Typr.js


    var Typr = {};

    Typr.parse = function (buff) {
      var bin = Typr._bin;
      var data = new Uint8Array(buff);

      var tag = bin.readASCII(data, 0, 4);
      if (tag == "ttcf") {
        var offset = 4;
        var majV = bin.readUshort(data, offset);offset += 2;
        var minV = bin.readUshort(data, offset);offset += 2;
        var numF = bin.readUint(data, offset);offset += 4;
        var fnts = [];
        for (var i = 0; i < numF; i++) {
          var foff = bin.readUint(data, offset);offset += 4;
          fnts.push(Typr._readFont(data, foff));
        }
        return fnts;
      } else return [Typr._readFont(data, 0)];
    };

    Typr._readFont = function (data, offset) {
      var bin = Typr._bin;
      var ooff = offset;

      var sfnt_version = bin.readFixed(data, offset);
      offset += 4;
      var numTables = bin.readUshort(data, offset);
      offset += 2;
      var searchRange = bin.readUshort(data, offset);
      offset += 2;
      var entrySelector = bin.readUshort(data, offset);
      offset += 2;
      var rangeShift = bin.readUshort(data, offset);
      offset += 2;

      var tags = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post",

      //"cvt",
      //"fpgm",
      "loca", "glyf", "kern",

      //"prep"
      //"gasp"

      "CFF ", "GPOS", "GSUB", "SVG "
      //"VORG",
      ];

      var obj = { _data: data, _offset: ooff };
      //console.log(sfnt_version, numTables, searchRange, entrySelector, rangeShift);

      var tabs = {};

      for (var i = 0; i < numTables; i++) {
        var tag = bin.readASCII(data, offset, 4);offset += 4;
        var checkSum = bin.readUint(data, offset);offset += 4;
        var toffset = bin.readUint(data, offset);offset += 4;
        var length = bin.readUint(data, offset);offset += 4;
        tabs[tag] = { offset: toffset, length: length };

        //if(tags.indexOf(tag)==-1) console.log("unknown tag", tag, length);
      }

      for (var i = 0; i < tags.length; i++) {
        var t = tags[i];
        //console.log(t);
        //if(tabs[t]) console.log(t, tabs[t].offset, tabs[t].length);
        if (tabs[t]) obj[t.trim()] = Typr[t.trim()].parse(data, tabs[t].offset, tabs[t].length, obj);
      }

      return obj;
    };

    Typr._tabOffset = function (data, tab, foff) {
      var bin = Typr._bin;
      var numTables = bin.readUshort(data, foff + 4);
      var offset = foff + 12;
      for (var i = 0; i < numTables; i++) {
        var tag = bin.readASCII(data, offset, 4);offset += 4;
        var checkSum = bin.readUint(data, offset);offset += 4;
        var toffset = bin.readUint(data, offset);offset += 4;
        var length = bin.readUint(data, offset);offset += 4;
        if (tag == tab) return toffset;
      }
      return 0;
    };

    Typr._bin = {
      readFixed: function readFixed(data, o) {
        return (data[o] << 8 | data[o + 1]) + (data[o + 2] << 8 | data[o + 3]) / (256 * 256 + 4);
      },
      readF2dot14: function readF2dot14(data, o) {
        var num = Typr._bin.readShort(data, o);
        return num / 16384;
      },
      readInt: function readInt(buff, p) {
        //if(p>=buff.length) throw "error";
        var a = Typr._bin.t.uint8;
        a[0] = buff[p + 3];
        a[1] = buff[p + 2];
        a[2] = buff[p + 1];
        a[3] = buff[p];
        return Typr._bin.t.int32[0];
      },

      readInt8: function readInt8(buff, p) {
        //if(p>=buff.length) throw "error";
        var a = Typr._bin.t.uint8;
        a[0] = buff[p];
        return Typr._bin.t.int8[0];
      },
      readShort: function readShort(buff, p) {
        //if(p>=buff.length) throw "error";
        var a = Typr._bin.t.uint8;
        a[1] = buff[p];a[0] = buff[p + 1];
        return Typr._bin.t.int16[0];
      },
      readUshort: function readUshort(buff, p) {
        //if(p>=buff.length) throw "error";
        return buff[p] << 8 | buff[p + 1];
      },
      readUshorts: function readUshorts(buff, p, len) {
        var arr = [];
        for (var i = 0; i < len; i++) {
          arr.push(Typr._bin.readUshort(buff, p + i * 2));
        }return arr;
      },
      readUint: function readUint(buff, p) {
        //if(p>=buff.length) throw "error";
        var a = Typr._bin.t.uint8;
        a[3] = buff[p];a[2] = buff[p + 1];a[1] = buff[p + 2];a[0] = buff[p + 3];
        return Typr._bin.t.uint32[0];
      },
      readUint64: function readUint64(buff, p) {
        //if(p>=buff.length) throw "error";
        return Typr._bin.readUint(buff, p) * (0xffffffff + 1) + Typr._bin.readUint(buff, p + 4);
      },
      readASCII: function readASCII(buff, p, l) // l : length in Characters (not Bytes)
      {
        //if(p>=buff.length) throw "error";
        var s = "";
        for (var i = 0; i < l; i++) {
          s += String.fromCharCode(buff[p + i]);
        }return s;
      },
      readUnicode: function readUnicode(buff, p, l) {
        //if(p>=buff.length) throw "error";
        var s = "";
        for (var i = 0; i < l; i++) {
          var c = buff[p++] << 8 | buff[p++];
          s += String.fromCharCode(c);
        }
        return s;
      },
      _tdec: window["TextDecoder"] ? new window["TextDecoder"]() : null,
      readUTF8: function readUTF8(buff, p, l) {
        var tdec = Typr._bin._tdec;
        if (tdec && p == 0 && l == buff.length) return tdec["decode"](buff);
        return Typr._bin.readASCII(buff, p, l);
      },
      readBytes: function readBytes(buff, p, l) {
        //if(p>=buff.length) throw "error";
        var arr = [];
        for (var i = 0; i < l; i++) {
          arr.push(buff[p + i]);
        }return arr;
      },
      readASCIIArray: function readASCIIArray(buff, p, l) // l : length in Characters (not Bytes)
      {
        //if(p>=buff.length) throw "error";
        var s = [];
        for (var i = 0; i < l; i++) {
          s.push(String.fromCharCode(buff[p + i]));
        }return s;
      }
    };

    Typr._bin.t = {
      buff: new ArrayBuffer(8)
    };
    Typr._bin.t.int8 = new Int8Array(Typr._bin.t.buff);
    Typr._bin.t.uint8 = new Uint8Array(Typr._bin.t.buff);
    Typr._bin.t.int16 = new Int16Array(Typr._bin.t.buff);
    Typr._bin.t.uint16 = new Uint16Array(Typr._bin.t.buff);
    Typr._bin.t.int32 = new Int32Array(Typr._bin.t.buff);
    Typr._bin.t.uint32 = new Uint32Array(Typr._bin.t.buff);

    // OpenType Layout Common Table Formats

    Typr._lctf = {};

    Typr._lctf.parse = function (data, offset, length, font, subt) {
      var bin = Typr._bin;
      var obj = {};
      var offset0 = offset;
      var tableVersion = bin.readFixed(data, offset);offset += 4;

      var offScriptList = bin.readUshort(data, offset);offset += 2;
      var offFeatureList = bin.readUshort(data, offset);offset += 2;
      var offLookupList = bin.readUshort(data, offset);offset += 2;

      obj.scriptList = Typr._lctf.readScriptList(data, offset0 + offScriptList);
      obj.featureList = Typr._lctf.readFeatureList(data, offset0 + offFeatureList);
      obj.lookupList = Typr._lctf.readLookupList(data, offset0 + offLookupList, subt);

      return obj;
    };

    Typr._lctf.readLookupList = function (data, offset, subt) {
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = [];
      var count = bin.readUshort(data, offset);offset += 2;
      for (var i = 0; i < count; i++) {
        var noff = bin.readUshort(data, offset);offset += 2;
        var lut = Typr._lctf.readLookupTable(data, offset0 + noff, subt);
        obj.push(lut);
      }
      return obj;
    };

    Typr._lctf.readLookupTable = function (data, offset, subt) {
      //console.log("Parsing lookup table", offset);
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = { tabs: [] };

      obj.ltype = bin.readUshort(data, offset);offset += 2;
      obj.flag = bin.readUshort(data, offset);offset += 2;
      var cnt = bin.readUshort(data, offset);offset += 2;

      for (var i = 0; i < cnt; i++) {
        var noff = bin.readUshort(data, offset);offset += 2;
        var tab = subt(data, obj.ltype, offset0 + noff);
        //console.log(obj.type, tab);
        obj.tabs.push(tab);
      }
      return obj;
    };

    Typr._lctf.numOfOnes = function (n) {
      var num = 0;
      for (var i = 0; i < 32; i++) {
        if ((n >>> i & 1) != 0) num++;
      }return num;
    };

    Typr._lctf.readClassDef = function (data, offset) {
      var bin = Typr._bin;
      var obj = [];
      var format = bin.readUshort(data, offset);offset += 2;
      if (format == 1) {
        var startGlyph = bin.readUshort(data, offset);offset += 2;
        var glyphCount = bin.readUshort(data, offset);offset += 2;
        for (var i = 0; i < glyphCount; i++) {
          obj.push(startGlyph + i);
          obj.push(startGlyph + i);
          obj.push(bin.readUshort(data, offset));offset += 2;
        }
      }
      if (format == 2) {
        var count = bin.readUshort(data, offset);offset += 2;
        for (var i = 0; i < count; i++) {
          obj.push(bin.readUshort(data, offset));offset += 2;
          obj.push(bin.readUshort(data, offset));offset += 2;
          obj.push(bin.readUshort(data, offset));offset += 2;
        }
      }
      return obj;
    };
    Typr._lctf.getInterval = function (tab, val) {
      for (var i = 0; i < tab.length; i += 3) {
        var start = tab[i],
            end = tab[i + 1],
            index = tab[i + 2];
        if (start <= val && val <= end) return i;
      }
      return -1;
    };

    Typr._lctf.readCoverage = function (data, offset) {
      var bin = Typr._bin;
      var cvg = {};
      cvg.fmt = bin.readUshort(data, offset);offset += 2;
      var count = bin.readUshort(data, offset);offset += 2;
      //console.log("parsing coverage", offset-4, format, count);
      if (cvg.fmt == 1) cvg.tab = bin.readUshorts(data, offset, count);
      if (cvg.fmt == 2) cvg.tab = bin.readUshorts(data, offset, count * 3);
      return cvg;
    };

    Typr._lctf.coverageIndex = function (cvg, val) {
      var tab = cvg.tab;
      if (cvg.fmt == 1) return tab.indexOf(val);
      if (cvg.fmt == 2) {
        var ind = Typr._lctf.getInterval(tab, val);
        if (ind != -1) return tab[ind + 2] + (val - tab[ind]);
      }
      return -1;
    };

    Typr._lctf.readFeatureList = function (data, offset) {
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = [];

      var count = bin.readUshort(data, offset);offset += 2;

      for (var i = 0; i < count; i++) {
        var tag = bin.readASCII(data, offset, 4);offset += 4;
        var noff = bin.readUshort(data, offset);offset += 2;
        obj.push({ tag: tag.trim(), tab: Typr._lctf.readFeatureTable(data, offset0 + noff) });
      }
      return obj;
    };

    Typr._lctf.readFeatureTable = function (data, offset) {
      var bin = Typr._bin;

      var featureParams = bin.readUshort(data, offset);offset += 2; // = 0
      var lookupCount = bin.readUshort(data, offset);offset += 2;

      var indices = [];
      for (var i = 0; i < lookupCount; i++) {
        indices.push(bin.readUshort(data, offset + 2 * i));
      }return indices;
    };

    Typr._lctf.readScriptList = function (data, offset) {
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = {};

      var count = bin.readUshort(data, offset);offset += 2;

      for (var i = 0; i < count; i++) {
        var tag = bin.readASCII(data, offset, 4);offset += 4;
        var noff = bin.readUshort(data, offset);offset += 2;
        obj[tag.trim()] = Typr._lctf.readScriptTable(data, offset0 + noff);
      }
      return obj;
    };

    Typr._lctf.readScriptTable = function (data, offset) {
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = {};

      var defLangSysOff = bin.readUshort(data, offset);offset += 2;
      obj.default = Typr._lctf.readLangSysTable(data, offset0 + defLangSysOff);

      var langSysCount = bin.readUshort(data, offset);offset += 2;

      for (var i = 0; i < langSysCount; i++) {
        var tag = bin.readASCII(data, offset, 4);offset += 4;
        var langSysOff = bin.readUshort(data, offset);offset += 2;
        obj[tag.trim()] = Typr._lctf.readLangSysTable(data, offset0 + langSysOff);
      }
      return obj;
    };

    Typr._lctf.readLangSysTable = function (data, offset) {
      var bin = Typr._bin;
      var obj = {};

      var lookupOrder = bin.readUshort(data, offset);offset += 2;
      //if(lookupOrder!=0)  throw "lookupOrder not 0";
      obj.reqFeature = bin.readUshort(data, offset);offset += 2;
      //if(obj.reqFeature != 0xffff) throw "reqFeatureIndex != 0xffff";

      //console.log(lookupOrder, obj.reqFeature);

      var featureCount = bin.readUshort(data, offset);offset += 2;
      obj.features = bin.readUshorts(data, offset, featureCount);
      return obj;
    };

    Typr.CFF = {};
    Typr.CFF.parse = function (data, offset, length) {
      var bin = Typr._bin;

      data = new Uint8Array(data.buffer, offset, length);
      offset = 0;

      // Header
      var major = data[offset];offset++;
      var minor = data[offset];offset++;
      var hdrSize = data[offset];offset++;
      var offsize = data[offset];offset++;
      //console.log(major, minor, hdrSize, offsize);

      // Name INDEX
      var ninds = [];
      offset = Typr.CFF.readIndex(data, offset, ninds);
      var names = [];

      for (var i = 0; i < ninds.length - 1; i++) {
        names.push(bin.readASCII(data, offset + ninds[i], ninds[i + 1] - ninds[i]));
      }offset += ninds[ninds.length - 1];

      // Top DICT INDEX
      var tdinds = [];
      offset = Typr.CFF.readIndex(data, offset, tdinds); //console.log(tdinds);
      // Top DICT Data
      var topDicts = [];
      for (var i = 0; i < tdinds.length - 1; i++) {
        topDicts.push(Typr.CFF.readDict(data, offset + tdinds[i], offset + tdinds[i + 1]));
      }offset += tdinds[tdinds.length - 1];
      var topdict = topDicts[0];
      //console.log(topdict);

      // String INDEX
      var sinds = [];
      offset = Typr.CFF.readIndex(data, offset, sinds);
      // String Data
      var strings = [];
      for (var i = 0; i < sinds.length - 1; i++) {
        strings.push(bin.readASCII(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
      }offset += sinds[sinds.length - 1];

      // Global Subr INDEX  (subroutines)		
      Typr.CFF.readSubrs(data, offset, topdict);

      // charstrings
      if (topdict.CharStrings) {
        offset = topdict.CharStrings;
        var sinds = [];
        offset = Typr.CFF.readIndex(data, offset, sinds);

        var cstr = [];
        for (var i = 0; i < sinds.length - 1; i++) {
          cstr.push(bin.readBytes(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
        } //offset += sinds[sinds.length-1];
        topdict.CharStrings = cstr;
        //console.log(topdict.CharStrings);
      }

      // CID font
      if (topdict.ROS) {
        offset = topdict.FDArray;
        var fdind = [];
        offset = Typr.CFF.readIndex(data, offset, fdind);

        topdict.FDArray = [];
        for (var i = 0; i < fdind.length - 1; i++) {
          var dict = Typr.CFF.readDict(data, offset + fdind[i], offset + fdind[i + 1]);
          Typr.CFF._readFDict(data, dict, strings);
          topdict.FDArray.push(dict);
        }
        offset += fdind[fdind.length - 1];

        offset = topdict.FDSelect;
        topdict.FDSelect = [];
        var fmt = data[offset];offset++;
        if (fmt == 3) {
          var rns = bin.readUshort(data, offset);offset += 2;
          for (var i = 0; i < rns + 1; i++) {
            topdict.FDSelect.push(bin.readUshort(data, offset), data[offset + 2]);offset += 3;
          }
        } else throw fmt;
      }

      // Encoding
      if (topdict.Encoding) topdict.Encoding = Typr.CFF.readEncoding(data, topdict.Encoding, topdict.CharStrings.length);

      // charset
      if (topdict.charset) topdict.charset = Typr.CFF.readCharset(data, topdict.charset, topdict.CharStrings.length);

      Typr.CFF._readFDict(data, topdict, strings);
      return topdict;
    };
    Typr.CFF._readFDict = function (data, dict, ss) {
      var offset;
      if (dict.Private) {
        offset = dict.Private[1];
        dict.Private = Typr.CFF.readDict(data, offset, offset + dict.Private[0]);
        if (dict.Private.Subrs) Typr.CFF.readSubrs(data, offset + dict.Private.Subrs, dict.Private);
      }
      for (var p in dict) {
        if (["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(p) != -1) dict[p] = ss[dict[p] - 426 + 35];
      }
    };

    Typr.CFF.readSubrs = function (data, offset, obj) {
      var bin = Typr._bin;
      var gsubinds = [];
      offset = Typr.CFF.readIndex(data, offset, gsubinds);

      var bias,
          nSubrs = gsubinds.length;
      if (nSubrs < 1240) bias = 107;else if (nSubrs < 33900) bias = 1131;else bias = 32768;
      obj.Bias = bias;

      obj.Subrs = [];
      for (var i = 0; i < gsubinds.length - 1; i++) {
        obj.Subrs.push(bin.readBytes(data, offset + gsubinds[i], gsubinds[i + 1] - gsubinds[i]));
      } //offset += gsubinds[gsubinds.length-1];
    };

    Typr.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0];

    Typr.CFF.glyphByUnicode = function (cff, code) {
      for (var i = 0; i < cff.charset.length; i++) {
        if (cff.charset[i] == code) return i;
      }return -1;
    };

    Typr.CFF.glyphBySE = function (cff, charcode) // glyph by standard encoding
    {
      if (charcode < 0 || charcode > 255) return -1;
      return Typr.CFF.glyphByUnicode(cff, Typr.CFF.tableSE[charcode]);
    };

    Typr.CFF.readEncoding = function (data, offset, num) {
      var bin = Typr._bin;

      var array = ['.notdef'];
      var format = data[offset];offset++;
      //console.log("Encoding");
      //console.log(format);

      if (format == 0) {
        var nCodes = data[offset];offset++;
        for (var i = 0; i < nCodes; i++) {
          array.push(data[offset + i]);
        }
      }
      /*
      else if(format==1 || format==2)
      {
      	while(charset.length<num)
      	{
      		var first = bin.readUshort(data, offset);  offset+=2;
      		var nLeft=0;
      		if(format==1) {  nLeft = data[offset];  offset++;  }
      		else          {  nLeft = bin.readUshort(data, offset);  offset+=2;  }
      		for(var i=0; i<=nLeft; i++)  {  charset.push(first);  first++;  }
      	}
      }
      */
      else throw "error: unknown encoding format: " + format;

      return array;
    };

    Typr.CFF.readCharset = function (data, offset, num) {
      var bin = Typr._bin;

      var charset = ['.notdef'];
      var format = data[offset];offset++;

      if (format == 0) {
        for (var i = 0; i < num; i++) {
          var first = bin.readUshort(data, offset);offset += 2;
          charset.push(first);
        }
      } else if (format == 1 || format == 2) {
        while (charset.length < num) {
          var first = bin.readUshort(data, offset);offset += 2;
          var nLeft = 0;
          if (format == 1) {
            nLeft = data[offset];offset++;
          } else {
            nLeft = bin.readUshort(data, offset);offset += 2;
          }
          for (var i = 0; i <= nLeft; i++) {
            charset.push(first);first++;
          }
        }
      } else throw "error: format: " + format;

      return charset;
    };

    Typr.CFF.readIndex = function (data, offset, inds) {
      var bin = Typr._bin;

      var count = bin.readUshort(data, offset) + 1;offset += 2;
      var offsize = data[offset];offset++;

      if (offsize == 1) for (var i = 0; i < count; i++) {
        inds.push(data[offset + i]);
      } else if (offsize == 2) for (var i = 0; i < count; i++) {
        inds.push(bin.readUshort(data, offset + i * 2));
      } else if (offsize == 3) for (var i = 0; i < count; i++) {
        inds.push(bin.readUint(data, offset + i * 3 - 1) & 0x00ffffff);
      } else if (count != 1) throw "unsupported offset size: " + offsize + ", count: " + count;

      offset += count * offsize;
      return offset - 1;
    };

    Typr.CFF.getCharString = function (data, offset, o) {
      var bin = Typr._bin;

      var b0 = data[offset],
          b1 = data[offset + 1],
          b2 = data[offset + 2],
          b3 = data[offset + 3],
          b4 = data[offset + 4];
      var vs = 1;
      var op = null,
          val = null;
      // operand
      if (b0 <= 20) {
        op = b0;vs = 1;
      }
      if (b0 == 12) {
        op = b0 * 100 + b1;vs = 2;
      }
      //if(b0==19 || b0==20) { op = b0/*+" "+b1*/;  vs=2; }
      if (21 <= b0 && b0 <= 27) {
        op = b0;vs = 1;
      }
      if (b0 == 28) {
        val = bin.readShort(data, offset + 1);vs = 3;
      }
      if (29 <= b0 && b0 <= 31) {
        op = b0;vs = 1;
      }
      if (32 <= b0 && b0 <= 246) {
        val = b0 - 139;vs = 1;
      }
      if (247 <= b0 && b0 <= 250) {
        val = (b0 - 247) * 256 + b1 + 108;vs = 2;
      }
      if (251 <= b0 && b0 <= 254) {
        val = -(b0 - 251) * 256 - b1 - 108;vs = 2;
      }
      if (b0 == 255) {
        val = bin.readInt(data, offset + 1) / 0xffff;vs = 5;
      }

      o.val = val != null ? val : "o" + op;
      o.size = vs;
    };

    Typr.CFF.readCharString = function (data, offset, length) {
      var end = offset + length;
      var bin = Typr._bin;
      var arr = [];

      while (offset < end) {
        var b0 = data[offset],
            b1 = data[offset + 1],
            b2 = data[offset + 2],
            b3 = data[offset + 3],
            b4 = data[offset + 4];
        var vs = 1;
        var op = null,
            val = null;
        // operand
        if (b0 <= 20) {
          op = b0;vs = 1;
        }
        if (b0 == 12) {
          op = b0 * 100 + b1;vs = 2;
        }
        if (b0 == 19 || b0 == 20) {
          op = b0 /*+" "+b1*/;vs = 2;
        }
        if (21 <= b0 && b0 <= 27) {
          op = b0;vs = 1;
        }
        if (b0 == 28) {
          val = bin.readShort(data, offset + 1);vs = 3;
        }
        if (29 <= b0 && b0 <= 31) {
          op = b0;vs = 1;
        }
        if (32 <= b0 && b0 <= 246) {
          val = b0 - 139;vs = 1;
        }
        if (247 <= b0 && b0 <= 250) {
          val = (b0 - 247) * 256 + b1 + 108;vs = 2;
        }
        if (251 <= b0 && b0 <= 254) {
          val = -(b0 - 251) * 256 - b1 - 108;vs = 2;
        }
        if (b0 == 255) {
          val = bin.readInt(data, offset + 1) / 0xffff;vs = 5;
        }

        arr.push(val != null ? val : "o" + op);
        offset += vs;

        //var cv = arr[arr.length-1];
        //if(cv==undefined) throw "error";
        //console.log()
      }
      return arr;
    };

    Typr.CFF.readDict = function (data, offset, end) {
      var bin = Typr._bin;
      //var dict = [];
      var dict = {};
      var carr = [];

      while (offset < end) {
        var b0 = data[offset],
            b1 = data[offset + 1],
            b2 = data[offset + 2],
            b3 = data[offset + 3],
            b4 = data[offset + 4];
        var vs = 1;
        var key = null,
            val = null;
        // operand
        if (b0 == 28) {
          val = bin.readShort(data, offset + 1);vs = 3;
        }
        if (b0 == 29) {
          val = bin.readInt(data, offset + 1);vs = 5;
        }
        if (32 <= b0 && b0 <= 246) {
          val = b0 - 139;vs = 1;
        }
        if (247 <= b0 && b0 <= 250) {
          val = (b0 - 247) * 256 + b1 + 108;vs = 2;
        }
        if (251 <= b0 && b0 <= 254) {
          val = -(b0 - 251) * 256 - b1 - 108;vs = 2;
        }
        if (b0 == 255) {
          val = bin.readInt(data, offset + 1) / 0xffff;vs = 5;throw "unknown number";
        }

        if (b0 == 30) {
          var nibs = [];
          vs = 1;
          while (true) {
            var b = data[offset + vs];vs++;
            var nib0 = b >> 4,
                nib1 = b & 0xf;
            if (nib0 != 0xf) nibs.push(nib0);if (nib1 != 0xf) nibs.push(nib1);
            if (nib1 == 0xf) break;
          }
          var s = "";
          var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"];
          for (var i = 0; i < nibs.length; i++) {
            s += chars[nibs[i]];
          } //console.log(nibs);
          val = parseFloat(s);
        }

        if (b0 <= 21) // operator
          {
            var keys = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"];

            key = keys[b0];vs = 1;
            if (b0 == 12) {
              var keys = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"];
              key = keys[b1];vs = 2;
            }
          }

        if (key != null) {
          dict[key] = carr.length == 1 ? carr[0] : carr;carr = [];
        } else carr.push(val);

        offset += vs;
      }
      return dict;
    };

    Typr.cmap = {};
    Typr.cmap.parse = function (data, offset, length) {
      data = new Uint8Array(data.buffer, offset, length);
      offset = 0;
      var bin = Typr._bin;
      var obj = {};
      var version = bin.readUshort(data, offset);offset += 2;
      var numTables = bin.readUshort(data, offset);offset += 2;

      //console.log(version, numTables);

      var offs = [];
      obj.tables = [];

      for (var i = 0; i < numTables; i++) {
        var platformID = bin.readUshort(data, offset);offset += 2;
        var encodingID = bin.readUshort(data, offset);offset += 2;
        var noffset = bin.readUint(data, offset);offset += 4;

        var id = "p" + platformID + "e" + encodingID;

        //console.log("cmap subtable", platformID, encodingID, noffset);


        var tind = offs.indexOf(noffset);

        if (tind == -1) {
          tind = obj.tables.length;
          var subt;
          offs.push(noffset);
          var format = bin.readUshort(data, noffset);
          if (format == 0) subt = Typr.cmap.parse0(data, noffset);else if (format == 4) subt = Typr.cmap.parse4(data, noffset);else if (format == 6) subt = Typr.cmap.parse6(data, noffset);else if (format == 12) subt = Typr.cmap.parse12(data, noffset);else console.log("unknown format: " + format, platformID, encodingID, noffset);
          obj.tables.push(subt);
        }

        if (obj[id] != null) throw "multiple tables for one platform+encoding";
        obj[id] = tind;
      }
      return obj;
    };

    Typr.cmap.parse0 = function (data, offset) {
      var bin = Typr._bin;
      var obj = {};
      obj.format = bin.readUshort(data, offset);offset += 2;
      var len = bin.readUshort(data, offset);offset += 2;
      var lang = bin.readUshort(data, offset);offset += 2;
      obj.map = [];
      for (var i = 0; i < len - 6; i++) {
        obj.map.push(data[offset + i]);
      }return obj;
    };

    Typr.cmap.parse4 = function (data, offset) {
      var bin = Typr._bin;
      var offset0 = offset;
      var obj = {};

      obj.format = bin.readUshort(data, offset);offset += 2;
      var length = bin.readUshort(data, offset);offset += 2;
      var language = bin.readUshort(data, offset);offset += 2;
      var segCountX2 = bin.readUshort(data, offset);offset += 2;
      var segCount = segCountX2 / 2;
      obj.searchRange = bin.readUshort(data, offset);offset += 2;
      obj.entrySelector = bin.readUshort(data, offset);offset += 2;
      obj.rangeShift = bin.readUshort(data, offset);offset += 2;
      obj.endCount = bin.readUshorts(data, offset, segCount);offset += segCount * 2;
      offset += 2;
      obj.startCount = bin.readUshorts(data, offset, segCount);offset += segCount * 2;
      obj.idDelta = [];
      for (var i = 0; i < segCount; i++) {
        obj.idDelta.push(bin.readShort(data, offset));offset += 2;
      }
      obj.idRangeOffset = bin.readUshorts(data, offset, segCount);offset += segCount * 2;
      obj.glyphIdArray = [];
      while (offset < offset0 + length) {
        obj.glyphIdArray.push(bin.readUshort(data, offset));offset += 2;
      }
      return obj;
    };

    Typr.cmap.parse6 = function (data, offset) {
      var bin = Typr._bin;
      var obj = {};

      obj.format = bin.readUshort(data, offset);offset += 2;
      var length = bin.readUshort(data, offset);offset += 2;
      var language = bin.readUshort(data, offset);offset += 2;
      obj.firstCode = bin.readUshort(data, offset);offset += 2;
      var entryCount = bin.readUshort(data, offset);offset += 2;
      obj.glyphIdArray = [];
      for (var i = 0; i < entryCount; i++) {
        obj.glyphIdArray.push(bin.readUshort(data, offset));offset += 2;
      }

      return obj;
    };

    Typr.cmap.parse12 = function (data, offset) {
      var bin = Typr._bin;
      var obj = {};

      obj.format = bin.readUshort(data, offset);offset += 2;
      offset += 2;
      var length = bin.readUint(data, offset);offset += 4;
      var lang = bin.readUint(data, offset);offset += 4;
      var nGroups = bin.readUint(data, offset);offset += 4;
      obj.groups = [];

      for (var i = 0; i < nGroups; i++) {
        var off = offset + i * 12;
        var startCharCode = bin.readUint(data, off + 0);
        var endCharCode = bin.readUint(data, off + 4);
        var startGlyphID = bin.readUint(data, off + 8);
        obj.groups.push([startCharCode, endCharCode, startGlyphID]);
      }
      return obj;
    };

    Typr.glyf = {};
    Typr.glyf.parse = function (data, offset, length, font) {
      var obj = [];
      for (var g = 0; g < font.maxp.numGlyphs; g++) {
        obj.push(null);
      }return obj;
    };

    Typr.glyf._parseGlyf = function (font, g) {
      var bin = Typr._bin;
      var data = font._data;

      var offset = Typr._tabOffset(data, "glyf", font._offset) + font.loca[g];

      if (font.loca[g] == font.loca[g + 1]) return null;

      var gl = {};

      gl.noc = bin.readShort(data, offset);offset += 2; // number of contours
      gl.xMin = bin.readShort(data, offset);offset += 2;
      gl.yMin = bin.readShort(data, offset);offset += 2;
      gl.xMax = bin.readShort(data, offset);offset += 2;
      gl.yMax = bin.readShort(data, offset);offset += 2;

      if (gl.xMin >= gl.xMax || gl.yMin >= gl.yMax) return null;

      if (gl.noc > 0) {
        gl.endPts = [];
        for (var i = 0; i < gl.noc; i++) {
          gl.endPts.push(bin.readUshort(data, offset));offset += 2;
        }

        var instructionLength = bin.readUshort(data, offset);offset += 2;
        if (data.length - offset < instructionLength) return null;
        gl.instructions = bin.readBytes(data, offset, instructionLength);offset += instructionLength;

        var crdnum = gl.endPts[gl.noc - 1] + 1;
        gl.flags = [];
        for (var i = 0; i < crdnum; i++) {
          var flag = data[offset];offset++;
          gl.flags.push(flag);
          if ((flag & 8) != 0) {
            var rep = data[offset];offset++;
            for (var j = 0; j < rep; j++) {
              gl.flags.push(flag);i++;
            }
          }
        }
        gl.xs = [];
        for (var i = 0; i < crdnum; i++) {
          var i8 = (gl.flags[i] & 2) != 0,
              same = (gl.flags[i] & 16) != 0;
          if (i8) {
            gl.xs.push(same ? data[offset] : -data[offset]);offset++;
          } else {
            if (same) gl.xs.push(0);else {
              gl.xs.push(bin.readShort(data, offset));offset += 2;
            }
          }
        }
        gl.ys = [];
        for (var i = 0; i < crdnum; i++) {
          var i8 = (gl.flags[i] & 4) != 0,
              same = (gl.flags[i] & 32) != 0;
          if (i8) {
            gl.ys.push(same ? data[offset] : -data[offset]);offset++;
          } else {
            if (same) gl.ys.push(0);else {
              gl.ys.push(bin.readShort(data, offset));offset += 2;
            }
          }
        }
        var x = 0,
            y = 0;
        for (var i = 0; i < crdnum; i++) {
          x += gl.xs[i];y += gl.ys[i];gl.xs[i] = x;gl.ys[i] = y;
        }
        //console.log(endPtsOfContours, instructionLength, instructions, flags, xCoordinates, yCoordinates);
      } else {
        var ARG_1_AND_2_ARE_WORDS = 1 << 0;
        var ARGS_ARE_XY_VALUES = 1 << 1;
        var WE_HAVE_A_SCALE = 1 << 3;
        var MORE_COMPONENTS = 1 << 5;
        var WE_HAVE_AN_X_AND_Y_SCALE = 1 << 6;
        var WE_HAVE_A_TWO_BY_TWO = 1 << 7;
        var WE_HAVE_INSTRUCTIONS = 1 << 8;

        gl.parts = [];
        var flags;
        do {
          flags = bin.readUshort(data, offset);offset += 2;
          var part = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };gl.parts.push(part);
          part.glyphIndex = bin.readUshort(data, offset);offset += 2;
          if (flags & ARG_1_AND_2_ARE_WORDS) {
            var arg1 = bin.readShort(data, offset);offset += 2;
            var arg2 = bin.readShort(data, offset);offset += 2;
          } else {
            var arg1 = bin.readInt8(data, offset);offset++;
            var arg2 = bin.readInt8(data, offset);offset++;
          }

          if (flags & ARGS_ARE_XY_VALUES) {
            part.m.tx = arg1;part.m.ty = arg2;
          } else {
            part.p1 = arg1;part.p2 = arg2;
          }
          //part.m.tx = arg1;  part.m.ty = arg2;
          //else { throw "params are not XY values"; }

          if (flags & WE_HAVE_A_SCALE) {
            part.m.a = part.m.d = bin.readF2dot14(data, offset);offset += 2;
          } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
            part.m.a = bin.readF2dot14(data, offset);offset += 2;
            part.m.d = bin.readF2dot14(data, offset);offset += 2;
          } else if (flags & WE_HAVE_A_TWO_BY_TWO) {
            part.m.a = bin.readF2dot14(data, offset);offset += 2;
            part.m.b = bin.readF2dot14(data, offset);offset += 2;
            part.m.c = bin.readF2dot14(data, offset);offset += 2;
            part.m.d = bin.readF2dot14(data, offset);offset += 2;
          }
        } while (flags & MORE_COMPONENTS);
        if (flags & WE_HAVE_INSTRUCTIONS) {
          var numInstr = bin.readUshort(data, offset);offset += 2;
          gl.instr = [];
          for (var i = 0; i < numInstr; i++) {
            gl.instr.push(data[offset]);offset++;
          }
        }
      }
      return gl;
    };

    Typr.GPOS = {};
    Typr.GPOS.parse = function (data, offset, length, font) {
      return Typr._lctf.parse(data, offset, length, font, Typr.GPOS.subt);
    };

    Typr.GPOS.subt = function (data, ltype, offset) // lookup type
    {
      var bin = Typr._bin,
          offset0 = offset,
          tab = {};

      tab.fmt = bin.readUshort(data, offset);offset += 2;

      //console.log(ltype, tab.fmt);

      if (ltype == 1 || ltype == 2 || ltype == 3 || ltype == 7 || ltype == 8 && tab.fmt <= 2) {
        var covOff = bin.readUshort(data, offset);offset += 2;
        tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0);
      }
      if (ltype == 1 && tab.fmt == 1) {
        var valFmt1 = bin.readUshort(data, offset);offset += 2;
        var ones1 = Typr._lctf.numOfOnes(valFmt1);
        if (valFmt1 != 0) tab.pos = Typr.GPOS.readValueRecord(data, offset, valFmt1);
      } else if (ltype == 2) {
        var valFmt1 = bin.readUshort(data, offset);offset += 2;
        var valFmt2 = bin.readUshort(data, offset);offset += 2;
        var ones1 = Typr._lctf.numOfOnes(valFmt1);
        var ones2 = Typr._lctf.numOfOnes(valFmt2);
        if (tab.fmt == 1) {
          tab.pairsets = [];
          var psc = bin.readUshort(data, offset);offset += 2; // PairSetCount

          for (var i = 0; i < psc; i++) {
            var psoff = offset0 + bin.readUshort(data, offset);offset += 2;

            var pvc = bin.readUshort(data, psoff);psoff += 2;
            var arr = [];
            for (var j = 0; j < pvc; j++) {
              var gid2 = bin.readUshort(data, psoff);psoff += 2;
              var value1, value2;
              if (valFmt1 != 0) {
                value1 = Typr.GPOS.readValueRecord(data, psoff, valFmt1);psoff += ones1 * 2;
              }
              if (valFmt2 != 0) {
                value2 = Typr.GPOS.readValueRecord(data, psoff, valFmt2);psoff += ones2 * 2;
              }
              //if(value1!=null) throw "e";
              arr.push({ gid2: gid2, val1: value1, val2: value2 });
            }
            tab.pairsets.push(arr);
          }
        }
        if (tab.fmt == 2) {
          var classDef1 = bin.readUshort(data, offset);offset += 2;
          var classDef2 = bin.readUshort(data, offset);offset += 2;
          var class1Count = bin.readUshort(data, offset);offset += 2;
          var class2Count = bin.readUshort(data, offset);offset += 2;

          tab.classDef1 = Typr._lctf.readClassDef(data, offset0 + classDef1);
          tab.classDef2 = Typr._lctf.readClassDef(data, offset0 + classDef2);

          tab.matrix = [];
          for (var i = 0; i < class1Count; i++) {
            var row = [];
            for (var j = 0; j < class2Count; j++) {
              var value1 = null,
                  value2 = null;
              if (tab.valFmt1 != 0) {
                value1 = Typr.GPOS.readValueRecord(data, offset, tab.valFmt1);offset += ones1 * 2;
              }
              if (tab.valFmt2 != 0) {
                value2 = Typr.GPOS.readValueRecord(data, offset, tab.valFmt2);offset += ones2 * 2;
              }
              row.push({ val1: value1, val2: value2 });
            }
            tab.matrix.push(row);
          }
        }
      }
      return tab;
    };

    Typr.GPOS.readValueRecord = function (data, offset, valFmt) {
      var bin = Typr._bin;
      var arr = [];
      arr.push(valFmt & 1 ? bin.readShort(data, offset) : 0);offset += valFmt & 1 ? 2 : 0; // X_PLACEMENT
      arr.push(valFmt & 2 ? bin.readShort(data, offset) : 0);offset += valFmt & 2 ? 2 : 0; // Y_PLACEMENT
      arr.push(valFmt & 4 ? bin.readShort(data, offset) : 0);offset += valFmt & 4 ? 2 : 0; // X_ADVANCE
      arr.push(valFmt & 8 ? bin.readShort(data, offset) : 0);offset += valFmt & 8 ? 2 : 0; // Y_ADVANCE
      return arr;
    };

    Typr.GSUB = {};
    Typr.GSUB.parse = function (data, offset, length, font) {
      return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);
    };

    Typr.GSUB.subt = function (data, ltype, offset) // lookup type
    {
      var bin = Typr._bin,
          offset0 = offset,
          tab = {};

      tab.fmt = bin.readUshort(data, offset);offset += 2;

      if (ltype != 1 && ltype != 4 && ltype != 5 && ltype != 6) return null;

      if (ltype == 1 || ltype == 4 || ltype == 5 && tab.fmt <= 2 || ltype == 6 && tab.fmt <= 2) {
        var covOff = bin.readUshort(data, offset);offset += 2;
        tab.coverage = Typr._lctf.readCoverage(data, offset0 + covOff); // not always is coverage here
      }

      if (ltype == 1) {
        if (tab.fmt == 1) {
          tab.delta = bin.readShort(data, offset);offset += 2;
        } else if (tab.fmt == 2) {
          var cnt = bin.readUshort(data, offset);offset += 2;
          tab.newg = bin.readUshorts(data, offset, cnt);offset += tab.newg.length * 2;
        }
      }
      //  Ligature Substitution Subtable
      else if (ltype == 4) {
          tab.vals = [];
          var cnt = bin.readUshort(data, offset);offset += 2;
          for (var i = 0; i < cnt; i++) {
            var loff = bin.readUshort(data, offset);offset += 2;
            tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0 + loff));
          }
          //console.log(tab.coverage);
          //console.log(tab.vals);
        }
        //  Contextual Substitution Subtable
        else if (ltype == 5) {
            if (tab.fmt == 2) {
              var cDefOffset = bin.readUshort(data, offset);offset += 2;
              tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset);
              tab.scset = [];
              var subClassSetCount = bin.readUshort(data, offset);offset += 2;
              for (var i = 0; i < subClassSetCount; i++) {
                var scsOff = bin.readUshort(data, offset);offset += 2;
                tab.scset.push(scsOff == 0 ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff));
              }
            }
            //else console.log("unknown table format", tab.fmt);
          }
          //*
          else if (ltype == 6) {
              /*
              if(tab.fmt==2) {
              	var btDef = bin.readUshort(data, offset);  offset+=2;
              	var inDef = bin.readUshort(data, offset);  offset+=2;
              	var laDef = bin.readUshort(data, offset);  offset+=2;
              	
              	tab.btDef = Typr._lctf.readClassDef(data, offset0 + btDef);
              	tab.inDef = Typr._lctf.readClassDef(data, offset0 + inDef);
              	tab.laDef = Typr._lctf.readClassDef(data, offset0 + laDef);
              	
              	tab.scset = [];
              	var cnt = bin.readUshort(data, offset);  offset+=2;
              	for(var i=0; i<cnt; i++) {
              		var loff = bin.readUshort(data, offset);  offset+=2;
              		tab.scset.push(Typr.GSUB.readChainSubClassSet(data, offset0+loff));
              	}
              }
              */
              if (tab.fmt == 3) {
                for (var i = 0; i < 3; i++) {
                  var cnt = bin.readUshort(data, offset);offset += 2;
                  var cvgs = [];
                  for (var j = 0; j < cnt; j++) {
                    cvgs.push(Typr._lctf.readCoverage(data, offset0 + bin.readUshort(data, offset + j * 2)));
                  }offset += cnt * 2;
                  if (i == 0) tab.backCvg = cvgs;
                  if (i == 1) tab.inptCvg = cvgs;
                  if (i == 2) tab.ahedCvg = cvgs;
                }
                var cnt = bin.readUshort(data, offset);offset += 2;
                tab.lookupRec = Typr.GSUB.readSubstLookupRecords(data, offset, cnt);
              }
              //console.log(tab);
            } //*/
      //if(tab.coverage.indexOf(3)!=-1) console.log(ltype, fmt, tab);

      return tab;
    };

    Typr.GSUB.readSubClassSet = function (data, offset) {
      var rUs = Typr._bin.readUshort,
          offset0 = offset,
          lset = [];
      var cnt = rUs(data, offset);offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = rUs(data, offset);offset += 2;
        lset.push(Typr.GSUB.readSubClassRule(data, offset0 + loff));
      }
      return lset;
    };
    Typr.GSUB.readSubClassRule = function (data, offset) {
      var rUs = Typr._bin.readUshort,
          rule = {};
      var gcount = rUs(data, offset);offset += 2;
      var scount = rUs(data, offset);offset += 2;
      rule.input = [];
      for (var i = 0; i < gcount - 1; i++) {
        rule.input.push(rUs(data, offset));offset += 2;
      }
      rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount);
      return rule;
    };
    Typr.GSUB.readSubstLookupRecords = function (data, offset, cnt) {
      var rUs = Typr._bin.readUshort;
      var out = [];
      for (var i = 0; i < cnt; i++) {
        out.push(rUs(data, offset), rUs(data, offset + 2));offset += 4;
      }
      return out;
    };

    Typr.GSUB.readChainSubClassSet = function (data, offset) {
      var bin = Typr._bin,
          offset0 = offset,
          lset = [];
      var cnt = bin.readUshort(data, offset);offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = bin.readUshort(data, offset);offset += 2;
        lset.push(Typr.GSUB.readChainSubClassRule(data, offset0 + loff));
      }
      return lset;
    };
    Typr.GSUB.readChainSubClassRule = function (data, offset) {
      var bin = Typr._bin,
          rule = {};
      var pps = ["backtrack", "input", "lookahead"];
      for (var pi = 0; pi < pps.length; pi++) {
        var cnt = bin.readUshort(data, offset);offset += 2;if (pi == 1) cnt--;
        rule[pps[pi]] = bin.readUshorts(data, offset, cnt);offset += rule[pps[pi]].length * 2;
      }
      var cnt = bin.readUshort(data, offset);offset += 2;
      rule.subst = bin.readUshorts(data, offset, cnt * 2);offset += rule.subst.length * 2;
      return rule;
    };

    Typr.GSUB.readLigatureSet = function (data, offset) {
      var bin = Typr._bin,
          offset0 = offset,
          lset = [];
      var lcnt = bin.readUshort(data, offset);offset += 2;
      for (var j = 0; j < lcnt; j++) {
        var loff = bin.readUshort(data, offset);offset += 2;
        lset.push(Typr.GSUB.readLigature(data, offset0 + loff));
      }
      return lset;
    };
    Typr.GSUB.readLigature = function (data, offset) {
      var bin = Typr._bin,
          lig = { chain: [] };
      lig.nglyph = bin.readUshort(data, offset);offset += 2;
      var ccnt = bin.readUshort(data, offset);offset += 2;
      for (var k = 0; k < ccnt - 1; k++) {
        lig.chain.push(bin.readUshort(data, offset));offset += 2;
      }
      return lig;
    };

    Typr.head = {};
    Typr.head.parse = function (data, offset, length) {
      var bin = Typr._bin;
      var obj = {};
      var tableVersion = bin.readFixed(data, offset);offset += 4;
      obj.fontRevision = bin.readFixed(data, offset);offset += 4;
      var checkSumAdjustment = bin.readUint(data, offset);offset += 4;
      var magicNumber = bin.readUint(data, offset);offset += 4;
      obj.flags = bin.readUshort(data, offset);offset += 2;
      obj.unitsPerEm = bin.readUshort(data, offset);offset += 2;
      obj.created = bin.readUint64(data, offset);offset += 8;
      obj.modified = bin.readUint64(data, offset);offset += 8;
      obj.xMin = bin.readShort(data, offset);offset += 2;
      obj.yMin = bin.readShort(data, offset);offset += 2;
      obj.xMax = bin.readShort(data, offset);offset += 2;
      obj.yMax = bin.readShort(data, offset);offset += 2;
      obj.macStyle = bin.readUshort(data, offset);offset += 2;
      obj.lowestRecPPEM = bin.readUshort(data, offset);offset += 2;
      obj.fontDirectionHint = bin.readShort(data, offset);offset += 2;
      obj.indexToLocFormat = bin.readShort(data, offset);offset += 2;
      obj.glyphDataFormat = bin.readShort(data, offset);offset += 2;
      return obj;
    };

    Typr.hhea = {};
    Typr.hhea.parse = function (data, offset, length) {
      var bin = Typr._bin;
      var obj = {};
      var tableVersion = bin.readFixed(data, offset);offset += 4;
      obj.ascender = bin.readShort(data, offset);offset += 2;
      obj.descender = bin.readShort(data, offset);offset += 2;
      obj.lineGap = bin.readShort(data, offset);offset += 2;

      obj.advanceWidthMax = bin.readUshort(data, offset);offset += 2;
      obj.minLeftSideBearing = bin.readShort(data, offset);offset += 2;
      obj.minRightSideBearing = bin.readShort(data, offset);offset += 2;
      obj.xMaxExtent = bin.readShort(data, offset);offset += 2;

      obj.caretSlopeRise = bin.readShort(data, offset);offset += 2;
      obj.caretSlopeRun = bin.readShort(data, offset);offset += 2;
      obj.caretOffset = bin.readShort(data, offset);offset += 2;

      offset += 4 * 2;

      obj.metricDataFormat = bin.readShort(data, offset);offset += 2;
      obj.numberOfHMetrics = bin.readUshort(data, offset);offset += 2;
      return obj;
    };

    Typr.hmtx = {};
    Typr.hmtx.parse = function (data, offset, length, font) {
      var bin = Typr._bin;
      var obj = {};

      obj.aWidth = [];
      obj.lsBearing = [];

      var aw = 0,
          lsb = 0;

      for (var i = 0; i < font.maxp.numGlyphs; i++) {
        if (i < font.hhea.numberOfHMetrics) {
          aw = bin.readUshort(data, offset);offset += 2;lsb = bin.readShort(data, offset);offset += 2;
        }
        obj.aWidth.push(aw);
        obj.lsBearing.push(lsb);
      }

      return obj;
    };

    Typr.kern = {};
    Typr.kern.parse = function (data, offset, length, font) {
      var bin = Typr._bin;

      var version = bin.readUshort(data, offset);offset += 2;
      if (version == 1) return Typr.kern.parseV1(data, offset - 2, length, font);
      var nTables = bin.readUshort(data, offset);offset += 2;

      var map = { glyph1: [], rval: [] };
      for (var i = 0; i < nTables; i++) {
        offset += 2; // skip version
        var length = bin.readUshort(data, offset);offset += 2;
        var coverage = bin.readUshort(data, offset);offset += 2;
        var format = coverage >>> 8;
        /* I have seen format 128 once, that's why I do */format &= 0xf;
        if (format == 0) offset = Typr.kern.readFormat0(data, offset, map);else throw "unknown kern table format: " + format;
      }
      return map;
    };

    Typr.kern.parseV1 = function (data, offset, length, font) {
      var bin = Typr._bin;

      var version = bin.readFixed(data, offset);offset += 4;
      var nTables = bin.readUint(data, offset);offset += 4;

      var map = { glyph1: [], rval: [] };
      for (var i = 0; i < nTables; i++) {
        var length = bin.readUint(data, offset);offset += 4;
        var coverage = bin.readUshort(data, offset);offset += 2;
        var tupleIndex = bin.readUshort(data, offset);offset += 2;
        var format = coverage >>> 8;
        /* I have seen format 128 once, that's why I do */format &= 0xf;
        if (format == 0) offset = Typr.kern.readFormat0(data, offset, map);else throw "unknown kern table format: " + format;
      }
      return map;
    };

    Typr.kern.readFormat0 = function (data, offset, map) {
      var bin = Typr._bin;
      var pleft = -1;
      var nPairs = bin.readUshort(data, offset);offset += 2;
      var searchRange = bin.readUshort(data, offset);offset += 2;
      var entrySelector = bin.readUshort(data, offset);offset += 2;
      var rangeShift = bin.readUshort(data, offset);offset += 2;
      for (var j = 0; j < nPairs; j++) {
        var left = bin.readUshort(data, offset);offset += 2;
        var right = bin.readUshort(data, offset);offset += 2;
        var value = bin.readShort(data, offset);offset += 2;
        if (left != pleft) {
          map.glyph1.push(left);map.rval.push({ glyph2: [], vals: [] });
        }
        var rval = map.rval[map.rval.length - 1];
        rval.glyph2.push(right);rval.vals.push(value);
        pleft = left;
      }
      return offset;
    };

    Typr.loca = {};
    Typr.loca.parse = function (data, offset, length, font) {
      var bin = Typr._bin;
      var obj = [];

      var ver = font.head.indexToLocFormat;
      //console.log("loca", ver, length, 4*font.maxp.numGlyphs);
      var len = font.maxp.numGlyphs + 1;

      if (ver == 0) for (var i = 0; i < len; i++) {
        obj.push(bin.readUshort(data, offset + (i << 1)) << 1);
      }if (ver == 1) for (var i = 0; i < len; i++) {
        obj.push(bin.readUint(data, offset + (i << 2)));
      }return obj;
    };

    Typr.maxp = {};
    Typr.maxp.parse = function (data, offset, length) {
      //console.log(data.length, offset, length);

      var bin = Typr._bin;
      var obj = {};

      // both versions 0.5 and 1.0
      var ver = bin.readUint(data, offset);offset += 4;
      obj.numGlyphs = bin.readUshort(data, offset);offset += 2;

      // only 1.0
      if (ver == 0x00010000) {
        obj.maxPoints = bin.readUshort(data, offset);offset += 2;
        obj.maxContours = bin.readUshort(data, offset);offset += 2;
        obj.maxCompositePoints = bin.readUshort(data, offset);offset += 2;
        obj.maxCompositeContours = bin.readUshort(data, offset);offset += 2;
        obj.maxZones = bin.readUshort(data, offset);offset += 2;
        obj.maxTwilightPoints = bin.readUshort(data, offset);offset += 2;
        obj.maxStorage = bin.readUshort(data, offset);offset += 2;
        obj.maxFunctionDefs = bin.readUshort(data, offset);offset += 2;
        obj.maxInstructionDefs = bin.readUshort(data, offset);offset += 2;
        obj.maxStackElements = bin.readUshort(data, offset);offset += 2;
        obj.maxSizeOfInstructions = bin.readUshort(data, offset);offset += 2;
        obj.maxComponentElements = bin.readUshort(data, offset);offset += 2;
        obj.maxComponentDepth = bin.readUshort(data, offset);offset += 2;
      }

      return obj;
    };

    Typr.name = {};
    Typr.name.parse = function (data, offset, length) {
      var bin = Typr._bin;
      var obj = {};
      var format = bin.readUshort(data, offset);offset += 2;
      var count = bin.readUshort(data, offset);offset += 2;
      var stringOffset = bin.readUshort(data, offset);offset += 2;

      //console.log(format,count);

      var names = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"];

      var offset0 = offset;

      for (var i = 0; i < count; i++) {
        var platformID = bin.readUshort(data, offset);offset += 2;
        var encodingID = bin.readUshort(data, offset);offset += 2;
        var languageID = bin.readUshort(data, offset);offset += 2;
        var nameID = bin.readUshort(data, offset);offset += 2;
        var slen = bin.readUshort(data, offset);offset += 2;
        var noffset = bin.readUshort(data, offset);offset += 2;
        //console.log(platformID, encodingID, languageID.toString(16), nameID, length, noffset);

        var cname = names[nameID];
        var soff = offset0 + count * 12 + noffset;
        var str;
        if (platformID == 0) str = bin.readUnicode(data, soff, slen / 2);else if (platformID == 3 && encodingID == 0) str = bin.readUnicode(data, soff, slen / 2);else if (encodingID == 0) str = bin.readASCII(data, soff, slen);else if (encodingID == 1) str = bin.readUnicode(data, soff, slen / 2);else if (encodingID == 3) str = bin.readUnicode(data, soff, slen / 2);else if (platformID == 1) {
          str = bin.readASCII(data, soff, slen);console.log("reading unknown MAC encoding " + encodingID + " as ASCII");
        } else throw "unknown encoding " + encodingID + ", platformID: " + platformID;

        var tid = "p" + platformID + "," + languageID.toString(16); //Typr._platforms[platformID];
        if (obj[tid] == null) obj[tid] = {};
        obj[tid][cname] = str;
        obj[tid]._lang = languageID;
        //console.log(tid, obj[tid]);
      }
      /*
      if(format == 1)
      {
      	var langTagCount = bin.readUshort(data, offset);  offset += 2;
      	for(var i=0; i<langTagCount; i++)
      	{
      		var length  = bin.readUshort(data, offset);  offset += 2;
      		var noffset = bin.readUshort(data, offset);  offset += 2;
      	}
      }
      */

      //console.log(obj);

      for (var p in obj) {
        if (obj[p].postScriptName != null && obj[p]._lang == 0x0409) return obj[p];
      } // United States
      for (var p in obj) {
        if (obj[p].postScriptName != null && obj[p]._lang == 0x0000) return obj[p];
      } // Universal
      for (var p in obj) {
        if (obj[p].postScriptName != null && obj[p]._lang == 0x0c0c) return obj[p];
      } // Canada
      for (var p in obj) {
        if (obj[p].postScriptName != null) return obj[p];
      }var tname;
      for (var p in obj) {
        tname = p;break;
      }
      console.log("returning name table with languageID " + obj[tname]._lang);
      return obj[tname];
    };

    Typr["OS/2"] = {};
    Typr["OS/2"].parse = function (data, offset, length) {
      var bin = Typr._bin;
      var ver = bin.readUshort(data, offset);offset += 2;

      var obj = {};
      if (ver == 0) Typr["OS/2"].version0(data, offset, obj);else if (ver == 1) Typr["OS/2"].version1(data, offset, obj);else if (ver == 2 || ver == 3 || ver == 4) Typr["OS/2"].version2(data, offset, obj);else if (ver == 5) Typr["OS/2"].version5(data, offset, obj);else throw "unknown OS/2 table version: " + ver;

      return obj;
    };

    Typr["OS/2"].version0 = function (data, offset, obj) {
      var bin = Typr._bin;
      obj.xAvgCharWidth = bin.readShort(data, offset);offset += 2;
      obj.usWeightClass = bin.readUshort(data, offset);offset += 2;
      obj.usWidthClass = bin.readUshort(data, offset);offset += 2;
      obj.fsType = bin.readUshort(data, offset);offset += 2;
      obj.ySubscriptXSize = bin.readShort(data, offset);offset += 2;
      obj.ySubscriptYSize = bin.readShort(data, offset);offset += 2;
      obj.ySubscriptXOffset = bin.readShort(data, offset);offset += 2;
      obj.ySubscriptYOffset = bin.readShort(data, offset);offset += 2;
      obj.ySuperscriptXSize = bin.readShort(data, offset);offset += 2;
      obj.ySuperscriptYSize = bin.readShort(data, offset);offset += 2;
      obj.ySuperscriptXOffset = bin.readShort(data, offset);offset += 2;
      obj.ySuperscriptYOffset = bin.readShort(data, offset);offset += 2;
      obj.yStrikeoutSize = bin.readShort(data, offset);offset += 2;
      obj.yStrikeoutPosition = bin.readShort(data, offset);offset += 2;
      obj.sFamilyClass = bin.readShort(data, offset);offset += 2;
      obj.panose = bin.readBytes(data, offset, 10);offset += 10;
      obj.ulUnicodeRange1 = bin.readUint(data, offset);offset += 4;
      obj.ulUnicodeRange2 = bin.readUint(data, offset);offset += 4;
      obj.ulUnicodeRange3 = bin.readUint(data, offset);offset += 4;
      obj.ulUnicodeRange4 = bin.readUint(data, offset);offset += 4;
      obj.achVendID = [bin.readInt8(data, offset), bin.readInt8(data, offset + 1), bin.readInt8(data, offset + 2), bin.readInt8(data, offset + 3)];offset += 4;
      obj.fsSelection = bin.readUshort(data, offset);offset += 2;
      obj.usFirstCharIndex = bin.readUshort(data, offset);offset += 2;
      obj.usLastCharIndex = bin.readUshort(data, offset);offset += 2;
      obj.sTypoAscender = bin.readShort(data, offset);offset += 2;
      obj.sTypoDescender = bin.readShort(data, offset);offset += 2;
      obj.sTypoLineGap = bin.readShort(data, offset);offset += 2;
      obj.usWinAscent = bin.readUshort(data, offset);offset += 2;
      obj.usWinDescent = bin.readUshort(data, offset);offset += 2;
      return offset;
    };

    Typr["OS/2"].version1 = function (data, offset, obj) {
      var bin = Typr._bin;
      offset = Typr["OS/2"].version0(data, offset, obj);

      obj.ulCodePageRange1 = bin.readUint(data, offset);offset += 4;
      obj.ulCodePageRange2 = bin.readUint(data, offset);offset += 4;
      return offset;
    };

    Typr["OS/2"].version2 = function (data, offset, obj) {
      var bin = Typr._bin;
      offset = Typr["OS/2"].version1(data, offset, obj);

      obj.sxHeight = bin.readShort(data, offset);offset += 2;
      obj.sCapHeight = bin.readShort(data, offset);offset += 2;
      obj.usDefault = bin.readUshort(data, offset);offset += 2;
      obj.usBreak = bin.readUshort(data, offset);offset += 2;
      obj.usMaxContext = bin.readUshort(data, offset);offset += 2;
      return offset;
    };

    Typr["OS/2"].version5 = function (data, offset, obj) {
      var bin = Typr._bin;
      offset = Typr["OS/2"].version2(data, offset, obj);

      obj.usLowerOpticalPointSize = bin.readUshort(data, offset);offset += 2;
      obj.usUpperOpticalPointSize = bin.readUshort(data, offset);offset += 2;
      return offset;
    };

    Typr.post = {};
    Typr.post.parse = function (data, offset, length) {
      var bin = Typr._bin;
      var obj = {};

      obj.version = bin.readFixed(data, offset);offset += 4;
      obj.italicAngle = bin.readFixed(data, offset);offset += 4;
      obj.underlinePosition = bin.readShort(data, offset);offset += 2;
      obj.underlineThickness = bin.readShort(data, offset);offset += 2;

      return obj;
    };
    Typr.SVG = {};
    Typr.SVG.parse = function (data, offset, length) {
      var bin = Typr._bin;
      var obj = { entries: [] };

      var offset0 = offset;

      var tableVersion = bin.readUshort(data, offset);offset += 2;
      var svgDocIndexOffset = bin.readUint(data, offset);offset += 4;
      var reserved = bin.readUint(data, offset);offset += 4;

      offset = svgDocIndexOffset + offset0;

      var numEntries = bin.readUshort(data, offset);offset += 2;

      for (var i = 0; i < numEntries; i++) {
        var startGlyphID = bin.readUshort(data, offset);offset += 2;
        var endGlyphID = bin.readUshort(data, offset);offset += 2;
        var svgDocOffset = bin.readUint(data, offset);offset += 4;
        var svgDocLength = bin.readUint(data, offset);offset += 4;

        var sbuf = new Uint8Array(data.buffer, offset0 + svgDocOffset + svgDocIndexOffset, svgDocLength);
        var svg = bin.readUTF8(sbuf, 0, sbuf.length);

        for (var f = startGlyphID; f <= endGlyphID; f++) {
          obj.entries[f] = svg;
        }
      }
      return obj;
    };

    Typr.SVG.toPath = function (str) {
      var pth = { cmds: [], crds: [] };
      if (str == null) return pth;

      var prsr = new DOMParser();
      var doc = prsr["parseFromString"](str, "image/svg+xml");

      var svg = doc.firstChild;while (svg.tagName != "svg") {
        svg = svg.nextSibling;
      }var vb = svg.getAttribute("viewBox");
      if (vb) vb = vb.trim().split(" ").map(parseFloat);else vb = [0, 0, 1000, 1000];
      Typr.SVG._toPath(svg.children, pth);
      for (var i = 0; i < pth.crds.length; i += 2) {
        var x = pth.crds[i],
            y = pth.crds[i + 1];
        x -= vb[0];
        y -= vb[1];
        y = -y;
        pth.crds[i] = x;
        pth.crds[i + 1] = y;
      }
      return pth;
    };

    Typr.SVG._toPath = function (nds, pth, fill) {
      for (var ni = 0; ni < nds.length; ni++) {
        var nd = nds[ni],
            tn = nd.tagName;
        var cfl = nd.getAttribute("fill");if (cfl == null) cfl = fill;
        if (tn == "g") Typr.SVG._toPath(nd.children, pth, cfl);else if (tn == "path") {
          pth.cmds.push(cfl ? cfl : "#000000");
          var d = nd.getAttribute("d"); //console.log(d);
          var toks = Typr.SVG._tokens(d); //console.log(toks);
          Typr.SVG._toksToPath(toks, pth);pth.cmds.push("X");
        } else if (tn == "defs") ;else console.log(tn, nd);
      }
    };

    Typr.SVG._tokens = function (d) {
      var ts = [],
          off = 0,
          rn = false,
          cn = ""; // reading number, current number
      while (off < d.length) {
        var cc = d.charCodeAt(off),
            ch = d.charAt(off);off++;
        var isNum = 48 <= cc && cc <= 57 || ch == "." || ch == "-";

        if (rn) {
          if (ch == "-") {
            ts.push(parseFloat(cn));cn = ch;
          } else if (isNum) cn += ch;else {
            ts.push(parseFloat(cn));if (ch != "," && ch != " ") ts.push(ch);rn = false;
          }
        } else {
          if (isNum) {
            cn = ch;rn = true;
          } else if (ch != "," && ch != " ") ts.push(ch);
        }
      }
      if (rn) ts.push(parseFloat(cn));
      return ts;
    };

    Typr.SVG._toksToPath = function (ts, pth) {
      var i = 0,
          x = 0,
          y = 0,
          ox = 0,
          oy = 0;
      var pc = { "M": 2, "L": 2, "H": 1, "V": 1, "S": 4, "C": 6 };
      var cmds = pth.cmds,
          crds = pth.crds;

      while (i < ts.length) {
        var cmd = ts[i];i++;

        if (cmd == "z") {
          cmds.push("Z");x = ox;y = oy;
        } else {
          var cmu = cmd.toUpperCase();
          var ps = pc[cmu],
              reps = Typr.SVG._reps(ts, i, ps);

          for (var j = 0; j < reps; j++) {
            var xi = 0,
                yi = 0;if (cmd != cmu) {
              xi = x;yi = y;
            }

            if (cmu == "M") {
              x = xi + ts[i++];y = yi + ts[i++];cmds.push("M");crds.push(x, y);ox = x;oy = y;
            } else if (cmu == "L") {
              x = xi + ts[i++];y = yi + ts[i++];cmds.push("L");crds.push(x, y);
            } else if (cmu == "H") {
              x = xi + ts[i++];cmds.push("L");crds.push(x, y);
            } else if (cmu == "V") {
              y = yi + ts[i++];cmds.push("L");crds.push(x, y);
            } else if (cmu == "C") {
              var x1 = xi + ts[i++],
                  y1 = yi + ts[i++],
                  x2 = xi + ts[i++],
                  y2 = yi + ts[i++],
                  x3 = xi + ts[i++],
                  y3 = yi + ts[i++];
              cmds.push("C");crds.push(x1, y1, x2, y2, x3, y3);x = x3;y = y3;
            } else if (cmu == "S") {
              var co = Math.max(crds.length - 4, 0);
              var x1 = x + x - crds[co],
                  y1 = y + y - crds[co + 1];
              var x2 = xi + ts[i++],
                  y2 = yi + ts[i++],
                  x3 = xi + ts[i++],
                  y3 = yi + ts[i++];
              cmds.push("C");crds.push(x1, y1, x2, y2, x3, y3);x = x3;y = y3;
            } else console.log("Unknown SVG command " + cmd);
          }
        }
      }
    };
    Typr.SVG._reps = function (ts, off, ps) {
      var i = off;
      while (i < ts.length) {
        if (typeof ts[i] == "string") break;i += ps;
      }
      return (i - off) / ps;
    };
    // End Typr.js

    // Begin Typr.U.js

    if (Typr == null) Typr = {};
    if (Typr.U == null) Typr.U = {};

    Typr.U.codeToGlyph = function (font, code) {
      var cmap = font.cmap;

      var tind = -1;
      if (cmap.p0e4 != null) tind = cmap.p0e4;else if (cmap.p3e1 != null) tind = cmap.p3e1;else if (cmap.p1e0 != null) tind = cmap.p1e0;else if (cmap.p0e3 != null) tind = cmap.p0e3;

      if (tind == -1) throw "no familiar platform and encoding!";

      var tab = cmap.tables[tind];

      if (tab.format == 0) {
        if (code >= tab.map.length) return 0;
        return tab.map[code];
      } else if (tab.format == 4) {
        var sind = -1;
        for (var i = 0; i < tab.endCount.length; i++) {
          if (code <= tab.endCount[i]) {
            sind = i;break;
          }
        }if (sind == -1) return 0;
        if (tab.startCount[sind] > code) return 0;

        var gli = 0;
        if (tab.idRangeOffset[sind] != 0) gli = tab.glyphIdArray[code - tab.startCount[sind] + (tab.idRangeOffset[sind] >> 1) - (tab.idRangeOffset.length - sind)];else gli = code + tab.idDelta[sind];
        return gli & 0xFFFF;
      } else if (tab.format == 12) {
        if (code > tab.groups[tab.groups.length - 1][1]) return 0;
        for (var i = 0; i < tab.groups.length; i++) {
          var grp = tab.groups[i];
          if (grp[0] <= code && code <= grp[1]) return grp[2] + (code - grp[0]);
        }
        return 0;
      } else throw "unknown cmap table format " + tab.format;
    };

    Typr.U.glyphToPath = function (font, gid) {
      var path = { cmds: [], crds: [] };
      if (font.SVG && font.SVG.entries[gid]) {
        var p = font.SVG.entries[gid];if (p == null) return path;
        if (typeof p == "string") {
          p = Typr.SVG.toPath(p);font.SVG.entries[gid] = p;
        }
        return p;
      } else if (font.CFF) {
        var state = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: font.CFF.Private ? font.CFF.Private.defaultWidthX : 0, open: false };
        var cff = font.CFF,
            pdct = font.CFF.Private;
        if (cff.ROS) {
          var gi = 0;
          while (cff.FDSelect[gi + 2] <= gid) {
            gi += 2;
          }pdct = cff.FDArray[cff.FDSelect[gi + 1]].Private;
        }
        Typr.U._drawCFF(font.CFF.CharStrings[gid], state, cff, pdct, path);
      } else if (font.glyf) {
        Typr.U._drawGlyf(gid, font, path);
      }
      return path;
    };

    Typr.U._drawGlyf = function (gid, font, path) {
      var gl = font.glyf[gid];
      if (gl == null) gl = font.glyf[gid] = Typr.glyf._parseGlyf(font, gid);
      if (gl != null) {
        if (gl.noc > -1) Typr.U._simpleGlyph(gl, path);else Typr.U._compoGlyph(gl, font, path);
      }
    };
    Typr.U._simpleGlyph = function (gl, p) {
      for (var c = 0; c < gl.noc; c++) {
        var i0 = c == 0 ? 0 : gl.endPts[c - 1] + 1;
        var il = gl.endPts[c];

        for (var i = i0; i <= il; i++) {
          var pr = i == i0 ? il : i - 1;
          var nx = i == il ? i0 : i + 1;
          var onCurve = gl.flags[i] & 1;
          var prOnCurve = gl.flags[pr] & 1;
          var nxOnCurve = gl.flags[nx] & 1;

          var x = gl.xs[i],
              y = gl.ys[i];

          if (i == i0) {
            if (onCurve) {
              if (prOnCurve) Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);else {
                Typr.U.P.moveTo(p, x, y);continue; /*  will do curveTo at il  */
              }
            } else {
              if (prOnCurve) Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);else Typr.U.P.moveTo(p, (gl.xs[pr] + x) / 2, (gl.ys[pr] + y) / 2);
            }
          }
          if (onCurve) {
            if (prOnCurve) Typr.U.P.lineTo(p, x, y);
          } else {
            if (nxOnCurve) Typr.U.P.qcurveTo(p, x, y, gl.xs[nx], gl.ys[nx]);else Typr.U.P.qcurveTo(p, x, y, (x + gl.xs[nx]) / 2, (y + gl.ys[nx]) / 2);
          }
        }
        Typr.U.P.closePath(p);
      }
    };
    Typr.U._compoGlyph = function (gl, font, p) {
      for (var j = 0; j < gl.parts.length; j++) {
        var path = { cmds: [], crds: [] };
        var prt = gl.parts[j];
        Typr.U._drawGlyf(prt.glyphIndex, font, path);

        var m = prt.m;
        for (var i = 0; i < path.crds.length; i += 2) {
          var x = path.crds[i],
              y = path.crds[i + 1];
          p.crds.push(x * m.a + y * m.b + m.tx);
          p.crds.push(x * m.c + y * m.d + m.ty);
        }
        for (var i = 0; i < path.cmds.length; i++) {
          p.cmds.push(path.cmds[i]);
        }
      }
    };

    Typr.U._getGlyphClass = function (g, cd) {
      var intr = Typr._lctf.getInterval(cd, g);
      return intr == -1 ? 0 : cd[intr + 2];
      //for(var i=0; i<cd.start.length; i++) 
      //	if(cd.start[i]<=g && cd.end[i]>=g) return cd.class[i];
      //return 0;
    };

    Typr.U.getPairAdjustment = function (font, g1, g2) {
      //return 0;
      if (font.GPOS) {
        var gpos = font["GPOS"];
        var llist = gpos.lookupList,
            flist = gpos.featureList;
        var tused = [];
        for (var i = 0; i < flist.length; i++) {
          var fl = flist[i]; //console.log(fl);
          if (fl.tag != "kern") continue;
          for (var ti = 0; ti < fl.tab.length; ti++) {
            if (tused[fl.tab[ti]]) continue;tused[fl.tab[ti]] = true;
            var tab = llist[fl.tab[ti]];
            //console.log(tab);

            for (var j = 0; j < tab.tabs.length; j++) {
              if (tab.tabs[i] == null) continue;
              var ltab = tab.tabs[j],
                  ind;
              if (ltab.coverage) {
                ind = Typr._lctf.coverageIndex(ltab.coverage, g1);if (ind == -1) continue;
              }

              if (tab.ltype == 1) ;else if (tab.ltype == 2) {
                var adj;
                if (ltab.fmt == 1) {
                  var right = ltab.pairsets[ind];
                  for (var i = 0; i < right.length; i++) {
                    if (right[i].gid2 == g2) adj = right[i];
                  }
                } else if (ltab.fmt == 2) {
                  var c1 = Typr.U._getGlyphClass(g1, ltab.classDef1);
                  var c2 = Typr.U._getGlyphClass(g2, ltab.classDef2);
                  adj = ltab.matrix[c1][c2];
                }
                //if(adj) console.log(ltab, adj);
                if (adj && adj.val2) return adj.val2[2];
              }
            }
          }
        }
      }
      if (font.kern) {
        var ind1 = font.kern.glyph1.indexOf(g1);
        if (ind1 != -1) {
          var ind2 = font.kern.rval[ind1].glyph2.indexOf(g2);
          if (ind2 != -1) return font.kern.rval[ind1].vals[ind2];
        }
      }

      return 0;
    };

    Typr.U.stringToGlyphs = function (font, str) {
      var gls = [];
      for (var i = 0; i < str.length; i++) {
        var cc = str.codePointAt(i);if (cc > 0xffff) i++;
        gls.push(Typr.U.codeToGlyph(font, cc));
      }
      for (var i = 0; i < str.length; i++) {
        var cc = str.codePointAt(i); //
        if (cc == 2367) {
          var t = gls[i - 1];gls[i - 1] = gls[i];gls[i] = t;
        }
        //if(cc==2381) {  var t=gls[i+1];  gls[i+1]=gls[i];  gls[i]=t;  }
        if (cc > 0xffff) i++;
      }
      //console.log(gls.slice(0));

      //console.log(gls);  return gls;

      var gsub = font["GSUB"];if (gsub == null) return gls;
      var llist = gsub.lookupList,
          flist = gsub.featureList;

      var cligs = ["rlig", "liga", "mset", "isol", "init", "fina", "medi", "half", "pres", "blws" /* Tibetan fonts like Himalaya.ttf */];

      //console.log(gls.slice(0));
      var tused = [];
      for (var fi = 0; fi < flist.length; fi++) {
        var fl = flist[fi];if (cligs.indexOf(fl.tag) == -1) continue;
        //if(fl.tag=="blwf") continue;
        //console.log(fl);
        //console.log(fl.tag);
        for (var ti = 0; ti < fl.tab.length; ti++) {
          if (tused[fl.tab[ti]]) continue;tused[fl.tab[ti]] = true;
          var tab = llist[fl.tab[ti]];
          //console.log(fl.tab[ti], tab.ltype);
          //console.log(fl.tag, tab);
          for (var ci = 0; ci < gls.length; ci++) {
            var feat = Typr.U._getWPfeature(str, ci);
            if ("isol,init,fina,medi".indexOf(fl.tag) != -1 && fl.tag != feat) continue;

            Typr.U._applySubs(gls, ci, tab, llist);
          }
        }
      }

      return gls;
    };
    Typr.U._getWPfeature = function (str, ci) {
      // get Word Position feature
      var wsep = "\n\t\" ,.:;!?()  ،";
      var R = "آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬";
      var L = "ꡲ્૗";

      var slft = ci == 0 || wsep.indexOf(str[ci - 1]) != -1;
      var srgt = ci == str.length - 1 || wsep.indexOf(str[ci + 1]) != -1;

      if (!slft && R.indexOf(str[ci - 1]) != -1) slft = true;
      if (!srgt && R.indexOf(str[ci]) != -1) srgt = true;

      if (!srgt && L.indexOf(str[ci + 1]) != -1) srgt = true;
      if (!slft && L.indexOf(str[ci]) != -1) slft = true;

      var feat = null;
      if (slft) feat = srgt ? "isol" : "init";else feat = srgt ? "fina" : "medi";

      return feat;
    };
    Typr.U._applySubs = function (gls, ci, tab, llist) {
      var rlim = gls.length - ci - 1;
      //if(ci==0) console.log("++++ ", tab.ltype);
      for (var j = 0; j < tab.tabs.length; j++) {
        if (tab.tabs[j] == null) continue;
        var ltab = tab.tabs[j],
            ind;
        if (ltab.coverage) {
          ind = Typr._lctf.coverageIndex(ltab.coverage, gls[ci]);if (ind == -1) continue;
        }
        //if(ci==0) console.log(ind, ltab);
        //*
        if (tab.ltype == 1) {
          var gl = gls[ci];
          if (ltab.fmt == 1) gls[ci] = gls[ci] + ltab.delta;else gls[ci] = ltab.newg[ind];
          //console.log("applying ... 1", ci, gl, gls[ci]);
        } //*
        else if (tab.ltype == 4) {
            var vals = ltab.vals[ind];

            for (var k = 0; k < vals.length; k++) {
              var lig = vals[k],
                  rl = lig.chain.length;if (rl > rlim) continue;
              var good = true,
                  em1 = 0;
              for (var l = 0; l < rl; l++) {
                while (gls[ci + em1 + (1 + l)] == -1) {
                  em1++;
                }if (lig.chain[l] != gls[ci + em1 + (1 + l)]) good = false;
              }
              if (!good) continue;
              gls[ci] = lig.nglyph;
              for (var l = 0; l < rl + em1; l++) {
                gls[ci + l + 1] = -1;
              }break; // first character changed, other ligatures do not apply anymore
              //console.log("lig", ci, lig.chain, lig.nglyph);
              //console.log("applying ...");
            }
          } else if (tab.ltype == 5 && ltab.fmt == 2) {
            var cind = Typr._lctf.getInterval(ltab.cDef, gls[ci]);
            var cls = ltab.cDef[cind + 2],
                scs = ltab.scset[cls];
            for (var i = 0; i < scs.length; i++) {
              var sc = scs[i],
                  inp = sc.input;
              if (inp.length > rlim) continue;
              var good = true;
              for (var l = 0; l < inp.length; l++) {
                var cind2 = Typr._lctf.getInterval(ltab.cDef, gls[ci + 1 + l]);
                if (cind == -1 && ltab.cDef[cind2 + 2] != inp[l]) {
                  good = false;break;
                }
              }
              if (!good) continue;
              //console.log(ci, gl);
              var lrs = sc.substLookupRecords;
              for (var k = 0; k < lrs.length; k += 2) {
                var gi = lrs[k],
                    tabi = lrs[k + 1];
                //Typr.U._applyType1(gls, ci+gi, llist[tabi]);
                //console.log(tabi, gls[ci+gi], llist[tabi]);
              }
            }
          } else if (tab.ltype == 6 && ltab.fmt == 3) {
            //if(ltab.backCvg.length==0) return;
            if (!Typr.U._glsCovered(gls, ltab.backCvg, ci - ltab.backCvg.length)) continue;
            if (!Typr.U._glsCovered(gls, ltab.inptCvg, ci)) continue;
            if (!Typr.U._glsCovered(gls, ltab.ahedCvg, ci + ltab.inptCvg.length)) continue;
            //console.log(ci, ltab);
            var lr = ltab.lookupRec; //console.log(ci, gl, lr);
            for (var i = 0; i < lr.length; i += 2) {
              var cind = lr[i],
                  tab2 = llist[lr[i + 1]];
              //console.log("-", lr[i+1], tab2);
              Typr.U._applySubs(gls, ci + cind, tab2, llist);
            }
          }
        //else console.log("Unknown table", tab.ltype, ltab.fmt);
        //*/
      }
    };

    Typr.U._glsCovered = function (gls, cvgs, ci) {
      for (var i = 0; i < cvgs.length; i++) {
        var ind = Typr._lctf.coverageIndex(cvgs[i], gls[ci + i]);if (ind == -1) return false;
      }
      return true;
    };

    Typr.U.glyphsToPath = function (font, gls, clr) {
      //gls = gls.reverse();//gls.slice(0,12).concat(gls.slice(12).reverse());

      var tpath = { cmds: [], crds: [] };
      var x = 0;

      for (var i = 0; i < gls.length; i++) {
        var gid = gls[i];if (gid == -1) continue;
        var gid2 = i < gls.length - 1 && gls[i + 1] != -1 ? gls[i + 1] : 0;
        var path = Typr.U.glyphToPath(font, gid);
        for (var j = 0; j < path.crds.length; j += 2) {
          tpath.crds.push(path.crds[j] + x);
          tpath.crds.push(path.crds[j + 1]);
        }
        if (clr) tpath.cmds.push(clr);
        for (var j = 0; j < path.cmds.length; j++) {
          tpath.cmds.push(path.cmds[j]);
        }if (clr) tpath.cmds.push("X");
        x += font.hmtx.aWidth[gid]; // - font.hmtx.lsBearing[gid];
        if (i < gls.length - 1) x += Typr.U.getPairAdjustment(font, gid, gid2);
      }
      return tpath;
    };

    Typr.U.pathToSVG = function (path, prec) {
      if (prec == null) prec = 5;
      var out = [],
          co = 0,
          lmap = { "M": 2, "L": 2, "Q": 4, "C": 6 };
      for (var i = 0; i < path.cmds.length; i++) {
        var cmd = path.cmds[i],
            cn = co + (lmap[cmd] ? lmap[cmd] : 0);
        out.push(cmd);
        while (co < cn) {
          var c = path.crds[co++];out.push(parseFloat(c.toFixed(prec)) + (co == cn ? "" : " "));
        }
      }
      return out.join("");
    };

    Typr.U.pathToContext = function (path, ctx) {
      var c = 0,
          crds = path.crds;

      for (var j = 0; j < path.cmds.length; j++) {
        var cmd = path.cmds[j];
        if (cmd == "M") {
          ctx.moveTo(crds[c], crds[c + 1]);
          c += 2;
        } else if (cmd == "L") {
          ctx.lineTo(crds[c], crds[c + 1]);
          c += 2;
        } else if (cmd == "C") {
          ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]);
          c += 6;
        } else if (cmd == "Q") {
          ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]);
          c += 4;
        } else if (cmd.charAt(0) == "#") {
          ctx.beginPath();
          ctx.fillStyle = cmd;
        } else if (cmd == "Z") {
          ctx.closePath();
        } else if (cmd == "X") {
          ctx.fill();
        }
      }
    };

    Typr.U.P = {};
    Typr.U.P.moveTo = function (p, x, y) {
      p.cmds.push("M");p.crds.push(x, y);
    };
    Typr.U.P.lineTo = function (p, x, y) {
      p.cmds.push("L");p.crds.push(x, y);
    };
    Typr.U.P.curveTo = function (p, a, b, c, d, e, f) {
      p.cmds.push("C");p.crds.push(a, b, c, d, e, f);
    };
    Typr.U.P.qcurveTo = function (p, a, b, c, d) {
      p.cmds.push("Q");p.crds.push(a, b, c, d);
    };
    Typr.U.P.closePath = function (p) {
      p.cmds.push("Z");
    };

    Typr.U._drawCFF = function (cmds, state, font, pdct, p) {
      var stack = state.stack;
      var nStems = state.nStems,
          haveWidth = state.haveWidth,
          width = state.width,
          open = state.open;
      var i = 0;
      var x = state.x,
          y = state.y,
          c1x = 0,
          c1y = 0,
          c2x = 0,
          c2y = 0,
          c3x = 0,
          c3y = 0,
          c4x = 0,
          c4y = 0,
          jpx = 0,
          jpy = 0;

      var o = { val: 0, size: 0 };
      //console.log(cmds);
      while (i < cmds.length) {
        Typr.CFF.getCharString(cmds, i, o);
        var v = o.val;
        i += o.size;

        if (v == "o1" || v == "o18") //  hstem || hstemhm
          {
            var hasWidthArg;

            // The number of stem operators on the stack is always even.
            // If the value is uneven, that means a width is specified.
            hasWidthArg = stack.length % 2 !== 0;
            if (hasWidthArg && !haveWidth) {
              width = stack.shift() + pdct.nominalWidthX;
            }

            nStems += stack.length >> 1;
            stack.length = 0;
            haveWidth = true;
          } else if (v == "o3" || v == "o23") // vstem || vstemhm
          {
            var hasWidthArg;

            // The number of stem operators on the stack is always even.
            // If the value is uneven, that means a width is specified.
            hasWidthArg = stack.length % 2 !== 0;
            if (hasWidthArg && !haveWidth) {
              width = stack.shift() + pdct.nominalWidthX;
            }

            nStems += stack.length >> 1;
            stack.length = 0;
            haveWidth = true;
          } else if (v == "o4") {
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + pdct.nominalWidthX;
            haveWidth = true;
          }
          if (open) Typr.U.P.closePath(p);

          y += stack.pop();
          Typr.U.P.moveTo(p, x, y);open = true;
        } else if (v == "o5") {
          while (stack.length > 0) {
            x += stack.shift();
            y += stack.shift();
            Typr.U.P.lineTo(p, x, y);
          }
        } else if (v == "o6" || v == "o7") // hlineto || vlineto
          {
            var count = stack.length;
            var isX = v == "o6";

            for (var j = 0; j < count; j++) {
              var sval = stack.shift();

              if (isX) x += sval;else y += sval;
              isX = !isX;
              Typr.U.P.lineTo(p, x, y);
            }
          } else if (v == "o8" || v == "o24") // rrcurveto || rcurveline
          {
            var count = stack.length;
            var index = 0;
            while (index + 6 <= count) {
              c1x = x + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              x = c2x + stack.shift();
              y = c2y + stack.shift();
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
              index += 6;
            }
            if (v == "o24") {
              x += stack.shift();
              y += stack.shift();
              Typr.U.P.lineTo(p, x, y);
            }
          } else if (v == "o11") break;else if (v == "o1234" || v == "o1235" || v == "o1236" || v == "o1237") //if((v+"").slice(0,3)=="o12")
          {
            if (v == "o1234") {
              c1x = x + stack.shift(); // dx1
              c1y = y; // dy1
              c2x = c1x + stack.shift(); // dx2
              c2y = c1y + stack.shift(); // dy2
              jpx = c2x + stack.shift(); // dx3
              jpy = c2y; // dy3
              c3x = jpx + stack.shift(); // dx4
              c3y = c2y; // dy4
              c4x = c3x + stack.shift(); // dx5
              c4y = y; // dy5
              x = c4x + stack.shift(); // dx6
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
              Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
            }
            if (v == "o1235") {
              c1x = x + stack.shift(); // dx1
              c1y = y + stack.shift(); // dy1
              c2x = c1x + stack.shift(); // dx2
              c2y = c1y + stack.shift(); // dy2
              jpx = c2x + stack.shift(); // dx3
              jpy = c2y + stack.shift(); // dy3
              c3x = jpx + stack.shift(); // dx4
              c3y = jpy + stack.shift(); // dy4
              c4x = c3x + stack.shift(); // dx5
              c4y = c3y + stack.shift(); // dy5
              x = c4x + stack.shift(); // dx6
              y = c4y + stack.shift(); // dy6
              stack.shift(); // flex depth
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
              Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
            }
            if (v == "o1236") {
              c1x = x + stack.shift(); // dx1
              c1y = y + stack.shift(); // dy1
              c2x = c1x + stack.shift(); // dx2
              c2y = c1y + stack.shift(); // dy2
              jpx = c2x + stack.shift(); // dx3
              jpy = c2y; // dy3
              c3x = jpx + stack.shift(); // dx4
              c3y = c2y; // dy4
              c4x = c3x + stack.shift(); // dx5
              c4y = c3y + stack.shift(); // dy5
              x = c4x + stack.shift(); // dx6
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
              Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
            }
            if (v == "o1237") {
              c1x = x + stack.shift(); // dx1
              c1y = y + stack.shift(); // dy1
              c2x = c1x + stack.shift(); // dx2
              c2y = c1y + stack.shift(); // dy2
              jpx = c2x + stack.shift(); // dx3
              jpy = c2y + stack.shift(); // dy3
              c3x = jpx + stack.shift(); // dx4
              c3y = jpy + stack.shift(); // dy4
              c4x = c3x + stack.shift(); // dx5
              c4y = c3y + stack.shift(); // dy5
              if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
                x = c4x + stack.shift();
              } else {
                y = c4y + stack.shift();
              }
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
              Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
            }
          } else if (v == "o14") {
          if (stack.length > 0 && !haveWidth) {
            width = stack.shift() + font.nominalWidthX;
            haveWidth = true;
          }
          if (stack.length == 4) // seac = standard encoding accented character
            {
              var adx = stack.shift();
              var ady = stack.shift();
              var bchar = stack.shift();
              var achar = stack.shift();

              var bind = Typr.CFF.glyphBySE(font, bchar);
              var aind = Typr.CFF.glyphBySE(font, achar);

              //console.log(bchar, bind);
              //console.log(achar, aind);
              //state.x=x; state.y=y; state.nStems=nStems; state.haveWidth=haveWidth; state.width=width;  state.open=open;

              Typr.U._drawCFF(font.CharStrings[bind], state, font, pdct, p);
              state.x = adx;state.y = ady;
              Typr.U._drawCFF(font.CharStrings[aind], state, font, pdct, p);

              //x=state.x; y=state.y; nStems=state.nStems; haveWidth=state.haveWidth; width=state.width;  open=state.open;
            }
          if (open) {
            Typr.U.P.closePath(p);open = false;
          }
        } else if (v == "o19" || v == "o20") {
          var hasWidthArg;

          // The number of stem operators on the stack is always even.
          // If the value is uneven, that means a width is specified.
          hasWidthArg = stack.length % 2 !== 0;
          if (hasWidthArg && !haveWidth) {
            width = stack.shift() + pdct.nominalWidthX;
          }

          nStems += stack.length >> 1;
          stack.length = 0;
          haveWidth = true;

          i += nStems + 7 >> 3;
        } else if (v == "o21") {
          if (stack.length > 2 && !haveWidth) {
            width = stack.shift() + pdct.nominalWidthX;
            haveWidth = true;
          }

          y += stack.pop();
          x += stack.pop();

          if (open) Typr.U.P.closePath(p);
          Typr.U.P.moveTo(p, x, y);open = true;
        } else if (v == "o22") {
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + pdct.nominalWidthX;
            haveWidth = true;
          }

          x += stack.pop();

          if (open) Typr.U.P.closePath(p);
          Typr.U.P.moveTo(p, x, y);open = true;
        } else if (v == "o25") {
          while (stack.length > 6) {
            x += stack.shift();
            y += stack.shift();
            Typr.U.P.lineTo(p, x, y);
          }

          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        } else if (v == "o26") {
          if (stack.length % 2) {
            x += stack.shift();
          }

          while (stack.length > 0) {
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x;
            y = c2y + stack.shift();
            Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          }
        } else if (v == "o27") {
          if (stack.length % 2) {
            y += stack.shift();
          }

          while (stack.length > 0) {
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            y = c2y;
            Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          }
        } else if (v == "o10" || v == "o29") // callsubr || callgsubr
          {
            var obj = v == "o10" ? pdct : font;
            if (stack.length == 0) {
              console.log("error: empty stack");
            } else {
              var ind = stack.pop();
              var subr = obj.Subrs[ind + obj.Bias];
              state.x = x;state.y = y;state.nStems = nStems;state.haveWidth = haveWidth;state.width = width;state.open = open;
              Typr.U._drawCFF(subr, state, font, pdct, p);
              x = state.x;y = state.y;nStems = state.nStems;haveWidth = state.haveWidth;width = state.width;open = state.open;
            }
          } else if (v == "o30" || v == "o31") // vhcurveto || hvcurveto
          {
            var count,
                count1 = stack.length;
            var index = 0;
            var alternate = v == "o31";

            count = count1 & ~2;
            index += count1 - count;

            while (index < count) {
              if (alternate) {
                c1x = x + stack.shift();
                c1y = y;
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                y = c2y + stack.shift();
                if (count - index == 5) {
                  x = c2x + stack.shift();index++;
                } else x = c2x;
                alternate = false;
              } else {
                c1x = x;
                c1y = y + stack.shift();
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                if (count - index == 5) {
                  y = c2y + stack.shift();index++;
                } else y = c2y;
                alternate = true;
              }
              Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
              index += 4;
            }
          } else if ((v + "").charAt(0) == "o") {
          console.log("Unknown operation: " + v, cmds);throw v;
        } else stack.push(v);
      }
      //console.log(cmds);
      state.x = x;state.y = y;state.nStems = nStems;state.haveWidth = haveWidth;state.width = width;state.open = open;
    };

    // End Typr.U.js

    return Typr;
  }

  // Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with tiny-inflate 
  // (https://github.com/foliojs/tiny-inflate) for use in troika-3d-text. 
  // Original licenses apply: 
  // - tiny-inflate: https://github.com/foliojs/tiny-inflate/blob/master/LICENSE (MIT)
  // - woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)

  function woff2otfFactory() {

    // Begin tinyInflate
    var tinyInflate = function () {
      var module = {};
      var TINF_OK = 0;
      var TINF_DATA_ERROR = -3;

      function Tree() {
        this.table = new Uint16Array(16); /* table of code length counts */
        this.trans = new Uint16Array(288); /* code -> symbol translation table */
      }

      function Data(source, dest) {
        this.source = source;
        this.sourceIndex = 0;
        this.tag = 0;
        this.bitcount = 0;

        this.dest = dest;
        this.destLen = 0;

        this.ltree = new Tree(); /* dynamic length/symbol tree */
        this.dtree = new Tree(); /* dynamic distance tree */
      }

      /* --------------------------------------------------- *
       * -- uninitialized global data (static structures) -- *
       * --------------------------------------------------- */

      var sltree = new Tree();
      var sdtree = new Tree();

      /* extra bits and base tables for length codes */
      var length_bits = new Uint8Array(30);
      var length_base = new Uint16Array(30);

      /* extra bits and base tables for distance codes */
      var dist_bits = new Uint8Array(30);
      var dist_base = new Uint16Array(30);

      /* special ordering of code length codes */
      var clcidx = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);

      /* used by tinf_decode_trees, avoids allocations every call */
      var code_tree = new Tree();
      var lengths = new Uint8Array(288 + 32);

      /* ----------------------- *
       * -- utility functions -- *
       * ----------------------- */

      /* build extra bits and base tables */
      function tinf_build_bits_base(bits, base, delta, first) {
        var i, sum;

        /* build bits table */
        for (i = 0; i < delta; ++i) {
          bits[i] = 0;
        }for (i = 0; i < 30 - delta; ++i) {
          bits[i + delta] = i / delta | 0;
        } /* build base table */
        for (sum = first, i = 0; i < 30; ++i) {
          base[i] = sum;
          sum += 1 << bits[i];
        }
      }

      /* build the fixed huffman trees */
      function tinf_build_fixed_trees(lt, dt) {
        var i;

        /* build fixed length tree */
        for (i = 0; i < 7; ++i) {
          lt.table[i] = 0;
        }lt.table[7] = 24;
        lt.table[8] = 152;
        lt.table[9] = 112;

        for (i = 0; i < 24; ++i) {
          lt.trans[i] = 256 + i;
        }for (i = 0; i < 144; ++i) {
          lt.trans[24 + i] = i;
        }for (i = 0; i < 8; ++i) {
          lt.trans[24 + 144 + i] = 280 + i;
        }for (i = 0; i < 112; ++i) {
          lt.trans[24 + 144 + 8 + i] = 144 + i;
        } /* build fixed distance tree */
        for (i = 0; i < 5; ++i) {
          dt.table[i] = 0;
        }dt.table[5] = 32;

        for (i = 0; i < 32; ++i) {
          dt.trans[i] = i;
        }
      }

      /* given an array of code lengths, build a tree */
      var offs = new Uint16Array(16);

      function tinf_build_tree(t, lengths, off, num) {
        var i, sum;

        /* clear code length count table */
        for (i = 0; i < 16; ++i) {
          t.table[i] = 0;
        } /* scan symbol lengths, and sum code length counts */
        for (i = 0; i < num; ++i) {
          t.table[lengths[off + i]]++;
        }t.table[0] = 0;

        /* compute offset table for distribution sort */
        for (sum = 0, i = 0; i < 16; ++i) {
          offs[i] = sum;
          sum += t.table[i];
        }

        /* create code->symbol translation table (symbols sorted by code) */
        for (i = 0; i < num; ++i) {
          if (lengths[off + i]) t.trans[offs[lengths[off + i]]++] = i;
        }
      }

      /* ---------------------- *
       * -- decode functions -- *
       * ---------------------- */

      /* get one bit from source stream */
      function tinf_getbit(d) {
        /* check if tag is empty */
        if (!d.bitcount--) {
          /* load next tag */
          d.tag = d.source[d.sourceIndex++];
          d.bitcount = 7;
        }

        /* shift bit out of tag */
        var bit = d.tag & 1;
        d.tag >>>= 1;

        return bit;
      }

      /* read a num bit value from a stream and add base */
      function tinf_read_bits(d, num, base) {
        if (!num) return base;

        while (d.bitcount < 24) {
          d.tag |= d.source[d.sourceIndex++] << d.bitcount;
          d.bitcount += 8;
        }

        var val = d.tag & 0xffff >>> 16 - num;
        d.tag >>>= num;
        d.bitcount -= num;
        return val + base;
      }

      /* given a data stream and a tree, decode a symbol */
      function tinf_decode_symbol(d, t) {
        while (d.bitcount < 24) {
          d.tag |= d.source[d.sourceIndex++] << d.bitcount;
          d.bitcount += 8;
        }

        var sum = 0,
            cur = 0,
            len = 0;
        var tag = d.tag;

        /* get more bits while code value is above sum */
        do {
          cur = 2 * cur + (tag & 1);
          tag >>>= 1;
          ++len;

          sum += t.table[len];
          cur -= t.table[len];
        } while (cur >= 0);

        d.tag = tag;
        d.bitcount -= len;

        return t.trans[sum + cur];
      }

      /* given a data stream, decode dynamic trees from it */
      function tinf_decode_trees(d, lt, dt) {
        var hlit, hdist, hclen;
        var i, num, length;

        /* get 5 bits HLIT (257-286) */
        hlit = tinf_read_bits(d, 5, 257);

        /* get 5 bits HDIST (1-32) */
        hdist = tinf_read_bits(d, 5, 1);

        /* get 4 bits HCLEN (4-19) */
        hclen = tinf_read_bits(d, 4, 4);

        for (i = 0; i < 19; ++i) {
          lengths[i] = 0;
        } /* read code lengths for code length alphabet */
        for (i = 0; i < hclen; ++i) {
          /* get 3 bits code length (0-7) */
          var clen = tinf_read_bits(d, 3, 0);
          lengths[clcidx[i]] = clen;
        }

        /* build code length tree */
        tinf_build_tree(code_tree, lengths, 0, 19);

        /* decode code lengths for the dynamic trees */
        for (num = 0; num < hlit + hdist;) {
          var sym = tinf_decode_symbol(d, code_tree);

          switch (sym) {
            case 16:
              /* copy previous code length 3-6 times (read 2 bits) */
              var prev = lengths[num - 1];
              for (length = tinf_read_bits(d, 2, 3); length; --length) {
                lengths[num++] = prev;
              }
              break;
            case 17:
              /* repeat code length 0 for 3-10 times (read 3 bits) */
              for (length = tinf_read_bits(d, 3, 3); length; --length) {
                lengths[num++] = 0;
              }
              break;
            case 18:
              /* repeat code length 0 for 11-138 times (read 7 bits) */
              for (length = tinf_read_bits(d, 7, 11); length; --length) {
                lengths[num++] = 0;
              }
              break;
            default:
              /* values 0-15 represent the actual code lengths */
              lengths[num++] = sym;
              break;
          }
        }

        /* build dynamic trees */
        tinf_build_tree(lt, lengths, 0, hlit);
        tinf_build_tree(dt, lengths, hlit, hdist);
      }

      /* ----------------------------- *
       * -- block inflate functions -- *
       * ----------------------------- */

      /* given a stream and two trees, inflate a block of data */
      function tinf_inflate_block_data(d, lt, dt) {
        while (1) {
          var sym = tinf_decode_symbol(d, lt);

          /* check for end of block */
          if (sym === 256) {
            return TINF_OK;
          }

          if (sym < 256) {
            d.dest[d.destLen++] = sym;
          } else {
            var length, dist, offs;
            var i;

            sym -= 257;

            /* possibly get more bits from length code */
            length = tinf_read_bits(d, length_bits[sym], length_base[sym]);

            dist = tinf_decode_symbol(d, dt);

            /* possibly get more bits from distance code */
            offs = d.destLen - tinf_read_bits(d, dist_bits[dist], dist_base[dist]);

            /* copy match */
            for (i = offs; i < offs + length; ++i) {
              d.dest[d.destLen++] = d.dest[i];
            }
          }
        }
      }

      /* inflate an uncompressed block of data */
      function tinf_inflate_uncompressed_block(d) {
        var length, invlength;
        var i;

        /* unread from bitbuffer */
        while (d.bitcount > 8) {
          d.sourceIndex--;
          d.bitcount -= 8;
        }

        /* get length */
        length = d.source[d.sourceIndex + 1];
        length = 256 * length + d.source[d.sourceIndex];

        /* get one's complement of length */
        invlength = d.source[d.sourceIndex + 3];
        invlength = 256 * invlength + d.source[d.sourceIndex + 2];

        /* check length */
        if (length !== (~invlength & 0x0000ffff)) return TINF_DATA_ERROR;

        d.sourceIndex += 4;

        /* copy block */
        for (i = length; i; --i) {
          d.dest[d.destLen++] = d.source[d.sourceIndex++];
        } /* make sure we start next block on a byte boundary */
        d.bitcount = 0;

        return TINF_OK;
      }

      /* inflate stream from source to dest */
      function tinf_uncompress(source, dest) {
        var d = new Data(source, dest);
        var bfinal, btype, res;

        do {
          /* read final block flag */
          bfinal = tinf_getbit(d);

          /* read block type (2 bits) */
          btype = tinf_read_bits(d, 2, 0);

          /* decompress block */
          switch (btype) {
            case 0:
              /* decompress uncompressed block */
              res = tinf_inflate_uncompressed_block(d);
              break;
            case 1:
              /* decompress block with fixed huffman trees */
              res = tinf_inflate_block_data(d, sltree, sdtree);
              break;
            case 2:
              /* decompress block with dynamic huffman trees */
              tinf_decode_trees(d, d.ltree, d.dtree);
              res = tinf_inflate_block_data(d, d.ltree, d.dtree);
              break;
            default:
              res = TINF_DATA_ERROR;
          }

          if (res !== TINF_OK) throw new Error('Data error');
        } while (!bfinal);

        if (d.destLen < d.dest.length) {
          if (typeof d.dest.slice === 'function') return d.dest.slice(0, d.destLen);else return d.dest.subarray(0, d.destLen);
        }

        return d.dest;
      }

      /* -------------------- *
       * -- initialization -- *
       * -------------------- */

      /* build fixed huffman trees */
      tinf_build_fixed_trees(sltree, sdtree);

      /* build extra bits and base tables */
      tinf_build_bits_base(length_bits, length_base, 4, 3);
      tinf_build_bits_base(dist_bits, dist_base, 2, 1);

      /* fix a special case */
      length_bits[28] = 0;
      length_base[28] = 258;

      module.exports = tinf_uncompress;

      return module.exports;
    }();
    // End tinyInflate

    // Begin woff2otf.js
    /*
     Copyright 2012, Steffen Hanikel (https://github.com/hanikesn)
     Modified by Artemy Tregubenko, 2014 (https://github.com/arty-name/woff2otf)
     Modified by Jason Johnston, 2019 (pako --> tiny-inflate)
     
       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at
            http://www.apache.org/licenses/LICENSE-2.0
        Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
      A tool to convert a WOFF back to a TTF/OTF font file, in pure Javascript
    */

    function convert_streams(bufferIn, tinyInflate) {
      var dataViewIn = new DataView(bufferIn);
      var offsetIn = 0;

      function read2() {
        var uint16 = dataViewIn.getUint16(offsetIn);
        offsetIn += 2;
        return uint16;
      }

      function read4() {
        var uint32 = dataViewIn.getUint32(offsetIn);
        offsetIn += 4;
        return uint32;
      }

      function write2(uint16) {
        dataViewOut.setUint16(offsetOut, uint16);
        offsetOut += 2;
      }

      function write4(uint32) {
        dataViewOut.setUint32(offsetOut, uint32);
        offsetOut += 4;
      }

      var WOFFHeader = {
        signature: read4(),
        flavor: read4(),
        length: read4(),
        numTables: read2(),
        reserved: read2(),
        totalSfntSize: read4(),
        majorVersion: read2(),
        minorVersion: read2(),
        metaOffset: read4(),
        metaLength: read4(),
        metaOrigLength: read4(),
        privOffset: read4(),
        privLength: read4()
      };

      var entrySelector = 0;
      while (Math.pow(2, entrySelector) <= WOFFHeader.numTables) {
        entrySelector++;
      }
      entrySelector--;

      var searchRange = Math.pow(2, entrySelector) * 16;
      var rangeShift = WOFFHeader.numTables * 16 - searchRange;

      var offset = 4 + 2 + 2 + 2 + 2;
      var TableDirectoryEntries = [];
      for (var i = 0; i < WOFFHeader.numTables; i++) {
        TableDirectoryEntries.push({
          tag: read4(),
          offset: read4(),
          compLength: read4(),
          origLength: read4(),
          origChecksum: read4()
        });
        offset += 4 * 4;
      }

      var arrayOut = new Uint8Array(4 + 2 + 2 + 2 + 2 + TableDirectoryEntries.length * (4 + 4 + 4 + 4) + TableDirectoryEntries.reduce(function (acc, entry) {
        return acc + entry.origLength + 4;
      }, 0));
      var bufferOut = arrayOut.buffer;
      var dataViewOut = new DataView(bufferOut);
      var offsetOut = 0;

      write4(WOFFHeader.flavor);
      write2(WOFFHeader.numTables);
      write2(searchRange);
      write2(entrySelector);
      write2(rangeShift);

      TableDirectoryEntries.forEach(function (TableDirectoryEntry) {
        write4(TableDirectoryEntry.tag);
        write4(TableDirectoryEntry.origChecksum);
        write4(offset);
        write4(TableDirectoryEntry.origLength);

        TableDirectoryEntry.outOffset = offset;
        offset += TableDirectoryEntry.origLength;
        if (offset % 4 != 0) {
          offset += 4 - offset % 4;
        }
      });

      var size;

      TableDirectoryEntries.forEach(function (TableDirectoryEntry) {
        var compressedData = bufferIn.slice(TableDirectoryEntry.offset, TableDirectoryEntry.offset + TableDirectoryEntry.compLength);

        if (TableDirectoryEntry.compLength != TableDirectoryEntry.origLength) {
          var uncompressedData = new Uint8Array(TableDirectoryEntry.origLength);
          tinyInflate(new Uint8Array(compressedData, 2), //skip deflate header
          uncompressedData);
        } else {
          uncompressedData = new Uint8Array(compressedData);
        }

        arrayOut.set(uncompressedData, TableDirectoryEntry.outOffset);
        offset = TableDirectoryEntry.outOffset + TableDirectoryEntry.origLength;

        var padding = 0;
        if (offset % 4 != 0) {
          padding = 4 - offset % 4;
        }
        arrayOut.set(new Uint8Array(padding).buffer, TableDirectoryEntry.outOffset + TableDirectoryEntry.origLength);

        size = offset + padding;
      });

      return bufferOut.slice(0, size);
    }

    // End woff2otf.js

    return function (buffer) {
      return convert_streams(buffer, tinyInflate);
    };
  }

  /**
   * An adapter that allows Typr.js to be used as if it were (a subset of) the OpenType.js API.
   * Also adds support for WOFF files (not WOFF2).
   */

  function parserFactory(Typr, woff2otf) {
    var cmdArgLengths = {
      M: 2,
      L: 2,
      Q: 4,
      C: 6,
      Z: 0
    };

    function wrapFontObj(typrFont) {
      var glyphMap = Object.create(null);

      var fontObj = {
        unitsPerEm: typrFont.head.unitsPerEm,
        ascender: typrFont.hhea.ascender,
        descender: typrFont.hhea.descender,
        forEachGlyph: function forEachGlyph(text, fontSize, letterSpacing, callback) {
          var glyphX = 0;
          var fontScale = 1 / fontObj.unitsPerEm * fontSize;

          var glyphIndices = Typr.U.stringToGlyphs(typrFont, text);
          var charIndex = 0;
          glyphIndices.forEach(function (glyphIndex) {
            // Typr returns a glyph index per string codepoint, with -1s in place of those that
            // were omitted due to ligature substitution. So we can track original index in the
            // string via simple increment, and skip everything else when seeing a -1.
            if (glyphIndex !== -1) {
              var glyphObj = glyphMap[glyphIndex];
              if (!glyphObj) {
                var _Typr$U$glyphToPath = Typr.U.glyphToPath(typrFont, glyphIndex),
                    cmds = _Typr$U$glyphToPath.cmds,
                    crds = _Typr$U$glyphToPath.crds;

                // Find extents - Glyf gives this in metadata but not CFF, and Typr doesn't
                // normalize the two, so it's simplest just to iterate ourselves.


                var xMin = void 0,
                    yMin = void 0,
                    xMax = void 0,
                    yMax = void 0;
                if (crds.length) {
                  xMin = yMin = Infinity;
                  xMax = yMax = -Infinity;
                  for (var i = 0, len = crds.length; i < len; i += 2) {
                    var x = crds[i];
                    var y = crds[i + 1];
                    if (x < xMin) xMin = x;
                    if (y < yMin) yMin = y;
                    if (x > xMax) xMax = x;
                    if (y > yMax) yMax = y;
                  }
                } else {
                  xMin = xMax = yMin = yMax = 0;
                }

                glyphObj = glyphMap[glyphIndex] = {
                  index: glyphIndex,
                  advanceWidth: typrFont.hmtx.aWidth[glyphIndex],
                  xMin: xMin,
                  yMin: yMin,
                  xMax: xMax,
                  yMax: yMax,
                  pathCommandCount: cmds.length,
                  forEachPathCommand: function forEachPathCommand(callback) {
                    var argsIndex = 0;
                    var argsArray = [];
                    for (var _i3 = 0, _len = cmds.length; _i3 < _len; _i3++) {
                      var numArgs = cmdArgLengths[cmds[_i3]];
                      argsArray.length = 1 + numArgs;
                      argsArray[0] = cmds[_i3];
                      for (var j = 1; j <= numArgs; j++) {
                        argsArray[j] = crds[argsIndex++];
                      }
                      callback.apply(null, argsArray);
                    }
                  }
                };
              }

              callback.call(null, glyphObj, glyphX, charIndex);

              if (glyphObj.advanceWidth) {
                glyphX += glyphObj.advanceWidth * fontScale;
              }
              if (letterSpacing) {
                glyphX += letterSpacing * fontSize;
              }
            }
            charIndex += text.codePointAt(charIndex) > 0xffff ? 2 : 1;
          });
          return glyphX;
        }
      };

      return fontObj;
    }

    return function parse(buffer) {
      // Look to see if we have a WOFF file and convert it if so:
      var peek = new Uint8Array(buffer, 0, 4);
      var tag = Typr._bin.readASCII(peek, 0, 4);
      if (tag === 'wOFF') {
        buffer = woff2otf(buffer);
      } else if (tag === 'wOF2') {
        throw new Error('woff2 fonts not supported');
      }
      return wrapFontObj(Typr.parse(buffer)[0]);
    };
  }

  var workerModule = /*#__PURE__*/defineWorkerModule({
    name: 'Typr Font Parser',
    dependencies: [typrFactory, woff2otfFactory, parserFactory],
    init: function init(typrFactory, woff2otfFactory, parserFactory) {
      var Typr = typrFactory();
      var woff2otf = woff2otfFactory();
      return parserFactory(Typr, woff2otf);
    }
  });

  //import fontParser from './FontParser_OpenType.js'


  var CONFIG = {
    defaultFontURL: 'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff', //Roboto Regular
    sdfGlyphSize: 64,
    sdfMargin: 1 / 16,
    sdfExponent: 9,
    textureWidth: 2048
  };
  var tempColor = /*#__PURE__*/new THREE.Color();

  /**
   * Repository for all font SDF atlas textures
   *
   *   {
   *     [font]: {
   *       sdfTexture: DataTexture
   *     }
   *   }
   */
  var atlases = Object.create(null);

  /**
   * @typedef {object} TroikaTextRenderInfo - Format of the result from `getTextRenderInfo`.
   * @property {object} parameters - The normalized input arguments to the render call.
   * @property {DataTexture} sdfTexture - The SDF atlas texture.
   * @property {number} sdfGlyphSize - The size of each glyph's SDF; see `configureTextBuilder`.
   * @property {number} sdfExponent - The exponent used in encoding the SDF's values; see `configureTextBuilder`.
   * @property {Float32Array} glyphBounds - List of [minX, minY, maxX, maxY] quad bounds for each glyph.
   * @property {Float32Array} glyphAtlasIndices - List holding each glyph's index in the SDF atlas.
   * @property {Uint8Array} [glyphColors] - List holding each glyph's [r, g, b] color, if `colorRanges` was supplied.
   * @property {Float32Array} [caretPositions] - A list of caret positions for all glyphs; this is
   *           the bottom [x,y] of the cursor position before each char, plus one after the last char.
   * @property {number} [caretHeight] - An appropriate height for all selection carets.
   * @property {number} ascender - The font's ascender metric.
   * @property {number} descender - The font's descender metric.
   * @property {number} lineHeight - The final computed lineHeight measurement.
   * @property {number} topBaseline - The y position of the top line's baseline.
   * @property {Array<number>} blockBounds - The total [minX, minY, maxX, maxY] rect of the whole text block;
   *           this can include extra vertical space beyond the visible glyphs due to lineHeight, and is
   *           equivalent to the dimensions of a block-level text element in CSS.
   * @property {Array<number>} visibleBounds -
   * @property {Array<number>} totalBounds - DEPRECATED; use blockBounds instead.
   * @property {Array<number>} totalBlockSize - DEPRECATED; use blockBounds instead
   * @property {Array<number>} chunkedBounds - List of bounding rects for each consecutive set of N glyphs,
   *           in the format `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`.
   * @property {object} timings - Timing info for various parts of the rendering logic including SDF
   *           generation, layout, etc.
   * @frozen
   */

  /**
   * @callback getTextRenderInfo~callback
   * @param {TroikaTextRenderInfo} textRenderInfo
   */

  /**
   * Main entry point for requesting the data needed to render a text string with given font parameters.
   * This is an asynchronous call, performing most of the logic in a web worker thread.
   * @param {object} args
   * @param {getTextRenderInfo~callback} callback
   */
  function getTextRenderInfo(args, callback) {
    args = assign$1({}, args);

    // Apply default font here to avoid a 'null' atlas, and convert relative
    // URLs to absolute so they can be resolved in the worker
    args.font = toAbsoluteURL(args.font || CONFIG.defaultFontURL);

    // Normalize text to a string
    args.text = '' + args.text;

    args.sdfGlyphSize = args.sdfGlyphSize || CONFIG.sdfGlyphSize;

    // Normalize colors
    if (args.colorRanges != null) {
      var colors = {};
      for (var key in args.colorRanges) {
        if (args.colorRanges.hasOwnProperty(key)) {
          var val = args.colorRanges[key];
          if (typeof val !== 'number') {
            val = tempColor.set(val).getHex();
          }
          colors[key] = val;
        }
      }
      args.colorRanges = colors;
    }

    Object.freeze(args);

    // Init the atlas for this font if needed
    var textureWidth = CONFIG.textureWidth,
        sdfExponent = CONFIG.sdfExponent;
    var _args = args,
        sdfGlyphSize = _args.sdfGlyphSize;

    var atlasKey = args.font + '@' + sdfGlyphSize;
    var atlas = atlases[atlasKey];
    if (!atlas) {
      atlas = atlases[atlasKey] = {
        sdfTexture: new THREE.DataTexture(new Uint8Array(sdfGlyphSize * textureWidth), textureWidth, sdfGlyphSize, THREE.LuminanceFormat, undefined, undefined, undefined, undefined, THREE.LinearFilter, THREE.LinearFilter)
      };
      atlas.sdfTexture.font = args.font;
    }

    // Issue request to the FontProcessor in the worker
    processInWorker(args).then(function (result) {
      // If the response has newGlyphs, copy them into the atlas texture at the specified indices
      if (result.newGlyphSDFs) {
        result.newGlyphSDFs.forEach(function (_ref3) {
          var textureData = _ref3.textureData,
              atlasIndex = _ref3.atlasIndex;

          var texImg = atlas.sdfTexture.image;

          // Grow the texture by power of 2 if needed
          while (texImg.data.length < (atlasIndex + 1) * sdfGlyphSize * sdfGlyphSize) {
            var biggerArray = new Uint8Array(texImg.data.length * 2);
            biggerArray.set(texImg.data);
            texImg.data = biggerArray;
            texImg.height *= 2;
          }

          // Insert the new glyph's data into the full texture image at the correct offsets
          var cols = texImg.width / sdfGlyphSize;
          var baseStartIndex = texImg.width * sdfGlyphSize * Math.floor(atlasIndex / cols) //full rows
          + atlasIndex % cols * sdfGlyphSize; //partial row
          for (var y = 0; y < sdfGlyphSize; y++) {
            var srcStartIndex = y * sdfGlyphSize;
            var rowStartIndex = baseStartIndex + y * texImg.width;
            for (var x = 0; x < sdfGlyphSize; x++) {
              texImg.data[rowStartIndex + x] = textureData[srcStartIndex + x];
            }
          }
        });
        atlas.sdfTexture.needsUpdate = true;
      }

      // Invoke callback with the text layout arrays and updated texture
      callback(Object.freeze({
        parameters: args,
        sdfTexture: atlas.sdfTexture,
        sdfGlyphSize: sdfGlyphSize,
        sdfExponent: sdfExponent,
        glyphBounds: result.glyphBounds,
        glyphAtlasIndices: result.glyphAtlasIndices,
        glyphColors: result.glyphColors,
        caretPositions: result.caretPositions,
        caretHeight: result.caretHeight,
        chunkedBounds: result.chunkedBounds,
        ascender: result.ascender,
        descender: result.descender,
        lineHeight: result.lineHeight,
        topBaseline: result.topBaseline,
        blockBounds: result.blockBounds,
        visibleBounds: result.visibleBounds,
        timings: result.timings,
        get totalBounds() {
          console.log('totalBounds deprecated, use blockBounds instead');
          return result.blockBounds;
        },
        get totalBlockSize() {
          console.log('totalBlockSize deprecated, use blockBounds instead');

          var _result$blockBounds2 = _slicedToArray(result.blockBounds, 4),
              x0 = _result$blockBounds2[0],
              y0 = _result$blockBounds2[1],
              x1 = _result$blockBounds2[2],
              y1 = _result$blockBounds2[3];

          return [x1 - x0, y1 - y0];
        }
      }));
    });
  }

  // Local assign impl so we don't have to import troika-core
  function assign$1(toObj, fromObj) {
    for (var key in fromObj) {
      if (fromObj.hasOwnProperty(key)) {
        toObj[key] = fromObj[key];
      }
    }
    return toObj;
  }

  // Utility for making URLs absolute
  var linkEl = void 0;
  function toAbsoluteURL(path) {
    if (!linkEl) {
      linkEl = typeof document === 'undefined' ? {} : document.createElement('a');
    }
    linkEl.href = path;
    return linkEl.href;
  }

  var fontProcessorWorkerModule = /*#__PURE__*/defineWorkerModule({
    name: 'FontProcessor',
    dependencies: [CONFIG, workerModule, createGlyphSegmentsIndex, createSDFGenerator, createFontProcessor],
    init: function init(config, fontParser, createGlyphSegmentsIndex, createSDFGenerator, createFontProcessor) {
      var sdfExponent = config.sdfExponent,
          sdfMargin = config.sdfMargin,
          defaultFontURL = config.defaultFontURL;

      var sdfGenerator = createSDFGenerator(createGlyphSegmentsIndex, { sdfExponent: sdfExponent, sdfMargin: sdfMargin });
      return createFontProcessor(fontParser, sdfGenerator, { defaultFontURL: defaultFontURL });
    }
  });

  var processInWorker = /*#__PURE__*/defineWorkerModule({
    name: 'TextBuilder',
    dependencies: [fontProcessorWorkerModule, ThenableWorkerModule],
    init: function init(fontProcessor, Thenable) {
      return function (args) {
        var thenable = new Thenable();
        fontProcessor.process(args, thenable.resolve);
        return thenable;
      };
    },
    getTransferables: function getTransferables(result) {
      // Mark array buffers as transferable to avoid cloning during postMessage
      var transferables = [result.glyphBounds.buffer, result.glyphAtlasIndices.buffer];
      if (result.caretPositions) {
        transferables.push(result.caretPositions.buffer);
      }
      if (result.newGlyphSDFs) {
        result.newGlyphSDFs.forEach(function (d) {
          transferables.push(d.textureData.buffer);
        });
      }
      return transferables;
    }
  });

  var GlyphsGeometry = /*#__PURE__*/function () {

    var templateGeometries = {};
    function getTemplateGeometry(detail) {
      var geom = templateGeometries[detail];
      if (!geom) {
        geom = templateGeometries[detail] = new THREE.PlaneBufferGeometry(1, 1, detail, detail).translate(0.5, 0.5, 0);
      }
      return geom;
    }
    var tempVec3 = new THREE.Vector3();

    var glyphBoundsAttrName = 'aTroikaGlyphBounds';
    var glyphIndexAttrName = 'aTroikaGlyphIndex';
    var glyphColorAttrName = 'aTroikaGlyphColor';

    /**
    @class GlyphsGeometry
     A specialized Geometry for rendering a set of text glyphs. Uses InstancedBufferGeometry to
    render the glyphs using GPU instancing of a single quad, rather than constructing a whole
    geometry with vertices, for much smaller attribute arraybuffers according to this math:
       Where N = number of glyphs...
       Instanced:
      - position: 4 * 3
      - index: 2 * 3
      - normal: 4 * 3
      - uv: 4 * 2
      - glyph x/y bounds: N * 4
      - glyph indices: N * 1
      = 5N + 38
       Non-instanced:
      - position: N * 4 * 3
      - index: N * 2 * 3
      - normal: N * 4 * 3
      - uv: N * 4 * 2
      - glyph indices: N * 1
      = 39N
     A downside of this is the rare-but-possible lack of the instanced arrays extension,
    which we could potentially work around with a fallback non-instanced implementation.
     */

    var GlyphsGeometry = function (_THREE$InstancedBuffe) {
      _inherits(GlyphsGeometry, _THREE$InstancedBuffe);

      function GlyphsGeometry() {
        _classCallCheck(this, GlyphsGeometry);

        var _this = _possibleConstructorReturn(this, (GlyphsGeometry.__proto__ || Object.getPrototypeOf(GlyphsGeometry)).call(this));

        _this.detail = 1;

        // Define groups for rendering text outline as a separate pass; these will only
        // be used when the `material` getter returns an array, i.e. outlineWidth > 0.
        _this.groups = [{ start: 0, count: Infinity, materialIndex: 0 }, { start: 0, count: Infinity, materialIndex: 1 }];

        // Preallocate zero-radius bounding sphere
        _this.boundingSphere = new THREE.Sphere();
        _this.boundingBox = new THREE.Box3();
        return _this;
      }

      _createClass(GlyphsGeometry, [{
        key: 'computeBoundingSphere',
        value: function computeBoundingSphere() {
          // No-op; we'll sync the boundingSphere proactively in `updateGlyphs`.
        }
      }, {
        key: 'computeBoundingBox',
        value: function computeBoundingBox() {
          // No-op; we'll sync the boundingBox proactively in `updateGlyphs`.
        }
      }, {
        key: 'updateGlyphs',


        /**
         * Update the geometry for a new set of glyphs.
         * @param {Float32Array} glyphBounds - An array holding the planar bounds for all glyphs
         *        to be rendered, 4 entries for each glyph: x1,x2,y1,y1
         * @param {Float32Array} glyphAtlasIndices - An array holding the index of each glyph within
         *        the SDF atlas texture.
         * @param {Array} blockBounds - An array holding the [minX, minY, maxX, maxY] across all glyphs
         * @param {Array} [chunkedBounds] - An array of objects describing bounds for each chunk of N
         *        consecutive glyphs: `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`. This can be
         *        used with `applyClipRect` to choose an optimized `instanceCount`.
         * @param {Uint8Array} [glyphColors] - An array holding r,g,b values for each glyph.
         */
        value: function updateGlyphs(glyphBounds, glyphAtlasIndices, blockBounds, chunkedBounds, glyphColors) {
          // Update the instance attributes
          updateBufferAttr(this, glyphBoundsAttrName, glyphBounds, 4);
          updateBufferAttr(this, glyphIndexAttrName, glyphAtlasIndices, 1);
          updateBufferAttr(this, glyphColorAttrName, glyphColors, 3);
          this._chunkedBounds = chunkedBounds;
          setInstanceCount(this, glyphAtlasIndices.length);

          // Update the boundingSphere based on the total bounds
          var sphere = this.boundingSphere;
          sphere.center.set((blockBounds[0] + blockBounds[2]) / 2, (blockBounds[1] + blockBounds[3]) / 2, 0);
          sphere.radius = sphere.center.distanceTo(tempVec3.set(blockBounds[0], blockBounds[1], 0));

          // Update the boundingBox based on the total bounds
          var box = this.boundingBox;
          box.min.set(blockBounds[0], blockBounds[1], 0);
          box.max.set(blockBounds[2], blockBounds[3], 0);
        }

        /**
         * Given a clipping rect, and the chunkedBounds from the last updateGlyphs call, choose the lowest
         * `instanceCount` that will show all glyphs within the clipped view. This is an optimization
         * for long blocks of text that are clipped, to skip vertex shader evaluation for glyphs that would
         * be clipped anyway.
         *
         * Note that since `drawElementsInstanced[ANGLE]` only accepts an instance count and not a starting
         * offset, this optimization becomes less effective as the clipRect moves closer to the end of the
         * text block. We could fix that by switching from instancing to a full geometry with a drawRange,
         * but at the expense of much larger attribute buffers (see classdoc above.)
         *
         * @param {Vector4} clipRect
         */

      }, {
        key: 'applyClipRect',
        value: function applyClipRect(clipRect) {
          var count = this.getAttribute(glyphIndexAttrName).count;
          var chunks = this._chunkedBounds;
          if (chunks) {
            for (var i = chunks.length; i--;) {
              count = chunks[i].end;
              var rect = chunks[i].rect;
              // note: both rects are l-b-r-t
              if (rect[1] < clipRect.w && rect[3] > clipRect.y && rect[0] < clipRect.z && rect[2] > clipRect.x) {
                break;
              }
            }
          }
          setInstanceCount(this, count);
        }
      }, {
        key: 'detail',
        set: function set(detail) {
          var _this2 = this;

          if (detail !== this._detail) {
            this._detail = detail;
            if (typeof detail !== 'number' || detail < 1) {
              detail = 1;
            }
            var tpl = getTemplateGeometry(detail);['position', 'normal', 'uv'].forEach(function (attr) {
              _this2.attributes[attr] = tpl.attributes[attr].clone();
            });
            this.setIndex(tpl.getIndex().clone());
          }
        },
        get: function get() {
          return this._detail;
        }
      }]);

      return GlyphsGeometry;
    }(THREE.InstancedBufferGeometry);

    // Compat for pre r109:


    if (!GlyphsGeometry.prototype.setAttribute) {
      GlyphsGeometry.prototype.setAttribute = function (name, attribute) {
        this.attributes[name] = attribute;
        return this;
      };
    }

    function updateBufferAttr(geom, attrName, newArray, itemSize) {
      var attr = geom.getAttribute(attrName);
      if (newArray) {
        // If length isn't changing, just update the attribute's array data
        if (attr && attr.array.length === newArray.length) {
          attr.array.set(newArray);
          attr.needsUpdate = true;
        } else {
          geom.setAttribute(attrName, new THREE.InstancedBufferAttribute(newArray, itemSize));
          // If the new attribute has a different size, we also have to (as of r117) manually clear the
          // internal cached max instance count. See https://github.com/mrdoob/three.js/issues/19706
          // It's unclear if this is a threejs bug or a truly unsupported scenario; discussion in
          // that ticket is ambiguous as to whether replacing a BufferAttribute with one of a
          // different size is supported, but https://github.com/mrdoob/three.js/pull/17418 strongly
          // implies it should be supported. It's possible we need to
          delete geom._maxInstanceCount; //for r117+, could be fragile
          geom.dispose(); //for r118+, more robust feeling, but more heavy-handed than I'd like
        }
      } else if (attr) {
        geom.deleteAttribute(attrName);
      }
    }

    // Handle maxInstancedCount -> instanceCount rename that happened in three r117
    function setInstanceCount(geom, count) {
      geom[geom.hasOwnProperty('instanceCount') ? 'instanceCount' : 'maxInstancedCount'] = count;
    }

    return GlyphsGeometry;
  }();

  // language=GLSL
  var VERTEX_DEFS = '\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform vec4 uTroikaTotalBounds;\nuniform vec4 uTroikaClipRect;\nuniform mat3 uTroikaOrient;\nuniform bool uTroikaUseGlyphColors;\nuniform float uTroikaDistanceOffset;\nattribute vec4 aTroikaGlyphBounds;\nattribute float aTroikaGlyphIndex;\nattribute vec3 aTroikaGlyphColor;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying vec3 vTroikaGlyphColor;\nvarying vec2 vTroikaGlyphDimensions;\n';

  // language=GLSL prefix="void main() {" suffix="}"
  var VERTEX_TRANSFORM = '\nvec4 bounds = aTroikaGlyphBounds;\nvec4 outlineBounds = vec4(bounds.xy - uTroikaDistanceOffset, bounds.zw + uTroikaDistanceOffset);\nvec4 clippedBounds = vec4(\n  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),\n  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)\n);\nvec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);\n\nposition.xy = mix(bounds.xy, bounds.zw, clippedXY);\n\nuv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);\n\nposition = uTroikaOrient * position;\nnormal = uTroikaOrient * normal;\n\nvTroikaGlyphUV = clippedXY.xy;\nvTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);\n\n' + '\nfloat txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;\nvec2 txUvPerGlyph = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;\nvec2 txStartUV = txUvPerGlyph * vec2(\n  mod(aTroikaGlyphIndex, txCols),\n  floor(aTroikaGlyphIndex / txCols)\n);\nvTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerGlyph);\n';

  // language=GLSL
  var FRAGMENT_DEFS = '\nuniform sampler2D uTroikaSDFTexture;\nuniform vec2 uTroikaSDFTextureSize;\nuniform float uTroikaSDFGlyphSize;\nuniform float uTroikaSDFExponent;\nuniform float uTroikaDistanceOffset;\nuniform bool uTroikaSDFDebug;\nvarying vec2 vTroikaGlyphUV;\nvarying vec4 vTroikaTextureUVBounds;\nvarying vec2 vTroikaGlyphDimensions;\n\nfloat troikaSdfValueToSignedDistance(float alpha) {\n  // Inverse of encoding in SDFGenerator.js\n  ' + '\n  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);\n  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;\n  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);\n  return signedDist;\n}\n\nfloat troikaGlyphUvToSdfValue(vec2 glyphUV) {\n  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);\n  return texture2D(uTroikaSDFTexture, textureUV).r;\n}\n\nfloat troikaGlyphUvToDistance(vec2 uv) {\n  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));\n}\n\nfloat troikaGetTextAlpha(float distanceOffset) {\n  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);\n  float distance = troikaGlyphUvToDistance(clampedGlyphUV);\n    \n  // Extrapolate distance when outside bounds:\n  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : \n    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);\n\n  ' + '\n  \n  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)\n  float alpha = step(-distanceOffset, -distance);\n  #else\n  ' + '\n  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300\n  float aaDist = length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;\n  #else\n  float aaDist = vTroikaGlyphDimensions.x / 64.0;\n  #endif\n  \n  float alpha = smoothstep(\n    distanceOffset + aaDist,\n    distanceOffset - aaDist,\n    distance\n  );\n  #endif\n  \n  return alpha;\n}\n';

  // language=GLSL prefix="void main() {" suffix="}"
  var FRAGMENT_TRANSFORM = '\nfloat alpha = uTroikaSDFDebug ?\n  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :\n  troikaGetTextAlpha(uTroikaDistanceOffset);\n\n#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)\ngl_FragColor.a *= alpha;\n#endif\n  \nif (alpha == 0.0) {\n  discard;\n}\n';

  /**
   * Create a material for rendering text, derived from a baseMaterial
   */
  function createTextDerivedMaterial(baseMaterial) {
    var textMaterial = createDerivedMaterial(baseMaterial, {
      chained: true,
      extensions: {
        derivatives: true
      },
      uniforms: {
        uTroikaSDFTexture: { value: null },
        uTroikaSDFTextureSize: { value: new THREE.Vector2() },
        uTroikaSDFGlyphSize: { value: 0 },
        uTroikaSDFExponent: { value: 0 },
        uTroikaTotalBounds: { value: new THREE.Vector4(0, 0, 0, 0) },
        uTroikaClipRect: { value: new THREE.Vector4(0, 0, 0, 0) },
        uTroikaDistanceOffset: { value: 0 },
        uTroikaOrient: { value: new THREE.Matrix3() },
        uTroikaUseGlyphColors: { value: true },
        uTroikaSDFDebug: { value: false }
      },
      vertexDefs: VERTEX_DEFS,
      vertexTransform: VERTEX_TRANSFORM,
      fragmentDefs: FRAGMENT_DEFS,
      fragmentColorTransform: FRAGMENT_TRANSFORM,
      customRewriter: function customRewriter(_ref4) {
        var vertexShader = _ref4.vertexShader,
            fragmentShader = _ref4.fragmentShader;

        var uDiffuseRE = /\buniform\s+vec3\s+diffuse\b/;
        if (uDiffuseRE.test(fragmentShader)) {
          // Replace all instances of `diffuse` with our varying
          fragmentShader = fragmentShader.replace(uDiffuseRE, 'varying vec3 vTroikaGlyphColor').replace(/\bdiffuse\b/g, 'vTroikaGlyphColor');
          // Make sure the vertex shader declares the uniform so we can grab it as a fallback
          if (!uDiffuseRE.test(vertexShader)) {
            vertexShader = vertexShader.replace(voidMainRegExp, 'uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n');
          }
        }
        return { vertexShader: vertexShader, fragmentShader: fragmentShader };
      }
    });

    // Force transparency - TODO is this reasonable?
    textMaterial.transparent = true;

    Object.defineProperties(textMaterial, {
      isTroikaTextMaterial: { value: true },

      // WebGLShadowMap reverses the side of the shadow material by default, which fails
      // for planes, so here we force the `shadowSide` to always match the main side.
      shadowSide: {
        get: function get() {
          return this.side;
        },
        set: function set() {
          //no-op
        }
      }
    });

    return textMaterial;
  }

  var Text = /*#__PURE__*/function () {

    var defaultMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true
    });

    var tempMat4 = new THREE.Matrix4();
    var tempVec3a = new THREE.Vector3();
    var tempVec3b = new THREE.Vector3();
    var tempArray = [];
    var origin = new THREE.Vector3();
    var defaultOrient = '+x+y';

    function first(o) {
      return Array.isArray(o) ? o[0] : o;
    }

    var raycastMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1).translate(0.5, 0.5, 0), defaultMaterial);

    var syncStartEvent = { type: 'syncstart' };
    var syncCompleteEvent = { type: 'synccomplete' };

    var SYNCABLE_PROPS = ['font', 'fontSize', 'letterSpacing', 'lineHeight', 'maxWidth', 'overflowWrap', 'text', 'textAlign', 'textIndent', 'whiteSpace', 'anchorX', 'anchorY', 'colorRanges', 'sdfGlyphSize'];

    var COPYABLE_PROPS = SYNCABLE_PROPS.concat('material', 'color', 'depthOffset', 'clipRect', 'orientation', 'glyphGeometryDetail');

    /**
     * @class Text
     *
     * A ThreeJS Mesh that renders a string of text on a plane in 3D space using signed distance
     * fields (SDF).
     */

    var Text = function (_THREE$Mesh) {
      _inherits(Text, _THREE$Mesh);

      function Text() {
        _classCallCheck(this, Text);

        var geometry = new GlyphsGeometry();

        // === Text layout properties: === //

        /**
         * @member {string} text
         * The string of text to be rendered.
         */
        var _this3 = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, geometry, null));

        _this3.text = '';

        /**
         * @deprecated Use `anchorX` and `anchorY` instead
         * @member {Array<number>} anchor
         * Defines where in the text block should correspond to the mesh's local position, as a set
         * of horizontal and vertical percentages from 0 to 1. A value of `[0, 0]` (the default)
         * anchors at the top-left, `[1, 1]` at the bottom-right, and `[0.5, 0.5]` centers the
         * block at the mesh's position.
         */
        //this.anchor = null

        /**
         * @member {number|string} anchorX
         * Defines the horizontal position in the text block that should line up with the local origin.
         * Can be specified as a numeric x position in local units, a string percentage of the total
         * text block width e.g. `'25%'`, or one of the following keyword strings: 'left', 'center',
         * or 'right'.
         */
        _this3.anchorX = 0;

        /**
         * @member {number|string} anchorX
         * Defines the vertical position in the text block that should line up with the local origin.
         * Can be specified as a numeric y position in local units (note: down is negative y), a string
         * percentage of the total text block height e.g. `'25%'`, or one of the following keyword strings:
         * 'top', 'top-baseline', 'middle', 'bottom-baseline', or 'bottom'.
         */
        _this3.anchorY = 0;

        /**
         * @member {string} font
         * URL of a custom font to be used. Font files can be any of the formats supported by
         * OpenType (see https://github.com/opentypejs/opentype.js).
         * Defaults to the Roboto font loaded from Google Fonts.
         */
        _this3.font = null; //will use default from TextBuilder

        /**
         * @member {number} fontSize
         * The size at which to render the font in local units; corresponds to the em-box height
         * of the chosen `font`.
         */
        _this3.fontSize = 0.1;

        /**
         * @member {number} letterSpacing
         * Sets a uniform adjustment to spacing between letters after kerning is applied. Positive
         * numbers increase spacing and negative numbers decrease it.
         */
        _this3.letterSpacing = 0;

        /**
         * @member {number|string} lineHeight
         * Sets the height of each line of text, as a multiple of the `fontSize`. Defaults to 'normal'
         * which chooses a reasonable height based on the chosen font's ascender/descender metrics.
         */
        _this3.lineHeight = 'normal';

        /**
         * @member {number} maxWidth
         * The maximum width of the text block, above which text may start wrapping according to the
         * `whiteSpace` and `overflowWrap` properties.
         */
        _this3.maxWidth = Infinity;

        /**
         * @member {string} overflowWrap
         * Defines how text wraps if the `whiteSpace` property is `normal`. Can be either `'normal'`
         * to break at whitespace characters, or `'break-word'` to allow breaking within words.
         * Defaults to `'normal'`.
         */
        _this3.overflowWrap = 'normal';

        /**
         * @member {string} textAlign
         * The horizontal alignment of each line of text within the overall text bounding box.
         */
        _this3.textAlign = 'left';

        /**
         * @member {number} textIndent
         * Indentation for the first character of a line; see CSS `text-indent`.
         */
        _this3.textIndent = 0;

        /**
         * @member {string} whiteSpace
         * Defines whether text should wrap when a line reaches the `maxWidth`. Can
         * be either `'normal'` (the default), to allow wrapping according to the `overflowWrap` property,
         * or `'nowrap'` to prevent wrapping. Note that `'normal'` here honors newline characters to
         * manually break lines, making it behave more like `'pre-wrap'` does in CSS.
         */
        _this3.whiteSpace = 'normal';

        // === Presentation properties: === //

        /**
         * @member {THREE.Material} material
         * Defines a _base_ material to be used when rendering the text. This material will be
         * automatically replaced with a material derived from it, that adds shader code to
         * decrease the alpha for each fragment (pixel) outside the text glyphs, with antialiasing.
         * By default it will derive from a simple white MeshBasicMaterial, but you can use any
         * of the other mesh materials to gain other features like lighting, texture maps, etc.
         *
         * Also see the `color` shortcut property.
         */
        _this3.material = null;

        /**
         * @member {string|number|THREE.Color} color
         * This is a shortcut for setting the `color` of the text's material. You can use this
         * if you don't want to specify a whole custom `material`. Also, if you do use a custom
         * `material`, this color will only be used for this particuar Text instance, even if
         * that same material instance is shared across multiple Text objects.
         */
        _this3.color = null;

        /**
         * @member {object|null} colorRanges
         * WARNING: This API is experimental and may change.
         * This allows more fine-grained control of colors for individual or ranges of characters,
         * taking precedence over the material's `color`. Its format is an Object whose keys each
         * define a starting character index for a range, and whose values are the color for each
         * range. The color value can be a numeric hex color value, a `THREE.Color` object, or
         * any of the strings accepted by `THREE.Color`.
         */
        _this3.colorRanges = null;

        /**
         * @member {number|string} outlineWidth
         * WARNING: This API is experimental and may change.
         * The width of an outline drawn around each text glyph using the `outlineColor`. Can be
         * specified as either an absolute number in local units, or as a percentage string e.g.
         * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`.
         */
        _this3.outlineWidth = 0;

        /**
         * @member {string|number|THREE.Color} outlineColor
         * WARNING: This API is experimental and may change.
         * The color of the text outline, if `outlineWidth` is greater than zero. Defaults to black.
         */
        _this3.outlineColor = 0;

        /**
         * @member {number} depthOffset
         * This is a shortcut for setting the material's `polygonOffset` and related properties,
         * which can be useful in preventing z-fighting when this text is laid on top of another
         * plane in the scene. Positive numbers are further from the camera, negatives closer.
         */
        _this3.depthOffset = 0;

        /**
         * @member {Array<number>} clipRect
         * If specified, defines a `[minX, minY, maxX, maxY]` of a rectangle outside of which all
         * pixels will be discarded. This can be used for example to clip overflowing text when
         * `whiteSpace='nowrap'`.
         */
        _this3.clipRect = null;

        /**
         * @member {string} orientation
         * Defines the axis plane on which the text should be laid out when the mesh has no extra
         * rotation transform. It is specified as a string with two axes: the horizontal axis with
         * positive pointing right, and the vertical axis with positive pointing up. By default this
         * is '+x+y', meaning the text sits on the xy plane with the text's top toward positive y
         * and facing positive z. A value of '+x-z' would place it on the xz plane with the text's
         * top toward negative z and facing positive y.
         */
        _this3.orientation = defaultOrient;

        /**
         * @member {number} glyphGeometryDetail
         * Controls number of vertical/horizontal segments that make up each glyph's rectangular
         * plane. Defaults to 1. This can be increased to provide more geometrical detail for custom
         * vertex shader effects, for example.
         */
        _this3.glyphGeometryDetail = 1;

        /**
         * @member {number|null} sdfGlyphSize
         * The size of each glyph's SDF (signed distance field) used for rendering. This must be a
         * power-of-two number. Defaults to 64 which is generally a good balance of size and quality
         * for most fonts. Larger sizes can improve the quality of glyph rendering by increasing
         * the sharpness of corners and preventing loss of very thin lines, at the expense of
         * increased memory footprint and longer SDF generation time.
         */
        _this3.sdfGlyphSize = null;

        _this3.debugSDF = false;
        return _this3;
      }

      /**
       * Updates the text rendering according to the current text-related configuration properties.
       * This is an async process, so you can pass in a callback function to be executed when it
       * finishes.
       * @param {function} [callback]
       */


      _createClass(Text, [{
        key: 'sync',
        value: function sync(callback) {
          var _this4 = this;

          if (this._needsSync) {
            this._needsSync = false;

            // If there's another sync still in progress, queue
            if (this._isSyncing) {
              (this._queuedSyncs || (this._queuedSyncs = [])).push(callback);
            } else {
              this._isSyncing = true;
              this.dispatchEvent(syncStartEvent);

              getTextRenderInfo({
                text: this.text,
                font: this.font,
                fontSize: this.fontSize || 0.1,
                letterSpacing: this.letterSpacing || 0,
                lineHeight: this.lineHeight || 'normal',
                maxWidth: this.maxWidth,
                textAlign: this.textAlign,
                textIndent: this.textIndent,
                whiteSpace: this.whiteSpace,
                overflowWrap: this.overflowWrap,
                anchorX: this.anchorX,
                anchorY: this.anchorY,
                colorRanges: this.colorRanges,
                includeCaretPositions: true, //TODO parameterize
                sdfGlyphSize: this.sdfGlyphSize
              }, function (textRenderInfo) {
                _this4._isSyncing = false;

                // Save result for later use in onBeforeRender
                _this4._textRenderInfo = textRenderInfo;

                // Update the geometry attributes
                _this4.geometry.updateGlyphs(textRenderInfo.glyphBounds, textRenderInfo.glyphAtlasIndices, textRenderInfo.blockBounds, textRenderInfo.chunkedBounds, textRenderInfo.glyphColors);

                // If we had extra sync requests queued up, kick it off
                var queued = _this4._queuedSyncs;
                if (queued) {
                  _this4._queuedSyncs = null;
                  _this4._needsSync = true;
                  _this4.sync(function () {
                    queued.forEach(function (fn) {
                      return fn && fn();
                    });
                  });
                }

                _this4.dispatchEvent(syncCompleteEvent);
                if (callback) {
                  callback();
                }
              });
            }
          }
        }

        /**
         * Initiate a sync if needed - note it won't complete until next frame at the
         * earliest so if possible it's a good idea to call sync() manually as soon as
         * all the properties have been set.
         * @override
         */

      }, {
        key: 'onBeforeRender',
        value: function onBeforeRender(renderer, scene, camera, geometry, material, group) {
          this.sync();

          // This may not always be a text material, e.g. if there's a scene.overrideMaterial present
          if (material.isTroikaTextMaterial) {
            this._prepareForRender(material);
          }
        }

        /**
         * Shortcut to dispose the geometry specific to this instance.
         * Note: we don't also dispose the derived material here because if anything else is
         * sharing the same base material it will result in a pause next frame as the program
         * is recompiled. Instead users can dispose the base material manually, like normal,
         * and we'll also dispose the derived material at that time.
         */

      }, {
        key: 'dispose',
        value: function dispose() {
          this.geometry.dispose();
        }

        /**
         * @property {TroikaTextRenderInfo|null} textRenderInfo
         * @readonly
         * The current processed rendering data for this TextMesh, returned by the TextBuilder after
         * a `sync()` call. This will be `null` initially, and may be stale for a short period until
         * the asynchrous `sync()` process completes.
         */

      }, {
        key: '_prepareForRender',
        value: function _prepareForRender(material) {
          var isOutline = material.isTextOutlineMaterial;
          var uniforms = material.uniforms;
          var textInfo = this.textRenderInfo;
          if (textInfo) {
            var sdfTexture = textInfo.sdfTexture,
                blockBounds = textInfo.blockBounds;

            uniforms.uTroikaSDFTexture.value = sdfTexture;
            uniforms.uTroikaSDFTextureSize.value.set(sdfTexture.image.width, sdfTexture.image.height);
            uniforms.uTroikaSDFGlyphSize.value = textInfo.sdfGlyphSize;
            uniforms.uTroikaSDFExponent.value = textInfo.sdfExponent;
            uniforms.uTroikaTotalBounds.value.fromArray(blockBounds);
            uniforms.uTroikaUseGlyphColors.value = !!textInfo.glyphColors;

            var distanceOffset = 0;
            if (isOutline) {
              var outlineWidth = this.outlineWidth;

              if (typeof outlineWidth === 'string') {
                var match = outlineWidth.match(/^([\d.]+)%$/);
                var pct = match ? parseFloat(match[1]) : NaN;
                outlineWidth = (isNaN(pct) ? 0 : pct / 100) * this.fontSize;
              }
              distanceOffset = outlineWidth;
            }
            uniforms.uTroikaDistanceOffset.value = distanceOffset;

            var clipRect = this.clipRect;
            if (clipRect && Array.isArray(clipRect) && clipRect.length === 4) {
              uniforms.uTroikaClipRect.value.fromArray(clipRect);
            } else {
              // no clipping - choose a finite rect that shouldn't ever be reached by overflowing glyphs or outlines
              var pad = (this.fontSize || 0.1) * 100;
              uniforms.uTroikaClipRect.value.set(blockBounds[0] - pad, blockBounds[1] - pad, blockBounds[2] + pad, blockBounds[3] + pad);
            }
            this.geometry.applyClipRect(uniforms.uTroikaClipRect.value);
          }
          uniforms.uTroikaSDFDebug.value = !!this.debugSDF;
          material.polygonOffset = !!this.depthOffset;
          material.polygonOffsetFactor = material.polygonOffsetUnits = this.depthOffset || 0;

          // Shortcut for setting material color via `color` prop on the mesh; this is
          // applied only to the derived material to avoid mutating a shared base material.
          var color = isOutline ? this.outlineColor || 0 : this.color;
          if (color == null) {
            delete material.color; //inherit from base
          } else {
            var colorObj = material.hasOwnProperty('color') ? material.color : material.color = new THREE.Color();
            if (color !== colorObj._input || (typeof color === 'undefined' ? 'undefined' : _typeof(color)) === 'object') {
              colorObj.set(colorObj._input = color);
            }
          }

          // base orientation
          var orient = this.orientation || defaultOrient;
          if (orient !== material._orientation) {
            var rotMat = uniforms.uTroikaOrient.value;
            orient = orient.replace(/[^-+xyz]/g, '');
            var _match = orient !== defaultOrient && orient.match(/^([-+])([xyz])([-+])([xyz])$/);
            if (_match) {
              var _match2 = _slicedToArray(_match, 5),
                  hSign = _match2[1],
                  hAxis = _match2[2],
                  vSign = _match2[3],
                  vAxis = _match2[4];

              tempVec3a.set(0, 0, 0)[hAxis] = hSign === '-' ? 1 : -1;
              tempVec3b.set(0, 0, 0)[vAxis] = vSign === '-' ? -1 : 1;
              tempMat4.lookAt(origin, tempVec3a.cross(tempVec3b), tempVec3b);
              rotMat.setFromMatrix4(tempMat4);
            } else {
              rotMat.identity();
            }
            material._orientation = orient;
          }
        }

        /**
         * @override Custom raycasting to test against the whole text block's max rectangular bounds
         * TODO is there any reason to make this more granular, like within individual line or glyph rects?
         */

      }, {
        key: 'raycast',
        value: function raycast(raycaster, intersects) {
          var textInfo = this.textRenderInfo;
          if (textInfo) {
            var bounds = textInfo.blockBounds;
            raycastMesh.matrixWorld.multiplyMatrices(this.matrixWorld, tempMat4.set(bounds[2] - bounds[0], 0, 0, bounds[0], 0, bounds[3] - bounds[1], 0, bounds[1], 0, 0, 1, 0, 0, 0, 0, 1));
            tempArray.length = 0;
            raycastMesh.raycast(raycaster, tempArray);
            for (var i = 0; i < tempArray.length; i++) {
              tempArray[i].object = this;
              intersects.push(tempArray[i]);
            }
          }
        }
      }, {
        key: 'copy',
        value: function copy(source) {
          var _this5 = this;

          _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'copy', this).call(this, source);
          COPYABLE_PROPS.forEach(function (prop) {
            _this5[prop] = source[prop];
          });
          return this;
        }
      }, {
        key: 'clone',
        value: function clone() {
          return new this.constructor().copy(this);
        }
      }, {
        key: 'textRenderInfo',
        get: function get() {
          return this._textRenderInfo || null;
        }

        // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
        // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.

      }, {
        key: 'material',
        get: function get() {
          var derivedMaterial = this._derivedMaterial;
          var baseMaterial = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = defaultMaterial.clone());
          if (!derivedMaterial || derivedMaterial.baseMaterial !== baseMaterial) {
            derivedMaterial = this._derivedMaterial = createTextDerivedMaterial(baseMaterial);
            // dispose the derived material when its base material is disposed:
            baseMaterial.addEventListener('dispose', function onDispose() {
              baseMaterial.removeEventListener('dispose', onDispose);
              derivedMaterial.dispose();
            });
          }
          // If text outline is present, render it as a preliminary draw using Three's multi-material
          // feature (see GlyphsGeometry which sets up `groups` for this purpose) Doing it with multi
          // materials ensures the layers are always rendered consecutively in a consistent order.
          // Each layer will trigger onBeforeRender with the appropriate material.
          if (this.outlineWidth) {
            var outlineMaterial = derivedMaterial._outlineMtl;
            if (!outlineMaterial) {
              outlineMaterial = derivedMaterial._outlineMtl = Object.create(derivedMaterial, {
                id: { value: derivedMaterial.id + 0.1 }
              });
              outlineMaterial.isTextOutlineMaterial = true;
              outlineMaterial.depthWrite = false;
              outlineMaterial.map = null; //???
            }
            derivedMaterial = [outlineMaterial, derivedMaterial];
          }
          return derivedMaterial;
        },
        set: function set(baseMaterial) {
          if (baseMaterial && baseMaterial.isTroikaTextMaterial) {
            //prevent double-derivation
            this._derivedMaterial = baseMaterial;
            this._baseMaterial = baseMaterial.baseMaterial;
          } else {
            this._baseMaterial = baseMaterial;
          }
        }
      }, {
        key: 'glyphGeometryDetail',
        get: function get() {
          return this.geometry.detail;
        },
        set: function set(detail) {
          this.geometry.detail = detail;
        }

        // Create and update material for shadows upon request:

      }, {
        key: 'customDepthMaterial',
        get: function get() {
          return first(this.material).getDepthMaterial();
        }
      }, {
        key: 'customDistanceMaterial',
        get: function get() {
          return first(this.material).getDistanceMaterial();
        }
      }]);

      return Text;
    }(THREE.Mesh);

    // Create setters for properties that affect text layout:


    SYNCABLE_PROPS.forEach(function (prop) {
      var privateKey = '_private_' + prop;
      Object.defineProperty(Text.prototype, prop, {
        get: function get() {
          return this[privateKey];
        },
        set: function set(value) {
          if (value !== this[privateKey]) {
            this[privateKey] = value;
            this._needsSync = true;
          }
        }
      });
    });

    // Deprecation handler for `anchor` array:
    var deprMsgShown = false;
    Object.defineProperty(Text.prototype, 'anchor', {
      get: function get() {
        return this._deprecated_anchor;
      },
      set: function set(val) {
        this._deprecated_anchor = val;
        if (!deprMsgShown) {
          console.warn('TextMesh: `anchor` has been deprecated; use `anchorX` and `anchorY` instead.');
          deprMsgShown = true;
        }
        if (Array.isArray(val)) {
          this.anchorX = (+val[0] || 0) * 100 + '%';
          this.anchorY = (+val[1] || 0) * 100 + '%';
        } else {
          this.anchorX = this.anchorY = 0;
        }
      }
    });

    return Text;
  }();

  var COMPONENT_NAME = 'troika-text';

  aframe__default['default'].registerComponent(COMPONENT_NAME, {
    schema: {
      align: { type: 'string', default: 'left', oneOf: ['left', 'right', 'center', 'justify'] },
      anchor: { default: 'center', oneOf: ['left', 'right', 'center', 'align'] },
      baseline: { default: 'center', oneOf: ['top', 'center', 'bottom'] },
      clipRect: {
        type: 'string',
        default: '',
        parse: function parse(value) {
          if (value) {
            value = value.split(/[\s,]+/).reduce(function (out, val) {
              val = +val;
              if (!isNaN(val)) {
                out.push(val);
              }
              return out;
            }, []);
          }
          return value && value.length === 4 ? value : null;
        },
        stringify: function stringify(value) {
          return value ? value.join(' ') : '';
        }
      },
      color: { type: 'color', default: '#FFF' },
      depthOffset: { type: 'number', default: 0 },
      font: { type: 'string' },
      fontSize: { type: 'number', default: 0.2 },
      letterSpacing: { type: 'number', default: 0 },
      lineHeight: { type: 'number' },
      maxWidth: { type: 'number', default: Infinity },
      outlineColor: { type: 'color', default: '#000' },
      outlineWidth: {
        default: 0,
        parse: function parse(value) {
          if (typeof value === 'string' && value.indexOf('%') > 0) {
            return value;
          }
          value = +value;
          return isNaN(value) ? 0 : value;
        },
        stringify: function stringify(value) {
          return '' + value;
        }
      },
      overflowWrap: { type: 'string', default: 'normal', oneOf: ['normal', 'break-word'] },
      textIndent: { type: 'number', default: 0 },
      value: { type: 'string' },
      whiteSpace: { default: 'normal', oneOf: ['normal', 'nowrap']

        // attrs that can be configured via troika-text-material:
        // opacity: {type: 'number', default: 1.0},
        // transparent: {default: true},
        // side: {default: 'front', oneOf: ['front', 'back', 'double']},
      } },

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function init() {
      // If we're being applied as a component attached to a generic a-entity, create an
      // anonymous sub-entity that we can use to isolate the text mesh and the material
      // component that should apply to it. If we're a primitive, no isolation is needed.
      var textEntity;
      var isPrimitive = this.el.tagName.toLowerCase() === 'a-troika-text';
      if (isPrimitive) {
        textEntity = this.el;
      } else {
        textEntity = document.createElement('a-entity');
        this.el.appendChild(textEntity);
      }
      this.troikaTextEntity = textEntity;

      // Create Text mesh and add it to the entity as the 'mesh' object
      var textMesh = this.troikaTextMesh = new Text();
      textEntity.setObject3D('mesh', textMesh);
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function update() {
      var data = this.data;
      var mesh = this.troikaTextMesh;
      var entity = this.troikaTextEntity;

      // Update the text mesh
      mesh.text = (data.value || '').replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      mesh.textAlign = data.align;

      mesh.anchorX = anchorMapping[data.anchor === 'align' ? data.align : data.anchor] || 'center';
      mesh.anchorY = baselineMapping[data.baseline] || 'middle';
      mesh.color = data.color;
      mesh.clipRect = data.clipRect;
      mesh.depthOffset = data.depthOffset || 0;
      mesh.font = data.font; //TODO allow aframe stock font names
      mesh.fontSize = data.fontSize;
      mesh.letterSpacing = data.letterSpacing || 0;
      mesh.lineHeight = data.lineHeight || 'normal';
      mesh.outlineColor = data.outlineColor;
      mesh.outlineWidth = data.outlineWidth;
      mesh.overflowWrap = data.overflowWrap;
      mesh.textIndent = data.textIndent;
      mesh.whiteSpace = data.whiteSpace;
      mesh.maxWidth = data.maxWidth;
      mesh.sync();

      // Pass material config down to child entity
      if (entity !== this.el) {
        var materialAttr = this.el.getAttribute('troika-text-material');
        if (materialAttr) {
          entity.setAttribute('material', materialAttr);
        } else {
          entity.removeAttribute('material');
        }
      }
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function remove() {
      // Free memory
      this.troikaTextMesh.dispose();

      // If using sub-entity, remove it
      if (this.troikaTextEntity !== this.el) {
        this.el.removeChild(this.troikaTextEntity);
      }
    }

  });

  var anchorMapping = {
    'left': 'left',
    'center': 'center',
    'right': 'right'
  };
  var baselineMapping = {
    'top': 'top',
    'center': 'middle',
    'bottom': 'bottom'
  };

  var mappings = {};

  // From aframe's primitives.js utilities...
  var schema = aframe__default['default'].components[COMPONENT_NAME].schema;
  Object.keys(schema).map(function (prop) {
    // Hyphenate where there is camelCase.
    var attrName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    mappings[attrName] = COMPONENT_NAME + '.' + prop;
  });

  aframe__default['default'].registerPrimitive('a-troika-text', {
    defaultComponents: {
      'troika-text': {}
    },
    mappings: mappings
  });

  // Polyfill Three's rename of Math->MathUtils after the super-three fork
  (function (ThreedleDum) {
    if (!ThreedleDum.MathUtils) {
      ThreedleDum.MathUtils = ThreedleDum.Math;
    }
  })(THREE__namespace);
})(THREE, AFRAME);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

// third-party
__webpack_require__(21);

// Components
__webpack_require__(20);
__webpack_require__(19);
__webpack_require__(10);
__webpack_require__(0);
__webpack_require__(9);
__webpack_require__(5);
__webpack_require__(11);
__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(16);
__webpack_require__(13);
__webpack_require__(2);
__webpack_require__(12);
__webpack_require__(3);
__webpack_require__(15);
__webpack_require__(17);
__webpack_require__(8);
__webpack_require__(4);
__webpack_require__(14);
__webpack_require__(18);

/***/ })
/******/ ]);