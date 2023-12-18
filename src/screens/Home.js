import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
//import library
import { useTheme } from "@react-navigation/native";
import { ImageSlider } from "react-native-image-slider-banner";
import { Skeleton } from "@rneui/themed";
import axios from "axios";
//import url
import { homeApi } from "@apis/Urls";
import { API_KEY } from "@env";
//import icon
import Icon from "react-native-vector-icons/FontAwesome";
//import font
import Fonts from "@styles/Fonts";
//import component
import HeaderComponent from "@components/HeaderComponent";
const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const [sliders, setSliders] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [tv_channels, setTVChannels] = useState([]);
  const [current_years, setCurrentYears] = useState([]);
  const [four_k, setfourK] = useState([]);
  const [latest_movies, setLatestMovies] = useState([]);
  const [latest_tv, setLatestTV] = useState([]);
  const [movie_list, setMovieList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    getHomeData();
  }, []);
  const getHomeData = () => {
    setLoading(true);
    axios
      .get(homeApi, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then(function (response) {
        // console.log(response.data.slider)
        let slider_arr = [];
        response.data.slider.slide.map((data, index) => {
          var obj = {
            img: data.image_link,
          };
          slider_arr.push(obj);
        });
        let genere_arr = [];
        response.data.all_genre.map((data, index) => {
          var genre_obj = {
            genre: data.image_url,
            name: data.name,
            genre_id: data.genre_id,
          };
          genere_arr.push(genre_obj);
        });

        let tv_arr = [];
        response.data.featured_tv_channel.map((data, index) => {
          var tv_obj = {
            title: data.title,
            thumbnail_url: data.thumbnail_url,
            stream_url: data.stream_url,
            stream_arr_url: data.stream_arr_url,
          };
          if (index < 7) {
            tv_arr.push(tv_obj);
          }
        });

        let current_year_arr = [];
        response.data.current_year_movies.map((data, index) => {
          var current_obj = {
            title: data.title,
            release: data.release,
            video_quality: data.video_quality,
            imdb_rating: parseFloat(data.imdb_rating).toFixed(2),
            thumbnail_url: data.thumbnail_url,
          };
          if (index < 7) {
            current_year_arr.push(current_obj);
          }
        });

        let four_k_arr = [];
        response.data.latest_movies.map((data, index) => {
          var four_k_obj = {
            title: data.title,
            release: data.release,
            video_quality: data.video_quality,
            imdb_rating: parseFloat(data.imdb_rating).toFixed(2),
            thumbnail_url: data.thumbnail_url,
          };
          if (index < 7) {
            four_k_arr.push(four_k_obj);
          }
        });

        let latest_arr = [];
        response.data.latest_movies.map((data, index) => {
          var latest_obj = {
            title: data.title,
            release: data.release,
            video_quality: data.video_quality,
            imdb_rating: parseFloat(data.imdb_rating).toFixed(2),
            thumbnail_url: data.thumbnail_url,
          };
          if (index < 7) {
            latest_arr.push(latest_obj);
          }
        });

        let latest_tv_arr = [];
        response.data.latest_tvseries.map((data, index) => {
          var latest_tv_obj = {
            title: data.title,
            release: data.release,
            video_quality: data.video_quality,
            imdb_rating: parseFloat(data.imdb_rating).toFixed(2),
            thumbnail_url: data.thumbnail_url,
          };
          if (index < 7) {
            latest_tv_arr.push(latest_tv_obj);
          }
        });

        setSliders(slider_arr);
        setLoading(false);
        setGenres(genere_arr);
        setTVChannels(tv_arr);
        setCurrentYears(current_year_arr);
        setfourK(four_k_arr);
        setLatestMovies(latest_arr);
        setLatestTV(latest_tv_arr);
        setActors(response.data.popular_stars);
        setMovieList(response.data.features_genre_and_movie);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          {/* <ActivityIndicator size="large" color={colors.activeColor} /> */}
          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <Skeleton animation="wave" width={"100%"} height={200} />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 4}
                height={100}
                style={{ marginRight: 10 }}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 3}
                height={200}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 3}
                height={200}
                style={{ marginRight: 10 }}
              />
              <Skeleton
                animation="wave"
                width={Dimensions.get("window").width / 3}
                height={200}
                style={{ marginRight: 10 }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <HeaderComponent
            onPress={() => navigation.openDrawer()}
            title="Home"
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageSlider
              data={sliders}
              autoPlay={true}
              // onItemChanged={(item) => console.log("item", item)}
              closeIconColor="#fff"
              caroselImageStyle={{ height: 180, marginTop: 20, width: 340 }}
              showIndicator={false}
            />
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <Text style={[styles.title_style, { color: colors.text }]}>
                Explore By Genere
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {genres.map((data, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.genere_btn}
                      activeOpacity={0.8}
                      key={index}
                      onPress={() =>
                        navigation.navigate("MovieByGenre", {
                          genre_id: data.genre_id,
                          name: data.name,
                        })
                      }
                    >
                      <Image
                        source={{ uri: data.genre }}
                        style={styles.genere_img_style}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <Text style={[styles.title_style, { color: colors.text }]}>
                Popular Stars
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {actors.map((data, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.popular_btn}
                      activeOpacity={0.8}
                      key={index}
                      onPress={() =>
                        navigation.navigate("MovieByStar", {
                          data: data,
                        })
                      }
                    >
                      <Image
                        source={{ uri: data.image_url }}
                        style={styles.popular_img}
                      />
                      <Text>{data.star_name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.title_style, { color: colors.text }]}>
                  Feature TV Channel
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LiveTVList")}
                >
                  <Text style={{ color: colors.text }}>MORE</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {tv_channels.map((data, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.feature_btn}
                      activeOpacity={0.8}
                      key={index}
                    >
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={styles.feature_img}
                      />
                      <Text style={{ color: colors.text }}>{data.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.title_style, { color: colors.text }]}>
                  {new Date().getFullYear()}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CurrentYearMovie")}
                >
                  <Text style={{ color: colors.text }}>MORE</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {current_years.map((data, index) => {
                  return (
                    <TouchableOpacity style={styles.card_btn} key={index}>
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={styles.card_img}
                      />
                      <Text>
                        {data.title.length < 13
                          ? `${data.title}`
                          : `${data.title.substring(0, 13)}...`}
                      </Text>
                      <View style={styles.quality}>
                        <Text style={{ color: "white" }}>
                          {data.video_quality}
                        </Text>
                      </View>

                      <View style={styles.release}>
                        <Text style={{ color: "white" }}>{data.release}</Text>
                      </View>
                      <View style={styles.rating}>
                        <Icon name="star" size={10} />
                        <Text style={{ fontSize: 12 }}>{data.imdb_rating}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.title_style, { color: colors.text }]}>
                  4K
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FourKMovie")}
                >
                  <Text style={{ color: colors.text }}>MORE</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {four_k.map((data, index) => {
                  return (
                    <TouchableOpacity style={styles.card_btn} key={index}>
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={styles.card_img}
                      />
                      <Text>
                        {data.title.length < 13
                          ? `${data.title}`
                          : `${data.title.substring(0, 13)}...`}
                      </Text>
                      <View style={styles.quality}>
                        <Text style={{ color: "white" }}>
                          {data.video_quality}
                        </Text>
                      </View>

                      <View style={styles.release}>
                        <Text style={{ color: "white" }}>{data.release}</Text>
                      </View>
                      <View style={styles.rating}>
                        <Icon name="star" size={10} />
                        <Text style={{ fontSize: 12 }}>{data.imdb_rating}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.title_style, { color: colors.text }]}>
                  Latest Movies
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LatestList", { type: 0 })}
                >
                  <Text style={{ color: colors.text }}>MORE</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {latest_movies.map((data, index) => {
                  return (
                    <TouchableOpacity style={styles.card_btn} key={index}>
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={styles.card_img}
                      />
                      <Text>
                        {data.title.length < 13
                          ? `${data.title}`
                          : `${data.title.substring(0, 13)}...`}
                      </Text>
                      <View style={styles.quality}>
                        <Text style={{ color: "white" }}>
                          {data.video_quality}
                        </Text>
                      </View>

                      <View style={styles.release}>
                        <Text style={{ color: "white" }}>{data.release}</Text>
                      </View>
                      <View style={styles.rating}>
                        <Icon name="star" size={10} />
                        <Text style={{ fontSize: 12 }}>{data.imdb_rating}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[styles.title_style, { color: colors.text }]}>
                  Latest TV Series
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LatestList", { type: 1 })}
                >
                  <Text style={{ color: colors.text }}>MORE</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {latest_tv.map((data, index) => {
                  return (
                    <TouchableOpacity style={styles.card_btn} key={index}>
                      <Image
                        source={{ uri: data.thumbnail_url }}
                        style={styles.card_img}
                      />
                      <Text>
                        {data.title.length < 13
                          ? `${data.title}`
                          : `${data.title.substring(0, 13)}...`}
                      </Text>
                      <View style={styles.quality}>
                        <Text style={{ color: "white" }}>
                          {data.video_quality}
                        </Text>
                      </View>

                      <View style={styles.release}>
                        <Text style={{ color: "white" }}>{data.release}</Text>
                      </View>
                      <View style={styles.rating}>
                        <Icon name="star" size={10} />
                        <Text style={{ fontSize: 12 }}>{data.imdb_rating}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            {movie_list.map((data, index) => {
              return (
                <View
                  style={{ paddingHorizontal: 10, marginTop: 15 }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={[styles.title_style, { color: colors.text }]}>
                      {data.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MovieByGenre", {
                          genre_id: data.genre_id,
                          name: data.name,
                        })
                      }
                    >
                      <Text style={{ color: colors.text }}>MORE</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {data.videos.map((data, index) => {
                      return (
                        <TouchableOpacity style={styles.card_btn} key={index}>
                          <Image
                            source={{ uri: data.thumbnail_url }}
                            style={styles.card_img}
                          />
                          <Text>
                            {data.title.length < 13
                              ? `${data.title}`
                              : `${data.title.substring(0, 13)}...`}
                          </Text>
                          <View style={styles.quality}>
                            <Text style={{ color: "white" }}>
                              {data.video_quality}
                            </Text>
                          </View>

                          <View style={styles.release}>
                            <Text style={{ color: "white" }}>
                              {data.release}
                            </Text>
                          </View>
                          <View style={styles.rating}>
                            <Icon name="star" size={10} />
                            <Text style={{ fontSize: 12 }}>
                              {parseFloat(data.imdb_rating).toFixed(2)}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  genere_btn: {
    marginRight: 10,
  },
  genere_img_style: { width: 90, height: 80, borderRadius: 5 },
  popular_btn: {
    backgroundColor: "white",
    width: 90,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  popular_img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 5,
    marginBottom: 5,
  },
  feature_btn: {
    backgroundColor: "white",
    width: 110,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 10,
    alignItems: "center",
    marginBottom: 10,
    // marginTop: 10,
  },
  feature_img: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginBottom: 5,
    // resizeMode:"contain"
  },
  card_btn: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 180,
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  card_img: { width: 110, height: 160 },
  title_style: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: Fonts.primaryBold,
  },
  quality: {
    position: "absolute",
    backgroundColor: "purple",
    borderRadius: 5,
    padding: 2,
  },
  release: {
    position: "absolute",
    backgroundColor: "#ad1f69",
    borderRadius: 5,
    padding: 2,
    right: 0,
  },
  rating: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    right: 0,
    backgroundColor: "#deac5d",
    padding: 1,
    borderRadius: 5,
    width: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Home;
