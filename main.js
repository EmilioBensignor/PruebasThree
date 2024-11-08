import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-canvas")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Cambia el fondo de la escena a un color claro (#f0f0f0)
renderer.setClearColor(0xf0f0f0);

// Cargar una textura para simular la superficie rugosa de la granada
const textureLoader = new THREE.TextureLoader();
const bumpTexture = textureLoader.load('path/to/your/bump-map.jpg'); // Usa una textura de relieve similar a la superficie de una granada

// Crear la esfera con un material rojo y un mapa de relieve
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({
  color: 0x8b0000,        // Color rojo oscuro similar al de una granada
  bumpMap: bumpTexture,    // Mapa de relieve para simular rugosidad
  bumpScale: 0.3,          // Ajusta la intensidad del relieve
  roughness: 0.5,          // Ajusta la rugosidad para que no brille demasiado
  metalness: 0.1           // Bajo metalness para mantener una apariencia mate
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Posicionar la cámara
camera.position.z = 50;

// Agregar luces para resaltar la textura y los detalles
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Luz suave para iluminar toda la escena
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Posición de la luz para crear sombras y resaltar textura
scene.add(directionalLight);

// Configurar los controles
const controls = new OrbitControls(camera, renderer.domElement);

// Animación de la escena
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
