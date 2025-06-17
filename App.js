import React, { useEffect, useState } from "react";
import { LogBox, View, Text, Alert } from 'react-native';
import * as Updates from 'expo-updates';
import * as SplashScreen from 'expo-splash-screen';
import Nav from "./Nav";
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import NetInfo from "@react-native-community/netinfo";
import Nointernetoverlay from "./src/Components/nointernet";
import Updateappspinner from "./src/Components/updateapp";
import { Fetchappsettingsurl } from "./src/Utils/urls";
import axios from "axios";

const appConfig = require('./app.json')
const appVersion = appConfig?.expo?.version;



// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();



const App = () => {
  LogBox.ignoreAllLogs(true)

  const [appIsReady, setAppIsReady] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [outdatedapp, setoutdatedapp] = useState(false);



  const [loaded] = useFonts({
    Boldfont: require('./assets/fonts/Lato-Bold.ttf'),
    Lightfont: require('./assets/fonts/Lato-Light.ttf'),
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [refresh]);

  useEffect(() => {
    fetchappsettings()
  }, [refresh]);



  useEffect(() => {
    const prepareApp = async () => {
      const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
      const updateCheck = async () => {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            Alert.alert(
              "Update Available",
              "Please restart your app to apply the latest updates.",
              [{ text: "OK", onPress: () => Updates.reloadAsync() }]
            );
          }
        } catch (error) {
          console.warn("Error during update check:", error);
        }
      };

      await Promise.race([updateCheck(), timeout]);

      setAppIsReady(true);
      await SplashScreen.hideAsync();
    };

    prepareApp();

  }, []);

  //fetch app settings
  const fetchappsettings = () => {
    axios.post(Fetchappsettingsurl).then((response) => {
      const currentversion = response.data?.appversion
      if (currentversion > appVersion) {
        setoutdatedapp(true)
      } else {
        setoutdatedapp(false)
      }
    })
  }



  return (
    appIsReady &&
    <NativeBaseProvider>
        {outdatedapp && <Updateappspinner />}
        {!isConnected && <Nointernetoverlay getconnection={() => setrefresh(!refresh)} />}
        <Nav />
    </NativeBaseProvider>
  );
};

export default App;
