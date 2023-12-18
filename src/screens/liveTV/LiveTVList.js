import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
//import library
import { useTheme } from "@react-navigation/native";
import axios from "axios";
//import component
import HeaderComponent from "@components/HeaderComponent";
//import font
import Fonts from "@styles/Fonts";
//import api url
import { livetvApi } from "@apis/Urls";
import { API_KEY } from "@env";

const LiveTVList = ({ navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  fetchData = () => {
    setLoading(true);
    axios
      .get(livetvApi, {
        headers: {
          "API-KEY": API_KEY,
        },
      })
      .then(function (response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function (err) {
        console.log("Live TV List API", err);
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={colors.loading_color} />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <HeaderComponent
            onPress={() => navigation.openDrawer()}
            title="Live TV"
          />
          <ScrollView>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              {data.map((data, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontFamily: Fonts.primaryBold,
                        marginBottom: 5,
                        color: colors.text,
                      }}
                    >
                      {data.title}
                    </Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {data.channels.map((data, index) => {
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
                            <Text
                              style={{
                                fontFamily: Fonts.primary,
                              }}
                            >
                              {data.tv_name.length < 12
                                ? `${data.tv_name}`
                                : `${data.tv_name.substring(0, 12)}...`}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  feature_btn: {
    backgroundColor: "white",
    // height: 100,
    width: 110,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 5,
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
export default LiveTVList;
