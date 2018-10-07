import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { ButtonGroup } from 'react-native-elements';
import { IN_GAME, IN_ROOM, IN_LOBBY, THEME } from '../constants';

import { filterPlayers } from '../redux/actions/player_actions';
import { connect } from 'react-redux';

class PlayerListOptionsBar extends Component {
  state = {
    selectedIndex: 0
  }


  componentWillMount() {
    this.animatedMargin = new Animated.Value(-10);
    this.animatedMargin2 = new Animated.Value(0);
  }

  componentWillUpdate(prevProps) {
    if (this.props.optionsBarVisibile !== prevProps.optionsBarVisibile) {
      let selectedIndex;
      switch (this.props.activeSwitch) {
        case null: {
          selectedIndex = 0;
          break;
        }
        case IN_LOBBY: {
          selectedIndex = 1;
          break;
        }
        case IN_ROOM: {
          selectedIndex = 2;
          break;
        }
        case IN_GAME: {
          selectedIndex = 3;
          break;
        }
      }
      this.setState({ selectedIndex });

      let startMargin1 = -10;
      let startMargin2 = -200;
      let endMargin1 = 50;
      let endMargin2 = 0;

      // reverse animation if options bar is about to be hidden
      if (this.props.optionsBarVisibile) {
        startMargin1 = 50;
        startMargin2 = 0;
        endMargin1 = -10;
        endMargin2 = -200;
      }

      this.animatedMargin = new Animated.Value(startMargin1);
      this.animatedMargin2 = new Animated.Value(startMargin2);
      Animated.parallel([
        Animated.spring(this.animatedMargin, {
          toValue: endMargin1,
          duration: 250
        }),
        Animated.spring(this.animatedMargin2, {
          toValue: endMargin2,
          duration: 250
        })
      ]).start();
    }
  }

  handleFiltering = (selectedIndex) => {
    this.setState({ selectedIndex });

    switch (selectedIndex) {
      case 0: {
        this.props.filterPlayers(null);
        break;
      }
      case 1: {
        this.props.filterPlayers(IN_LOBBY)
        break;
      }
      case 2: {
        this.props.filterPlayers(IN_ROOM);
        break;
      }
      case 3: {
        this.props.filterPlayers(IN_GAME);
        break;
      }
    }
  }

  render() {
    const buttons = ['ALL', 'IN LOBBY', 'IN ROOM', 'IN GAME'];
    return (
      //this.props.optionsBarVisibile &&
      <Animated.View style={[styles.container, { marginBottom: this.animatedMargin }]} >
        <Animated.View style={{ marginTop: this.animatedMargin2 }}>
          <ButtonGroup
            buttons={buttons}
            selectedIndex={this.state.selectedIndex}
            onPress={this.handleFiltering}
            selectedButtonStyle={{ backgroundColor: THEME.background.primary }}
            selectedTextStyle={{ color: THEME.text.active }}
          />
        </Animated.View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  activeSwitch: state.player.activeFilter,
  optionsBarVisibile: state.app.showPlayerListOptionsBar
})

export default connect(mapStateToProps, { filterPlayers })(PlayerListOptionsBar);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1
  }
});