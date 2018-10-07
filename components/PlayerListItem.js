import React from 'react';
import { ListItem } from 'react-native-elements';
import { IN_GAME, IN_ROOM, IN_LOBBY } from '../constants';
import { togglePLSelectedItemModal, selectPlayer } from '../redux/actions/app_actions';

import { connect } from 'react-redux';

class PlayerListItem extends React.Component {
  componentWillMount() {
    switch (this.props.status) {
      case IN_LOBBY:
        this.playerStatus = 'in the main lobby';
        break;

      case IN_ROOM:
        this.playerStatus = `waiting in "${this.props.room}" room`;
        break;

      case IN_GAME:
        this.playerStatus = `playing with ${this.props.roomPlayerCount} others in "${this.props.room}" game`;
        break;
    }
  }

  handlePlayerSelection = () => {
    this.props.selectPlayer(this.props.id);
    let showRoomButton = true;
    if (this.props.status == IN_LOBBY) {
      showRoomButton = false;
    }
    this.props.togglePLSelectedItemModal(this.props.id, showRoomButton);
  }

  render() {
    return (
      <ListItem
        title={this.props.name}
        subtitle={this.playerStatus}
        onPress={() => this.handlePlayerSelection()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    showPlayerModal: state.player.showPlayerModal
  }
}
export default connect(mapStateToProps, {
  togglePLSelectedItemModal,
  selectPlayer
})(PlayerListItem);