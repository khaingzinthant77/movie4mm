import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import screen
import BottomNavigator from "./BottomNavigator";
import Login from "@screens/auth/Login";
import MovieList from "@screens/movie/MovieList";
import SeriesList from "@screens/series/SeriesList";
import LiveTVList from "@screens/liveTV/LiveTVList";
import GenreList from "@screens/genre/GenreList";
import CountryList from "@screens/country/CountryList";
import Profile from "@screens/auth/Profile";

import MovieByGenre from "@screens/genre/MovieByGenre";
import MovieByStar from "@screens/star/MovieByStar";
import CurrentYearMovie from "@screens/movie/CurrentYearMovie";
import FourKMovie from "@screens/movie/FourKMovie";
import LatestList from "@screens/movie/LatestList";
import FavouriteList from "@screens/favourite/FavouriteList";
import SettingList from "@screens/setting/SettingList";
import MovieDetail from "@screens/movie/MovieDetail";
import ChannelList from "@screens/liveTV/ChannelList";
import LiveDetail from "@screens/liveTV/LiveDetail";
import Subscription from "@screens/auth/Subscription";
import MoviePlayer from "@screens/movie/MoviePlayer";
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="BottomNavigator"
      component={BottomNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
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
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieByGenre"
      component={MovieByGenre}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieByStar"
      component={MovieByStar}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CurrentYearMovie"
      component={CurrentYearMovie}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FourKMovie"
      component={FourKMovie}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LatestList"
      component={LatestList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FavouriteList"
      component={FavouriteList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SettingList"
      component={SettingList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChannelList"
      component={ChannelList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LiveDetail"
      component={LiveDetail}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Subscription"
      component={Subscription}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MoviePlayer"
      component={MoviePlayer}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default StackNavigator;
