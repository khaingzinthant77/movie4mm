import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import api url
import { loginApi } from "@apis/Urls";
import { API_KEY } from "@env";
import * as Device from "expo-device";
//import style
import Fonts from "@styles/Fonts";
import Colors from "@styles/Colors";
//import icon
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
//import component
import ErrorText from "@components/ErrorText";

const Login = ({ navigation }) => {
  const [login_id, setLoginID] = useState(null);
  const [password, setPassword] = useState(null);
  const [ISERRORLOGIN, setErrorLogin] = useState(false);
  const [ISERRORPWD, setErrorPwd] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { colors } = useTheme();
  const { isDarkTheme, setDarkTheme } = useContext(AppContext);
  const handleLoginID = (value) => {
    setLoginID(value);
    setErrorLogin(false);
  };
  const handlePassword = (value) => {
    setPassword(value);
    setErrorPwd(false);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = () => {
    var isError = false;
    if (!login_id) {
      setErrorLogin(true);
      isError = true;
    }
    if (!password) {
      setErrorPwd(true);
      isError = true;
    }
    if (!isError) {
      setLoading(true);
      let param = {
        email: login_id,
        password: password,
        device_id: Device.osBuildId,
      };
      try {
        axios
          .post(loginApi, param, {
            headers: {
              "API-KEY": API_KEY,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then(async (response) => {
            setLoading(false);
            try {
              const keyValues = [
                ["email", response.data.email],
                ["expire_date", response.data.expire_date],
                ["gender", response.data.gender],
                ["image_url", response.data.image_url],
                [
                  "join_date",
                  response.data.join_date != null
                    ? response.data.join_date
                    : "",
                ],
                ["last_login", response.data.last_login],
                ["name", response.data.name],
                [
                  "password_available",
                  response.data.password_available.toString(),
                ],
                [
                  "phone",
                  response.data.phone != null ? response.data.phone : "",
                ],
                ["remaining_days", response.data.remaining_days.toString()],
                ["site_code", response.data.site_code],
                ["status", response.data.status],
                ["user_id", response.data.user_id],
                // Add more key-value pairs as needed
              ];

              // Perform multi-set operation
              await AsyncStorage.multiSet(keyValues);
              navigation.navigate("BottomNavigator");
            } catch (error) {
              console.error("Login Error storing data:", error);
            }

            setLoading(false);
          })
          .catch(function (err) {
            console.log("Login API", err);
          });
      } catch (error) {
        setLoading(false);
      }
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 20 : 0,
          backgroundColor: colors.background,
        }}
        forceInset={{ top: 0, horizontal: "never", bottom: "never" }}
      >
        <View
          style={[
            styles.header_container,
            {
              backgroundColor: isDarkTheme ? "#5c5e5d" : "#33b6ef",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("BottomNavigator")}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: Fonts.primary,
              marginLeft: "30%",
            }}
          >
            Login
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={{
          height: 250,
          backgroundColor: isDarkTheme ? "#5c5e5d" : "#33b6ef",
          alignItems: "center",
        }}
      >
        <Image source={require("@images/logo.png")} style={{ marginTop: 30 }} />
      </View>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.header_text}>SIGNIN</Text>
          <TextInput
            style={styles.input}
            value={login_id}
            onChangeText={(value) => handleLoginID(value)}
            placeholder="Login ID"
          />
          <ErrorText isShow={ISERRORLOGIN} errMessage="Login ID Required!" />
          <View
            style={[
              styles.input,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <TextInput
              style={{ width: "90%", height: 40 }}
              value={password}
              onChangeText={(value) => handlePassword(value)}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              {showPassword ? (
                <Icon name="eye" size={20} color={Colors.inactive_color} />
              ) : (
                <Icon
                  name="eye-slash"
                  size={20}
                  color={Colors.inactive_color}
                />
              )}
            </TouchableOpacity>
          </View>
          <ErrorText isShow={ISERRORPWD} errMessage="Password Required!" />
          <TouchableOpacity
            style={{
              backgroundColor: "#33b6ef",
              borderRadius: 20,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => (isLoading ? null : handleLogin())}
          >
            <Text style={{ color: "white", fontFamily: Fonts.primary }}>
              {isLoading ? "Loading..." : "SIGNIN"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header_container: {
    flexDirection: "row",

    shadowColor: "black",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "white",
    marginTop: -100,
    marginHorizontal: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingVertical: 20,
  },
  header_text: {
    textAlign: "center",
    color: "#33b6ef",
    fontWeight: "bold",
    fontFamily: Fonts.primaryBold,
    fontSize: 17,
    marginBottom: 30,
  },
});
export default Login;
