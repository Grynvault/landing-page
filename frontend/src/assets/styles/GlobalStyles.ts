import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    font-family: ${theme.fonts.body};
    font-size: 16px;
    line-height: ${theme.lineHeights.base};
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.bold};
    line-height: ${theme.lineHeights.shorter};
    margin-bottom: ${theme.space[4]};
    color: ${theme.colors.text};
  }

  h1 {
    font-size: ${theme.fontSizes['4xl']};
  }

  h2 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h4 {
    font-size: ${theme.fontSizes.xl};
  }

  h5 {
    font-size: ${theme.fontSizes.lg};
  }

  h6 {
    font-size: ${theme.fontSizes.md};
  }

  p {
    margin-bottom: ${theme.space[4]};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.easeInOut};

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
  }

  ul, ol {
    margin-bottom: ${theme.space[4]};
    padding-left: ${theme.space[6]};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background-color: ${theme.colors.primary};
    color: white;
  }

  /* Custom scroll bar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.cardBg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.secondary};
    border-radius: ${theme.radii.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary};
  }
`;

export default GlobalStyles;