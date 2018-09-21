import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class RoomDetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>RoomListItemDetail</Text>
        <Text>{this.props.navigation.getParam('selectedRoomId')}</Text>
      </View>
    );
  }
}
export default RoomDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});