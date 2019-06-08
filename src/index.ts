// add styles
import './style.css'
// three.js
import * as THREE from 'three'
window['THREE'] = THREE;
import {GLTFLoader} from "three/examples/js/loaders/GLTFLoader"

var scene, camera, renderer, box;

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
    
    let axis = new THREE.AxesHelper(10)
    scene.add(axis)

    let light = new THREE.DirectionalLight(0xffffff, 1.0)
    light.position.set(100, 100, 100)
    scene.add(light)

    let light2 = new THREE.DirectionalLight(0xffffff, 1.0)
    light2.position.set(-100, 100, -100)
    scene.add(light2);

    let material = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true
    })
    
    // create a box and add it to the scene
    box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
    
    scene.add(box);
    box.position.x = 0.5
    box.rotation.y = 0.5

    camera.position.x = 5
    camera.position.y = 5
    camera.position.z = 5

    camera.lookAt(scene.position)
}

function animate(): void {
	requestAnimationFrame(animate)
	render()
}

function render(): void {
	let timer = 0.002 * Date.now()
	box.position.y = 0.5 + 0.5 * Math.sin(timer)
	box.rotation.x += 0.1
	renderer.render(scene, camera)
}


function loadModel() {
    let loader = new GLTFLoader();
}

init();
animate();
