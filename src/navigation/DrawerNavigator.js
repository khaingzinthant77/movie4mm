import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="StackNavigator"
      component={StackNavigator}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
