import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { CustomShaderMaterial, TYPES } from "../../../lib/three-csm.module.js";
import { loadShadersCSM, Common, Simplex } from "../../../lib/glNoise.m.js";

function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function rand(min, max) {
  return map(Math.random(), 0, 1, min, max);
}

function deviceType() {
  if (window.innerWidth <= 1024) return "mobile";
  else return "desktop";
}

const numSpheres = 20;

const v = {
  defines: "/shaders/particle_defines.glsl",
  header: "/shaders/particle_header.glsl",
  main: "/shaders/particle_main.glsl",
};
// const v = {
//   defines: "../../../../static/shaders/particle_defines.glsl",
//   header: "../../../../static/shaders/particle_header.glsl",
//   main: "../../../../static/shaders/particle_main.glsl",
// };

export function particle(scene, color, model) {
  // Instantiate a loader

  let material, points;

  loadShadersCSM(v, [Common, Simplex]).then(({ defines, header, main }) => {
    const loader = new GLTFLoader();

    loader.load(
      model,

      function (gltf) {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            const geometry = new THREE.InstancedBufferGeometry().copy(child.geometry);

            const center = new Array(numSpheres * 3).fill(0).map(() => rand(-2, 2));
            geometry.setAttribute("center", new THREE.InstancedBufferAttribute(new Float32Array(center), 3));

            material = new CustomShaderMaterial({
              baseMaterial: TYPES.PHONG,
              vShader: {
                defines: ` `,
                header: header,
                main: main,
              },
              uniforms: {
                uTime: { value: 0 },
                scrollY: { value: 1 },
                isDesktop: { value: deviceType() === "desktop" },
              },
              passthrough: {
                blending: THREE.NormalBlending,
                depthTest: true,
                flatShading: true,
                transparent: true,
                shininess: 1,
                roughness: 0.5,
                color: color,
              },
            });

            points = new THREE.InstancedMesh(geometry, material, numSpheres);

            points.castShadow = true;
            scene.add(points);
          }
        });
      }
    );
  });

  function animate(time) {
    if (material && material.uniforms) {
      material.uniforms.uTime.value = time * 0.05;

      const scroll = document.getScroll();
      let y = 1 - scroll.y / (window.innerHeight * 0.3);
      material.opacity = y;

      if (y <= 0) points.visible = false;
      else points.visible = true;
    }
  }

  return animate;
}
