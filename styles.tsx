import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
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

  title: {
    marginTop: 25,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    color: "#FF6B6B",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
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
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontFamily: "Poppins_400Regular",
  },
  button: {
    backgroundColor: "#FF6B6B",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "white",
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },

  circleCaption: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#FF6B6B",
    textAlign: "center",
    flexWrap: "wrap",
  },
  bCircleCaption: {
    fontFamily: "Poppins_700Bold",
    fontSize: 12,
    color: "#FF6B6B",
    textAlign: "center",
    flexWrap: "wrap",
    marginBottom: 5,
  },

  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  circleText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 30,
    color: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  circleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topCircleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  bottomCirclesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  capCircle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 15,
  },
  buttonContainer: {
  
    width: 350,
    alignSelf: "center",
    flexDirection: "column",
    marginBottom: 10,
  },
  inputCap:{
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
  }
});
