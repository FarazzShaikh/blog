import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setup } from "../../shared/setup";
import lights from "./lights";
import Stats from "stats.js";

export async function character_creation_in_three_js_main(canvas, opts) {
  canvas.parentElement.style.position = "relative";
  const { scene, renderer, controls, camera } = setup(canvas);
  lights(scene);

  camera.position.set(2, 2, 2);
  camera.lookAt(0, 0, 0);

  const axis = new THREE.AxesHelper(1.2);
  scene.add(axis);

  const loader = new GLTFLoader();
  const texture = new THREE.TextureLoader().load("/character-creation-in-three-js/Diffuse.png");
  texture.flipY = false;
  texture.encoding = THREE.sRGBEncoding;

  const morphTargets = {};
  const head = await new Promise((res, rej) => {
    loader.load(`/character-creation-in-three-js/head.gltf`, (object) => {
      const group = object.scene;

      console.log("====");

      group.traverse((child) => {
        if (child.isMesh) {
          child.material.metalness = 0;
          child.material.vertexColors = false;

          if (opts?.texture) child.material.map = texture;

          if (child.morphTargetDictionary) {
            for (const key in child.morphTargetDictionary) {
              const index = child.morphTargetDictionary[key];
              if (Array.isArray(morphTargets[key])) {
                morphTargets[key].push({ index, child });
              } else {
                morphTargets[key] = [];
                morphTargets[key].push({ index, child });
              }
            }
          }
        }
      });

      res(object);
    });
  });

  console.log(morphTargets);

  scene.add(head.scene);

  const influences = {};
  if (opts?.GUI) {
    const dat = await import("dat.gui");
    const gui = new dat.GUI({ autoPlace: false, width: window.innerWidth * 0.3 });

    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "0";
    gui.domElement.style.right = "0";

    console.log(gui.domElement);
    canvas.parentElement.appendChild(gui.domElement);

    for (const key in morphTargets) {
      const targets = morphTargets[key];

      const { child, index } = targets[0];
      influences[key] = child.morphTargetInfluences[index];

      gui.add(influences, key, 0, 1, 0.01).onChange(function (v) {
        targets.forEach(({ child, index }) => {
          child.morphTargetInfluences[index] = v;
        });
      });
    }

    if (opts?.GUIClosed) gui.close();
  } else if (opts?.folder) {
    const dat = await import("dat.gui");
    const gui = new dat.GUI({ autoPlace: false, width: window.innerWidth * 0.3 });
    const folder = gui.addFolder("Sliders");

    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "0";
    gui.domElement.style.right = "0";

    console.log(gui.domElement);
    canvas.parentElement.appendChild(gui.domElement);

    for (const key in morphTargets) {
      const targets = morphTargets[key];

      const { child, index } = targets[0];
      influences[key] = child.morphTargetInfluences[index];

      folder.add(influences, key, 0, 1, 0.01).onChange(function (v) {
        targets.forEach(({ child, index }) => {
          child.morphTargetInfluences[index] = v;
        });
      });
    }

    folder.close();

    const funcs = {
      Randomize: () => {
        for (const key in morphTargets) {
          influences[key] = Math.random();
          morphTargets[key].forEach(({ child, index }) => {
            child.morphTargetInfluences[index] = influences[key];
          });
        }

        gui.updateDisplay();
      },
    };

    gui.add(funcs, "Randomize");
  }

  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.dom.style.position = "absolute";
  canvas.parentElement.appendChild(stats.dom);

  function render(time) {
    stats.begin();

    controls.update();
    renderer.render(scene, camera);

    stats.end();
  }

  return render;
}
