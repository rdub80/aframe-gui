AFRAME.registerComponent('bevelbox', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 0.02},
        gap: {type: 'number', default: 0.025},
        radius: {type: 'number', default: 0},
        margin: { type: 'vec4', default: {x: 0, y: 0, z: 0, w: 0}},

        bevelEnabled: {type: 'boolean', default: false},
        bevelSegments: {type: 'number', default: 5},
        steps: {type: 'number', default: 2},
        bevelSize: {type: 'number', default: 4},
        bevelThickness: {type: 'number', default: 2}

    },    
    init: function() {


      let points = [];
      points.push(new THREE.Vector2(0, 0));
      points.push(new THREE.Vector2(3, 0));
      points.push(new THREE.Vector2(5, 2));
      points.push(new THREE.Vector2(5, 5));
      points.push(new THREE.Vector2(5, 5));
      points.push(new THREE.Vector2(2, 7));

      for (var i = 0; i < points.length; i++) {
        points[i].multiplyScalar(0.25);
      }
      var shape = new THREE.Shape(points);
      var extrudedGeometry = new THREE.ExtrudeGeometry(shape, {
        amount: 2,
        bevelEnabled: false
      });

      // Geometry doesn't do much on its own, we need to create a Mesh from it
      var extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshPhongMaterial({
        color: 0xff0000
      }));
      this.el.object3D.add(extrudedMesh);
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
});
  });