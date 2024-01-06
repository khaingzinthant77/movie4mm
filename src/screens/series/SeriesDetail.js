import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRoute, useTheme, useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import axios from "axios";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import icon
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
//import url
import {
  movieDetailApi,
  addFavouriteApi,
  removeFavouriteApi,
} from "@apis/Urls";
import { API_KEY } from "@env";
//import font
import Fonts from "@styles/Fonts";
import { Divider } from "react-native-paper";
//import color
import Colors from "@styles/Colors";
const SeriesDetail = () => {
  const route = new useRoute();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [thumbnail_url, setThumbnailUrl] = useState(null);
  const [poster_url, setPosterUrl] = useState(null);
  const [user_id, setUserID] = useState("");
  const [title, setTitle] = useState(null);
  const [release, setRelease] = useState(null);
  const [description, setDescription] = useState(null);
  const [genres, setGenre] = useState([]);
  const [cast_and_crew, setCastAndCrew] = useState([]);
  const [season, setSeason] = useState([]);
  const [seasonsData, setSeasonsData] = useState([]);
  const [filteredSeason, setFilteredSeason] = useState(null);
  const [related_tvseries, setRelatedTVSeries] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [is_fav, setFav] = useState(false);
  const [is_play, setPlay] = useState(false);
  const [url, setUrl] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [videoStatus, setVideoStatus] = useState({});
  const video = React.useRef(null);

  const [value, setValue] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    fetchData();
    alreadyFav();
  }, []);

  const fetchData = async () => {
    let url = movieDetailApi + "?type=tvseries&id=" + route.params.id;
    setUserID(await AsyncStorage.getItem("user_id"));
    setLoading(true);
    axios
      .get(url, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then((response) => {
        setLoading(false);
        setThumbnailUrl(response.data.thumbnail_url);
        setPosterUrl(response.data.poster_url);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setRelease(response.data.release);
        setGenre(response.data.genre);
        setCastAndCrew(response.data.cast_and_crew);
        setSeasonsData(response.data.season);
        setRelatedTVSeries(response.data.related_tvseries);
        var arr = [];
        response.data.season.map((data, index) => {
          var obj = {
            label: "Season: " + data.seasons_name,
            value: data.seasons_id,
          };
          arr.push(obj);
        });

        setSeason(arr);
        setValue({
          label: response.data.season[0].seasons_name,
          value: response.data.season[0].seasons_id,
        });
        // console.log(response_season[0].seasons_id);
        const filteredSeasonData = response.data.season.find(
          (season) => season.seasons_id === response.data.season[0].seasons_id
        );

        // Set the filtered season in the state
        setFilteredSeason(filteredSeasonData);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Movie Detail API", error);
      });
  };
  const genreNames = genres.map((genre) => genre.name).join(", ");
  alreadyFav = () => {
    let url =
      addFavouriteApi + `?user_id=${user_id}&videos_id=${route.params.id}`;
    axios
      .get(url, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status == false) {
          setFav(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Movie Detail API", error);
      });
  };
  addFavourite = () => {
    let url =
      addFavouriteApi + `?user_id=${user_id}&videos_id=${route.params.id}`;
    axios
      .get(url, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then((response) => {
        setFav(true);
        alert(response.data.message);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Movie Detail API", error);
      });
  };
  removeFavourite = () => {
    let url =
      removeFavouriteApi + `?user_id=${user_id}&videos_id=${route.params.id}`;

    axios
      .get(url, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then((response) => {
        setFav(false);
        alert(response.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Movie Detail API", error);
      });
  };

  go_back = () => {
    videoStatus.isPlaying
      ? video.current.pauseAsync()
      : video.current.playAsync();
    navigation.goBack();
  };

  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  handleSeason = (item) => {
    setValue(item.value);
    setIsFocus(false);
    const filteredSeasonData = seasonsData.find(
      (season) => season.seasons_id === item.value
    );

    // Set the filtered season in the state
    setFilteredSeason(filteredSeasonData);
  };

  const handleEpisode = (id, file_url) => {
    setActiveCard(id === activeCard ? null : id);
    setUrl(file_url);
    setPlay(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView />
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={Colors.activeColor} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 20 }}>
            {is_play ? (
              <View>
                <TouchableOpacity
                  onPress={() => go_back()}
                  style={{ marginBottom: 10, marginLeft: 5 }}
                >
                  <Ionicons name="arrow-back" size={30} color={colors.text} />
                </TouchableOpacity>
                <Video
                  ref={video}
                  source={{
                    uri: url,
                  }}
                  resizeMode="cover"
                  shouldPlay
                  onFullscreenUpdate={setOrientation}
                  useNativeControls
                  style={{ width: Dimensions.get("window").width, height: 200 }}
                  onPlaybackStatusUpdate={(status) =>
                    setVideoStatus(() => status)
                  }
                  usePoster={true}
                />
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: poster_url }}
                  style={{ height: 305, width: "100%", opacity: 0.3 }}
                />
                <View style={{ position: "absolute" }}>
                  <View style={styles.header_row}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons
                        name="arrow-back"
                        size={30}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                    {is_fav ? (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => removeFavourite()}
                      >
                        <AntDesign
                          name="heart"
                          size={20}
                          color={Colors.active_color}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => addFavourite()}
                      >
                        <AntDesign
                          name="hearto"
                          size={20}
                          color={colors.text}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        source={{ uri: thumbnail_url }}
                        style={styles.img}
                      />
                      <View style={styles.quality_style}>
                        <Text style={{ color: "white" }}>
                          {moment(release).format("YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "58%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <View style={{ alignItems: "flex-start" }}>
                        <Text
                          style={[styles.title_style, { color: colors.text }]}
                          numberOfLines={2}
                        >
                          {title}
                        </Text>
                        <Text style={{ color: colors.text }}>{genreNames}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.dropdown_container}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={season}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Season" : ""}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => handleSeason(item)}
              />
            </View>
            <View>
              {filteredSeason ? (
                <View style={{ paddingHorizontal: 10 }}>
                  <ScrollView>
                    {/* <Text>Season ID: {filteredSeason.seasons_id}</Text> */}
                    {filteredSeason.episodes.map((data, index) => {
                      return (
                        <View key={index}>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              paddingVertical: 5,
                            }}
                            onPress={() =>
                              handleEpisode(data.episodes_id, data.file_url)
                            }
                          >
                            <Image
                              source={{ uri: data.image_url }}
                              style={{ width: 100, height: 100 }}
                            />
                            {activeCard === data.episodes_id && (
                              <View style={{ position: "absolute", left: 30 }}>
                                <Text
                                  style={{
                                    color: "white",
                                    fontFamily: Fonts.primary,
                                  }}
                                >
                                  Playing
                                </Text>
                              </View>
                            )}
                            <View style={{ marginLeft: 20 }}>
                              <Text
                                style={{
                                  fontFamily: Fonts.primary,
                                  color: colors.text,
                                  fontSize: 16,
                                }}
                              >
                                {data.episodes_name}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: Fonts.primary,
                                  color: colors.text,
                                  fontSize: 16,
                                }}
                              >
                                Season: {filteredSeason.seasons_name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <Divider />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : (
                <Text>No data found for the given seasons_id</Text>
              )}
            </View>
            <Text style={[styles.description_style, { color: colors.text }]}>
              {description}
            </Text>
            <View style={styles.cast_row}>
              <Text style={[styles.cast_style, { color: colors.text }]}>
                Cast and Crew
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {cast_and_crew.map((data, index) => {
                  return (
                    <View key={index}>
                      <Image
                        source={{ uri: data.image_url }}
                        style={styles.cast_img}
                      />
                      <Text
                        style={{
                          color: colors.text,
                          fontFamily: Fonts.primary,
                        }}
                        numberOfLines={2}
                      >
                        {data.name}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
            <Divider />
            <View style={{ marginTop: 10 }}>
              <Text style={[styles.related_text, { color: colors.text }]}>
                You may also like
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {related_tvseries.map((data, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={{
                          width: 150,
                          height: 200,
                          resizeMode: "contain",
                        }}
                      />
                      <View style={styles.quality_style}>
                        <Text style={{ color: "white" }}>
                          {data.video_quality}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.rating_style,
                          { backgroundColor: "red" },
                        ]}
                      >
                        <Text style={{ fontSize: 12, color: "white" }}>
                          {data.release}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 10,
  },
  img: {
    width: 150,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },
  quality_style: {
    position: "absolute",
    backgroundColor: "purple",
    borderRadius: 5,
    // padding: 2,
    left: 10,
    paddingHorizontal: 2,
  },
  rating_style: {
    position: "absolute",
    top: 0,
    marginBottom: 20,
    right: 10,
    backgroundColor: "#deac5d",
    padding: 1,
    borderRadius: 5,
    width: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  title_style: {
    color: "white",
    fontFamily: Fonts.primary,
    fontSize: 20,
    width: "90%",
  },
  play_btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f62bf",
    width: "100%",
    height: 45,
    borderRadius: 5,
  },
  btn_text: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.primary,
  },
  description_style: {
    color: "white",
    textAlign: "justify",
    paddingHorizontal: 5,
    marginTop: 10,
  },
  cast_row: { marginTop: 10, paddingHorizontal: 5, marginBottom: 20 },
  cast_style: {
    color: "white",
    fontFamily: Fonts.primary,
    fontSize: 16,
  },
  cast_img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
  },

  dropdown_container: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
});
export default SeriesDetail;
