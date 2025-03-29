import { log } from './utils/logging';
import { trackCursor } from './utils/dom-utils';
import { injectGlobalStyles } from './dom/styles';
import { stylePandaInputForm } from './dom/form-styling';
import { createCoolNavbar } from './dom/navbar';
import { FluidParticlesSystem } from './three/particles/particle-system';
import { setupDomObserver } from './core/observer';

// Main function to apply all styles
function restyleGrok() {
  log('Starting Grok restyling');
  if (document.querySelector('[data-grok-styled]')) {
    log('Already styled, skipping');
    return;
  }

  try {
    // Apply all styles
    injectGlobalStyles();
    createCoolNavbar();
    stylePandaInputForm();
    trackCursor();
    
    // Create Three.js fluid particles
    new FluidParticlesSystem();
    
    // Mark as styled
    const marker = document.createElement('div');
    marker.setAttribute('data-grok-styled', 'true');
    marker.style.display = 'none';
    document.body.appendChild(marker);
    log('Styling complete!');
  } catch (e) {
    console.error('Styling failed:', e);
  }
} 

// Initialize when page is ready
function init() {
  log('Initializing Grok Restyler');
  
  // Apply styles when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restyleGrok);
  } else {
    restyleGrok();
  }
  
  // Set up observer to maintain styles
  setupDomObserver(restyleGrok);
} 

// Start the restyler
init();
