import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTheme, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
//import component
import BackHeader from "@components/BackHeader";
//import font
import Styles from "@styles/Styles";
//import library
import axios from "axios";
//import api url
import { contentByStarApi } from "@apis/Urls";
import { API_KEY } from "@env";
const MovieByStar = ({ navigation }) => {
  const { colors } = useTheme();
  const route = new useRoute();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = () => {
    const url =
      contentByStarApi + `?id=${route.params.data.star_id}&page=${page}`;
    setLoading(true);
    try {
      axios
        .get(url, {
          headers: {
            "API-KEY": API_KEY,
          },
        })
        .then(function (response) {
          setData(page === 1 ? response.data : [...data, ...response.data]);
        })
        .catch(function (err) {
          console.log("Movie List by Star API", err);
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
        <View style={Styles.rating_style}>
          <Icon name="star" size={10} />
          <Text style={{ fontSize: 12 }}>
            {parseFloat(item.imdb_rating).toFixed(2)}
          </Text>
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
    if (isLoading) {
      setPage(page + 1);
      fetchData();
    }
  };

  renderFooter = () => {
    if (isLoading) return null;
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
        name={route.params.data.star_name}
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
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{error ? "Error fetching data" : "No data found"}</Text>
          </View>
        }
      />
    </View>
  );
};

export default MovieByStar;
