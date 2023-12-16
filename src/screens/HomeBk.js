import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "./context/AppContext";
import Fonts from "@styles/Fonts";
const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const { isDarkTheme, setDarkTheme } = useContext(AppContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.text, fontFamily: Fonts.primary }}>
        Home
      </Text>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
          width: 200,
          height: 40,
        }}
        onPress={() => setDarkTheme((current) => !current)}
      >
        <Text style={{ color: colors.text, fontFamily: Fonts.primary }}>
          {" "}
          {isDarkTheme ? "Switch Light" : "Switch Dark"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
