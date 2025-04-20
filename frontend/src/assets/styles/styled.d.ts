// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      darkBackground: string;
      text: string;
      lightText: string;
      success: string;
      warning: string;
      danger: string;
      info: string;
      borderColor: string;
      cardBg: string;
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeights: {
      hairline: number;
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
    lineHeights: {
      normal: string;
      none: number;
      shorter: number;
      short: number;
      base: number;
      tall: number;
      taller: number;
    };
    space: {
      px: string;
      '0': string;
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '5': string;
      '6': string;
      '8': string;
      '10': string;
      '12': string;
      '16': string;
      '20': string;
      '24': string;
      '32': string;
      '40': string;
      '48': string;
      '56': string;
      '64': string;
    };
    sizes: {
      full: string;
      '3xs': string;
      '2xs': string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    radii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      full: string;
    };
    shadows: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
      outline: string;
      none: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    gradients: {
      primary: string;
      secondary: string;
      blueOrange: string;
    };
    transitions: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
    };
  }
}