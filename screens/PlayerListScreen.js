import React from 'react'
import { View, Picker } from 'react-native'
import PlayerList from '../components/PlayerList'
import { fetchPlayerListAsync, filterPlayers } from '../redux/actions/player_actions';

import NavigationHeaderTitle from '../components/NavigationHeaderTitle'
import PlayerStatusFilterPicker from '../components/pickers/PlayerStatusFilterPicker'

import { connect } from 'react-redux'

class PlayerListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const playerStatusFilterPicker = (
      <PlayerStatusFilterPicker
        playerListFilterType={navigation.getParam('playerListFilterType')}
        filterPlayers={navigation.getParam('filterPlayers')}
        playerList={navigation.getParam('playerList')}
      />
    )

    return {
      headerTitle: navigation.getParam('headerButton'),
      headerRight: playerStatusFilterPicker
    }
  }

  async componentDidMount() {
    await this.fetchPlayersAsync();
  }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      headerButton: this.headerButton,
      playerList: this.props.playerList,
      playerListFilterType: this.props.playerListFilterType,
      filterPlayers: this.props.filterPlayers
    })
  }

  // navigation header element
  headerButton = () => (
    <NavigationHeaderTitle
      handleDataRequest={this.fetchPlayersAsync}
      titleMessage={(this.props.fetchingData) ? 'fetching list of players' : `${this.props.playerList.length} online`}
    />
  )

  fetchPlayersAsync = async () => {
    await this.props.fetchPlayerListAsync();
    this.setNavigationParams()
  }

  render() {
    return (
      <View>
        <PlayerList
          playerList={this.props.playerList}
          fetchingData={this.props.fetchingData}
          handleDataRequest={this.fetchPlayersAsync}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingData: state.player.fetchingData,
    playerList: state.player.playerList,
    unfilteredPlayerList: state.player.unfilteredPlayerList,
    playerListFilterType: state.player.playerListFilterType
  }
};

export default connect(mapStateToProps, { fetchPlayerListAsync, filterPlayers })(PlayerListScreen)