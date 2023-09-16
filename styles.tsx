// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    color: "purple",
    padding: 50,
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "grey",
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
