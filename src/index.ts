// add styles
import './style.css'
// three.js
import * as THREE from 'three'
window['THREE'] = THREE;
require("three/examples/js/loaders/GLTFLoader");

var scene, camera, renderer, box;

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000)
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

    loadModel();
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
    // Instantiate a loader
    var loader = new THREE['GLTFLoader']();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    // THREE.DRACOLoader.setDecoderPath( '/examples/js/libs/draco' );
    // loader.setDRACOLoader( new THREE.DRACOLoader() );
        
    // Optional: Pre-fetch Draco WASM/JS module, to save time while parsing.
    // THREE.DRACOLoader.getDecoderModule();

    // Load a glTF resource
    loader.load(
        // resource URL
        'assets/model/pirate.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            
            scene.add( gltf.scene );

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Scene
            gltf.scenes; // Array<THREE.Scene>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}

init();
animate();
