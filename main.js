import * as THREE from 'three';
// import { OrbitControls } from 'OrbitControls';

// ------------------------
// initialize scene, camera, renderer, and cube
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


// todo: add html to cube sides
// ex: https://threejs.org/examples/#css3d_youtube
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({
    color: 0xFF6347,
    wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
renderer.render(scene, camera);

// ------------------------
// add functionality to drag around cube

var dragging = false;
const canvas = document.getElementById('bg');
canvas.addEventListener('mousedown', () => {
    dragging = true;
    // console.log('dragging = true');
});
canvas.addEventListener('mouseup', () => {
    dragging = false;
    // console.log('dragging = false');
});

var mouseOrigin = {}; // needs to be outside function to maintain context
canvas.addEventListener('mousemove', (event) => {

    var mouseDelta = {
        x: event.offsetX - mouseOrigin.x,
        y: event.offsetY - mouseOrigin.y,
    };
    
    if (dragging) {
        var deltaEuler = new THREE.Euler( // https://threejs.org/docs/#api/en/math/Euler
            toRadians(mouseDelta.y * 1), // todo: look into: not sure why, but if x,y; dimensions reversed
            toRadians(mouseDelta.x * 1),
            0,
            'XYZ'
        );
        
        var deltaQuaternion = new THREE.Quaternion().setFromEuler(deltaEuler); // https://eater.net/quaternions
        
        cube.quaternion.multiplyQuaternions(deltaQuaternion, cube.quaternion)
    };

    mouseOrigin = {
        x: event.offsetX,
        y: event.offsetY
    };

});


function toRadians(angle) {
    return angle * (Math.PI / 180);
}


// todo: on page load, or inactive, start slow rotate - when user interacts, stop rotation
function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.005;
    // cube.rotation.z += 0.01;
    renderer.render(scene, camera);
}
animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};
window.addEventListener('resize', onWindowResize);