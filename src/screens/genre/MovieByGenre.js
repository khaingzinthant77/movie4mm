import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRoute, useTheme } from "@react-navigation/native";

//import component
import BackHeader from "@components/BackHeader";
//import library
import axios from "axios";
//import api url
import { contentByGenreApi } from "@apis/Urls";
import { API_KEY } from "@env";
//import style
import Styles from "@styles/Styles";
const MovieByGenre = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const route = new useRoute();
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = () => {
    const url = contentByGenreApi + `?id=${route.params.genre_id}&page=${page}`;
    setLoading(false);
    try {
      axios
        .get(url, {
          headers: {
            "API-KEY": API_KEY,
          },
        })
        .then(function (response) {
          setData(page === 1 ? response.data : [...data, ...response.data]);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(function (err) {
          console.log("Movie List by Genre API", err);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={Styles.card_btn}
        onPress={() =>
          navigation.navigate("MovieDetail", { id: item.videos_id })
        }
      >
        <Image source={{ uri: item.thumbnail_url }} style={Styles.card_img} />
        <Text>
          {" "}
          {item.title.length < 8
            ? `${item.title}`
            : `${item.title.substring(0, 8)}...`}
        </Text>
        <View style={Styles.quality_style}>
          <Text style={{ color: "white" }}>{item.video_quality}</Text>
        </View>

        <View style={Styles.release_style}>
          <Text style={{ color: "white" }}>{item.release}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData();
  };

  handleLoadMore = () => {
    if (!isLoading) {
      setPage(page + 1);
      fetchData();
    }
  };

  renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color={colors.loading_color} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        Onpress={() => navigation.navigate("BottomNavigator")}
        name={route.params.name}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 20 }}
        numColumns={3}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: colors.text }}>
              {error ? "Error fetching data" : "No data found"}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieByGenre;
