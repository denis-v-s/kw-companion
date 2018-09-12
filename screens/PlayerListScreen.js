import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PlayerList from '../components/PlayerList'
import { fetchPlayerListAsync, filterPlayers } from '../redux/actions/player_actions';

import NavigationHeaderTitle from '../components/NavigationHeaderTitle'
import PlayerListOptionsBar from '../components/PlayerListOptionsBar'

import { IN_GAME, IN_ROOM, IN_LOBBY } from '../constants'

import { Ionicons } from '@expo/vector-icons'

import { connect } from 'react-redux'

class PlayerListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const optionsIcon = (
      <TouchableOpacity onPress={() => navigation.getParam('toggleOptionsBar')()}>
        <Ionicons
          name='md-more'
          size={25}
          style={{ marginRight: 20 }} />
      </TouchableOpacity>
    )

    return {
      headerTitle: navigation.getParam('headerButton'),
      headerRight: optionsIcon
    }
  }

  state = {
    showOptionsBar: false
  }

  toggleOptionsBar = () => {
    this.setState({
      showOptionsBar: !this.state.showOptionsBar
    })
  }

  async componentDidMount() {
    await this.fetchPlayersAsync();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.playerListFilterType !== this.props.playerListFilterType) {
      if (this.props.playerList.length !== undefined) {
        this.getVisiblePlayers()
      }
    }
  }

  setNavigationParams = () => {
    this.props.navigation.setParams({
      headerButton: this.headerButton,
      toggleOptionsBar: this.toggleOptionsBar
    })
  }

  // navigation header element
  // TODO: better title message showing counts for each focused filter
  headerButton = () => (
      <NavigationHeaderTitle
        handleDataRequest={this.fetchPlayersAsync}
        titleMessage={ (this.props.fetchingData) 
        ? 'fetching list of players'
        : `${this.props.playerList.length} online` } />
    )

  fetchPlayersAsync = async () => {
    await this.props.fetchPlayerListAsync();
    this.getVisiblePlayers()
    this.setNavigationParams()
  }

  visiblePlayers = []
  getVisiblePlayers = () => {
    this.visiblePlayers = this.props.playerList.filter(player => player.visible === true)
  }

  // headerTitle = ''
  // getHeaderTitle = () => {
  //   let titleMessage
  //   if (this.props.fetchingData) {
  //     titleMessage = 'fetching list of players'
  //   } else {
  //     switch(this.props.playerListFilterType) {
  //       case null: {
  //         titleMessage = `${this.props.playerList.length} online`
  //         break
  //       }
  //       case IN_LOBBY: {
  //         titleMessage = `${this.playerList.length} in lobby`
  //         break
  //       }
  //       case IN_ROOM: {
  //         titleMessage = `${this.playerList.length} in room`
  //         break
  //       }
  //       case IN_GAME: {
  //         titleMessage = `${this.playerList.length} in game`
  //         break
  //       }
  //     }
  //   }
  //   this.headerTitle = titleMessage
  // }

  render() {
    return (
      <View>
        {
          this.state.showOptionsBar &&
          <PlayerListOptionsBar
            handleFiltering={this.props.filterPlayers}
            playerList={this.props.playerList} />
        }
        <PlayerList
          playerList={this.visiblePlayers}
          fetchingData={this.props.fetchingData}
          handleDataRequest={this.fetchPlayersAsync} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingData: state.player.fetchingData,
    playerList: state.player.playerList,
    playerListFilterType: state.player.playerListFilterType,
  }
};

export default connect(mapStateToProps, { fetchPlayerListAsync, filterPlayers })(PlayerListScreen)