import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal
} from "react-native";

class PlayerFilterModal extends Component {

  render() {
    return (
      <View style={{ marginTop: 22, height: 50 }}>
        <Modal 
        animationType='slide' 
        visible={false} 
        onRequestClose={() => console.log('modal closed')}
        transparent={true}>
          <View style={{ marginTop: 22 }}>
            <Text>PlayerFilterModal</Text>
          </View>
        </Modal>
      </View>
    );
  }
}
export default PlayerFilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});