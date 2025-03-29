import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'src/panda',
  // Add global styles here
  globalCss: {
    'html, body': {
      background: '{colors.grokDark} !important',
      color: 'white !important',
      fontFamily: '{fonts.main}',
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          grokDark: { value: '#1a1a2e' },
          grokPurple: { value: '#6b48ff' },
          grokNeon: { value: '#00ffcc' },
        },
        fonts: {
          main: { value: "'Inter', sans-serif" },
          mono: { value: "monospace" }
        },
        sizes: {
          prose: { value: '80ch' }
        }
      },
      semanticTokens: {
        spacing: {
          'prose': { value: '{sizes.prose}' }
        }
      }
    }
  }
});
