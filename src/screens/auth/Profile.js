import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
const Profile = () => {
  const { colors } = useTheme();
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
export default Profile;
