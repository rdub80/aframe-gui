AFRAME.registerComponent('gui-circle-timer', {
    schema: {
        countDown: {type: 'number', default: '10'},
        fontFamily: {type: 'string', default: 'Helvetica'},
        fontColor: {type: 'string', default: key_grey},
        borderColor: {type: 'string', default: key_grey},
        backgroundColor: {type: 'string', default: key_offwhite},
        activeColor: {type: 'string', default: key_orange},
    },
    init: function() {

        var data = this.data;
        var el = this.el;
        var guiItem = el.getAttribute("gui-item");
        var multiplier = 350;
        var canvasWidth = guiItem.height*multiplier; //square
        var canvasHeight = guiItem.height*multiplier;

        var canvasContainer = document.createElement('div');
        canvasContainer.setAttribute('class', 'visuallyhidden');
        document.body.appendChild(canvasContainer);

        var canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.className = "visuallyhidden";
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        canvas.className = 'visuallyhidden';
        canvas.id = getUniqueId('canvas');
        canvasContainer.appendChild(canvas);

        var ctx = this.ctx = canvas.getContext('2d');

        el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.height};`);
        el.setAttribute('material', `shader: flat; transparent: true; opacity: 1; side:back; color:${data.backgroundColor};`);

        drawText(ctx, canvas, data.countDown, '200px ' + data.fontFamily, data.fontColor, 1);

        var timerContainer = document.createElement("a-entity");
        timerContainer.setAttribute('geometry', `primitive: cylinder; radius: ${guiItem.height/2}; height: 0.02;`);
        timerContainer.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.backgroundColor}`);
        timerContainer.setAttribute('rotation', '90 0 0');
        timerContainer.setAttribute('position', '0 0 0.01');
        el.appendChild(timerContainer);

        var timerIndicator1 = document.createElement("a-ring");
        timerIndicator1.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator1.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator1.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator1.setAttribute('theta-start', '-1');
        timerIndicator1.setAttribute('theta-length', '3');
        timerIndicator1.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator1);
        var timerIndicator2 = document.createElement("a-ring");
        timerIndicator2.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator2.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator2.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator2.setAttribute('theta-start', '89');
        timerIndicator2.setAttribute('theta-length', '3');
        timerIndicator2.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator2);
        var timerIndicator3 = document.createElement("a-ring");
        timerIndicator3.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator3.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator3.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator3.setAttribute('theta-start', '179');
        timerIndicator3.setAttribute('theta-length', '3');
        timerIndicator3.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator3);
        var timerIndicator4 = document.createElement("a-ring");
        timerIndicator4.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${data.borderColor}`);
        timerIndicator4.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerIndicator4.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerIndicator4.setAttribute('theta-start', '269');
        timerIndicator4.setAttribute('theta-length', '3');
        timerIndicator4.setAttribute('position', '0 0 0.04');
        el.appendChild(timerIndicator4);




        var timerRing = document.createElement("a-ring");
        timerRing.setAttribute('material', `shader: flat; opacity: 0.75; side:double; color: ${data.activeColor}`);
        timerRing.setAttribute('radius-inner', `${guiItem.height/3}`);
        timerRing.setAttribute('radius-outer', `${guiItem.height/2}`);
        timerRing.setAttribute('theta-start', '0');
        timerRing.setAttribute('theta-length', '10'); // this has to increase 0 to 360 when running the countdown
        timerRing.setAttribute('rotation', '0 0 0');
        timerRing.setAttribute('position', '0 0 0.03');
        timerRing.id = "loader_ring";
        el.appendChild(timerRing);

        var countDownLabel = document.createElement("a-entity");
        countDownLabel.setAttribute('geometry', `primitive: plane; width: ${guiItem.height/1.75}; height: ${guiItem.height/1.75};`);
        countDownLabel.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1; side:front;`);
        countDownLabel.setAttribute('position', '0 0 0.022');
        countDownLabel.id = "loader_ring_count";
        el.appendChild(countDownLabel);


    },
    play: function () {

    },
    update: function (oldData) {
    },
});

AFRAME.registerPrimitive( 'a-gui-circle-timer', {
    defaultComponents: {
        'gui-item': { type: 'circle-timer' },
        'gui-circle-timer': { }
    },
    mappings: {
        'width': 'gui-item.width',
        'height': 'gui-item.height',
        'margin': 'gui-item.margin',
        'count-down': 'gui-circle-timer.countDown',
        'font-family': 'gui-circle-timer.fontFamily',
        'font-color': 'gui-circle-timer.fontColor',
        'border-color': 'gui-circle-timer.borderColor',
        'background-color': 'gui-circle-timer.backgroundColor',
        'active-color': 'gui-circle-timer.activeColor'
    }
});