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
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
//import component
import HeaderComponent from "@components/HeaderComponent";
//import api url
import { countrylistApi } from "@apis/Urls";
import { API_KEY } from "@env";

const CountryList = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const getRandomColor = () => {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return `#${color}`;
  };
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = () => {
    const url = countrylistApi + `?page=${page}`;
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
          console.log("Country List API", err);
        });
    } catch (error) {
      self.setState({ error, isLoading: false });
      setLoading(false);
      setRefreshing(false);
      setError(error);
    }
  };
  renderItem = ({ item }) => {
    const startColor = getRandomColor();
    const endColor = getRandomColor();
    return (
      <LinearGradient colors={[startColor, endColor]} style={styles.button}>
        <TouchableOpacity>
          <Image
            source={{ uri: item.image_url }}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ color: "white", marginTop: 10 }}>{item.name}</Text>
        </TouchableOpacity>
      </LinearGradient>
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
      <HeaderComponent
        onPress={() => navigation.openDrawer()}
        title="Country"
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
        contentContainerStyle={{ marginTop: 20, marginLeft: 20 }}
        showsVerticalScrollIndicator={false}
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
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    marginBottom: 10,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
});

export default CountryList;
