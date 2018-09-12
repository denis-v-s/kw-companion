import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { List } from 'react-native-elements'

import PlayerListItem from './PlayerListItem';

class PlayerList extends React.Component {
  renderItem = ({ item }) => (<PlayerListItem {...item} />);

  onRefresh = async () => {
    await this.props.handleDataRequest()
  }

  render() {
    return (
      <View style={{marginTop: -10}}>
        <List>
          <FlatList
            data={this.props.playerList}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={this.props.fetchingData} />}
            refreshing={this.props.fetchingData}
            onRefresh={() => this.onRefresh()}
          />
        </List>
      </View>
    );
  }
}

export default PlayerList;