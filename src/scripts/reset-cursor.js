
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