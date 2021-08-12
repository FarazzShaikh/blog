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
  renderer.setSize(canvas.parentElement.offsetWidth, canvas.offsetHeight);

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
      renderer.setSize(canvas.parentElement.offsetWidth, canvas.offsetHeight);
    },
    false
  );

  return { scene, camera, renderer, controls };
}
