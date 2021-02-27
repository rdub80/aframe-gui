AFRAME.registerComponent('rounded', {
  schema: {
    enabled: {default: true},
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    radius: {type: 'number', default: 0.3},
    topLeftRadius: {type: 'number', default: -1},
    topRightRadius: {type: 'number', default: -1},
    bottomLeftRadius: {type: 'number', default: -1},
    bottomRightRadius: {type: 'number', default: -1},
    depthWrite: {default: true},
    polygonOffset: {default: false},
    polygonOffsetFactor: {type: 'number', default: 0},
    color: {type: 'color', default: "#F0F0F0"},
    opacity: {type: 'number', default: 1}
  },
  init: function () {
    this.rounded = new THREE.Mesh( this.draw(), new THREE.MeshStandardMaterial( { color: new THREE.Color(this.data.color) } ) );
    this.updateOpacity();
    this.el.setObject3D('mesh', this.rounded);
  },
  update: function () {
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
  updateOpacity: function() {    
    if (this.data.opacity < 0) { this.data.opacity = 0; }
    if (this.data.opacity > 1) { this.data.opacity = 1; }
    if (this.data.opacity < 1) {
      this.rounded.material.transparent = true;
      this.rounded.material.opacity = this.data.opacity;
      this.rounded.material.alphaTest = 0;     
    } else {
      this.rounded.material.transparent = false;
    }
  },
  tick: function () {},
  remove: function () {
    if (!this.rounded) { return; }
    this.el.object3D.remove( this.rounded );
    this.rounded = null;
  },
  draw: function() {
    var roundedRectShape = new THREE.Shape();
    function roundedRect( ctx, x, y, width, height, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius ) {
      if (!topLeftRadius) { topLeftRadius = 0.00001; }
      if (!topRightRadius) { topRightRadius = 0.00001; }
      if (!bottomLeftRadius) { bottomLeftRadius = 0.00001; }
      if (!bottomRightRadius) { bottomRightRadius = 0.00001; }
      ctx.moveTo( x, y + topLeftRadius );
      ctx.lineTo( x, y + height - topLeftRadius );
      ctx.quadraticCurveTo( x, y + height, x + topLeftRadius, y + height );
      ctx.lineTo( x + width - topRightRadius, y + height );
      ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - topRightRadius );
      ctx.lineTo( x + width, y + bottomRightRadius );
      ctx.quadraticCurveTo( x + width, y, x + width - bottomRightRadius, y );
      ctx.lineTo( x + bottomLeftRadius, y );
      ctx.quadraticCurveTo( x, y, x, y + bottomLeftRadius );
    }

    var corners = [this.data.radius, this.data.radius, this.data.radius, this.data.radius];
    if (this.data.topLeftRadius != -1) { corners[0] = this.data.topLeftRadius; }
    if (this.data.topRightRadius != -1) { corners[1] = this.data.topRightRadius; }
    if (this.data.bottomLeftRadius != -1) { corners[2] = this.data.bottomLeftRadius; }
    if (this.data.bottomRightRadius != -1) { corners[3] = this.data.bottomRightRadius; }

    roundedRect( roundedRectShape, -this.data.width/2, -this.data.height/2, this.data.width, this.data.height, corners[0], corners[1], corners[2], corners[3] );
    return new THREE.ShapeBufferGeometry( roundedRectShape );
  },
  pause: function () {},
  play: function () {}
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