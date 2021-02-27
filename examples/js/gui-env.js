/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

//https://www.colourlovers.com/palette/4640704/APC_606_In_Ritardo
//#B86555 184,101,85
//#E0D28B 224,210,139
//#627876 98,120,118
//#4B4841 75,72,65
//#415270 65,82,112


AFRAME.registerShader('gradient', {
    schema: {
        topColor: {type: 'vec3', default: {x: 45, y: 52, z: 74}, is: 'uniform'},
        bottomColor: {type: 'vec3', default: {x: 135, y: 141, z: 162}, is: 'uniform'},
        offset: {type: 'float', default: 400, is: 'uniform'},
        exponent: {type: 'float', default: 0.9, is: 'uniform'}
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
        light1.setAttribute('intensity', '0.65');
        light1.setAttribute('position', '-1 1 2');
        this.el.appendChild(light1);
        var light2 = document.createElement("a-light");
        light2.setAttribute('type', 'ambient');
        light2.setAttribute('color', '#ebd9e9');
        this.el.appendChild(light2);
        var skydome = document.createElement("a-entity");
        skydome.id = "skydome";
        skydome.setAttribute('geometry','primitive: sphere; radius: 6000;');
        skydome.setAttribute('material', 'side:back; shader:gradient;');             
        this.el.appendChild(skydome);

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
        tile_ctx.strokeStyle = '#2D344A';
        tile_ctx.stroke();
        this.tile = tile;

        var floor = document.createElement("a-entity");
        floor.id = "floor";        
        floor.setAttribute('geometry','primitive: plane; width: 300; height:300;');        
        floor.setAttribute('material', `src: #${tile.id}; opacity:0.5; repeat:300 300;`);
        floor.setAttribute('rotation', '-90 0 0');
        floor.setAttribute('position', '0 -.025 0');
        this.el.appendChild(floor);
    }
});
