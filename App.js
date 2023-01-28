import { View, StyleSheet } from "react-native";
import { Provider, } from "react-redux";

import store from "./src/store";
import Main from "./src/Main";

export default function App() {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Main></Main>
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#d3d3d3"
  }
})