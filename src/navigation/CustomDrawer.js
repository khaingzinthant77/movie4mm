import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Switch, Divider } from "react-native-paper";
import { AppContext } from "@screens/context/AppContext";
import Colors from "@styles/Colors";
import Fonts from "@styles/Fonts";
// Custom Drawer Content Component
const CustomDrawer = ({ navigation }) => {
  const { isDarkTheme, setDarkTheme } = useContext(AppContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isActiveHome, setActiveHome] = useState(true);
  const [isActiveMovie, setActiveMovie] = useState(false);
  const [isActiveSerie, setActiveSerie] = useState(false);
  const [isActiveLive, setActiveLive] = useState(false);
  const [isActiveGenre, setActiveGenre] = useState(false);
  const [isActiveCountry, setActiveCountry] = useState(false);
  const [isActiveProfile, setActiveProfile] = useState(false);
  const [isActiveFavourite, setActiveFavourite] = useState(false);
  const [isActiveSetting, setActiveSetting] = useState(false);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    getAsyncData();
  }, []);
  getAsyncData = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    setUserID(user_id);
  };
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setDarkTheme((current) => !current);
  };
  const onPressHome = () => {
    setActiveHome(true);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("BottomNavigator");
  };
  const onPressMovie = () => {
    setActiveHome(false);
    setActiveMovie(true);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("MovieList");
  };
  const onPressSeries = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(true);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("SeriesList");
  };
  const onPressLive = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(true);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("LiveTVList");
  };
  const onPressGenre = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(true);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("GenreList");
  };
  const onPressCountry = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(true);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("CountryList");
  };
  const onPressProfile = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(true);
    setActiveFavourite(false);
    setActiveSetting(false);
    navigation.navigate("Profile");
  };
  const onPressFavourite = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(true);
    setActiveSetting(false);
    navigation.navigate("FavouriteList");
  };
  const onPressSetting = () => {
    setActiveHome(false);
    setActiveMovie(false);
    setActiveSerie(false);
    setActiveLive(false);
    setActiveGenre(false);
    setActiveCountry(false);
    setActiveProfile(false);
    setActiveFavourite(false);
    setActiveSetting(true);
    navigation.navigate("SettingList");
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: isDarkTheme ? "#4a4a49" : "#33b6ef" }}
      />
      <ScrollView>
        <View
          style={[
            styles.header,
            { backgroundColor: isDarkTheme ? "#4a4a49" : "#33b6ef" },
          ]}
        >
          <Image
            source={require("@images/logo.png")}
            style={{ marginTop: 10 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginTop: 10,
              fontFamily: Fonts.primary,
            }}
          >
            movie4mm - Live TV & Movie
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveHome
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    marginTop: 10,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressHome()}
            activeOpacity={0.8}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="home"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveHome
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Home
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveMovie
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressMovie()}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="movie"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveMovie
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Movies
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveSerie
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressSeries()}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="playlist-play"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveSerie
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Series
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveLive
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressLive()}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="remote-tv"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveLive
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Live TV
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveGenre
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressGenre()}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="folder"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveGenre
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Genre
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.row_container,
              isActiveCountry
                ? {
                    backgroundColor: Colors.drawer_active_color,
                    borderRadius: 5,
                  }
                : null,
            ]}
            onPress={() => onPressCountry()}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="flag"
                size={20}
                color={Colors.theme_color}
              />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme
                    ? isActiveCountry
                      ? Colors.drawer_dark_color
                      : "white"
                    : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Country
              </Text>
            </View>
          </TouchableOpacity>
          {userID ? (
            <TouchableOpacity
              style={[
                styles.row_container,
                isActiveProfile
                  ? {
                      backgroundColor: Colors.drawer_active_color,
                      borderRadius: 5,
                    }
                  : null,
              ]}
              onPress={() => onPressProfile()}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwsome name="user" size={20} color={Colors.theme_color} />
                <Text
                  style={{
                    marginLeft: 30,
                    color: isDarkTheme
                      ? isActiveProfile
                        ? Colors.drawer_dark_color
                        : "white"
                      : "gray",
                    fontFamily: Fonts.primary,
                  }}
                >
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.row_container,
                isActiveProfile
                  ? {
                      backgroundColor: Colors.drawer_active_color,
                      borderRadius: 5,
                    }
                  : null,
              ]}
              onPress={() => {
                navigation.navigate("Login");
              }}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="login" size={20} color={Colors.theme_color} />
                <Text
                  style={{
                    marginLeft: 30,
                    color: isDarkTheme
                      ? isActiveProfile
                        ? Colors.drawer_dark_color
                        : "white"
                      : "gray",
                    fontFamily: Fonts.primary,
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {userID ? (
            <TouchableOpacity
              style={[
                styles.row_container,
                isActiveFavourite
                  ? {
                      backgroundColor: Colors.drawer_active_color,
                      borderRadius: 5,
                    }
                  : null,
              ]}
              onPress={() => onPressFavourite()}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="heart"
                  size={20}
                  color={Colors.theme_color}
                />
                <Text
                  style={{
                    marginLeft: 30,
                    color: isDarkTheme
                      ? isActiveFavourite
                        ? Colors.drawer_dark_color
                        : "white"
                      : "gray",
                    fontFamily: Fonts.primary,
                  }}
                >
                  Favourite
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {userID == null ? (
            <TouchableOpacity
              style={[
                styles.row_container,
                isActiveSetting
                  ? {
                      backgroundColor: Colors.drawer_active_color,
                      borderRadius: 5,
                    }
                  : null,
              ]}
              onPress={() => onPressSetting()}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fontisto
                  name="player-settings"
                  size={20}
                  color={Colors.theme_color}
                />
                <Text
                  style={{
                    marginLeft: 30,
                    color: isDarkTheme
                      ? isActiveSetting
                        ? Colors.drawer_dark_color
                        : "white"
                      : "gray",
                    fontFamily: Fonts.primary,
                  }}
                >
                  Setting
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {userID ? (
            <TouchableOpacity style={styles.row_container}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="logout" size={20} color={Colors.theme_color} />
                <Text
                  style={{
                    marginLeft: 30,
                    color: isDarkTheme ? "white" : "gray",
                    fontFamily: Fonts.primary,
                  }}
                >
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          <View style={styles.row_container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Entypo name="moon" size={20} color={Colors.theme_color} />
              <Text
                style={{
                  marginLeft: 30,
                  color: isDarkTheme ? "white" : "gray",
                  fontFamily: Fonts.primary,
                }}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              trackColor={{ true: Colors.inactive_color, false: "grey" }}
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 120,
    // marginBottom: 30,
    alignItems: "center",
  },
  row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
export default CustomDrawer;
