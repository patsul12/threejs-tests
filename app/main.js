var $ = require('jquery');
var THREE = require('three');
var loader = new THREE.FontLoader();
loader.load('../helvetiker_regular.typeface.js', function(font) {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1);
var material = new THREE.MeshFaceMaterial([
  new THREE.MeshBasicMaterial({
    color: 0x0ff000
  }),
  new THREE.MeshBasicMaterial({
    color: 0x0ff000
  }),
  new THREE.MeshBasicMaterial({
    color: 0x0ff000
  }),
  new THREE.MeshBasicMaterial({
    color: 0x0ff000
  }),
  new THREE.MeshBasicMaterial({
    color: 0x0ff000
  }),
  new THREE.MeshBasicMaterial({
    color: 0x00ffff 
  })
]);
var cube = new THREE.Mesh( geometry, material );

camera.position.set(0, 700, 700)
camera.lookAt(scene.position);

var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0
};

var textMaterial = new THREE.MeshBasicMaterial({color: 0xb0bca7, overdraw: true})
var textGeometry = new THREE.TextGeometry("Patrick Sullivan", {
  font: font
});
textGeometry.computeBoundingBox()
var textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.x = -400;
scene.add(textMesh);

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
          toRadians(deltaMove.y * 1),
          toRadians(deltaMove.x * 1),
          0,
          'XYZ'
        ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
      }

      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
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
