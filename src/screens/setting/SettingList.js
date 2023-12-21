import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Switch, Divider } from "react-native-paper";
import * as Device from "expo-device";
import appjson from "@appjson";
//import component
import BackHeader from "@components/BackHeader";
//import icon
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
//import font
import Fonts from "@styles/Fonts";
import Colors from "@styles/Colors";
const SettingList = ({ navigation }) => {
  const { colors } = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isSwitchAdult, setIsSwitchAdult] = useState(false);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const onToggleAdult = () => {
    setIsSwitchAdult(!isSwitchAdult);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        Onpress={() => navigation.navigate("BottomNavigator")}
        name="Setting"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="cellphone-information"
            size={30}
            color={Colors.inactive_color}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: Fonts.primaryBold, fontSize: 18 }}>
              Device ID
            </Text>
            <Text>{Device.osBuildId}</Text>
          </View>
        </View>

        <Divider style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="notifications-active"
              size={30}
              color={Colors.inactive_color}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontFamily: Fonts.primary, fontSize: 18 }}>
                Notification
              </Text>
              <Text style={{ fontFamily: Fonts.primary }}>
                Receive Notifications
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ true: Colors.switch_active_color, false: "grey" }}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          />
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="message-reply-text"
            size={30}
            color={Colors.inactive_color}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontFamily: Fonts.primaryBold, fontSize: 18 }}>
              Request
            </Text>
            <Text style={{ fontFamily: Fonts.primary }}>
              Send a movie request
            </Text>
          </View>
        </TouchableOpacity>
        <Divider style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="browser" size={25} color={Colors.inactive_color} />
            <View style={{ marginLeft: 25 }}>
              <Text style={{ fontFamily: Fonts.primary, fontSize: 18 }}>
                Adult
              </Text>
              <Text style={{ fontFamily: Fonts.primary }}>
                Turn on/off Adults video
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ true: Colors.switch_active_color, false: "grey" }}
            value={isSwitchAdult}
            onValueChange={onToggleAdult}
            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
          />
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <Octicons name="versions" size={25} color={Colors.inactive_color} />
          <View style={{ marginLeft: 25 }}>
            <Text style={{ fontFamily: Fonts.primaryBold, fontSize: 18 }}>
              App Version
            </Text>
            <Text style={{ fontFamily: Fonts.primary }}>
              {appjson.expo.version}
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <AntDesign name="copyright" size={25} color={Colors.inactive_color} />
          <View style={{ marginLeft: 25 }}>
            <Text style={{ fontFamily: Fonts.primaryBold, fontSize: 18 }}>
              Copyright
            </Text>
            <Text style={{ fontFamily: Fonts.primary }}>
              Copyright @ movie4mm, All right reserved
            </Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
          }}
        >
          <AntDesign name="sharealt" size={25} color={Colors.inactive_color} />
          <View style={{ marginLeft: 25 }}>
            <Text style={{ fontFamily: Fonts.primaryBold, fontSize: 18 }}>
              Share
            </Text>
            <Text style={{ fontFamily: Fonts.primary }}>Share this app</Text>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} />
      </ScrollView>
    </View>
  );
};

export default SettingList;
