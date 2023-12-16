import { StyleSheet, Dimensions } from "react-native";
import Fonts from "@styles/Fonts";
const width = Dimensions.get("window").width;
const Styles = StyleSheet.create({
  box_shadow: {
    borderRadius: 5,
    elevation: 5,
    backgroundColor: "#F2F2F2",
    borderColor: "#F2F2F2",
    shadowOffset: { width: 0, height: 2 }, //IOS
    shadowOpacity: 0.5, //IOS
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  card_btn: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 180,
    marginBottom: 10,
    borderRadius: 5,
    marginRight: 10,
    width: width / 4 + 12,
  },
  card_img: { width: width / 4 + 12, height: 160, borderRadius: 5 },
  title_style: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: Fonts.primaryBold,
  },
  quality_style: {
    position: "absolute",
    backgroundColor: "purple",
    borderRadius: 5,
    padding: 2,
  },
  release_style: {
    position: "absolute",
    backgroundColor: "#ad1f69",
    borderRadius: 5,
    padding: 2,
    right: 0,
  },
  rating_style: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    right: 0,
    backgroundColor: "#deac5d",
    padding: 1,
    borderRadius: 5,
    width: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Styles;
