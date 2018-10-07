import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { getMapThumbnail } from '../utility';
import { selectRoom } from '../redux/actions/app_actions';
import { getRoomDataByRoomId } from '../redux/actions/room_actions';

import { connect } from 'react-redux';

class RoomListItem extends React.Component {
  thumbnail = getMapThumbnail(this.props.map);

  isOpenRoom = () => {
    return (this.props.totalSlots - this.props.claimedSlots > 0)
  }

  handleCardPress = () => {
    this.props.selectRoom(this.props.id);
    this.props.getRoomDataByRoomId(this.props.id);
    this.props.onCardPress();
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.handleCardPress()}>
        <Card>
          {/* card header */}
          <View style={{ marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderColor: '#ccc', flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text style={{ width: "20%" }}>Room:</Text>
              <Text style={{ width: '61%' }}>{this.props.title}</Text>
              <Badge containerStyle={this.isOpenRoom() ? styles.openRoomBadge : styles.closedRoomBadge}>
                <Text style={this.isOpenRoom() ? { color: '#000' } : { color: '#fff' }}>{this.props.claimedSlots} / {this.props.totalSlots}</Text>
              </Badge>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: "20%" }}>Map:</Text>
              <Text>{this.props.map}</Text>
            </View>
          </View>

          {/* card body */}
          <View style={{ flexDirection: 'row', height: 100 }}>
            <View style={{ width: '33%' }}>
              <Image
                source={{ uri: this.thumbnail }}
                //resizeMode='cover'
                style={{
                  width: 100, height: 100,
                  borderWidth: 1, borderRadius: 3, borderColor: '#ddd'
                }}
              />
            </View>

            <View style={{ alignItems: 'flex-start' }} flexWrap='wrap'>
              {
                this.props.players.map((player, i) => {
                  return <Text style={{ marginBottom: 5, paddingLeft: 10, fontSize: 12 }} key={i}>{player.name}</Text>
                })
              }
            </View>
          </View>
        </Card>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  openRoomBadge: {
    backgroundColor: '#e8faea', borderWidth: 1, borderColor: '#29c233'
  },
  closedRoomBadge: {
    backgroundColor: '#000', borderWidth: 0
  }
})

const mapStateToProps = state => ({
  //selectRoom: state.app.selectRoom,
  //selectedRoomId: state.app.selectedRoomId
  roomData: state.room.roomData
})

export default connect(mapStateToProps, {
  selectRoom,
  getRoomDataByRoomId
})(RoomListItem);