import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, Image, Animated } from "react-native";
import { ButtonGroup, Button, CheckBox } from 'react-native-elements';
import { THEME } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

import { getRandomMap } from '../redux/actions/map_actions';
import { connect } from 'react-redux';

import randomMapThumbnail from '../assets/images/RandomMapThumbnail.jpg';

const DURATION = 1000;

class RandomMapPickerScreen extends Component {
  state = {
    selectedIndex: 3,
    showPropThumbnail: true,
    plusVersion: true,
  }

  handleSelection = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  handleRandomMapRequest = () => {
    switch (this.state.selectedIndex) {
      case 0: {
        // 2 player maps / 1v1
        this.props.getRandomMap(2, this.props.randomMap, this.state.plusVersion);
        break;
      }
      case 1: {
        // 4 player maps / 2v2
        this.props.getRandomMap(4, this.props.randomMap, this.state.plusVersion);
        break;
      }
      case 2: {
        // 6 player maps / 3v3
        this.props.getRandomMap(6, this.props.randomMap, this.state.plusVersion);
        break;
      }
      case 3: {
        // 8 player maps / 4v4
        this.props.getRandomMap(8, this.props.randomMap, this.state.plusVersion);
        break;
      }
    }
    this.setState({ showPropThumbnail: false })

    this.animatedScale = new Animated.Value(1.5);
    this.animatedOpacity = new Animated.Value(0);

    Animated.parallel([
      Animated.timing(this.animatedScale, {
        toValue: 1,
        duration: DURATION
      }),
      Animated.timing(this.animatedOpacity, {
        toValue: 1,
        duration: DURATION
      })
    ]).start();
  }

  handleSwitchFlip = () => this.setState(oldState => {
    return { plusVersion: !oldState.plusVersion }
  })

  render() {
    const buttons = ['1v1', '2v2', '3v3', '4v4'];
    return (
      <ScrollView style={styles.container} >
        <View style={{ flex: 1, marginTop: 10 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center', alignItems: 'center',
            marginBottom: 5
          }}>
            <CheckBox
              center
              title='R13 only?'
              checked={this.state.plusVersion}
              onPress={() => this.handleSwitchFlip()}
              iconType='material'
              checkedColor={THEME.background.primary}
              checkedIcon='check-box'
              uncheckedIcon='check-box-outline-blank'
              containerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <ButtonGroup
              buttons={buttons}
              selectedIndex={this.state.selectedIndex}
              onPress={this.handleSelection}
              selectedButtonStyle={{ backgroundColor: THEME.background.primary }}
              selectedTextStyle={{ color: THEME.text.active }}
            />
          </View>

          <Button
            title='Random Map'
            backgroundColor={THEME.background.primary}
            onPress={() => this.handleRandomMapRequest()}
          />

        </View>
        <View style={{ flex: 1, width: '100%', justifyContent: 'flex-start', marginTop: 20 }}>
          { // default thumbnail that's visible prior to random map request by user
            this.state.showPropThumbnail &&
            <Image
              source={randomMapThumbnail}
              resizeMode='cover'
              style={{
                height: 300, width: undefined,
                borderRadius: 3, borderWidth: 2, borderColor: '#ccc'
              }}
            />
          }
          {
            !this.state.showPropThumbnail &&
            <Animated.View style={{
              transform: [ {scale: this.animatedScale} ],
              opacity: this.animatedOpacity
              }}
            >
              <Text style={{ marginBottom: 10, alignSelf: 'center', fontSize: 24 }}>
                {this.props.randomMap.map.replace(/\b\w/g, l => l.toUpperCase())}
              </Text>
              <Image
                source={{ uri: this.props.randomMap.thumbnail }}
                resizeMode='cover'
                style={{
                  height: 300, width: undefined,
                  borderRadius: 3, borderWidth: 2, borderColor: '#ccc'
                }}
              />
            </Animated.View>
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  randomMap: state.map.randomMap
});

export default connect(mapStateToProps, {
  getRandomMap
})(RandomMapPickerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40
  }
});