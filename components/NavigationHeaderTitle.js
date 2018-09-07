import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from '@expo/vector-icons'

class NavigationHeaderTitle extends Component {
  handleRefresh = (roomType = null) => {
    roomType == null
      ? this.props.handleDataRequest()
      : this.props.handleDataRequest(roomType)
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.handleRefresh(this.props.roomType)} style={{ flexDirection: 'row' }}>
          <Ionicons name='md-refresh-circle' size={20} style={{ marginRight: 10 }} />
          <Text>{this.props.titleMessage}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default NavigationHeaderTitle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});