

vec3 p = position;
// p += uTargetPos * 0.1;

vec3 f = gln_curl((p * 0.2) + uTime * 0.00005);

vUv = uv;

vec3 newPos = position + (isNoise ? f : vec3(0.0));
vPosition = newPos;
vec3 newNormal = normal;
