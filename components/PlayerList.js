import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { List } from 'react-native-elements'

import PlayerListItem from './PlayerListItem';

import { fetchPlayerListAsync } from '../redux/actions/player_actions';
import { connect } from 'react-redux';

class PlayerList extends React.Component {
  renderItem = ({ item }) => (<PlayerListItem {...item} />);

  onRefresh = async () => await this.props.fetchPlayerListAsync(this.props.activeFilter);

  render() {
    return (
      <View style={{marginTop: -10 }}>
        <List>
          <FlatList
            data={this.props.playerList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshing={this.props.fetchingData}
            refreshControl={ <RefreshControl refreshing={this.props.fetchingData} /> }
            onRefresh={() => this.onRefresh()}
          />
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  fetchingData: state.player.fetchingData,
  playerList: state.player.filteredPlayerList,
  activeFilter: state.player.activeFilter
});

export default connect(mapStateToProps, { fetchPlayerListAsync })(PlayerList);