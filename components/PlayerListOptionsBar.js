import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { Button, Segment, Text } from 'native-base'
import { COLORS, IN_GAME, IN_ROOM, IN_LOBBY } from '../constants'

class PlayerListOptionsBar extends Component {
  state = {
    activeSwitch: null,
    isAllActive: true,
    isInLobbyActive: false,
    isInRoomActive: false,
    isInGameActive: false
  }
  filterPlayerList = (filterType, playerList) => {
    this.setState({ activeSwitch: filterType })
    this.props.handleFiltering(filterType, playerList)
  }

  render() {
    let playerList = this.props.playerList
    let activeSwitch = this.state.activeSwitch
    return (
      <View style={styles.container}>
        <Segment style={{ backgroundColor: 'transparent', marginLeft: 15 }}>

          <Button first active={activeSwitch === null}
            onPress={() => this.filterPlayerList(null, playerList)}>
            <Text style={styles.buttonText}>
              ALL
            </Text>
          </Button>

          <Button active={activeSwitch === IN_LOBBY}
            onPress={() => this.filterPlayerList(IN_LOBBY, playerList)}>
            <Text style={styles.buttonText}>
              IN LOBBY
            </Text>
          </Button>

          <Button active={activeSwitch === IN_ROOM}
            onPress={() => this.filterPlayerList(IN_ROOM, playerList)}>
            <Text style={styles.buttonText}>
              IN ROOM
            </Text>
          </Button>

          <Button last active={activeSwitch === IN_GAME}
            onPress={() => this.filterPlayerList(IN_GAME, playerList)}>
            <Text style={styles.buttonText}>
              IN GAME
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
  buttonText: {
    paddingHorizontal: 15
  }
});