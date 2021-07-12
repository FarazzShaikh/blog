import * as THREE from "three";

export function floor(scene) {
  THREE.ShaderLib["lambert"].fragmentShader = THREE.ShaderLib["lambert"].fragmentShader.replace(
    `vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;`,

    `#ifndef CUSTOM
            vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
        #else
            vec3 outgoingLight = diffuseColor.rgb * ( 1.0 - 0.5 * ( 1.0 - getShadowMask() ) ); // shadow intensity hardwired to 0.5 here
        #endif`
  );

  const geometry = new THREE.PlaneGeometry(22, 22);
  const material = new THREE.MeshLambertMaterial({ color: 0x11131a, side: THREE.DoubleSide });

  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  plane.receiveShadow = true;
  plane.position.y = -2;
  //   scene.add(plane);
}
