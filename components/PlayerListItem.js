import React from 'react';
import { ListItem } from 'react-native-elements';
import { IN_GAME, IN_ROOM, IN_LOBBY } from '../constants';
import { WebBrowser } from 'expo'

class PlayerListItem extends React.Component {
  playerStatus = '';

  handleProfileView = async () => {
    await WebBrowser.openBrowserAsync('http://www.shatabrick.com/cco/kw/index.php?g=kw&a=sp&id=' + this.props.id)
  }

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
        onPress={this.handleProfileView}
      />
    );
  }
}

export default PlayerListItem;