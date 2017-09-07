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

        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

        if(data.design == 'dot'){    

            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.025');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);

            var hoverAniInner = document.createElement("a-animation");
            hoverAniInner.setAttribute('begin', 'hovergui');
            hoverAniInner.setAttribute('easing', 'linear');
            hoverAniInner.setAttribute('attribute', 'geometry.radiusInner');
            hoverAniInner.setAttribute('fill', 'forwards');
            hoverAniInner.setAttribute('from', '0.000001');
            hoverAniInner.setAttribute('to', '0.0225');
            hoverAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniInner);

            var hoverAniOuter = document.createElement("a-animation");
            hoverAniOuter.setAttribute('begin', 'hovergui');
            hoverAniOuter.setAttribute('easing', 'linear');
            hoverAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            hoverAniOuter.setAttribute('fill', 'forwards');
            hoverAniOuter.setAttribute('from', '0.025');
            hoverAniOuter.setAttribute('to', '0.0275');
            hoverAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniOuter);

            var hoverAniColor = document.createElement("a-animation");
            hoverAniColor.setAttribute('begin', 'hovergui');
            hoverAniColor.setAttribute('easing', 'linear');
            hoverAniColor.setAttribute('attribute', 'material.color');
            hoverAniColor.setAttribute('fill', 'forwards');
            hoverAniColor.setAttribute('from', `${data.color}`);
            hoverAniColor.setAttribute('to',  `${data.hoverColor}`);
            hoverAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniColor);

            var leaveAniInner = document.createElement("a-animation");
            leaveAniInner.setAttribute('begin', 'leavegui');
            leaveAniInner.setAttribute('easing', 'linear');
            leaveAniInner.setAttribute('attribute', 'geometry.radiusInner');
            leaveAniInner.setAttribute('fill', 'forwards');
            leaveAniInner.setAttribute('from', '0.0225');
            leaveAniInner.setAttribute('to', '0.000001');
            leaveAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniInner);

            var leaveAniOuter = document.createElement("a-animation");
            leaveAniOuter.setAttribute('begin', 'leavegui');
            leaveAniOuter.setAttribute('easing', 'linear');
            leaveAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            leaveAniOuter.setAttribute('fill', 'forwards');
            leaveAniOuter.setAttribute('from', '0.0275');
            leaveAniOuter.setAttribute('to', '0.025');
            leaveAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniOuter);

            var leaveAniColor = document.createElement("a-animation");
            leaveAniColor.setAttribute('begin', 'leavegui');
            leaveAniColor.setAttribute('easing', 'linear');
            leaveAniColor.setAttribute('attribute', 'material.color');
            leaveAniColor.setAttribute('fill', 'forwards');
            leaveAniColor.setAttribute('from', `${data.hoverColor}`);
            leaveAniColor.setAttribute('to', `${data.color}`);
            leaveAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniColor);

            var clickAnimation = document.createElement("a-animation");
            clickAnimation.setAttribute('begin', 'click');
            clickAnimation.setAttribute('easing', 'ease-in');
            clickAnimation.setAttribute('attribute', 'scale');
            clickAnimation.setAttribute('fill', 'forwards');
            clickAnimation.setAttribute('from', '1 1 1');
            clickAnimation.setAttribute('to', '1.25 1.25 1.25');
            clickAnimation.setAttribute('dur', '200');
            el.appendChild(clickAnimation);

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0275; radiusOuter:0.03; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var shadowHoverAniInner = document.createElement("a-animation");
            shadowHoverAniInner.setAttribute('begin', 'hovergui');
            shadowHoverAniInner.setAttribute('easing', 'linear');
            shadowHoverAniInner.setAttribute('attribute', 'geometry.radiusInner');
            shadowHoverAniInner.setAttribute('fill', 'forwards');
            shadowHoverAniInner.setAttribute('from', '0.0275');
            shadowHoverAniInner.setAttribute('to', '0.03');
            shadowHoverAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowHoverAniInner);

            var shadowHoverAniOuter = document.createElement("a-animation");
            shadowHoverAniOuter.setAttribute('begin', 'hovergui');
            shadowHoverAniOuter.setAttribute('easing', 'linear');
            shadowHoverAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            shadowHoverAniOuter.setAttribute('fill', 'forwards');
            shadowHoverAniOuter.setAttribute('from', '0.03');
            shadowHoverAniOuter.setAttribute('to', '0.0325');
            shadowHoverAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowHoverAniOuter);

            var shadowLeaveAniInner = document.createElement("a-animation");
            shadowLeaveAniInner.setAttribute('begin', 'leavegui');
            shadowLeaveAniInner.setAttribute('easing', 'linear');
            shadowLeaveAniInner.setAttribute('attribute', 'geometry.radiusInner');
            shadowLeaveAniInner.setAttribute('fill', 'forwards');
            shadowLeaveAniInner.setAttribute('from', '0.03');
            shadowLeaveAniInner.setAttribute('to', '0.0275');
            shadowLeaveAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowLeaveAniInner);

            var shadowLeaveAniOuter = document.createElement("a-animation");
            shadowLeaveAniOuter.setAttribute('begin', 'leavegui');
            shadowLeaveAniOuter.setAttribute('easing', 'linear');
            shadowLeaveAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            shadowLeaveAniOuter.setAttribute('fill', 'forwards');
            shadowLeaveAniOuter.setAttribute('from', '0.0325');
            shadowLeaveAniOuter.setAttribute('to', '0.03');
            shadowLeaveAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowLeaveAniOuter);

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0375; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;

                var fuseLoaderFillAni = document.createElement("a-animation");
                fuseLoaderFillAni.setAttribute('begin', 'start-fusing');
                fuseLoaderFillAni.setAttribute('easing', 'linear');
                fuseLoaderFillAni.setAttribute('attribute', 'geometry.thetaLength');
                fuseLoaderFillAni.setAttribute('fill', 'forwards');
                fuseLoaderFillAni.setAttribute('from', '0');
                fuseLoaderFillAni.setAttribute('to', '360');
                fuseLoaderFillAni.setAttribute('delay', `${defaultHoverAnimationDuration}`);
                fuseLoaderFillAni.setAttribute('dur', `${fuseAnimationDuration}`);
                fuseLoader.appendChild(fuseLoaderFillAni);
            }


            //end dot design

        }else if(data.design == 'ring'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.0225; radiusOuter:0.0275');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);

            var hoverAniInner = document.createElement("a-animation");
            hoverAniInner.setAttribute('begin', 'hovergui');
            hoverAniInner.setAttribute('easing', 'linear');
            hoverAniInner.setAttribute('attribute', 'geometry.radiusInner');
            hoverAniInner.setAttribute('fill', 'forwards');
            hoverAniInner.setAttribute('from', '0.0225');
            hoverAniInner.setAttribute('to', '0.025');
            hoverAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniInner);

            var hoverAniOuter = document.createElement("a-animation");
            hoverAniOuter.setAttribute('begin', 'hovergui');
            hoverAniOuter.setAttribute('easing', 'linear');
            hoverAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            hoverAniOuter.setAttribute('fill', 'forwards');
            hoverAniOuter.setAttribute('from', '0.025');
            hoverAniOuter.setAttribute('to', '0.0325');
            hoverAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniOuter);

            var hoverAniColor = document.createElement("a-animation");
            hoverAniColor.setAttribute('begin', 'hovergui');
            hoverAniColor.setAttribute('easing', 'linear');
            hoverAniColor.setAttribute('attribute', 'material.color');
            hoverAniColor.setAttribute('fill', 'forwards');
            hoverAniColor.setAttribute('from', `${data.color}`);
            hoverAniColor.setAttribute('to',  `${data.hoverColor}`);
            hoverAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniColor);

            var leaveAniInner = document.createElement("a-animation");
            leaveAniInner.setAttribute('begin', 'leavegui');
            leaveAniInner.setAttribute('easing', 'linear');
            leaveAniInner.setAttribute('attribute', 'geometry.radiusInner');
            leaveAniInner.setAttribute('fill', 'forwards');
            leaveAniInner.setAttribute('from', '0.025');
            leaveAniInner.setAttribute('to', '0.0225');
            leaveAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniInner);

            var leaveAniOuter = document.createElement("a-animation");
            leaveAniOuter.setAttribute('begin', 'leavegui');
            leaveAniOuter.setAttribute('easing', 'linear');
            leaveAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            leaveAniOuter.setAttribute('fill', 'forwards');
            leaveAniOuter.setAttribute('from', '0.0325');
            leaveAniOuter.setAttribute('to', '0.0275');
            leaveAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniOuter);

            var leaveAniColor = document.createElement("a-animation");
            leaveAniColor.setAttribute('begin', 'leavegui');
            leaveAniColor.setAttribute('easing', 'linear');
            leaveAniColor.setAttribute('attribute', 'material.color');
            leaveAniColor.setAttribute('fill', 'forwards');
            leaveAniColor.setAttribute('from', `${data.hoverColor}`);
            leaveAniColor.setAttribute('to', `${data.color}`);
            leaveAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniColor);

            var clickAnimation = document.createElement("a-animation");
            clickAnimation.setAttribute('begin', 'click');
            clickAnimation.setAttribute('easing', 'ease-in');
            clickAnimation.setAttribute('attribute', 'scale');
            clickAnimation.setAttribute('fill', 'forwards');
            clickAnimation.setAttribute('from', '1 1 1');
            clickAnimation.setAttribute('to', '1.25 1.25 1.25');
            clickAnimation.setAttribute('dur', '200');
            el.appendChild(clickAnimation);

            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.03; radiusOuter:0.0325; thetaLength:360');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var shadowHoverAniInner = document.createElement("a-animation");
            shadowHoverAniInner.setAttribute('begin', 'hovergui');
            shadowHoverAniInner.setAttribute('easing', 'linear');
            shadowHoverAniInner.setAttribute('attribute', 'geometry.radiusInner');
            shadowHoverAniInner.setAttribute('fill', 'forwards');
            shadowHoverAniInner.setAttribute('from', '0.03');
            shadowHoverAniInner.setAttribute('to', '0.0325');
            shadowHoverAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowHoverAniInner);

            var shadowHoverAniOuter = document.createElement("a-animation");
            shadowHoverAniOuter.setAttribute('begin', 'hovergui');
            shadowHoverAniOuter.setAttribute('easing', 'linear');
            shadowHoverAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            shadowHoverAniOuter.setAttribute('fill', 'forwards');
            shadowHoverAniOuter.setAttribute('from', '0.0325');
            shadowHoverAniOuter.setAttribute('to', '0.0375');
            shadowHoverAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowHoverAniOuter);

            var shadowLeaveAniInner = document.createElement("a-animation");
            shadowLeaveAniInner.setAttribute('begin', 'leavegui');
            shadowLeaveAniInner.setAttribute('easing', 'linear');
            shadowLeaveAniInner.setAttribute('attribute', 'geometry.radiusInner');
            shadowLeaveAniInner.setAttribute('fill', 'forwards');
            shadowLeaveAniInner.setAttribute('from', '0.0325');
            shadowLeaveAniInner.setAttribute('to', '0.03');
            shadowLeaveAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowLeaveAniInner);

            var shadowLeaveAniOuter = document.createElement("a-animation");
            shadowLeaveAniOuter.setAttribute('begin', 'leavegui');
            shadowLeaveAniOuter.setAttribute('easing', 'linear');
            shadowLeaveAniOuter.setAttribute('attribute', 'geometry.radiusOuter');
            shadowLeaveAniOuter.setAttribute('fill', 'forwards');
            shadowLeaveAniOuter.setAttribute('from', '0.0375');
            shadowLeaveAniOuter.setAttribute('to', '0.0325');
            shadowLeaveAniOuter.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(shadowLeaveAniOuter);

            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0425; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;

                var fuseLoaderFillAni = document.createElement("a-animation");
                fuseLoaderFillAni.setAttribute('begin', 'start-fusing');
                fuseLoaderFillAni.setAttribute('easing', 'linear');
                fuseLoaderFillAni.setAttribute('attribute', 'geometry.thetaLength');
                fuseLoaderFillAni.setAttribute('fill', 'forwards');
                fuseLoaderFillAni.setAttribute('from', '0');
                fuseLoaderFillAni.setAttribute('to', '360');
                fuseLoaderFillAni.setAttribute('delay', `${defaultHoverAnimationDuration}`);
                fuseLoaderFillAni.setAttribute('dur', `${fuseAnimationDuration}`);
                fuseLoader.appendChild(fuseLoaderFillAni);
            }


            //end ring design

        }else if(data.design == 'reticle'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180;');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);

            var hoverAniOpacity = document.createElement("a-animation");
            hoverAniOpacity.setAttribute('begin', 'hovergui');
            hoverAniOpacity.setAttribute('easing', 'linear');
            hoverAniOpacity.setAttribute('attribute', 'material.opacity');
            hoverAniOpacity.setAttribute('fill', 'forwards');
            hoverAniOpacity.setAttribute('from', '1');
            hoverAniOpacity.setAttribute('to', '0');
            hoverAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniOpacity);

            var leaveAniOpacity = document.createElement("a-animation");
            leaveAniOpacity.setAttribute('begin', 'leavegui');
            leaveAniOpacity.setAttribute('easing', 'linear');
            leaveAniOpacity.setAttribute('attribute', 'material.opacity');
            leaveAniOpacity.setAttribute('fill', 'forwards');
            leaveAniOpacity.setAttribute('from', '0');
            leaveAniOpacity.setAttribute('to', '1');
            leaveAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniOpacity);


            var cursorCenter = document.createElement("a-entity");
            cursorCenter.setAttribute('geometry', 'primitive: ring; radiusInner:0.000001; radiusOuter:0.0125; thetaLength:180; thetaStart:180;');
            cursorCenter.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorCenter.setAttribute('position', '0 0 0');
            el.appendChild(cursorCenter);
            this.cursorCenter = cursorCenter;

            var centerHoverAniOpacity = document.createElement("a-animation");
            centerHoverAniOpacity.setAttribute('begin', 'hovergui');
            centerHoverAniOpacity.setAttribute('easing', 'linear');
            centerHoverAniOpacity.setAttribute('attribute', 'material.opacity');
            centerHoverAniOpacity.setAttribute('fill', 'forwards');
            centerHoverAniOpacity.setAttribute('from', '0.25');
            centerHoverAniOpacity.setAttribute('to', '0');
            centerHoverAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorCenter.appendChild(centerHoverAniOpacity);

            var centerLeaveAniOpacity = document.createElement("a-animation");
            centerLeaveAniOpacity.setAttribute('begin', 'leavegui');
            centerLeaveAniOpacity.setAttribute('easing', 'linear');
            centerLeaveAniOpacity.setAttribute('attribute', 'material.opacity');
            centerLeaveAniOpacity.setAttribute('fill', 'forwards');
            centerLeaveAniOpacity.setAttribute('from', '0');
            centerLeaveAniOpacity.setAttribute('to', '0.25');
            centerLeaveAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorCenter.appendChild(centerLeaveAniOpacity);


            var cursorShadow = document.createElement("a-entity");
            cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.0125; radiusOuter:0.0145');
            cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.25;');
            cursorShadow.setAttribute('position', '0 0 0');
            el.appendChild(cursorShadow);
            this.cursorShadow = cursorShadow;

            var cursorHoverAniColor = document.createElement("a-animation");
            cursorHoverAniColor.setAttribute('begin', 'hovergui');
            cursorHoverAniColor.setAttribute('easing', 'linear');
            cursorHoverAniColor.setAttribute('attribute', 'material.color');
            cursorHoverAniColor.setAttribute('fill', 'forwards');
            cursorHoverAniColor.setAttribute('from', '#000000');
            cursorHoverAniColor.setAttribute('to', `${data.color}`);
            cursorHoverAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(cursorHoverAniColor);

            var cursorHoverAniOpacity = document.createElement("a-animation");
            cursorHoverAniOpacity.setAttribute('begin', 'hovergui');
            cursorHoverAniOpacity.setAttribute('easing', 'linear');
            cursorHoverAniOpacity.setAttribute('attribute', 'material.opacity');
            cursorHoverAniOpacity.setAttribute('fill', 'forwards');
            cursorHoverAniOpacity.setAttribute('from', '0.25');
            cursorHoverAniOpacity.setAttribute('to', '1');
            cursorHoverAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(cursorHoverAniOpacity);

            var cursorLeaveAniColor = document.createElement("a-animation");
            cursorLeaveAniColor.setAttribute('begin', 'leavegui');
            cursorLeaveAniColor.setAttribute('easing', 'linear');
            cursorLeaveAniColor.setAttribute('attribute', 'material.color');
            cursorLeaveAniColor.setAttribute('fill', 'forwards');
            cursorLeaveAniColor.setAttribute('from', `${data.color}`);
            cursorLeaveAniColor.setAttribute('to', '#000000');
            cursorLeaveAniColor.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(cursorLeaveAniColor);

            var cursorLeaveAniOpacity = document.createElement("a-animation");
            cursorLeaveAniOpacity.setAttribute('begin', 'leavegui');
            cursorLeaveAniOpacity.setAttribute('easing', 'linear');
            cursorLeaveAniOpacity.setAttribute('attribute', 'material.opacity');
            cursorLeaveAniOpacity.setAttribute('fill', 'forwards');
            cursorLeaveAniOpacity.setAttribute('from', '1');
            cursorLeaveAniOpacity.setAttribute('to', '0.25');
            cursorLeaveAniOpacity.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorShadow.appendChild(cursorLeaveAniOpacity);


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
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;

                var fuseLoaderFillAni = document.createElement("a-animation");
                fuseLoaderFillAni.setAttribute('begin', 'start-fusing');
                fuseLoaderFillAni.setAttribute('easing', 'linear');
                fuseLoaderFillAni.setAttribute('attribute', 'geometry.width');
                fuseLoaderFillAni.setAttribute('fill', 'forwards');
                fuseLoaderFillAni.setAttribute('from', '0');
                fuseLoaderFillAni.setAttribute('to', '0.075');
                fuseLoaderFillAni.setAttribute('delay', `${defaultHoverAnimationDuration}`);
                fuseLoaderFillAni.setAttribute('dur', `${fuseAnimationDuration}`);
                fuseLoader.appendChild(fuseLoaderFillAni);
            }


            //end reticle design

        }else if(data.design == 'cross'){    
            el.setAttribute('geometry', 'primitive: ring; radiusInner:0.035; radiusOuter:0.0375');
            el.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            el.setAttribute('position', `0 0 ${data.distance}`);

            var hoverAniInner = document.createElement("a-animation");
            hoverAniInner.setAttribute('begin', 'hovergui');
            hoverAniInner.setAttribute('easing', 'linear');
            hoverAniInner.setAttribute('attribute', 'geometry.radiusInner');
            hoverAniInner.setAttribute('fill', 'forwards');
            hoverAniInner.setAttribute('from', '0.035');
            hoverAniInner.setAttribute('to', '0.0315');
            hoverAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(hoverAniInner);

            var leaveAniInner = document.createElement("a-animation");
            leaveAniInner.setAttribute('begin', 'leavegui');
            leaveAniInner.setAttribute('easing', 'linear');
            leaveAniInner.setAttribute('attribute', 'geometry.radiusInner');
            leaveAniInner.setAttribute('fill', 'forwards');
            leaveAniInner.setAttribute('from', '0.0315');
            leaveAniInner.setAttribute('to', '0.035');
            leaveAniInner.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            el.appendChild(leaveAniInner);

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
            el.appendChild(cursorVerticalTop);
            this.cursorVerticalTop = cursorVerticalTop;

            var hoverAniInner1 = document.createElement("a-animation");
            hoverAniInner1.setAttribute('begin', 'hovergui');
            hoverAniInner1.setAttribute('easing', 'linear');
            hoverAniInner1.setAttribute('attribute', 'geometry.width');
            hoverAniInner1.setAttribute('fill', 'forwards');
            hoverAniInner1.setAttribute('from', '0.0035');
            hoverAniInner1.setAttribute('to', '0.007');
            hoverAniInner1.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorVerticalTop.appendChild(hoverAniInner1);

            var leaveAniInner1 = document.createElement("a-animation");
            leaveAniInner1.setAttribute('begin', 'leavegui');
            leaveAniInner1.setAttribute('easing', 'linear');
            leaveAniInner1.setAttribute('attribute', 'geometry.width');
            leaveAniInner1.setAttribute('fill', 'forwards');
            leaveAniInner1.setAttribute('from', '0.007');
            leaveAniInner1.setAttribute('to', '0.0035');
            leaveAniInner1.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorVerticalTop.appendChild(leaveAniInner1);


            var cursorVerticalBottom = document.createElement("a-entity");
            cursorVerticalBottom.setAttribute('geometry', 'primitive: plane; width:0.0035; height:0.01875');
            cursorVerticalBottom.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorVerticalBottom.setAttribute('position', '0 -0.028125 0');
            el.appendChild(cursorVerticalBottom);
            this.cursorVerticalBottom = cursorVerticalBottom;

            var hoverAniInner2 = document.createElement("a-animation");
            hoverAniInner2.setAttribute('begin', 'hovergui');
            hoverAniInner2.setAttribute('easing', 'linear');
            hoverAniInner2.setAttribute('attribute', 'geometry.width');
            hoverAniInner2.setAttribute('fill', 'forwards');
            hoverAniInner2.setAttribute('from', '0.0035');
            hoverAniInner2.setAttribute('to', '0.007');
            hoverAniInner2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorVerticalBottom.appendChild(hoverAniInner2);

            var leaveAniInner2 = document.createElement("a-animation");
            leaveAniInner2.setAttribute('begin', 'leavegui');
            leaveAniInner2.setAttribute('easing', 'linear');
            leaveAniInner2.setAttribute('attribute', 'geometry.width');
            leaveAniInner2.setAttribute('fill', 'forwards');
            leaveAniInner2.setAttribute('from', '0.007');
            leaveAniInner2.setAttribute('to', '0.0035');
            leaveAniInner2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorVerticalBottom.appendChild(leaveAniInner2);


            var cursorHorizontalLeft = document.createElement("a-entity");
            cursorHorizontalLeft.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalLeft.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorHorizontalLeft.setAttribute('position', '-0.028125 0 0');
            el.appendChild(cursorHorizontalLeft);
            this.cursorHorizontalLeft = cursorHorizontalLeft;

            var hoverAniInner3 = document.createElement("a-animation");
            hoverAniInner3.setAttribute('begin', 'hovergui');
            hoverAniInner3.setAttribute('easing', 'linear');
            hoverAniInner3.setAttribute('attribute', 'geometry.height');
            hoverAniInner3.setAttribute('fill', 'forwards');
            hoverAniInner3.setAttribute('from', '0.0035');
            hoverAniInner3.setAttribute('to', '0.007');
            hoverAniInner3.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorHorizontalLeft.appendChild(hoverAniInner3);

            var leaveAniInner3 = document.createElement("a-animation");
            leaveAniInner3.setAttribute('begin', 'leavegui');
            leaveAniInner3.setAttribute('easing', 'linear');
            leaveAniInner3.setAttribute('attribute', 'geometry.height');
            leaveAniInner3.setAttribute('fill', 'forwards');
            leaveAniInner3.setAttribute('from', '0.007');
            leaveAniInner3.setAttribute('to', '0.0035');
            leaveAniInner3.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorHorizontalLeft.appendChild(leaveAniInner3);


            var cursorHorizontalRight = document.createElement("a-entity");
            cursorHorizontalRight.setAttribute('geometry', 'primitive: plane; width:0.01875; height:0.0035');
            cursorHorizontalRight.setAttribute('material', `color: ${data.color}; shader: flat; opacity:1;`);
            cursorHorizontalRight.setAttribute('position', '0.028125 0 0');
            el.appendChild(cursorHorizontalRight);
            this.cursorHorizontalRight = cursorHorizontalRight;

            var hoverAniInner4 = document.createElement("a-animation");
            hoverAniInner4.setAttribute('begin', 'hovergui');
            hoverAniInner4.setAttribute('easing', 'linear');
            hoverAniInner4.setAttribute('attribute', 'geometry.height');
            hoverAniInner4.setAttribute('fill', 'forwards');
            hoverAniInner4.setAttribute('from', '0.0035');
            hoverAniInner4.setAttribute('to', '0.007');
            hoverAniInner4.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorHorizontalRight.appendChild(hoverAniInner4);

            var leaveAniInner4 = document.createElement("a-animation");
            leaveAniInner4.setAttribute('begin', 'leavegui');
            leaveAniInner4.setAttribute('easing', 'linear');
            leaveAniInner4.setAttribute('attribute', 'geometry.height');
            leaveAniInner4.setAttribute('fill', 'forwards');
            leaveAniInner4.setAttribute('from', '0.007');
            leaveAniInner4.setAttribute('to', '0.0035');
            leaveAniInner4.setAttribute('dur', `${defaultHoverAnimationDuration}`);
            cursorHorizontalRight.appendChild(leaveAniInner4);


            if(fuse){
                var fuseLoader = document.createElement("a-entity");
                fuseLoader.setAttribute('geometry', 'primitive: ring; radiusInner:0.0415; radiusOuter:0.0485; thetaLength:0');
                fuseLoader.setAttribute('material', `color: ${data.activeColor}; shader: flat; opacity:1;`);
                fuseLoader.setAttribute('position', `0 0 0`);
                el.appendChild(fuseLoader);
                this.fuseLoader = fuseLoader;

                var fuseLoaderFillAni = document.createElement("a-animation");
                fuseLoaderFillAni.setAttribute('begin', 'start-fusing');
                fuseLoaderFillAni.setAttribute('easing', 'linear');
                fuseLoaderFillAni.setAttribute('attribute', 'geometry.thetaLength');
                fuseLoaderFillAni.setAttribute('fill', 'forwards');
                fuseLoaderFillAni.setAttribute('from', '0');
                fuseLoaderFillAni.setAttribute('to', '360');
                fuseLoaderFillAni.setAttribute('delay', `${defaultHoverAnimationDuration}`);
                fuseLoaderFillAni.setAttribute('dur', `${fuseAnimationDuration}`);
                fuseLoader.appendChild(fuseLoaderFillAni);
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
                fuseLoaderFillAni.stop();
            }

            el.setAttribute('scale', '1 1 1');
        });

        if(fuse){
            el.addEventListener('fusing', function () {
                fuseLoader.emit('start-fusing');
            });
        }

        el.addEventListener("stateremoved", function (evt) {
            console.log("evt.detail.state " +evt.detail.state)
            if (evt.detail.state === 'cursor-fusing') {
                if(data.design == 'dot' || data.design == 'ring' || data.design == 'cross' ){  
                    if(fuse){
                        fuseLoaderFillAni.stop();
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.thetaLength', '0');
                    }
                }else if(data.design == 'reticle'){
                    if(fuse){
                        fuseLoaderFillAni.stop();
                        AFRAME.utils.entity.setComponentProperty(fuseLoader, 'geometry.width', '0.000001');
                    }                    
                }
            }else if(evt.detail.state === 'cursor-hovering') {
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
    },
    resetcursor: function(){
        // if (evt.detail.state === 'cursor-fusing') {
        //     AFRAME.utils.entity.setComponentProperty(this, "geometry.thetaLength", 360);
        //     AFRAME.utils.entity.setComponentProperty(this, "material.color", "#ffffff");
        //     AFRAME.utils.entity.setComponentProperty(this, "scale", "1 1 1");
        // }
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