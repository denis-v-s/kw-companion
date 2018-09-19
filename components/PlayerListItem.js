import React from 'react';
import { ListItem } from 'react-native-elements';
import { IN_GAME, IN_ROOM, IN_LOBBY } from '../constants';
import { togglePLSelectedItemModal } from '../redux/actions/app_actions'

import { connect } from 'react-redux';

class PlayerListItem extends React.Component {
  playerStatus = '';

  render() {
    switch (this.props.status) {
      case IN_LOBBY:
        this.playerStatus = 'in the main lobby';
        break;

      case IN_ROOM:
        this.playerStatus = `waiting in "${this.props.room}" room`;
        break;

      case IN_GAME:
        this.playerStatus = `playing with ${this.props.roomPlayerCount - 1} others in "${this.props.room}" game`;
        break;
    }

    return (
      <ListItem
        key={this.props.id}
        title={this.props.name}
        subtitle={this.playerStatus}
        onPress={() => this.props.togglePLSelectedItemModal(this.props.id, this.props.name)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    showPlayerModal: state.player.showPlayerModal
  }
}
export default connect(mapStateToProps, { togglePLSelectedItemModal })(PlayerListItem);