import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//import screen
import Home from "@screens/Home";
import MovieList from "@screens/movie/MovieList";
import LiveTVList from "@screens/liveTV/LiveTVList";
import SeriesList from "@screens/series/SeriesList";
import FavouriteList from "@screens/favourite/FavouriteList";
import { AppContext } from "@screens/context/AppContext";
//import color
import Colors from "@styles/Colors";
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { isDarkTheme, setDarkTheme } = useContext(AppContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: "#ffff" }}
    >
      <Tab.Screen
        name="Home Screen"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={
                focused
                  ? isDarkTheme
                    ? "#bab9b5"
                    : Colors.active_color
                  : Colors.inactive_color
              }
              size={26}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MovieList"
        component={MovieList}
        options={{
          tabBarLabel: "Movies",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="movie"
              color={
                focused
                  ? isDarkTheme
                    ? "#bab9b5"
                    : Colors.active_color
                  : Colors.inactive_color
              }
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Live TV"
        component={LiveTVList}
        options={{
          tabBarLabel: "Live TV",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="remote-tv"
              color={
                focused
                  ? isDarkTheme
                    ? "#bab9b5"
                    : Colors.active_color
                  : Colors.inactive_color
              }
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Series"
        component={SeriesList}
        options={{
          tabBarLabel: "Series",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="playlist-play"
              color={
                focused
                  ? isDarkTheme
                    ? "#bab9b5"
                    : Colors.active_color
                  : Colors.inactive_color
              }
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteList"
        component={FavouriteList}
        options={{
          tabBarLabel: "Favourite",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="heart"
              color={
                focused
                  ? isDarkTheme
                    ? "#bab9b5"
                    : Colors.active_color
                  : Colors.inactive_color
              }
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
