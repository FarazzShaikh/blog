import * as THREE from "three";

export default function lights(scene) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9, 100);
  const light = new THREE.HemisphereLight(0xffffff, 0xfffffff, 0.6);

  scene.add(light);
  scene.add(directionalLight);

  directionalLight.position.set(0.0, 0.5, 0.0);
  //   directionalLight.castShadow = true;

  directionalLight.shadow.mapSize.width = 512; // default
  directionalLight.shadow.mapSize.height = 512; // default
  directionalLight.shadow.camera.near = 0.5; // default
  directionalLight.shadow.camera.far = 500;
}
