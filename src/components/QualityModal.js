import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Fonts from "@styles/Fonts";
import Entypo from "react-native-vector-icons/Entypo";

export default class QualityModal extends React.Component {
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  viewMovie(url) {
    if (this.props.viewMoviePlayer) {
      this.props.viewMoviePlayer(url);
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: "60%",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: Fonts.primary, fontSize: 18 }}>
                  Select Quality
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  alignItems: "flex-end",
                  width: "40%",
                }}
                onPress={() => this.close()}
              >
                <Entypo name="cross" size={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor: "#EFE7E7",
                borderWidth: 1,
                // flex: 1,
                backgroundColor: "red",
                height: 1,
                width: "100%",
                marginTop: 4,
              }}
            />
            {this.props.video_arr.map((data, index) => {
              return (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    width: "90%",
                    paddingVertical: 10,
                    marginTop: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                  key={index}
                  onPress={() => this.viewMovie(data.file_url)}
                >
                  <Text style={{ fontFamily: Fonts.primary, fontSize: 14 }}>
                    {data.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: "100%",
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalimg: {
    width: 30,
    height: 30,
    marginTop: 15,
  },
  showText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.primary,
  },

  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
    backgroundColor: "red",
    width: 40,
    height: 40,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  btnContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  cancleBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#E30D36",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  yesBtn: {
    width: "46%",
    height: 37,
    backgroundColor: "#11A84B",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 19,
    color: "#FFFFFF",
  },
});
