import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
//import library
import { useTheme } from "@react-navigation/native";
import axios from "axios";
//import api url
import { genrelistApi } from "@apis/Urls";
import { API_KEY } from "@env";
//import component
import HeaderComponent from "@components/HeaderComponent";
//import font
import Fonts from "@styles/Fonts";
const GenreList = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  fetchData = () => {
    const url = genrelistApi + `?page=${page}`;
    setLoading(true);
    try {
      axios
        .get(url, {
          headers: {
            "API-KEY": API_KEY,
          },
        })
        .then(function (response) {
          setData(response.data);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(function (err) {
          console.log("Genre List API", err);
          setLoading(false);
          setRefreshing(false);
        });
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      setError(error);
    }
  };
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.genere_btn}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("MovieByGenre", {
            genre_id: item.genre_id,
            name: item.name,
          })
        }
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.genere_img_style}
        />
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
      <HeaderComponent onPress={() => navigation.openDrawer()} title="Genre" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ marginLeft: 20, marginTop: 20 }}
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
            <Text style={{ color: colors.text, fontFamily: Fonts.primary }}>
              {error ? "Error fetching data" : "No data found"}
            </Text>
          </View>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  genere_btn: {
    // marginRight: 10,
    marginBottom: 10,
    width: "34%",
  },
  genere_img_style: { width: 90, height: 80, borderRadius: 5 },
});

export default GenreList;
