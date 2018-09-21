import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { mapData } from '../mapData';

class RoomListItem extends React.Component {
  getMapThumbnail = () => {
    // remove any trace of 1.02+ from the map's name
    let cleanName = this.props.map.replace(/1.02\+\s+(.)*/, '')
    // remove ' from the map's name
    cleanName = cleanName.replace('\'', '')
    // remove NoPoker
    cleanName = cleanName.replace('NoPoker', '')
    cleanName = cleanName.trim().toLowerCase()
    //console.log(cleanName)
    if (mapData[cleanName] !== undefined) {
      return mapData[cleanName].thumbnail
    }
    else {
      return
    }
  }

  isOpenRoom = () => {
    return (this.props.totalSlots - this.props.claimedSlots > 0)
  }

  render() {
    return (
      <TouchableHighlight onPress={() => this.props.onCardPress(this.props.id)}>
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
              <Image source={{ uri: this.getMapThumbnail() }} style={{ width: 100, height: 100 }} />
            </View>

            <View style={{ alignItems: 'flex-start' }} flexWrap='wrap'>
              {
                this.props.players.map((player, i) => {
                  return <Text style={{ marginBottom: 5, paddingLeft: 10, fontSize: 12 }} key={i}>{player}</Text>
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

export default RoomListItem