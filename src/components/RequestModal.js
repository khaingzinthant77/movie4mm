import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Fonts from "@styles/Fonts";
import Entypo from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native-paper";
import Colors from "@styles/Colors";
import ErrorText from "@components/ErrorText";
export default class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr_name: null,
      email: null,
      movie_name: null,
      message: null,
      ISERRORNAME: false,
      ISERROREMAIL: false,
      ISERRORMOVIENAME: false,
      ISERRORMESSAGE: false,
    };
  }
  close() {
    if (this.props.onClose) {
      this.setState({
        usr_name: null,
        email: null,
        movie_name: null,
        message: null,
      });
      this.props.onClose();
    }
  }

  handleUsrName = (value) => {
    this.setState({ usr_name: value, ISERRORNAME: false });
  };
  handleEmail = (value) => {
    this.setState({ email: value, ISERROREMAIL: false });
  };
  handleMovieName = (value) => {
    this.setState({ movie_name: value, ISERRORMOVIENAME: false });
  };
  handleMessage = (value) => {
    this.setState({ message: value, ISERRORMESSAGE: false });
  };

  handleSubmit = () => {
    var isError = false;
    if (!this.state.usr_name) {
      this.setState({ ISERRORNAME: true });
      isError = true;
    }
    if (!this.state.email) {
      this.setState({ ISERROREMAIL: true });
      isError = true;
    }
    if (!this.state.movie_name) {
      this.setState({ ISERRORMOVIENAME: true });
      isError = true;
    }
    if (!this.state.message) {
      this.setState({ ISERRORMESSAGE: true });
      isError = true;
    }

    if (!isError) {
      if (this.props.requestMovie) {
        this.props.requestMovie(
          this.state.usr_name,
          this.state.email,
          this.state.movie_name,
          this.state.message
        );
      }
    }
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                }}
              >
                <Text style={{ fontFamily: Fonts.primary, fontSize: 18 }}>
                  Movie Request
                </Text>
              </View>
            </View>
            <KeyboardAvoidingView
              style={{ width: "100%", paddingHorizontal: 10 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <ScrollView>
                <View style={{ width: "100%", paddingHorizontal: 10 }}>
                  <TextInput
                    label="Your Name"
                    value={this.state.usr_name}
                    onChangeText={(value) => this.handleUsrName(value)}
                    mode="outlined"
                  />
                  <ErrorText
                    isShow={this.state.ISERRORNAME}
                    errMessage="Name Required"
                  />
                  <TextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={(value) => this.handleEmail(value)}
                    mode="outlined"
                  />
                  <ErrorText
                    isShow={this.state.ISERROREMAIL}
                    errMessage="Email Required"
                  />
                  <TextInput
                    label="Movie Name"
                    value={this.state.movie_name}
                    onChangeText={(value) => this.handleMovieName(value)}
                    mode="outlined"
                  />
                  <ErrorText
                    isShow={this.state.ISERRORMOVIENAME}
                    errMessage="Movie Name Required"
                  />
                  <TextInput
                    label="Message"
                    value={this.state.message}
                    onChangeText={(value) => this.handleMessage(value)}
                    mode="outlined"
                  />
                  <ErrorText
                    isShow={this.state.ISERRORMESSAGE}
                    errMessage="Message Required"
                  />
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    width: "100%",
                    paddingHorizontal: 13,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: Colors.switch_active_color,
                        width: 100,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                      }}
                      onPress={() => this.close()}
                    >
                      <Text style={{ fontFamily: Fonts.primary }}>CLOSE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.switch_active_color,
                        width: 100,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 5,
                        marginLeft: 20,
                      }}
                      onPress={() => this.handleSubmit()}
                    >
                      <Text
                        style={{ fontFamily: Fonts.primary, color: "white" }}
                      >
                        SEND
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
