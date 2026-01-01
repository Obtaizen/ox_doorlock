import { MantineThemeOverride } from '@mantine/core';

export const customTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  primaryColor: 'cyan',
  primaryShade: 5,
  defaultRadius: 'md',
  headings: {
    fontWeight: 600,
    fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  colors: {
    dark: ['#C5CEDB', '#AEB8C9', '#97A2B8', '#808CA7', '#6A7694', '#55607D', '#3D4A64', '#26344A', '#152133', '#0c111b'],
  },
  shadows: {
    sm: '0 10px 30px rgba(0, 0, 0, 0.25)',
    md: '0 20px 50px rgba(0, 0, 0, 0.35)',
  },
  components: {
    Tooltip: {
      defaultProps: {
        transition: 'pop',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
        shadow: 'md',
      },
    },
  },
};
