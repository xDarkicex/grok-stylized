import * as THREE from 'three';
import { COLORS } from '../../config/colors';



export class AtomicEffect {
  private orbitGeometries: THREE.Mesh[] = [];
  private atomRotation: number = 0;
  
  constructor(private scene: THREE.Scene, private uniforms: any) {}
  
  createOrbitalRings(): void {
    // Remove any existing rings
    this.removeOrbitalRings();
    
    const orbitalCount = 3;
    for (let i = 0; i < orbitalCount; i++) {
      const radius = 10 + i * 5;
      const geometry = new THREE.TorusGeometry(radius, 0.1, 8, 64);
      
      // Use a glow material
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLORS.grokPurple),
        transparent: true,
        opacity: 0.6
      });
      
      const ring = new THREE.Mesh(geometry, material);
      
      // Set random rotation
      ring.rotation.x = Math.PI / 2 * Math.random();
      ring.rotation.y = Math.PI / 2 * Math.random();
      
      this.scene.add(ring);
      this.orbitGeometries.push(ring);
    }
  } // ADD CLOSING BRACE HERE
  
  removeOrbitalRings(): void {
    this.orbitGeometries.forEach(ring => {
      this.scene.remove(ring);
    });
    this.orbitGeometries = [];
  } // ADD CLOSING BRACE HERE
  
  updateOrbitalRings(delta: number): void {
    this.atomRotation += delta * 0.5;
    
    this.orbitGeometries.forEach((ring, i) => {
      // Rotate each ring at different speeds
      ring.rotation.x += delta * 0.2 * (i + 1) * 0.1;
      ring.rotation.z += delta * 0.3 * (i + 1) * 0.1;
    });
  } // ADD CLOSING BRACE HERE
  
  calculateAtomicPositions(index: number, particleCount: number): THREE.Vector3 {
    // Arrange particles in atomic orbital patterns
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    // Calculate radius based on electron shell model
    const shellCount = 3;
    const particlesPerShell = particleCount / shellCount;
    const shell = Math.floor(index / particlesPerShell);
    const radius = 5 + shell * 5;
    
    // Convert spherical to cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    return new THREE.Vector3(x, y, z);
  } // ADD CLOSING BRACE HERE
} // ADD CLOSING BRACE FOR CLASS HERE
