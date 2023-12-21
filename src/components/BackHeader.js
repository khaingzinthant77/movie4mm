import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
//import styles
import Fonts from "@styles/Fonts";
//import icon
import Ionicons from "react-native-vector-icons/Ionicons";
export default class BackHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  _OnPress() {
    if (this.props.Onpress) {
      this.props.Onpress();
    }
  }
  _handleOnPress() {
    if (this.props.OnSearch) {
      this.props.OnSearch();
    }
  }

  _handleCreate() {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#33b6ef",
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <StatusBar hidden={false} />
        <View
          style={[
            styles.container,
            {
              backgroundColor: "#33b6ef",
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this._OnPress()}
            style={{ width: 30 }}
          >
            <Ionicons name="arrow-back" size={30} color={"white"} />
          </TouchableOpacity>

          <Text style={styles.text}>{this.props.name}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    // textAlign: "center",
    flex: 1,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Fonts.primary,
    marginLeft: "30%",
  },
  img: {
    width: 30,
    height: 30,
  },
});
