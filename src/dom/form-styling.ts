import { COLORS } from '../config/colors';
import { log } from '../utils/logging';

export function stylePandaInputForm() {
  log('Applying Panda-like styling to Grok input form');
  
  // Target the main query form container
  const queryForm = document.querySelector('form, .flex.flex-col-reverse form');
  if (queryForm instanceof HTMLElement) {
    queryForm.style.maxWidth = '900px';
    queryForm.style.margin = '0 auto';
    
    // Apply styles to the textbox directly
    const textarea = document.querySelector('textarea');
    if (textarea instanceof HTMLElement) {
      textarea.style.backgroundColor = 'rgba(26, 26, 46, 0.7)';
      textarea.style.backdropFilter = 'blur(12px)';
      textarea.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.07)';
      textarea.style.borderRadius = '16px';
      textarea.style.border = '1px solid rgba(107, 72, 255, 0.3)';
      textarea.style.transition = 'all 0.3s ease';
      textarea.style.color = 'white';
      textarea.style.fontSize = '16px';
      textarea.style.padding = '18px';
      textarea.style.fontFamily = '"Inter", system-ui, -apple-system, sans-serif';
      textarea.style.lineHeight = '1.5';
    }
    
    // Style all buttons more specifically
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      if (button instanceof HTMLElement) {
        // Skip buttons that might be in the navbar
        if (button.closest('header') || button.closest('nav')) return;
        
        button.style.borderRadius = '8px';
        button.style.padding = '10px 18px';
        button.style.margin = '0 5px';
        
        // Style Think button
        if (button.textContent?.includes('Think')) {
          button.style.background = 'linear-gradient(135deg, #FF4F4D 0%, #DB3056 100%)';
          button.style.color = 'white';
          button.style.fontWeight = 'bold';
        }
        
        // Style DeepSearch button
        if (button.textContent?.includes('Deep')) {
          button.style.background = 'linear-gradient(135deg, #FF4F4D 0%, #DB3056 100%)';
          button.style.color = 'white';
          button.style.fontWeight = 'bold';
        }
      }
    });
  }
  
  log('Form styling applied');
}
