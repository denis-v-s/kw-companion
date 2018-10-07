import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PlayerList from '../components/PlayerList'
import PlayerPressModal from '../components/Modals/PlayerPressModal'
import { fetchPlayerListAsync, filterPlayers } from '../redux/actions/player_actions';
import { togglePLOptionsBar } from '../redux/actions/app_actions';
import { getRoomDataByPlayerId } from '../redux/actions/room_actions';

import { IN_LOBBY, IN_GAME, IN_ROOM } from '../constants';

import NavigationHeaderTitle from '../components/NavigationHeaderTitle';
import PlayerListOptionsBar from '../components/PlayerListOptionsBar';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

class PlayerListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const optionsIcon = (
      <TouchableOpacity onPress={() => navigation.getParam('toggleOptionsBar')()} style={{ paddingHorizontal: 20 }}>
        <Ionicons
          name='md-more'
          size={25} />
      </TouchableOpacity>
    )

    return {
      headerTitle: navigation.getParam('headerButton'),
      headerRight: optionsIcon
    }
  }

  async componentWillMount() {
    await this.fetchPlayersAsync();
  }
  // componentDidMount() {
  //   this.refreshingSubscription = this.props.navigation.addListener('willFocus', () => {
  //     this.refreshing = this.props.fetchingData;
  //   });
  // }
  // componentWillUnmount() {
  //   this.refreshingSubscription.remove();
  // }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      headerButton: this.headerButton,
      toggleOptionsBar: this.props.togglePLOptionsBar
    })
  }

  // navigation header element
  // TODO: better title message showing counts for each focused filter
  headerButton = () => {
    let titleMessage;
    switch (this.props.activeFilter) {
      case null: {
        titleMessage = `${this.props.playerList.length} online`;
        break;
      }
      case IN_LOBBY: {
        titleMessage = `${this.props.playerList.length} in lobby`;
        break;
      }
      case IN_ROOM: {
        titleMessage = `${this.props.playerList.length} in room`;
        break;
      }
      case IN_GAME: {
        titleMessage = `${this.props.playerList.length} in game`;
        break;
      }
    }

    return (<NavigationHeaderTitle
      handleDataRequest={this.fetchPlayersAsync}
      titleMessage={titleMessage}
    // titleMessage={
    //   (this.props.fetchingData)
    //     ? 'fetching list of players'
    //     : `${this.props.playerList.length} online`
    // }
    />);
  };

  fetchPlayersAsync = async () => {
    await this.props.fetchPlayerListAsync(this.props.activeFilter);
    this.setNavigationParams();
  }

  navigateToRoomDetail = () => {
    this.props.getRoomDataByPlayerId(this.props.selectedPlayerId);
    this.props.navigation.navigate('RoomDetailScreen');
  }

  render() {
    return (
      <View>
        <PlayerPressModal onRoomNavigationPress={this.navigateToRoomDetail} />
        {
          //this.props.showOptionsBar && <PlayerListOptionsBar />
          <PlayerListOptionsBar />
        }
        <PlayerList handleDataRequest={this.fetchPlayersAsync}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  fetchingData: state.player.fetchingData,
  playerList: state.player.filteredPlayerList,
  activeFilter: state.player.activeFilter,
  showOptionsBar: state.app.showPlayerListOptionsBar,
  selectedPlayerId: state.app.selectedPlayerId
});

export default connect(mapStateToProps, {
  fetchPlayerListAsync,
  filterPlayers,
  togglePLOptionsBar,
  getRoomDataByPlayerId
})(PlayerListScreen)