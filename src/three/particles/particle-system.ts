import * as THREE from 'three';
import { COLORS } from '../../config/colors';
import { log } from '../../utils/logging';
import { getMousePosition } from '../../utils/dom-utils';
import { AtomicEffect } from './atomic-effect';
import { vertexShader, fragmentShader } from './shaders';


export class FluidParticlesSystem {
    private particleCount: number;
    private clock: THREE.Clock;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private particles: THREE.Points;
    private uniforms: any;
    private atomicEffect: AtomicEffect;
    private lastMousePosition: THREE.Vector2;
    private thinkingMode: boolean = false;
    
    constructor() {
      this.particleCount = 5000;
      this.clock = new THREE.Clock();
      this.lastMousePosition = new THREE.Vector2(0, 0);
      
      this.setupThreeJS();
      this.createParticles();
      this.monitorThinkMode();
      this.animate();
      
      log('Fluid particles system initialized');
    }
    
    setupThreeJS(): void {
      // Create scene
      this.scene = new THREE.Scene();
      
      // Create camera
      this.camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
      );
      this.camera.position.z = 50;
      
      // Create renderer
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      
      // Append to DOM
      const container = document.createElement('div');
      container.className = 'particle-container';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.zIndex = '-1';
      container.style.pointerEvents = 'none';
      container.appendChild(this.renderer.domElement);
      document.body.appendChild(container);
      
      // Handle window resize
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }
  
    createParticles(): void {
      // Create geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(this.particleCount * 3);
      const colors = new Float32Array(this.particleCount * 3);
      const velocities = new Float32Array(this.particleCount * 3);
      const sizes = new Float32Array(this.particleCount);
      
      // Fill with random positions
      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        
        // Positions
        positions[i3] = (Math.random() - 0.5) * 100;
        positions[i3 + 1] = (Math.random() - 0.5) * 100;
        positions[i3 + 2] = (Math.random() - 0.5) * 100;
        
        // Velocities
        velocities[i3] = (Math.random() - 0.5) * 0.2;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.2;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;
        
        // Colors - use our defined colors
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          // Use grokPurple
          colors[i3] = 0.42; // R: 107/255
          colors[i3 + 1] = 0.28; // G: 72/255
          colors[i3 + 2] = 1.0; // B: 255/255
        } else if (colorChoice < 0.66) {
          // Use grokNeon
          colors[i3] = 1.0; // R: 255/255
          colors[i3 + 1] = 0.31; // G: 79/255
          colors[i3 + 2] = 0.31; // B: 78/255
        } else {
          // Use a mix
          colors[i3] = 0.8 + Math.random() * 0.2;
          colors[i3 + 1] = 0.2 + Math.random() * 0.3;
          colors[i3 + 2] = 0.8 + Math.random() * 0.2;
        }
        
        // Random sizes
        sizes[i] = Math.random() * 2;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create uniforms
      this.uniforms = {
        uTime: { value: 0 },
        uMousePosition: { value: new THREE.Vector2(0, 0) },
        uRepulsion: { value: 0.3 },
        uPixelRatio: { value: window.devicePixelRatio }
      };
      
      // Create material
      const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthTest: false,
        uniforms: this.uniforms
      });
      
      // Create particle system
      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
      
      // Create atomic effect
      this.atomicEffect = new AtomicEffect(this.scene, this.uniforms);
    }
  
    monitorThinkMode(): void {
        // Watch for "thinking" mode changes
        const observer = new MutationObserver(() => {
          const thinkingElement = document.querySelector('.thinking');
          
          if (thinkingElement && !this.thinkingMode) {
            // Set class state
            this.thinkingMode = true;
            
            // Create orbital rings
            this.atomicEffect.createOrbitalRings();
            
            // Add data attribute for CSS animations
            document.body.setAttribute('data-grok-thinking', 'true');
            
          } else if (!thinkingElement && this.thinkingMode) {
            // Update class state
            this.thinkingMode = false;
            
            // Remove orbital rings
            this.atomicEffect.removeOrbitalRings();
            
            // Remove data attribute
            document.body.removeAttribute('data-grok-thinking');
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      
  
    animate(): void {
      requestAnimationFrame(() => this.animate());
      
      const delta = this.clock.getDelta();
      const elapsed = this.clock.getElapsedTime();
      
      // Update uniforms
      this.uniforms.uTime.value = elapsed;
      
      // Update mouse position
      const mousePos = getMousePosition();
      this.uniforms.uMousePosition.value.set(
        mousePos.x / window.innerWidth * 2 - 1,
        -(mousePos.y / window.innerHeight) * 2 + 1
      );
      
      // Update atomic effect if in thinking mode
      if (this.thinkingMode) {
        this.atomicEffect.updateOrbitalRings(delta);
      }
      
      // Rotate particles slightly
      if (this.particles) {
        this.particles.rotation.y += delta * 0.05;
      }
      
      // Render scene
      this.renderer.render(this.scene, this.camera);
    } 
}
  