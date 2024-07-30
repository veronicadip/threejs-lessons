import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild(warning);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 4);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#120922");

// Load glTF files
const loader = new GLTFLoader();

loader.load("/glTFs/weather/source/weather.glb", function (gltf) {
    gltf.scene.children.forEach((child, index) => {
        console.log(`Child ${index}: ${child.name}`);
    });

    const sunGeometry = gltf.scene.children.find(child => child.name === 'Sphere002');
    const cloudGeometry = gltf.scene.children.find(child => child.name === 'Cloud001');
    const cloud2Geometry = gltf.scene.children.find(child => child.name === 'Cloud002');

    sunGeometry.scale.set(1, 1, 1);
    sunGeometry.position.y = 0.1;
    sunGeometry.position.x = 0.1;
    sunGeometry.position.z = -2;
    sunGeometry.rotation.y = -0.6

    cloud2Geometry.position.z = -1;

    scene.add(sunGeometry);
    scene.add(cloudGeometry);
    scene.add(cloud2Geometry);

    let clock = new THREE.Clock();

    function animate() {
        let time = clock.getElapsedTime();

        sunGeometry.position.x = Math.sin(time) * 0.01;

        cloudGeometry.position.x = Math.sin(time) * 0.1;
        cloudGeometry.position.y = Math.sin(time * 0.01) * 0.02;

        cloud2Geometry.position.x = Math.sin(time + Math.PI / 2) * 0.1;
        cloud2Geometry.position.y = Math.sin((time + Math.PI / 2) * 0.01) * 0.01;

        renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);
}, function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}, function (error) {
    console.error(error);
});
