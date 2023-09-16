
import { StyleSheet } from "react-native";
import * as Font from "expo-font";



export const styles = StyleSheet.create({
  background: {
    flex:1,
    resizeMode: "cover",
  },
  whole: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "Poppins_700Bold",
    color: "#FF6B6B",
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
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
    borderRadius: 20,
    fontFamily: 'Poppins_400Regular',
  },
  button: {
    backgroundColor: '#FF6B6B',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,       // Rounded corners
    shadowColor: '#000',    // For iOS: shadow properties
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .5,
    shadowRadius: 0,

  },
  buttonText:{
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: "black",
  }
});
