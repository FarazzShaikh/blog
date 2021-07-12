

vec3 c = center;
vec3 c2 = center;
c += (uTime * 0.05);
vec3 f = snoiseVec3(c * 0.2);

vec3 viewOffset = position;

vnoise = f;

vec3 offset;
if (isDesktop) {
  offset = vec3(6.0, 0.0, 0.0);
} else {
  offset = vec3(3.0, 0.0, 0.0);
}

c2 += offset;
if (c2.x + f.x > offset.x) {
  c2.x = -offset.x;
} else if (c2.x + f.x < -offset.x) {
  c2.x = offset.x;
}

vec3 newPos = (c2 + f) + viewOffset;

newPos = rotate((c2 + f) + viewOffset, f);

vec3 newNormal = normal;