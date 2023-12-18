import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Switch, Divider } from "react-native-paper";
//import component
import BackHeader from "@components/BackHeader";

const SettingList = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        Onpress={() => navigation.navigate("BottomNavigator")}
        name="Setting"
      />
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      <Text>Setting List</Text>
    </View>
  );
};

export default SettingList;
