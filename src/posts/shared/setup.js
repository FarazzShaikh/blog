import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function setup(canvas, IsWithControls = true, shadows = false) {
  const fov = 45;
  const aspectRatio = canvas.parentElement.offsetWidth / canvas.parentElement.offsetHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  renderer.setSize(canvas.parentElement.offsetWidth, canvas.offsetHeight, false);

  if (shadows) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
  }

  let controls;
  if (IsWithControls) {
    controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true; // Enables inertia on the camera making it come to a more gradual stop.
    controls.dampingFactor = 0.25; // Inertia factor
  }

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = canvas.parentElement.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.parentElement.offsetWidth, canvas.offsetHeight, false);
    },
    false
  );

  return { scene, camera, renderer, controls };
}

export function lights(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5, 100);
  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);

  scene.add(light);
  scene.add(directionalLight);

  directionalLight.position.set(8, 8, 2);
  directionalLight.castShadow = true;

  directionalLight.shadow.mapSize.width = 512; // default
  directionalLight.shadow.mapSize.height = 512; // default
  directionalLight.shadow.camera.near = 0.5; // default
  directionalLight.shadow.camera.far = 500;

  return { light, directionalLight };
}
