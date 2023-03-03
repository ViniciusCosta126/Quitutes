import {ThemeProvider} from 'styled-components'
import theme from './src/Global/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { ListRoutes } from './src/Routes/routes';
import ProdutosProvider from './src/context/authContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <ProdutosProvider>
        <ThemeProvider theme={theme}>
          <ListRoutes/>
        </ThemeProvider>
      </ProdutosProvider>
    </NavigationContainer>
  );
}

