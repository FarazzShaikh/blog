import { setup, lights } from "../../shared/setup";
import Stats from "stats.js";
import { waves } from "./waves";

export async function generating_a_stylized_ocean(canvas, opts = {}) {
  const { scene, renderer, camera, controls } = setup(canvas, true);
  camera.position.set(5, 7, 5);
  camera.lookAt(0, 0, 0);

  const { light } = lights(scene);
  light.intensity = 0.6;

  const options = {
    Offset: 0.4,
    Contrast: 3.1,
    Brightness: 1,
  };

  const { animate, update } = await waves(scene, options, opts);

  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.dom.style.position = "absolute";
  canvas.parentElement.appendChild(stats.dom);

  if (opts.isGUI) {
    const dat = await import("dat.gui");
    const gui = new dat.GUI({ autoPlace: false, width: window.innerWidth * 0.2 });
    gui.domElement.style.position = "absolute";
    gui.domElement.style.top = "0";
    gui.domElement.style.right = "0";

    canvas.parentElement.appendChild(gui.domElement);

    for (const o in options) {
      gui
        .add(options, o)
        .min(-5)
        .max(5)
        .onChange(() => {
          update(options);
        });
    }
  }

  function render(time) {
    stats.begin();

    animate(time * 0.00015);

    controls.update();
    renderer.render(scene, camera);

    stats.end();
  }

  return render;
}
