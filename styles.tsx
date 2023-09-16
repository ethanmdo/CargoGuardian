
import { StyleSheet } from "react-native";
import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    Montserrat: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
  });
};
loadFonts();



export const styles = StyleSheet.create({
  whole: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginTop: 25,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#181818",
    borderWidth: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  predictionText: {
    width: "100%",
    backgroundColor: "#005CBF",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    color: "#FEDD00",
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
  },
  button: {
    width: "80%",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
    backgroundColor: "#181818",
    borderWidth: 2,
    borderColor: "#181818",
  },
});
