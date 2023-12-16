import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Styles from "@styles/Styles";
export default class HeaderComponent extends React.Component {
  _OnPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <View style={[styles.header_style, Styles.box_shadow]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this._OnPress()}>
              <MaterialCommunityIcons name="menu" size={26} />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>{this.props.title}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="tab-search" size={26} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header_style: {
    backgroundColor: "white",
    height: 50,
    shadowRadius: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
