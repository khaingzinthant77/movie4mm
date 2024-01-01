import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useTheme } from "@react-navigation/native";
//import library
import axios from "axios";
//import api url
import { featureTvApi } from "@apis/Urls";
import { API_KEY } from "@env";
import { Skeleton } from "@rneui/themed";
//import color
import Fonts from "@styles/Fonts";
//import component
import BackHeader from "@components/BackHeader";
const MovieList = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = featureTvApi + `?page=${page}`;
    setLoading(true);
    try {
      axios
        .get(url, {
          headers: {
            "API-KEY": API_KEY,
          },
        })
        .then(function (response) {
          //   console.log(response.data);
          setData(page === 1 ? response.data : [...data, ...response.data]);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(function (err) {
          console.log("Feature TV Channel API", err);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
    }
  };
  renderItem = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        style={styles.feature_btn}
        activeOpacity={0.8}
        key={item.live_tv_id}
        onPress={() =>
          navigation.navigate("LiveDetail", { id: item.live_tv_id })
        }
      >
        <Image
          source={{ uri: item.thumbnail_url }}
          style={styles.feature_img}
        />

        <Text style={{ fontFamily: Fonts.primary }}>{item.tv_name}</Text>
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
        name="Live TV"
      />
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ padding: 5 }}
        numColumns={3}
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
const styles = StyleSheet.create({
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
});
export default MovieList;
