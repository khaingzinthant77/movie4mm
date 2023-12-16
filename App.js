import React, { useState, useMemo, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import DrawerNavigator from "@navigators/DrawerNavigator";
import * as Font from "expo-font";
import { MenuProvider } from "react-native-popup-menu";
//import theme
import DefaultTheme from "@screens/theme/DefaultTheme";
import DarkThem from "@screens/theme/DarkTheme";
import { AppContext } from "@screens/context/AppContext";

export default function App() {
  const [isDarkTheme, setDarkTheme] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        let primaryFont = require("@fonts/myanmar-sagar.ttf");
        let primaryFontBold = require("@fonts/myanmar-sagar.ttf");
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Primary-Font": primaryFont,
          "Primary-Font-Bold": primaryFontBold,
          "Eng-Font": require("@fonts/Roboto-Regular.ttf"),
          "Eng-Font-Bold": require("@fonts/Roboto-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const appContext = useMemo(() => {
    return { isDarkTheme, setDarkTheme };
  });
  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer theme={isDarkTheme ? DarkThem : DefaultTheme}>
      <AppContext.Provider value={appContext}>
        <DrawerNavigator />
      </AppContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
