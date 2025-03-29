import { log } from '../utils/logging';

export function setupDomObserver(callback: () => void) {
  const observer = new MutationObserver(() => {
    if (!document.querySelector('[data-grok-styled]')) {
      callback();
    }
  });
  
  window.addEventListener('load', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  
  log('DOM observer initialized');
}
