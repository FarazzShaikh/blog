import * as THREE from "three";
import { CustomShaderMaterial, TYPES } from "three-custom-shader-material";
import { loadShadersCSM, Simplex, Curl } from "gl-noise/build/glNoise.m";
import { initScene } from "./setup.js";
import lights from "./lights.js";

const v = {
  defines: "/rendering-1M-particles/shaders/particle_defines.glsl",
  header: "/rendering-1M-particles/shaders/particle_header.glsl",
  main: "/rendering-1M-particles/shaders/particle_main.glsl",
};

const f = {
  defines: "/rendering-1M-particles/shaders/frag/defines.glsl",
  header: "/rendering-1M-particles/shaders/frag/header.glsl",
  main: "/rendering-1M-particles/shaders/frag/main.glsl",
};

const chunks = [Simplex, Curl];

export function main(canvas, opts) {
  let material;

  const { scene, renderer, camera, controls } = initScene(canvas);

  loadShadersCSM(v, chunks).then((vertex) => {
    loadShadersCSM(f, chunks).then((fragment) => {
      camera.position.set(10, 10, 10);

      lights(scene);

      const loader = new THREE.TextureLoader();
      const disk = loader.load("/rendering-1M-particles/textures/circle-sprite.png");

      const geometry = new THREE.IcosahedronGeometry(4, opts.n);
      console.log(geometry.attributes.position.count);

      if (!opts.colorful) {
        fragment = undefined;
      }

      material = new CustomShaderMaterial({
        baseMaterial: TYPES.POINTS,
        vShader: vertex,
        fShader: fragment,
        uniforms: {
          uShift: {
            value: 0,
          },
          uShape: {
            value: disk,
          },
          uScale: {
            value: window.innerHeight / 2,
          },
          uTime: {
            value: 0,
          },
          uTargetPos: {
            value: new THREE.Vector3(0),
          },
          isNoise: {
            value: opts.noise,
          },
        },
        passthrough: {
          size: 0.1,
          color: 0xf38ba0,
        },
      });

      if (opts.noise) {
        const ico = new THREE.Points(geometry, material);
        scene.add(ico);
      } else if (opts.particles) {
        const _material = new THREE.PointsMaterial({ color: 0xf38ba0, size: 0.1 });
        const ico = new THREE.Points(geometry, _material);
        scene.add(ico);
      } else {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xf38ba0 }));
        scene.add(mesh);
      }
    });
  });

  function animate(time) {
    controls.update();

    if (material && material.uniforms) {
      material.uniforms.uTime.value = time;
    }

    renderer.render(scene, camera);
  }

  return animate.bind(this);
}
