import { COLORS } from '../config/colors';
import { log } from '../utils/logging';

export function injectGlobalStyles() {
  const style = document.createElement('style');
  style.id = 'grok-restyler-css';
  style.textContent = `
    /* Base Styles */
    body.antialiased {
      background: linear-gradient(135deg, ${COLORS.background1} 0%, ${COLORS.background2} 100%) !important;
      color: #FFFFFF !important;
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    }

    /* Fixed Navbar with proper positioning */
    .h-16.top-0, header, nav {
      background: linear-gradient(135deg, #6B48FF 0%, #1a1a2e 100%) !important;
      border-bottom: 2px solid #FF4F4D !important;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 64px !important;
      display: flex !important;
      align-items: center !important;
      z-index: 100 !important;
    }

    main, .flex-1 {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    }

    /* Ensure consistent background for input areas */
    .query-bar, form, .relative.w-full {
        // background: rgba(26, 26, 46, 0.7) !important;
        // backdrop-filter: blur(2.5px) !important;
        border-radius: 16px !important;
        margin-bottom: 20px !important;
    }

    /* input dropshadow is ugly so we are removing it */
    div.bg-background {
    background: transparent !important;
    }

    /* These selectors target code blocks directly for syntax highlighting */
    pre, code, .prose pre, .prose code {
    background: rgba(15, 15, 35, 0.7) !important;
    color-scheme: dark !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 16px !important;
    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2) !important;
    }

    /* These target the individual syntax elements */
    .token.comment, .token.prolog, .token.doctype, .token.cdata {
    color: #8292a2 !important;
    }

    .token.punctuation {
    color: #f8f8f2 !important;
    }

    .token.property, .token.tag, .token.constant, .token.symbol, .token.deleted {
    color: #f92672 !important;
    }

    .token.boolean, .token.number {
    color: #ae81ff !important;
    }

    .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted {
    color: #a6e22e !important;
    }

    .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
    color: #f8f8f2 !important;
    }

    .token.atrule, .token.attr-value, .token.keyword {
    color: #e6db74 !important;
    }

    .token.function, .token.class-name {
    color: #e6db74 !important;
    }

    /* Ensure proper spacing at bottom of page */
    .pb-40, .pb-32, .pb-24 {
        padding-bottom: 20px !important;
    }
    /* FIX: Only style parent container, not all nested elements */
    div.bg-background .prose {
      background: rgba(26, 26, 46, 0.6) !important;
      backdrop-filter: blur(2.5px) !important;
      padding: 20px !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25) !important;
      margin-bottom: 20px !important;
      border: 1px solid rgba(107, 72, 255, 0.15) !important;
      color: white !important;
    }
    
    /* CRITICAL: Reset background for all child elements */
    div.bg-background .prose > * {
      background: transparent !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
      margin: 1em 0 !important;
      backdrop-filter: none !important;
    }
    
    /* Make code blocks stand out better */
    .prose pre, pre {
      background: rgba(15, 15, 35, 0.7) !important;
      border: none !important;
      border-radius: 8px !important;
      padding: 16px !important;
      font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2) !important;
      margin: 1.5em 0 !important;
      overflow-x: auto !important;
    }
    
    /* Inline code */
    .prose code:not(pre code), code {
      // background: rgba(107, 72, 255, 0.2) !important;
      color: #ff8a80 !important;
      padding: 0.2em 0.4em !important;
      border-radius: 4px !important;
      font-size: 0.9em !important;
      font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
    }
    
    /* Enhanced typography for better readability */
    .prose p, p, div, span {
      line-height: 1.7 !important;
      font-size: 16px !important;
    }
    
    /* IMPORTANT: Force text color to white everywhere */
    // * {
    //   color: white !important;
    // }
    
    /* Enhanced headings with modern styling */
    .prose h1, .prose h2, .prose h3, .prose h4, h1, h2, h3, h4 {
      color: ${COLORS.grokNeon} !important;
      font-weight: 700 !important;
      letter-spacing: -0.02em !important;
      line-height: 1.3 !important;
    }
    
    .prose h1, h1 {
      font-size: 2em !important;
      margin: 0.5em 0 0.7em !important;
      background: linear-gradient(90deg, ${COLORS.grokNeon}, #E464FF) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      display: inline-block !important;
    }
    
    .prose h2, h2 {
      font-size: 1.5em !important;
      border-bottom: 1px solid rgba(107, 72, 255, 0.3) !important;
      padding-bottom: 0.3em !important;
      margin: 1.5em 0 0.8em !important;
    }
    
    /* Lists styling */
    .prose ul, .prose ol, ul, ol {
      padding-left: 1.5em !important;
      margin: 1em 0 1.5em !important;
    }
    
    .prose li, li {
      margin-bottom: 0.7em !important;
      position: relative !important;
    }
    
    .prose ul li::marker, ul li::marker {
      color: ${COLORS.grokPurple} !important;
    }
    
    /* Beautiful table styling */
    .prose table, table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      margin: 1.5em 0 !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      background: rgba(30, 30, 50, 0.7) !important;
    }
    
    .prose th, th {
      background: rgba(107, 72, 255, 0.3) !important;
      color: white !important;
      font-weight: 600 !important;
      text-align: left !important;
      padding: 12px 15px !important;
      border-bottom: 2px solid rgba(107, 72, 255, 0.5) !important;
    }
    
    .prose td, td {
      padding: 10px 15px !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    
    .prose tr:last-child td, tr:last-child td {
      border-bottom: none !important;
    }
    
    .prose tr:hover td, tr:hover td {
      background: rgba(107, 72, 255, 0.1) !important;
    }
    
    /* Blockquotes with style */
    .prose blockquote, blockquote {
      border-left: 4px solid ${COLORS.grokPurple} !important;
      padding-left: 1em !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      font-style: italic !important;
      color: rgba(255, 255, 255, 0.8) !important;
      position: relative !important;
    }
    
    .prose blockquote:before, blockquote:before {
      content: '"' !important;
      position: absolute !important;
      top: -0.5em !important;
      left: -0.2em !important;
      font-size: 3em !important;
      color: rgba(107, 72, 255, 0.2) !important;
      font-family: Georgia, serif !important;
    }
    
    /* Links with animation */
    .prose a, a {
      color: ${COLORS.grokNeon} !important;
      text-decoration: none !important;
      position: relative !important;
      transition: all 0.3s ease !important;
      padding: 0 2px !important;
    }
    
    .prose a:hover, a:hover {
      color: #FFFFFF !important;
      text-shadow: 0 0 8px ${COLORS.grokNeon} !important;
    }
    
    .prose a::after, a::after {
      content: '' !important;
      position: absolute !important;
      width: 100% !important;
      height: 1px !important;
      bottom: 0 !important;
      left: 0 !important;
      background: ${COLORS.grokNeon} !important;
      transform: scaleX(0) !important;
      transform-origin: right !important;
      transition: transform 0.3s ease !important;
    }
    
    .prose a:hover::after, a:hover::after {
      transform: scaleX(1) !important;
      transform-origin: left !important;
    }
    
    /* Enhanced scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: ${COLORS.background1};
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${COLORS.grokPurple};
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: ${COLORS.grokNeon};
    }
    
    /* Images with subtle effects */
    .prose img, img {
      max-width: 100% !important;
      border-radius: 8px !important;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25) !important;
      transition: transform 0.3s ease, box-shadow 0.3s ease !important;
    }
    
    .prose img:hover, img:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 8px 25px rgba(107, 72, 255, 0.25) !important;
    }

    /* FIX: Directly target DeepSearch and Think buttons */
    .button-DeepSearch,
    .button-Think,
    button[type="button"]:has(svg),
    button:has(.DeepSearchIcon),
    button:has(.ThinkIcon),
    div[role="button"]:has(svg),
    button.DeepSearchButton,
    button.ThinkButton {
      background: linear-gradient(135deg, #FF4F4D 0%, #DB3056 100%) !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: bold !important;
      box-shadow: 0 4px 12px rgba(255, 79, 77, 0.3) !important;
      transition: all 0.2s ease !important;
    }
    
    /* TARGET THE SPECIFIC BUTTONS IN THE INPUT AREA */
    form button,
    .query-bar button,
    button:has(span:contains("Think")),
    button:has(span:contains("Deep")),
    span:has(span:contains("Think")),
    span:has(span:contains("Deep")),
    [aria-label*="Think"] button,
    [aria-label*="Deep"] button {
      background: linear-gradient(135deg, #FF4F4D 0%, #DB3056 100%) !important;
      color: white !important;
      border: none !important;
      border-radius: 8px !important;
      font-weight: bold !important;
      box-shadow: 0 4px 12px rgba(255, 79, 77, 0.3) !important;
    }
    
    /* Target buttons by content more broadly */
    button, [role="button"] {
      border-radius: 8px !important;
      transition: all 0.2s ease !important;
    }
    
    /* FIX: Styled thinking bar with coral accents */
    .thinking, div[class*="thinking"] {
      background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(30, 30, 50, 0.8) 100%) !important;
      backdrop-filter: blur(5px) !important;
      border: 1px solid rgba(255, 79, 77, 0.3) !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 79, 77, 0.1) !important;
      color: white !important;
    }
    
    /* Apply a subtle coral glow to the thinking bar */
    .thinking::before, div[class*="thinking"]::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: radial-gradient(circle at center, rgba(255, 79, 77, 0.2) 0%, transparent 70%) !important;
      border-radius: 12px !important;
      z-index: -1 !important;
    }
    
    /* Target all form elements to ensure proper styling */
    form, textarea, input, button, [role="button"] {
      position: relative !important;
      z-index: 10 !important;
    }
    
    textarea, input {
      // background: rgba(26, 26, 46, 0.7) !important;
      color: white !important;
      // border: 1px solid rgba(107, 72, 255, 0.3) !important;
    }
    
    /* Think mode pulse animation */
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(255, 79, 77, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(255, 79, 77, 0); }
      100% { box-shadow: 0 0 0 0 rgba(255, 79, 77, 0); }
    }
    
    [data-grok-thinking="true"] .grok-nav-glow {
      animation: pulse 1.5s infinite;
    }
    
    [data-grok-thinking="true"] button[type="submit"] {
      animation: pulse 1.5s infinite;
    }
  `;

  document.head.appendChild(style);
  log('Global styles injected with award-worthy design');
}
