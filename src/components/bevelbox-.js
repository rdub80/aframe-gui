AFRAME.registerComponent('bevelbox', {
    schema: {
        width: {type: 'number', default: 1},
        height: {type: 'number', default: 1},
        depth: {type: 'number', default: 1},

        bevelEnabled: {type: 'boolean', default: false},
        bevelSegments: {type: 'number', default: 5},
        steps: {type: 'number', default: 2},
        bevelSize: {type: 'number', default: 4},
        bevelThickness: {type: 'number', default: 2}

        color: {type: 'color', default: "#F0F0F0"},
        opacity: {type: 'number', default: 1}
    },
    init: function () {
        var data = this.data;
        var el = this.el;


    // makeLozengeTarget = function() {
    //     var asc = document.getElementById("scene");
    //     var lt = document.createElement("a-box");
    //     lt.id = "lozenge-target";
    //     lt.setAttribute("color", "lightblue");
    //     lt.setAttribute("material", "color: #4455aa; wireframe: true");
    //     lt.setAttribute("scale", "0.5 0.5 0.5");
    //     lt.setAttribute("position", "0 0.5 -3");
    //     asc.appendChild(lt);
    // }

//    makeLozenge = function () {
//        var lozenge = getRoundedRect(); // as a mesh
//        var lozel = document.getElementById("lozenge-target");
        var target = el.object3D;
        var newmesh = this.getRoundedRect();

        var roundedRectShape = new THREE.Shape();
        this.roundedRect(roundedRectShape, 0, 0, 4, 4, 1);
        var newmesh = this.extrudeRoundedMesh(roundedRectShape, 0x808080, 0, 0, 0, 0, 0, 0, 2);


        // var sc = 0.0175;
        // newmesh.scale.x = sc
        // newmesh.scale.y = sc;
        // newmesh.scale.z = sc;
        newmesh.position.x = 0;
        newmesh.position.y = 0;
        newmesh.position.z = 0;
        console.log("adding mesh to three?");
        target.add(newmesh);
  //  }





    },

    roundedRect: function (ctx, x, y, width, height, radius) {
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
    },

    extrudeRoundedMesh: function (shape, color, x, y, z, rx, ry, rz, s) {
        var extrudeSettings = {
            depth: 2,
            bevelEnabled: true,
            bevelSegments: 5,
            steps: 2,
            bevelSize: 4,
            bevelThickness: 2
        };
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var smoothGeometry = true;
        if (smoothGeometry) {
            // merge vertices for phong smoothing
            const tempGeo = new THREE.Geometry().fromBufferGeometry(geometry);
            tempGeo.mergeVertices();
            tempGeo.computeVertexNormals();
            tempGeo.computeFaceNormals();
            geometry = new THREE.BufferGeometry().fromGeometry(tempGeo);
        }
        var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({
                color: color /*,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
                */
            })
        );
        //mesh.position.set(x, y, z);
        //mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        var centerMesh = true;
        if (centerMesh) {
            var center = new THREE.Vector3();
            mesh.geometry.computeBoundingBox();
            mesh.geometry.boundingBox.getCenter(center);
            mesh.geometry.center();
            mesh.position.copy(center);
        }
        return mesh;        
    },


    getRoundedRect: function () {
        var roundedRectShape = new THREE.Shape();
        roundedRect(roundedRectShape, 0, 0, 50, 50, 10);
        var mesh = extrudeRoundedMesh(roundedRectShape, 0x808080, 0, 0, 0, 0, 0, 0, 4);
        return mesh;        
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



/*
function buildLozenge() {
    console.log("building lozenge?");

    function roundedRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.lineTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.lineTo(x + width, y + radius);
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctx.lineTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
    }

    function extrudeRoundedMesh(shape, color, x, y, z, rx, ry, rz, s) {
        var extrudeSettings = {
            depth: 2,
            bevelEnabled: true,
            bevelSegments: 5,
            steps: 2,
            bevelSize: 4,
            bevelThickness: 2
        };
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var smoothGeometry = true;
        if (smoothGeometry) {
            // merge vertices for phong smoothing
            const tempGeo = new THREE.Geometry().fromBufferGeometry(geometry);
            tempGeo.mergeVertices();
            tempGeo.computeVertexNormals();
            tempGeo.computeFaceNormals();
            geometry = new THREE.BufferGeometry().fromGeometry(tempGeo);
        }
        var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({
                color: color /*,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
                *//*
            })
        );
        //mesh.position.set(x, y, z);
        //mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        var centerMesh = true;
        if (centerMesh) {
            var center = new THREE.Vector3();
            mesh.geometry.computeBoundingBox();
            mesh.geometry.boundingBox.getCenter(center);
            mesh.geometry.center();
            mesh.position.copy(center);
        }
        return mesh;
    }

    function getRoundedRect() {
        var roundedRectShape = new THREE.Shape();
        roundedRect(roundedRectShape, 0, 0, 50, 50, 10);
        var mesh = extrudeRoundedMesh(roundedRectShape, 0x808080, 0, 0, 0, 0, 0, 0, 4);
        return mesh;
    }

    makeLozengeTarget = function() {
        var asc = document.getElementById("scene");
        var lt = document.createElement("a-box");
        lt.id = "lozenge-target";
        lt.setAttribute("color", "lightblue");
        lt.setAttribute("material", "color: #4455aa; wireframe: true");
        lt.setAttribute("scale", "0.5 0.5 0.5");
        lt.setAttribute("position", "0 0.5 -3");
        asc.appendChild(lt);
    }

    makeLozenge = function () {
        var lozenge = getRoundedRect(); // as a mesh
        var lozel = document.getElementById("lozenge-target");
        var loz = lozel.object3D;
        var newmesh = getRoundedRect();
        var sc = 0.0175;
        newmesh.scale.x = sc
        newmesh.scale.y = sc;
        newmesh.scale.z = sc;
        newmesh.position.x = 0;
        newmesh.position.y = 0;
        newmesh.position.z = 0;
        console.log("adding mesh to three?");
        loz.add(newmesh);
    }
    makeLozengeTarget();
    makeLozenge();
}

*/