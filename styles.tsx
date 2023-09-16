// styles.ts
import { StyleSheet } from "react-native";
import * as Font from 'expo-font';

// Load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Montserrat': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
  });
};

// Load fonts when the app starts
loadFonts();
export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  predictionText: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
  },
});
