import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigations/Tabs';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useAssets } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontsLoaded] = useFonts({
    Jua: require('./assets/fonts/Jua-Regular.ttf'),
    NotoSans: require('./assets/fonts/NotoSansKR-VariableFont_wght.ttf'),
  });

  const [assetsLoaded] = useAssets([require('./assets/logo.png')]);

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded && assetsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  });

  if (!fontsLoaded || !assetsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;
