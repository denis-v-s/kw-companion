import React from 'react'
import { View, RefreshControl } from 'react-native'
import RoomList from '../components/RoomList'
import { fetchRoomsAsync } from '../redux/actions/room_actions'
import { STAGING_ROOM } from '../constants'

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

  // array of room objects
  roomList = []

  async componentDidMount() {
    this.fetchRoomsAsync(this.props.navigation.getParam('roomType'));
  }

  componentWillMount() {

  }

  fetchRoomsAsync = async(roomType) => {
    await this.props.fetchRoomsAsync(roomType)
    this.roomList = Object.values(this.props.roomList)

    this.props.navigation.setParams({
      roomCount: this.roomList.length,
      fetchingData: this.props.fetchingData,
      fetchRoomsAsync: this.fetchRoomsAsync
    })
  }

  navigateToRoomDetail = (selectedRoomId) => {
    this.props.navigation.navigate('RoomDetailScreen',  { selectedRoomId });
  }

  render() {
    return (
      <View>
        <RoomList
          roomList={this.roomList}
          fetchingData={this.props.fetchingData}
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
  roomList: state.room.roomList,
  selectedRoomId: state.app.selectedRoomId
})

export default connect(mapStateToProps, { fetchRoomsAsync })(RoomListScreen)