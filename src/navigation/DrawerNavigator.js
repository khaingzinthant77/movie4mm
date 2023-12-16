import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import MovieList from "../screens/movie/MovieList";
//import component
import CustomDrawer from "./CustomDrawer";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen
      name="Home"
      component={StackNavigator}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
