import React, { Component } from "react";
import { View, ScrollView, Image, FlatList, StyleSheet } from "react-native";
import { getMapThumbnail, getMapSpikeCount, getMapPlayerCount } from '../utility';
import { List, ListItem, Text } from 'react-native-elements';

import { openShatabrick, togglePLSelectedItemModal } from '../redux/actions/app_actions';

import { connect } from 'react-redux';

class RoomDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('roomTitle')
    }
  }



  handleListItemPress = (id) => {
    this.props.togglePLSelectedItemModal(id, false)
  }

  renderItem = ({ item }) => (
    <ListItem title={item.name} onPress={() => this.handleListItemPress(item.id)} />
  );

  componentWillMount() {
    this.playerList = this.players = this.props.roomData.players.map(player =>
      this.props.playerList.find(p => p.name === player.name)
    );

    this.thumbnail = getMapThumbnail(this.props.roomData.map);
    this.players = getMapPlayerCount(this.props.roomData.map);
    this.spikes = getMapSpikeCount(this.props.roomData.map);
    this.props.navigation.setParams({ roomTitle: this.props.roomData.title });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <PlayerPressModal showViewRoomButton={false} /> */}
        <View>
          <List>
            <FlatList
              data={this.playerList}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </List>
        </View>

        <View style={{ paddingVertical: 20 }}>
          <Text h4>About the Map</Text>
        </View>
        <Text style={{paddingBottom: 5}}>Title: {this.props.roomData.map}</Text>
        <Text style={{paddingBottom: 5}}>Players: {this.players}</Text>
        <Text style={{paddingBottom: 5}}>Spikes: {this.spikes}</Text>
        <Text>Tiberium: ?</Text>
        <View style={{ paddingVertical: 20 }}>
          <Text h4>Gallery</Text>
        </View>
        <View style={{ flex: 1, height: 300, marginBottom: 50 }}>
          <Image
            source={{ uri: this.thumbnail }}
            resizeMode='contain'
            style={{ flex: 1, alignSelf: 'center', width: '98%', height: null }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  }
});

const mapStateToProps = state => ({
  playerList: state.player.playerList,
  roomData: state.room.roomData,
  selectedRoomId: state.app.selectedRoomId,
  showViewRoomButton: state.app.showViewRoomButton,
})
export default connect(mapStateToProps, {
  openShatabrick,
  togglePLSelectedItemModal,
})(RoomDetailScreen);