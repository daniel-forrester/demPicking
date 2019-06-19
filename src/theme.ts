import { DefaultTheme, Colors } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.blueGrey800,
    accent: '#feba31',
    light: '#62727b',
    dark: '#102027',
  },
};

const useTheme = () => {
  return theme;
};

export default theme;
export { useTheme };
