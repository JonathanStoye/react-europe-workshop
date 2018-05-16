import React from "react";
import "./index.css";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  PanResponder
} from "react-native";

class App extends React.Component {
  state = {
    background: "red",
    x: 0,
    y: 0
  };
  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      this.setState({
        background: "blue"
      });
    },
    onPanResponderMove: (evt, gestureState) => {
      this.setState(state => ({
        x: gestureState.dx,
        y: gestureState.dy
      }));
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      this.setState({
        background: "red",
        x: 0,
        y: 0
      });
    },
    onPanResponderTerminate: (evt, gestureState) => {},
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return true;
    }
  });

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.box,
            {
              alignSelf: "flex-start",
              backgroundColor: "black",
              transform: [
                { translateX: this.state.x },
                { translateY: this.state.y }
              ]
            }
          ]}
          {...this._panResponder.panHandlers}
        />
        <View style={[styles.box, { backgroundColor: "red" }]} />
        <View
          style={[
            styles.box,
            { alignSelf: "flex-end", backgroundColor: "gold" }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red"
  }
});

AppRegistry.registerComponent("App", () => App);
if (Platform.OS === "web") {
  AppRegistry.runApplication("App", {
    rootTag: document.getElementById("root")
  });
}
