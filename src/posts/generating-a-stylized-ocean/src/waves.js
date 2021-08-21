import * as THREE from "three";
import { loadShadersCSM } from "gl-noise/build/glNoise.m";
import { CustomShaderMaterial, TYPES } from "three-custom-shader-material";

const pVert = {
  header: "/generating-a-stylized-ocean/shaders/vert/header.glsl",
  main: "/generating-a-stylized-ocean/shaders/vert/main.glsl",
};
const pFrag = {
  defines: "",
  header: "/generating-a-stylized-ocean/shaders/frag/header.glsl",
  main: "/generating-a-stylized-ocean/shaders/frag/main.glsl",
};

export async function waves(scene, opts, articleOpts) {
  let material;
  if (articleOpts.isWaves) {
    material = new CustomShaderMaterial({
      baseMaterial: TYPES.PHONG,
      vShader: await loadShadersCSM(pVert),
      fShader: articleOpts.isColor ? await loadShadersCSM(pFrag) : undefined,
      uniforms: {
        uTime: { value: 0 },
        waterColor: {
          value: new THREE.Color("#52a7f7"),
        },
        waterHighlight: {
          value: new THREE.Color("#b3ffff"),
        },
        offset: {
          value: articleOpts.isGUI ? opts.Offset : 0,
        },
        contrast: {
          value: articleOpts.isGUI ? opts.Contrast : 1,
        },
        brightness: {
          value: articleOpts.isGUI ? opts.Brightness : 1,
        },
        isMultipleWaves: {
          value: articleOpts.isMultipleWaves || false,
        },
        isBiColor: {
          value: articleOpts.isBiColor || false,
        },
        isFBM: {
          value: articleOpts.isFBM || false,
        },
      },
      passthrough: {
        side: THREE.DoubleSide,
        flatShading: true,
        color: 0x68c3c0,
        shininess: 1,
      },
    });
  } else {
    material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      flatShading: true,
      color: 0x68c3c0,
      shininess: 1,
    });
  }

  const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  scene.add(plane);

  function update(opts) {
    material.uniforms.offset.value = opts.Offset;
    material.uniforms.contrast.value = opts.Contrast;
    material.uniforms.brightness.value = opts.Brightness;
  }

  function animate(dt) {
    if (material && material.uniforms && articleOpts.isAnim) {
      material.uniforms.uTime.value = dt;
    }
  }

  return { animate, update };
}
