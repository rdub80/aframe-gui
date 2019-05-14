AFRAME.registerComponent('gui-cursor', {
    schema: {
        color: {type: 'string', default: key_white},
        hoverColor: {type: 'string', default: key_white},
        activeColor: {type: 'string', default: key_orange},
        distance: {type: 'number', default: -1},
        design: {type: 'string', default: 'dot'},
    },
    init: function () {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = this.fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value

        var el = this.el;
        var data = this.data;
        var defaultHoverAnimationDuration = 200;
        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;

        AFRAME.utils.entity.setComponentProperty(el, 'raycaster.interval', '500');
        
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

        if(data.design == 'dot'){    

            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.025');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);
            el.setAttribute('animation__radiusInnerIn', `property: geometry.radiusInner; from: 0.000001; to:0.0225; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__radiusOuterIn', `property: geometry.radiusOuter; from: 0.025; to:0.0275; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__colorIn', `property: material.color; from: ${data.color}; to:${data.hoverColor}; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__radiusInnerOut', `property: geometry.radiusInner; from: 0.0225; to:0.000001; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__radiusOuterOut', `property: geometry.radiusOuter; from: 0.0275; to:0.025; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__colorOut', `property: material.color; from: ${data.hoverColor}; to:${data.color}; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__scale', `property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click`);

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0275; radiusOuter:0.03; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__radiusInnerIn', `property: geometry.radiusInner; from: 0.0275; to:0.03; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__radiusOuterIn', `property: geometry.radiusOuter; from: 0.03; to:0.0325; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__radiusInnerOut', `property: geometry.radiusInner; from: 0.03; to:0.0275; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            cursorShadow.setAttribute('animation__radiusOuterOut', `property: geometry.radiusOuter; from: 0.0325; to:0.03; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0375; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                fuseLoader.setAttribute('animation', `property: geometry.thetaLength; from: 0; to:360; dur:${fuseAnimationDuration}; delay: ${defaultHoverAnimationDuration}; easing:linear; autoplay:false;`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end dot design

        }else if(data.design == 'ring'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.0225; radiusOuter:0.0275');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);
            el.setAttribute('animation__radiusInnerIn', `property: geometry.radiusInner; from: 0.0225; to:0.025; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__radiusOuterIn', `property: geometry.radiusOuter; from: 0.0275; to:0.0325; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__colorIn', `property: material.color; from: ${data.color}; to:${data.hoverColor}; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__radiusInnerOut', `property: geometry.radiusInner; from: 0.025; to:0.0225; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__radiusOuterOut', `property: geometry.radiusOuter; from: 0.0325; to:0.0275; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__colorOut', `property: material.color; from: ${data.hoverColor}; to:${data.color}; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.setAttribute('animation__scale', `property: scale; from: 1 1 1; to:1.25 1.25 1.25; dur:200; easing:easeInQuad; startEvents: click`);

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0325; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__radiusInnerIn', `property: geometry.radiusInner; from: 0.03; to:0.0325; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__radiusOuterIn', `property: geometry.radiusOuter; from: 0.0325; to:0.0375; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__radiusInnerOut', `property: geometry.radiusInner; from: 0.0325; to:0.03; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            cursorShadow.setAttribute('animation__radiusOuterOut', `property: geometry.radiusOuter; from: 0.0375; to:0.0325; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0425; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                fuseLoader.setAttribute('animation', `property: geometry.thetaLength; from: 0; to:360; dur:${fuseAnimationDuration}; delay: ${defaultHoverAnimationDuration}; easing:linear; autoplay:false;`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end ring design

        }else if(data.design == 'reticle'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180;');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);
            el.setAttribute('animation__opacityIn', `property: material.opacity; from: 1; to: 0; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__opacityOut', `property: material.opacity; from: 0; to: 1; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);

            var cursorCenter = document.createElement("a-entity");
            cursorCenter.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180; thetaStart:180;');
            cursorCenter.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorCenter.setAttribute('position', '0 0 0');
            cursorCenter.setAttribute('animation__opacityIn', `property: material.opacity; from: 0.25; to: 0; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorCenter.setAttribute('animation__opacityOut', `property: material.opacity; from: 0; to: 0.25; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorCenter);
            this.cursorCenter = cursorCenter;

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0125; radiusOuter:0.0145');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            cursorShadow.setAttribute('animation__colorIn', `property: material.color; from: #000000; to: ${data.color}; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__opacityIn', `property: material.opacity; from: 0.25; to: 1; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorShadow.setAttribute('animation__colorOut', `property: material.color; from: ${data.color}; to: #000000; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
            cursorShadow.setAttribute('animation__opacityOut', `property: material.opacity; from: 1; to: 0.25; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);
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
            cursorBoundTL.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundTL.setAttribute('position', '-0.03 0.0375 0');
            el.appendChild(cursorBoundTL);
            this.cursorBoundTL = cursorBoundTL;
            var cursorBoundTL2 = document.createElement("a-entity");
            cursorBoundTL2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundTL2.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundTL2.setAttribute('position', '-0.0375 0.03 0');
            el.appendChild(cursorBoundTL2);
            this.cursorBoundTL2 = cursorBoundTL2;

            var cursorBoundTR = document.createElement("a-entity");
            cursorBoundTR.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundTR.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundTR.setAttribute('position', '0.03 0.0375 0');
            el.appendChild(cursorBoundTR);
            this.cursorBoundTR = cursorBoundTR;
            var cursorBoundTR2 = document.createElement("a-entity");
            cursorBoundTR2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundTR2.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundTR2.setAttribute('position', '0.0375 0.03 0');
            el.appendChild(cursorBoundTR2);
            this.cursorBoundTR2 = cursorBoundTR2;

            var cursorBoundBL = document.createElement("a-entity");
            cursorBoundBL.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundBL.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundBL.setAttribute('position', '-0.03 -0.0375 0');
            el.appendChild(cursorBoundBL);
            this.cursorBoundBL = cursorBoundBL;
            var cursorBoundBL2 = document.createElement("a-entity");
            cursorBoundBL2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundBL2.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundBL2.setAttribute('position', '-0.0375 -0.03 0');
            el.appendChild(cursorBoundBL2);
            this.cursorBoundBL2 = cursorBoundBL2;

            var cursorBoundBR = document.createElement("a-entity");
            cursorBoundBR.setAttribute('geometry', 'primitive: plane; width:0.015; height:0.0035;');
            cursorBoundBR.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundBR.setAttribute('position', '0.03 -0.0375 0');
            el.appendChild(cursorBoundBR);
            this.cursorBoundBR = cursorBoundBR;
            var cursorBoundBR2 = document.createElement("a-entity");
            cursorBoundBR2.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.015;');
            cursorBoundBR2.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorBoundBR2.setAttribute('position', '0.0375 -0.03 0');
            el.appendChild(cursorBoundBR2);
            this.cursorBoundBR2 = cursorBoundBR2;

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: plane; width:0.000001; height:0.01;');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', '0 -0.05 0');
                fuseLoader.setAttribute('animation', `property: geometry.width; from: 0; to: 0.075; dur:${fuseAnimationDuration}; delay:${defaultHoverAnimationDuration}; easing:linear; autoplay:false;`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end reticle design

        }else if(data.design == 'cross'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0375');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);
            el.setAttribute('animation__radiusInnerIn', `property: geometry.radiusInner; from: 0.035; to: 0.0315; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: hovergui`);
            el.setAttribute('animation__radiusInnerOut', `property: geometry.radiusInner; from: 0.0315; to: 0.035; dur:${defaultHoverAnimationDuration}; easing:linear; startEvents: leavegui`);

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0375; radiusOuter:0.04; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var cursorVerticalTop = document.createElement("a-entity");
            cursorVerticalTop.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.01875');
            cursorVerticalTop.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorVerticalTop.setAttribute('position', '0 0.028125 0');
            cursorVerticalTop.setAttribute('animation__widthIn', `property: geometry.width; from: 0.0035; to: 0.007; dur:${fuseAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorVerticalTop.setAttribute('animation__widthOut', `property: geometry.width; from: 0.007; to: 0.0035; dur:${fuseAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorVerticalTop);
            this.cursorVerticalTop = cursorVerticalTop;

            var cursorVerticalBottom = document.createElement("a-entity");
            cursorVerticalBottom.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.01875');
            cursorVerticalBottom.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorVerticalBottom.setAttribute('position', '0 -0.028125 0');
            cursorVerticalBottom.setAttribute('animation__widthIn', `property: geometry.width; from: 0.0035; to: 0.007; dur:${fuseAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorVerticalBottom.setAttribute('animation__widthOut', `property: geometry.width; from: 0.007; to: 0.0035; dur:${fuseAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorVerticalBottom);
            this.cursorVerticalBottom = cursorVerticalBottom;

            var cursorHorizontalLeft = document.createElement("a-entity");
            cursorHorizontalLeft.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalLeft.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorHorizontalLeft.setAttribute('position', '-0.028125 0 0');
            cursorHorizontalLeft.setAttribute('animation__heightIn', `property: geometry.height; from: 0.0035; to: 0.007; dur:${fuseAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorHorizontalLeft.setAttribute('animation__heightOut', `property: geometry.height; from: 0.007; to: 0.0035; dur:${fuseAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorHorizontalLeft);
            this.cursorHorizontalLeft = cursorHorizontalLeft;

            var cursorHorizontalRight = document.createElement("a-entity");
            cursorHorizontalRight.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalRight.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorHorizontalRight.setAttribute('position', '0.028125 0 0');
            cursorHorizontalRight.setAttribute('animation__heightIn', `property: geometry.height; from: 0.0035; to: 0.007; dur:${fuseAnimationDuration}; easing:linear; startEvents: hovergui`);
            cursorHorizontalRight.setAttribute('animation__heightOut', `property: geometry.height; from: 0.007; to: 0.0035; dur:${fuseAnimationDuration}; easing:linear; startEvents: leavegui`);
            el.appendChild(cursorHorizontalRight);
            this.cursorHorizontalRight = cursorHorizontalRight;

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.0415; radiusOuter:0.0485; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                fuseLoader.setAttribute('animation', `property: geometry.thetaLength; from: 0; to: 360; dur:${fuseAnimationDuration}; delay:${defaultHoverAnimationDuration}; easing:linear; autoplay:false;`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;
            }
            //end cross design        
        }

        el.addEventListener('mouseenter', function () {
            console.log("in gui-cursor mousenter, el: "+el);
            el.emit('hovergui');
            if (data.design == 'dot' || data.design == 'ring') {
                cursorShadow.emit('hovergui');
            }else if (data.design == 'cross') {
                cursorShadow.emit('hovergui');
                cursorVerticalTop.emit('hovergui');
                cursorVerticalBottom.emit('hovergui');
                cursorHorizontalLeft.emit('hovergui');
                cursorHorizontalRight.emit('hovergui');
            }else if (data.design == 'reticle') {
                centerHoverAniOpacity.emit('hovergui');
                cursorHoverAniColor.emit('hovergui');
                cursorHoverAniOpacity.emit('hovergui');
            }

        });

        el.addEventListener('mouseleave', function () {
            console.log("in gui-cursor mouseleave, el: "+el);
            el.emit('leavegui');
            if (data.design == 'dot' || data.design == 'ring') {
                cursorShadow.emit('leavegui');
            }else if (data.design == 'cross') {
                cursorVerticalTop.emit('leavegui');
                cursorVerticalBottom.emit('leavegui');
                cursorHorizontalLeft.emit('leavegui');
                cursorHorizontalRight.emit('leavegui');
            }else if (data.design == 'reticle') {
                centerHoverAniOpacity.emit('leavegui');
                cursorHoverAniColor.emit('leavegui');
                cursorHoverAniOpacity.emit('leavegui');
            }

            if(fuse){
                fuseLoader.object3D.el.components.animation.animation.pause();
                fuseLoader.object3D.el.components.animation.animation.seek(0);
            }

            el.setAttribute('scale', '1 1 1');
        });

        if(fuse){
            el.addEventListener('fusing', function () {
                fuseLoader.object3D.el.components.animation.animation.play();
            });
        }

        el.addEventListener("stateremoved", function (evt) {
            console.log("evt.detail " +evt.detail)
            if (evt.detail === 'cursor-fusing') {
                if(data.design == 'dot' || data.design == 'ring' || data.design == 'cross' ){  
                    if(fuse){
                        fuseLoader.object3D.el.components.animation.animation.pause();
                        fuseLoader.object3D.el.components.animation.animation.seek(0);
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                }else if(data.design == 'reticle'){
                    if(fuse){
                        fuseLoader.object3D.el.components.animation.animation.pause();
                        fuseLoader.object3D.el.components.animation.animation.seek(0);
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.width', '0.000001');
                    }                    
                }
            }else if(evt.detail === 'cursor-hovering') {
                if(data.design == 'dot' || data.design == 'ring' ){  
                    AFRAME.utils.entity.setComponentProperty(this, 'scale', '1 1 1');
                    if(fuse){
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                }else if(data.design == 'cross' ){  
                    if(fuse){
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                }else if(data.design == 'reticle' ){  
                    if(fuse){
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.width', '0.000001');
                    }
                }
            }
        });


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
    }
});

AFRAME.registerPrimitive( 'a-gui-cursor', {
    defaultComponents: {
        'cursor': {},
        'gui-cursor': { }
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