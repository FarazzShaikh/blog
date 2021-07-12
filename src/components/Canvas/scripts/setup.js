import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer, scene, camera, controls;

function deviceType() {
  if (window.innerWidth <= 1024) return "mobile";
  else return "desktop";
}

/**
 *
 * @returns {THREE.Scene}
 */
export function initScene(canvas) {
  // Creating a scene
  scene = new THREE.Scene();

  // Defining options
  const fov = 45;
  const aspectRatio = canvas.clientWidth / canvas.clientHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;

  // Creating a camera
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);

  camera.position.set(0, 10, 0);
  camera.lookAt(0, 0, 0);

  // Creating a Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 👈 Enable Antialiasing
    alpha: true,
    canvas: canvas,
  });
  //   renderer.shadowMap.enabled = true;
  //   renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // Setting the Renderer's size to the entire window
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Append Renderer to the body
  //   document.body.appendChild(renderer.domElement);

  //   controls = new OrbitControls(camera, renderer.domElement);

  return scene;
}

export function initHelpers() {
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);
}

let ID;
/**
 *
 * @param {number} dt
 * @param {Function} callback
 */
export function render(dt, callback) {
  renderer.render(scene, camera);
  ID = requestAnimationFrame((dt) => render(dt, callback));

  //   controls.update();

  //   console.log(renderer.info.render.calls);
  //   renderer.info.reset();

  callback(dt, ID);
}

// window.addEventListener("resize", onWindowResize, false);

// function onWindowResize() {
//   const canvas = document.querySelector(".three canvas");
//   camera.aspect = canvas.clientWidth / canvas.clientHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);
// }
