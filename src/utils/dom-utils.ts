// Track mouse position for particle interaction
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

export function trackCursor() {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
}

export function getMousePosition() {
  return { x: mouseX, y: mouseY };
}
