/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerShader('gradient', {
    schema: {
        topColor: {type: 'vec3', default: '20 114 138', is: 'uniform'},
        bottomColor: {type: 'vec3', default: '235 251 208', is: 'uniform'},
        offset: {type: 'float', default: '400', is: 'uniform'},
        exponent: {type: 'float', default: '0.9', is: 'uniform'}
    },
    vertexShader:`
        varying vec3 vWorldPosition;

        void main() {
            vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader:`
        uniform vec3 bottomColor;
        uniform vec3 topColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;

        void main() {
            float h = normalize( vWorldPosition + offset ).y;
            float rB = bottomColor.x/255.0;
            float gB = bottomColor.y/255.0;
            float bB = bottomColor.z/255.0;
            vec3 bColor = vec3(rB,gB,bB);
            float rT = topColor.x/255.0;
            float gT = topColor.y/255.0;
            float bT = topColor.z/255.0;
            vec3 tColor = vec3(rT,gT,bT);
            gl_FragColor = vec4( mix( bColor, tColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );
        }
    `
});

AFRAME.registerComponent('gui-env', {
    schema: {
    },
    init: function () {
        var light1 = document.createElement("a-light");
        light1.setAttribute('type', 'directional');
        light1.setAttribute('color', '#FFF');
        light1.setAttribute('position', '-1 1 2');
        this.el.appendChild(light1);
        var light2 = document.createElement("a-light");
        light2.setAttribute('type', 'ambient');
        light2.setAttribute('color', '#ebd9e9');
        this.el.appendChild(light2);
        var sky = document.createElement("a-sky");
        sky.setAttribute('material', 'shader:gradient;');
        this.el.appendChild(sky);

        var tile = document.createElement('canvas');
        tile.width = 256;
        tile.height = 256;
        tile.id = 'tiling';
        document.body.appendChild(tile);
        var tile_ctx = tile.getContext('2d');
        tile_ctx.beginPath();
        tile_ctx.moveTo(0, 0);
        tile_ctx.lineTo(0, 256);
        tile_ctx.lineTo(256, 256);
        tile_ctx.lineWidth = 3;
        tile_ctx.strokeStyle = '#0a7188';
        tile_ctx.stroke();
        this.tile = tile;

        var floor = document.createElement("a-plane");
        floor.setAttribute('material', `src: #${tile.id}; opacity:0.5`);
        floor.setAttribute('width', '300');
        floor.setAttribute('height', '300');
        floor.setAttribute('repeat', '300 300');
        floor.setAttribute('rotation', '-90 0 0');
        floor.setAttribute('position', '0 -.025 0');
        this.el.appendChild(floor);
    }
});
