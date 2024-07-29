import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Check if the browser supports WebGL 2 before trying to display something
if ( WebGL.isWebGL2Available() ) {
	animate();
} else {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
};

// we need a scene, a camera and a renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// set the size at which we want to render the app
renderer.setSize(window.innerWidth, window.innerHeight);

// insert the renderer into the html (this is a <canvas> element)
document.body.appendChild(renderer.domElement);

// create a geometry (the body of the object) and a material (the texture)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// a mesh takes a geometry and applies the material to it
const cube = new THREE.Mesh(geometry, material);

// add the cube to the scene
scene.add(cube);

// change the camera position because the cube will be at the same default coordinates as the camera (0, 0, 0)
camera.position.z = 5;

// function to render the scene
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

// create a loop that renders the scene every time the screen is refreshed (60 times per second)
renderer.setAnimationLoop(animate);