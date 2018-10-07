import React from 'react'
import { View, RefreshControl } from 'react-native'
import RoomList from '../components/RoomList'
import { fetchRoomsAsync, getRoomDataByRoomId } from '../redux/actions/room_actions'
import { STAGING_ROOM, ACTIVE_MATCH } from '../constants'

import NavigationHeaderTitle from '../components/NavigationHeaderTitle'

import { connect } from 'react-redux'

class RoomListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const fetchingData = navigation.getParam('fetchingData', true)
    const roomType = navigation.getParam('roomType')
    const roomCount = navigation.getParam('roomCount')
    const fetchRoomsAsync = navigation.getParam('fetchRoomsAsync')

    let titleMessage = (roomType === STAGING_ROOM) ? `${roomCount} rooms hosted` : `${roomCount} active games`

    if (fetchingData) {
      titleMessage = (roomType === STAGING_ROOM) ? 'loading list of rooms' : 'loading list of active games'
    }

    const headerButton = (
      <NavigationHeaderTitle handleDataRequest={fetchRoomsAsync} titleMessage={titleMessage} roomType={roomType} />
    )

    return {
      headerTitle: headerButton
    }
  }

  async componentWillMount() {
    this.fetchRoomsAsync();
  }
  // componentDidMount() {
  //   this.refreshingSubscription = this.props.navigation.addListener('willFocus', () => {
  //     this.refreshing = this.props.fetchingData;
  //   });
  // }
  // componentWillUnmount() {
  //   this.refreshingSubscription.remove();
  // }

  fetchRoomsAsync = async () => {
    await this.props.fetchRoomsAsync();

    let roomType = this.props.navigation.getParam('roomType');
    this.roomList = (roomType === ACTIVE_MATCH)
      ? Object.values(this.props.activeGames)
      : Object.values(this.props.stagingRooms);

    this.props.navigation.setParams({
      roomCount: this.roomList.length,
      fetchingData: this.props.fetchingData,
      fetchRoomsAsync: this.fetchRoomsAsync
    });
  }

  navigateToRoomDetail = () => {
    //this.props.getRoomDataByRoomId(this.props.selectedRoomId);
    this.props.navigation.navigate('RoomDetailScreen');
  }

  render() {
    return (
      <View>
        <RoomList
          roomList={this.roomList}
          roomType={this.props.navigation.getParam('roomType')}
          onCardPress={this.navigateToRoomDetail}
          handleDataRequest={this.fetchRoomsAsync}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fetchingData: state.room.fetchingData,
  activeGames: state.room.activeGames,
  stagingRooms: state.room.stagingRooms,
  selectedRoomId: state.app.selectedRoomId
})

export default connect(mapStateToProps, { fetchRoomsAsync, getRoomDataByRoomId })(RoomListScreen)