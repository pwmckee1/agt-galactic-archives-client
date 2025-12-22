import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AgtPreset = definePreset(Aura, {
  components: {
    inputgroup: {
      colorScheme: {
        light: {
          addon: {
            background: '{surface.500}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
        },
        dark: {
          addon: {
            background: '{surface.500}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            color: '{primary.500}',
            disabledBackground: '{surface.700}',
            disabledColor: '{primary.700}',
            borderColor: '{primary.500}',
            placeholderColor: '{surface.200}',
            hoverBorderColor: '{secondary}',
            focusBorderColor: '{primary.500}',
            filledBackground: '{surface.700}',
            filledHoverBackground: '{surface.400}',
            filledFocusBackground: '{surface.700}',
          },
        },
        dark: {
          root: {
            background: '{surface.700}',
            color: '{primary.500}',
            disabledBackground: '{surface.700}',
            disabledColor: '{primary.700}',
            borderColor: '{primary.500}',
            placeholderColor: '{surface.200}',
            hoverBorderColor: '{secondary}',
            focusBorderColor: '{primary.500}',
            filledBackground: '{surface.700}',
            filledHoverBackground: '{surface.400}',
            filledFocusBackground: '{surface.700}',
          }
        },
      }
    },
    datepicker: {
      colorScheme: {
        light: {
          inputIcon: {
            color: '{primary.500}',
          },
          panel: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          header: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          selectMonth: {
            color: '{primary.500}',
            hoverBackground: '{primary.500}',
          },
          selectYear: {
            color: '{primary.500}',
            hoverBackground: '{primary.500}',
          },
          group: {
            borderColor: '{primary.500}',
          },
          weekDay: {
            color: '{primary.500}',
          },
          date: {
            color: '{primary.500}',
            selectedColor: '{surface.0}',
            hoverColor: '{surface.700}',
            hoverBackground: '{accent}',
            selectedBackground: '{primary.500}',
            rangeSelectedColor: '{surface.0}',
          },
          buttonbar: {
            borderColor: '{primary.500}',
          },
          today: {
            background: '{primary.500}',
            color: '{surface.0}',
          },
          dropdown: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
            hoverBorderColor: '{secondary}',
          }
        },
        dark: {
          inputIcon: {
            color: '{primary.500}',
          },
          panel: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          header: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          selectMonth: {
            color: '{primary.500}',
            hoverBackground: '{primary.500}',
          },
          selectYear: {
            color: '{primary.500}',
            hoverBackground: '{primary.500}',
          },
          group: {
            borderColor: '{primary.500}',
          },
          weekDay: {
            color: '{primary.500}',
          },
          date: {
            color: '{primary.500}',
            selectedColor: '{surface.0}',
            hoverColor: '{surface.700}',
            hoverBackground: '{accent}',
            selectedBackground: '{primary.500}',
            rangeSelectedColor: '{surface.0}',
          },
          buttonbar: {
            borderColor: '{primary.500}',
          },
          today: {
            background: '{primary.500}',
            color: '{surface.0}',
          },
          dropdown: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
            hoverBorderColor: '{secondary}',
          }
        }
      }
    },
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
            secondary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
          },
          text: {
            primary: {
              color: '{surface.0}',
              hoverBackground: '{accent}',
              activeBackground: '{primary.500}',
            },
            secondary: {
              color: '{surface.0}',
              hoverBackground: '{accent}',
              activeBackground: '{primary.500}',
            },
          },
        },
        dark: {
          root: {
            primary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
            secondary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
          },
          text: {
            primary: {
              color: '{surface.0}',
              hoverBackground: '{accent}',
              activeBackground: '{primary.500}',
            },
            secondary: {
              color: '{surface.0}',
              hoverBackground: '{accent}',
              activeBackground: '{primary.500}',
            },
          },
        },
      },
    },
    buttonicon: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
          },
        },
        dark: {
          root: {
            primary: {
              background: '{surface.700}',
              borderColor: '{primary.500}',
              color: '{primary.500}',
              hoverBorderColor: '{accentMuted}',
              hoverBackground: '{accentMuted}',
              hoverColor: '{surface.500}',
            },
          },
        },
      },
    },
    checkbox: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            filledBackground: '{surface.700}',
            checkedBackground: '{surface.700}',
            checkedHoverBackground: '{surface.700}',
            borderColor: '{primary.500}',
            hoverBorderColor: '{primary.500}',
            checkedBorderColor: '{accentMuted}',
          },
        },
        dark: {
          root: {
            background: '{surface.700}',
            filledBackground: '{surface.700}',
            checkedBackground: '{surface.700}',
            checkedHoverBackground: '{surface.700}',
            borderColor: '{primary.500}',
            hoverBorderColor: '{primary.500}',
            checkedBorderColor: '{accentMuted}',
          },
        },
      },
    },
    iconfield: {
      colorScheme: {
        light: {
          icon: {
            color: '{primary.500}',
          }
        },
      },
    },
    select: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            disabledBackground: '{surface.700}',
            disabledColor: '{primary.700}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
            hoverBorderColor: '{accentMuted}',
            filledBackground: '{accentMuted}',
            filledHoverBackground: '{accentMuted}',
            filledFocusBackground: '{accentMuted}',
          },
          dropdown: {
            color: '{primary.500}',
          },
          overlay: {
            background: '{surface.500}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
          },
          option: {
            color: '{primary.500}',
            selectedColor: '{surface.700}',
            selectedBackground: '{accentMuted}',
            selectedFocusColor: '{surface.700}',
            selectedFocusBackground: '{accentMuted}',
            focusBackground: '{primary.500}',
            focusColor: '{surface.0}',
          }
        },
        dark: {
          root: {
            background: '{surface.700}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
            hoverBorderColor: '{accentMuted}',
            filledBackground: '{accentMuted}',
            filledHoverBackground: '{accentMuted}',
            filledFocusBackground: '{accentMuted}',
          },
          dropdown: {
            color: '{primary.500}',
          },
          overlay: {
            background: '{surface.500}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
          },
          option: {
            color: '{primary.500}',
            selectedColor: '{surface.700}',
            selectedBackground: '{accentMuted}',
            selectedFocusColor: '{surface.700}',
            selectedFocusBackground: '{accentMuted}',
            focusBackground: '{primary.500}',
            focusColor: '{surface.0}',
          }
        },
      },
    },
    floatlabel: {
      colorScheme: {
        light: {
          root: {
            color: '{surface.200}',
            activeColor: '{primary.500}',
          },
        },
      },
    },
    fileupload: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          header: {
            background: '{surface.700}',
            color: '{primary.500}',
            borderColor: '{primary.500}',
          },
          content: {
            highlightBorderColor: '{primary.500}',
          },
          file: {
            borderColor: '{primary.500}',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            color: '{primary.500}',
            disabledBackground: '{surface.700}',
            disabledColor: '{primary.700}',
            borderColor: '{primary.500}',
            placeholderColor: '{surface.200}',
            hoverBorderColor: '{secondary}',
            focusBorderColor: '{primary.500}',
            filledBackground: '{surface.700}',
            filledHoverBackground: '{surface.400}',
            filledFocusBackground: '{surface.700}',
          },
        },
        dark: {
          root: {
            background: '{surface.700}',
            color: '{primary.500}',
            disabledBackground: '{surface.700}',
            disabledColor: '{primary.700}',
            borderColor: '{primary.500}',
            placeholderColor: '{surface.200}',
            hoverBorderColor: '{secondary}',
            focusBorderColor: '{primary.500}',
            filledBackground: '{surface.700}',
            filledHoverBackground: '{surface.400}',
            filledFocusBackground: '{surface.700}',
          },
        },
      },
    },
    multiselect: {
      colorScheme: {
        light: {
          root: {
            background: '{surface.700}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
            hoverBorderColor: '{accentMuted}',
            filledBackground: '{accentMuted}',
            filledHoverBackground: '{accentMuted}',
            filledFocusBackground: '{accentMuted}',
            placeholderColor: '{surface.200}',
          },
          dropdown: {
            color: '{primary.500}',
          },
          overlay: {
            background: '{surface.500}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
          },
          option: {
            color: '{primary.500}',
            selectedColor: '{surface.700}',
            selectedBackground: '{accentMuted}',
            selectedFocusColor: '{surface.700}',
            selectedFocusBackground: '{accentMuted}',
            focusBackground: '{primary.500}',
            focusColor: '{surface.0}',
          }
        },
        dark: {
          root: {
            background: '{surface.700}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
            hoverBorderColor: '{accentMuted}',
            filledBackground: '{accentMuted}',
            filledHoverBackground: '{accentMuted}',
            filledFocusBackground: '{accentMuted}',
          },
          dropdown: {
            color: '{primary.500}',
          },
          overlay: {
            background: '{surface.500}',
            borderColor: '{primary.500}',
            color: '{primary.500}',
          },
          option: {
            color: '{primary.500}',
            selectedColor: '{surface.700}',
            selectedBackground: '{accentMuted}',
            selectedFocusColor: '{surface.700}',
            selectedFocusBackground: '{accentMuted}',
            focusBackground: '{primary.500}',
            focusColor: '{surface.0}',
          }
        },
      },
    },
    breadcrumb: {
      root: {
        background: '{surface.700}',
      },
      item: {
        color: '{primary.500}',
        hoverColor: '{accent}',
        icon: {
          color: '{primary.500}',
          hoverColor: '{accent}',
        },
      },
      separator: {
        color: '{primary.500}',
      },
    },
  },
  semantic: {
    // Custom tokens
    secondary: '#eb5a2c',
    accent: '#E63946',
    accentMuted: '#c2373f',
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#E8941A', // $color-primary
      600: '#D17A0A', // $color-primary-muted
      700: '#b45309', // $color-border-accent
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',   // $color-text-primary
          50: '#f4f4f4',
          100: '#e8e8e8', // $color-text-muted
          200: '#7d7e7c', // $color-text-muted
          300: '#3A3A3A', // $color-surface-700
          400: '#2D2D2D', // $color-surface-800
          500: '#1A1A1A', // $color-surface-900
          600: '#191919', // $color-surface-800-dark
          700: '#0B0B0B', // $color-surface-950
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
          600: '#141414', // $color-border
          700: '#0B0B0B', // --color-bg-primary
          800: '#050505',
          900: '#000000',
          950: '#000000'
        }
      }
    },
  },
});
