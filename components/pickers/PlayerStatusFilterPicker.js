import React, { Component } from "react";
import { 
  View,
  Picker
} from "react-native";
import * as constants from '../../constants'

class PlayerStatusFilterPicker extends Component {
  render() {
    return (
      <View>
        <Picker 
          selectedValue={this.props.playerListFilterType}
          onValueChange={(itemValue) => this.props.filterPlayers(itemValue, this.props.playerList)}
          style={{ height: 40, width: 100 }}
        >
          <Picker.Item label='all' value='all' />
          <Picker.Item label="lobby" value={constants.IN_LOBBY} />
          <Picker.Item label="in game" value={constants.IN_GAME} />
        </Picker>
      </View>
    );
  }
}
export default PlayerStatusFilterPicker;