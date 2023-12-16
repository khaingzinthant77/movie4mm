import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import screen
import BottomNavigator from "./BottomNavigator";
import MovieList from "@screens/movie/MovieList";
import SeriesList from "@screens/series/SeriesList";
import LiveTVList from "@screens/liveTV/LiveTVList";
import GenreList from "@screens/genre/GenreList";
import CountryList from "@screens/country/CountryList";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BottomNavigator"
      component={BottomNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieList"
      component={MovieList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SeriesList"
      component={SeriesList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LiveTVList"
      component={LiveTVList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="GenreList"
      component={GenreList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CountryList"
      component={CountryList}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default StackNavigator;
