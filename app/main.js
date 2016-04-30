var $ = require('jquery');
var THREE = require('three');
var loader = new THREE.FontLoader();
loader.load('../helvetiker_regular.typeface.js', function(font) {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};

var textMaterial = new THREE.MeshBasicMaterial({color: 0xb0bca7, overdraw: true})
var textGeometry = new THREE.TextGeometry("Patrick Sullivan", {
  font: font,
  size: 40,
  height: 15
});
var textGeometry2 = new THREE.TextGeometry("Web Development Intern", {
  font: font,
  size: 20,
  height: 10
});
textGeometry.computeBoundingBox();
textGeometry2.computeBoundingBox();
var textWidth = textGeometry.boundingBox.max.x-textGeometry.boundingBox.min.x;
var textWidth2 = textGeometry2.boundingBox.max.x-textGeometry2.boundingBox.min.x;
var textHeight2 = textGeometry.boundingBox.max.y-textGeometry.boundingBox.min.y;

var textMesh = new THREE.Mesh(textGeometry, textMaterial);
var textMesh2 = new THREE.Mesh(textGeometry2, textMaterial);
textMesh.position.set(-0.5*textWidth,0,0);
textMesh2.position.set(-0.5*textWidth2,-0.6*textHeight2,0);

var meshGroup = [textMesh, textMesh2]
var pivot = new THREE.Object3D();
for (var i = 0; i < meshGroup.length; i++) {
  pivot.add(meshGroup[i]);
}
scene.add(pivot);

camera.position.set(-600,0,200);
camera.lookAt(textMesh.position);

$(renderer.domElement)
.on('mousedown',
    function(e) {
      isDragging = true;
    }).on('mousemove', function(e) {
      var deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      if(isDragging) {
        var deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          0,
          toRadians(deltaMove.x * 1),
          0,
          'XYZ'
        ));

        pivot.quaternion.multiplyQuaternions(deltaRotationQuaternion, pivot.quaternion);
      }

      previousMousePosition = {
        x: e.offsetX,
        y: previousMousePosition.y
      };
    });

    $(document).on('mouseup', function(e) {
      isDragging = false;
    })

    var render = function() {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

});
