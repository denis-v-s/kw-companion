import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Button, Segment } from 'native-base'
import { COLORS, IN_GAME, IN_ROOM, IN_LOBBY } from '../constants'

class PlayerListOptionsBar extends Component {
  state = {
    isAllActive: true,
    isInLobbyActive: false,
    isInRoomActive: false,
    isInGameActive: false
  }
  filterPlayerList = (filterType, playerList) => {
    let switches = {
      isAllActive: false,
      isInLobbyActive: false,
      isInRoomActive: false,
      isInGameActive: false
    }

    switch (filterType) {
      case null: {
        switches.isAllActive = true
        break
      }
      case IN_LOBBY: {
        switches.isInLobbyActive = true
        break
      }
      case IN_ROOM: {
        switches.isInRoomActive = true
        break
      }
      case IN_GAME: {
        switches.isInGameActive = true
        break
      }
    }

    this.setState({ ...switches })
    this.props.handleFiltering(filterType, playerList)
  }

  render() {
    let playerList = this.props.playerList
    const switches = this.state
    return (
      <View style={styles.container}>
        <Segment style={{ backgroundColor: 'transparent', marginLeft: 15 }}>

          <Button first active={switches.isAllActive}
            onPress={() => this.filterPlayerList(null, playerList)}
            style={(this.state.isAllActive) ? styles.activeButton : styles.inactiveButton}>
            <Text style={(this.state.isAllActive) ? styles.activeButtonText : styles.inactiveButtonText}>
              All
            </Text>
          </Button>

          <Button active={switches.isInLobbyActive}
            onPress={() => this.filterPlayerList(IN_LOBBY, playerList)}
            style={(this.state.isInLobbyActive) ? styles.activeButton : styles.inactiveButton}>
            <Text style={(this.state.isInLobbyActive) ? styles.activeButtonText : styles.inactiveButtonText}>
              in lobby
            </Text>
          </Button>
          <Button active={switches.isInRoomActive}
            onPress={() => this.filterPlayerList(IN_ROOM, playerList)}
            style={(this.state.isInRoomActive) ? styles.activeButton : styles.inactiveButton}>
            <Text style={(this.state.isInRoomActive) ? styles.activeButtonText : styles.inactiveButtonText}>
              in room
            </Text>
          </Button>
          <Button last active={switches.isInGameActive}
            onPress={() => this.filterPlayerList(IN_GAME, playerList)}
            style={(this.state.isInGameActive) ? styles.activeButton : styles.inactiveButton}>
            <Text style={(this.state.isInGameActive) ? styles.activeButtonText : styles.inactiveButtonText}>
              in game
            </Text>
          </Button>

        </Segment>
      </View>
    );
  }
}
export default PlayerListOptionsBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    padding: 15
  },
  inactiveButton: {
    backgroundColor: 'transparent',
    borderColor: '#ccc',
    padding: 15
  },
  activeButtonText: {
    color: 'white'
  },
  inactiveButtonText: {
    color: global.inactiveTextColor
  }
});