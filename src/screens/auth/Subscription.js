import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import axios from "axios";
//import api url
import { myAccountApi } from "@apis/Urls";
import { API_KEY } from "@env";

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
  const [isLoading, setLoading] = useState("");
  const [expire_date, setExpireDate] = useState("");
  const [remaining_days, setRemainingDay] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  fetchData = async () => {
    setLoading(true);
    try {
      let param = {
        user_id: 41,
      };

      axios
        .post(myAccountApi, param, {
          headers: {
            "API-KEY": API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(function (response) {
          setUserName(response.data.login_id);
          setEmail(response.data.login_id);
          setExpireDate(response.data.expire_date);
          setRemainingDay(response.data.remaining_days);
          setLoading(false);
        })
        .catch(function (err) {
          console.log("My Account API Error", err);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
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
              <Text style={{ marginLeft: 20 }}>
                {isLoading ? "-" : user_name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Email
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>{isLoading ? "-" : email}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Expire Date
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>
                {isLoading ? "-" : expire_date}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "right", fontFamily: Fonts.primary }}>
                Remaining Days
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20 }}>
                {isLoading ? "-" : remaining_days}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Subscription;
