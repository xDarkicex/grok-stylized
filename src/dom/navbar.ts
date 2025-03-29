import { COLORS } from '../config/colors';
import { log } from '../utils/logging';

export function createCoolNavbar() {
  // Try multiple selector patterns to find Grok's navbar
  const navbar = document.querySelector('.h-16.top-0, header, nav, .h-16');
  if (!navbar) {
    log('Navbar not found');
    return;
  }

  if (navbar instanceof HTMLElement) {
    // Fix position and ensure visibility
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.width = '100%';
    navbar.style.height = '64px'; // Force height to be visible
    navbar.style.display = 'flex';
    navbar.style.alignItems = 'center';
    navbar.style.zIndex = '100';
    navbar.style.background = 'linear-gradient(135deg, #6B48FF 0%, #1a1a2e 100%)';
    navbar.style.borderBottom = '2px solid #FF4F4D';
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.3)';
    
    // Add spacing below navbar to prevent content overlap
    document.body.style.paddingTop = '64px';
    
    // Add a subtle animated gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.style.position = 'absolute';
    gradientOverlay.style.top = '0';
    gradientOverlay.style.left = '0';
    gradientOverlay.style.width = '100%';
    gradientOverlay.style.height = '100%';
    gradientOverlay.style.background = 'linear-gradient(45deg, rgba(107, 72, 255, 0.05) 25%, transparent 25%, transparent 50%, rgba(107, 72, 255, 0.05) 50%, rgba(107, 72, 255, 0.05) 75%, transparent 75%)';
    gradientOverlay.style.backgroundSize = '20px 20px';
    gradientOverlay.style.opacity = '0.2';
    gradientOverlay.style.pointerEvents = 'none';
    navbar.appendChild(gradientOverlay);
    
    // Add glow effect to navbar
    const navGlow = document.createElement('div');
    navGlow.className = 'grok-nav-glow';
    navGlow.style.position = 'absolute';
    navGlow.style.bottom = '-3px';
    navGlow.style.left = '0';
    navGlow.style.width = '100%';
    navGlow.style.height = '3px';
    navGlow.style.background = '#FF4F4D';
    navGlow.style.filter = 'blur(3px)';
    navGlow.style.pointerEvents = 'none';
    navbar.appendChild(navGlow);
    
    // Find and enhance logo if present
    const logo = navbar.querySelector('svg, img');
    if (logo instanceof SVGElement || logo instanceof HTMLImageElement) {
      logo.style.filter = 'drop-shadow(0 0 8px rgba(255, 79, 78, 0.7))';
      logo.style.transition = 'all 0.5s ease';
      
      // Add hover animation
      logo.addEventListener('mouseenter', () => {
        logo.style.filter = 'drop-shadow(0 0 12px rgba(255, 79, 78, 0.9))';
        logo.style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      logo.addEventListener('mouseleave', () => {
        logo.style.filter = 'drop-shadow(0 0 8px rgba(255, 79, 78, 0.7))';
        logo.style.transform = 'scale(1) rotate(0deg)';
      });
    }
    
    // Ensure all links in navbar are visible
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      if (link instanceof HTMLElement) {
        link.style.color = 'white';
        link.style.textDecoration = 'none';
        link.style.margin = '0 10px';
        link.style.fontWeight = 'bold';
        link.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
      }
    });
  }
  
  log('Navbar enhanced');
}
