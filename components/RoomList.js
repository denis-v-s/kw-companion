import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import RoomListItem from './RoomListItem'

class RoomList extends React.Component {
  onRefresh = async() => {
    await this.props.handleDataRequest(this.props.roomType)
  }

  renderItem = ({ item }) => ( <RoomListItem {...item} onCardPress={this.props.onCardPress} />);

  render() {
    return (
      <View>
        <FlatList
          data={this.props.roomList}
          renderItem={this.renderItem}
          keyExtractor={item => item.id.toString()}
          refreshing={this.props.fetchingData}
          refreshControl={<RefreshControl refreshing={this.props.fetchingData} />}
          onRefresh={() => this.onRefresh()}
          />
      </View>
    )
  }
}

export default RoomList