import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( !WebGL.isWebGL2Available() ) {
	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

// load glTF files
const loader = new GLTFLoader();

loader.load("/glTFs/weather/source/weather.glb", function (gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
}, function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

}, function (error) {
    console.error(error);
});