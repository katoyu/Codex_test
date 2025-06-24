import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6ffff',
      100: '#b2ffff',
      200: '#9ae9e9',
      300: '#7ad7d7',
      400: '#5dc4c4',
      500: '#40b1b1',
      600: '#319292',
      700: '#237373',
      800: '#154444',
      900: '#072626',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
      },
    },
  },
});

export default theme;
