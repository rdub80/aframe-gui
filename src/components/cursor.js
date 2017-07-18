AFRAME.registerComponent('gui-cursor', {
    schema: {
        cursorColor: {type: 'string', default: key_white},
        cursorActiveColor: {type: 'string', default: key_orange_light},
    },
    init: function () {
        var cursor = this.cursor = this.el.getAttribute('cursor');
        var fuse = cursor.fuse; // true if cursor fuse is enabled.
        var fuseTimeout = cursor.fuseTimeout; // animation lenght should be based on this value
        var defaultHoverAnimationDuration = 400;
        console.log("fuse: "+fuse+", fuseTimeout: "+fuseTimeout);

        var el = this.el;
        /*
         var cursorShadow = document.createElement("a-entity");
         cursorShadow.setAttribute('material', 'color: #000000; shader: flat; opacity:0.5;');
         cursorShadow.setAttribute('geometry', 'primitive: ring; radiusInner:0.025; radiusOuter:0.03');
         this.el.appendChild(cursorShadow);

         var hoverGuiAnimationShadow = document.createElement("a-animation");
         hoverGuiAnimationShadow.setAttribute('begin', 'hovergui');
         hoverGuiAnimationShadow.setAttribute('easing', 'linear');
         hoverGuiAnimationShadow.setAttribute('attribute', 'geometry.radiusInner');
         hoverGuiAnimationShadow.setAttribute('fill', 'forwards');
         hoverGuiAnimationShadow.setAttribute('from', '0.025');
         hoverGuiAnimationShadow.setAttribute('to', '0.035');
         hoverGuiAnimationShadow.setAttribute('dur', `${defaultHoverAnimationDuration}`);
         cursorShadow.appendChild(hoverGuiAnimationShadow);
         */

        var hoverGuiAnimation = document.createElement("a-animation");
        hoverGuiAnimation.setAttribute('begin', 'hovergui');
        hoverGuiAnimation.setAttribute('easing', 'linear');
        hoverGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        hoverGuiAnimation.setAttribute('fill', 'forwards');
        hoverGuiAnimation.setAttribute('from', '0.000001');
        hoverGuiAnimation.setAttribute('to', '0.025');
        hoverGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation);

        var hoverGuiAnimation2 = document.createElement("a-animation");
        hoverGuiAnimation2.setAttribute('begin', 'hovergui');
        hoverGuiAnimation2.setAttribute('easing', 'linear');
        hoverGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        hoverGuiAnimation2.setAttribute('fill', 'forwards');
        hoverGuiAnimation2.setAttribute('from', '0.025');
        hoverGuiAnimation2.setAttribute('to', '0.035');
        hoverGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(hoverGuiAnimation2);


        var leaveGuiAnimation = document.createElement("a-animation");
        leaveGuiAnimation.setAttribute('begin', 'leavegui');
        leaveGuiAnimation.setAttribute('easing', 'linear');
        leaveGuiAnimation.setAttribute('attribute', 'geometry.radiusInner');
        leaveGuiAnimation.setAttribute('fill', 'forwards');
        leaveGuiAnimation.setAttribute('from', '0.02');
        leaveGuiAnimation.setAttribute('to', '0.000001');
        leaveGuiAnimation.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation);

        var leaveGuiAnimation2 = document.createElement("a-animation");
        leaveGuiAnimation2.setAttribute('begin', 'leavegui');
        leaveGuiAnimation2.setAttribute('easing', 'linear');
        leaveGuiAnimation2.setAttribute('attribute', 'geometry.radiusOuter');
        leaveGuiAnimation2.setAttribute('fill', 'forwards');
        leaveGuiAnimation2.setAttribute('from', '0.035');
        leaveGuiAnimation2.setAttribute('to', '0.025');
        leaveGuiAnimation2.setAttribute('dur', `${defaultHoverAnimationDuration}`);
        this.el.appendChild(leaveGuiAnimation2);

        var leaveGuiAnimation3 = document.createElement("a-animation");
        leaveGuiAnimation3.setAttribute('begin', 'leavegui');
        leaveGuiAnimation3.setAttribute('easing', 'linear');
        leaveGuiAnimation3.setAttribute('attribute', 'material.color');
        leaveGuiAnimation3.setAttribute('fill', 'forwards');
        leaveGuiAnimation3.setAttribute('from', this.data.cursorActiveColor);
        leaveGuiAnimation3.setAttribute('to', this.data.cursorColor);
        leaveGuiAnimation3.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation3);

        var leaveGuiAnimation4 = document.createElement("a-animation");
        leaveGuiAnimation4.setAttribute('begin', 'leavegui');
        leaveGuiAnimation4.setAttribute('easing', 'linear');
        leaveGuiAnimation4.setAttribute('attribute', 'scale');
        leaveGuiAnimation4.setAttribute('fill', 'forwards');
        leaveGuiAnimation4.setAttribute('to', '1 1 1');
        leaveGuiAnimation4.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation4);

        var leaveGuiAnimation5 = document.createElement("a-animation");
        leaveGuiAnimation5.setAttribute('begin', 'leavegui');
        leaveGuiAnimation5.setAttribute('easing', 'linear');
        leaveGuiAnimation5.setAttribute('attribute', 'geometry.thetaLength');
        leaveGuiAnimation5.setAttribute('fill', 'forwards');
        leaveGuiAnimation5.setAttribute('to', '360');
        leaveGuiAnimation5.setAttribute('dur', '0');
        this.el.appendChild(leaveGuiAnimation5);


        /*
         var fuseScaleAnimation = document.createElement("a-animation");
         fuseScaleAnimation.setAttribute('begin', 'cursor-fusing');
         fuseScaleAnimation.setAttribute('easing', 'linear');
         fuseScaleAnimation.setAttribute('attribute', 'scale');
         fuseScaleAnimation.setAttribute('fill', 'forwards');
         fuseScaleAnimation.setAttribute('from', '1 1 1');
         fuseScaleAnimation.setAttribute('to', '2 2 2');
         fuseScaleAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
         fuseScaleAnimation.setAttribute('dur', '400');
         this.el.appendChild(fuseScaleAnimation);
         */

        var fuseAnimationDuration = fuseTimeout - defaultHoverAnimationDuration;
        var fuseColorAnimation = document.createElement("a-animation");
        fuseColorAnimation.setAttribute('begin', 'cursor-fusing');
        fuseColorAnimation.setAttribute('easing', 'linear');
        fuseColorAnimation.setAttribute('attribute', 'material.color');
        fuseColorAnimation.setAttribute('fill', 'forwards');
        fuseColorAnimation.setAttribute('from', this.data.cursorColor);
        fuseColorAnimation.setAttribute('to', this.data.cursorActiveColor);
        fuseColorAnimation.setAttribute('delay', `${defaultHoverAnimationDuration}`);
        fuseColorAnimation.setAttribute('dur', `${fuseAnimationDuration}`);
        this.el.appendChild(fuseColorAnimation);

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
        clickAnimation.setAttribute('from', '1 1 1');
        clickAnimation.setAttribute('to', '1.25 1.25 1.25');
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

