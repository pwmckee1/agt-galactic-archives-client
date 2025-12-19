import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AgtPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#E8941A', // --color-primary
      600: '#D17A0A', // --color-primary-dark
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f4f4f4',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#3A3A3A', // --color-bg-surface-light
          400: '#2D2D2D', // --color-bg-surface
          500: '#1A1A1A', // --color-bg-secondary
          600: '#141414',
          700: '#0B0B0B', // --color-bg-primary
          800: '#050505',
          900: '#000000',
          950: '#000000'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f4f4f4',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#3A3A3A', // --color-bg-surface-light
          400: '#2D2D2D', // --color-bg-surface
          500: '#1A1A1A', // --color-bg-secondary
          600: '#141414',
          700: '#0B0B0B', // --color-bg-primary
          800: '#050505',
          900: '#000000',
          950: '#000000'
        }
      }
    },
    // Move custom tokens here to be recognized as --p-secondary and --p-accent
    secondary: '#C85A3A',
    accent: '#E63946'
  },
  shadow: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.5)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
    glow: '0 0 20px rgba(232, 148, 26, 0.3)'
  }
});
