import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
//import component
import BackHeader from "@components/BackHeader";
//import style
import Colors from "@styles/Colors";
import Styles from "@styles/Styles";
import Fonts from "@styles/Fonts";
const Subscription = ({ navigation }) => {
  const { colors } = useTheme();
  const [user_name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [active_plan, setActivePlan] = useState("");
  const [expire_date, setExpireDate] = useState("");
  const [remaining_days, setRemainingDay] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = async () => {
    setUserName(await AsyncStorage.getItem("name"));
    setEmail(await AsyncStorage.getItem("email"));
    setExpireDate(await AsyncStorage.getItem("expire_date"));
    setRemainingDay(await AsyncStorage.getItem("remaining_days"));
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        Onpress={() => navigation.navigate("BottomNavigator")}
        name="My Subscription"
      />
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <Text
          style={{
            fontFamily: Fonts.primary,
            fontSize: 20,
            color: colors.text,
          }}
        >
          Active Subscription
        </Text>
        <View
          style={[
            Styles.box_shadow,
            { alignItems: "center", backgroundColor: colors.background },
          ]}
        >
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                User Name
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>{user_name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Email
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>{email}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Expire Date
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>{expire_date}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Remaining Days
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>{remaining_days}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Subscription;
