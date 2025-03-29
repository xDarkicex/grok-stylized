
export const vertexShader = `
  attribute vec3 velocity;
  attribute vec3 color;
  attribute float size;
  uniform float uTime;
  uniform vec2 uMousePosition;
  uniform float uRepulsion;
  uniform float uPixelRatio;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float depth = 1.0 - (-mvPosition.z / 50.0);
    gl_PointSize = size * 4.0 * uPixelRatio * depth;
    gl_Position = projectionMatrix * mvPosition;
  }
`; 

export const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Circular shape with soft edges
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.4, 0.5, dist);
    float glow = 1.0 - smoothstep(0.2, 0.5, dist);
    gl_FragColor = vec4(vColor * glow, alpha * glow);
  }
`; 
