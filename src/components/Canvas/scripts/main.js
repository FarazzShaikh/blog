import * as THREE from "three";
import { floor } from "./floor.js";
import lights from "./lights.js";
import { particle } from "./particle.js";
import { initScene, render } from "./setup.js";
import { fps } from "./fps.js";

export function main(canvas, is404) {
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const scene = initScene(canvas);
  //   initHelpers(scene);
  lights(scene);

  let _4, _0, _42, brackets, semicolon, equals;
  if (is404) {
    // _4 = particle(scene, 0xfe8f35, "../../../../static/models/4.gltf");
    // _42 = particle(scene, 0x7421fa, "../../../../static/models/4.gltf");
    // _0 = particle(scene, 0x0fb281, "../../../../static/models/0.gltf");
    _4 = particle(scene, 0xfe8f35, "/models/4.gltf");
    _42 = particle(scene, 0x7421fa, "/models/4.gltf");
    _0 = particle(scene, 0x0fb281, "/models/0.gltf");
  } else {
    // brackets = particle(scene, 0xfe8f35, "../../../../static/models/bracket.gltf");
    // semicolon = particle(scene, 0x0fb281, "../../../../static/models/semicolon.gltf");
    // equals = particle(scene, 0x7421fa, "../../../../static/models/equals.gltf");
    brackets = particle(scene, 0xfe8f35, "/models/bracket.gltf");
    semicolon = particle(scene, 0x0fb281, "/models/semicolon.gltf");
    equals = particle(scene, 0x7421fa, "/models/equals.gltf");
  }

  floor(scene);

  document.getScroll = function () {
    if (window.pageYOffset != undefined) {
      return new THREE.Vector2(window.pageXOffset, window.pageYOffset);
    } else {
      var sx,
        sy,
        d = document,
        r = d.documentElement,
        b = d.body;
      sx = r.scrollLeft || b.scrollLeft || 0;
      sy = r.scrollTop || b.scrollTop || 0;
      return new THREE.Vector2(sx, sy);
    }
  };

  let scrollY = 1;

  let ID,
    T = 0;
  const callback = (_, _ID) => {
    if (_4) {
      _4(T, scrollY);
    }

    if (_42) _42(T, scrollY);

    if (_0) {
      _0(T, scrollY);
    }

    if (brackets) brackets(T, scrollY);
    // bracket2(time);

    if (semicolon) semicolon(T, scrollY);

    if (equals) equals(T, scrollY);

    ID = _ID;
    T++;
    fps.tick();
  };

  let cancled = false;
  const scrollListner = () => {
    const scroll = document.getScroll();
    // targetPos.y = scroll.y / 100;

    let y = scroll.y / (window.innerHeight * 0.3);

    if (y <= 0) y = 0.2;
    if (y > 1) y = 1;

    y = 1 - y;
    scrollY = y;

    if (y <= 0) {
      if (!cancled) {
        cancelAnimationFrame(ID);
        cancled = true;
      }
    } else {
      if (cancled) {
        render(T, callback);
        cancled = false;
      }
    }
  };
  window.addEventListener("scroll", scrollListner);

  render(T, callback);

  return () => {
    window.removeEventListener("scroll", scrollListner);
    cancelAnimationFrame(ID);
    fps.value = 100;
  };
}
