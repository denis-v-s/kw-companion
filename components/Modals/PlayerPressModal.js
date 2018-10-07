import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { THEME } from '../../constants';

import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { togglePLSelectedItemModal, openShatabrick } from '../../redux/actions/app_actions';
import { connect } from 'react-redux';

class PlayerPressModal extends Component {

  handleNavigateToShata = () => {
    this.props.togglePLSelectedItemModal(null, false);
    this.props.openShatabrick(this.props.selectedPlayerId);
  }

  handleRoomNavigation = () => {
    this.props.togglePLSelectedItemModal(showViewRoomButton = this.props.showViewRoomButton);
    this.props.onRoomNavigationPress();
  }

  togglePLSelectedItemModal = () => {
    this.props.togglePLSelectedItemModal(null, false)
  }

  render() {
    return (
      <Modal
        isVisible={this.props.showPlayerModal}
        onBackdropPress={() => this.togglePLSelectedItemModal()}
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>

        <View style={styles.modalContainer}>
          <View style={styles.closeButton}>
            <TouchableOpacity onPress={() =>this.togglePLSelectedItemModal()}>
              <MaterialCommunityIcons name='window-close' size={24} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, flexDirection: 'row' }}>
            <Button
              title='Check Shatabrick'
              onPress={() => this.handleNavigateToShata()}
              backgroundColor={THEME.background.primary}
              borderRadius={5}
            />

            { // hide view room button if popup is triggered from within a room
              this.props.showViewRoomButton && <Button
                title={'View room'}
                backgroundColor={THEME.background.primary}
                borderRadius={5}
                onPress={() => this.handleRoomNavigation()}
              />
            }
          </View>
        </View>

      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height: 120,
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
});

const mapStateToProps = state => {
  return {
    showPlayerModal: state.app.showPlayerModal,
    showViewRoomButton: state.app.showViewRoomButton,
    selectedPlayerId: state.app.selectedPlayerId
  }
}
export default connect(mapStateToProps, {
  togglePLSelectedItemModal,
  openShatabrick
})(PlayerPressModal);