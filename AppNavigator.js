import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { TouchableOpacity } from 'react-native'

import { ACTIVE_MATCH, STAGING_ROOM } from './constants'

import RoomListScreen from './screens/RoomListScreen';
import PlayerListScreen from './screens/PlayerListScreen';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
// import FontAwesome from './node_modules/@expo/vector-icons/fonts/FontAwesome.ttf';
// import MaterialCommunityIcons from './node_modules/@expo/vector-icons/fonts/MaterialCommunityIcons.ttf';
// import Ionicons from './node_modules/@expo/vector-icons/fonts/Ionicons.ttf';

const PlayerNavigator = createStackNavigator({
  PlayerListScreen: {
    screen: PlayerListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ paddingHorizontal: 10 }}>
          <MaterialCommunityIcons name='menu' size={25} />
        </TouchableOpacity>
      )
    })
  }
}, {
    headerLayoutPreset: 'center'
  });

const StagingGamesNavigator = createStackNavigator({
  RoomListScreen: {
    screen: RoomListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ paddingHorizontal: 10 }}>
          <MaterialCommunityIcons name='menu' size={25} />
        </TouchableOpacity>
      )
    })
  }
}, {
    initialRouteParams: {
      roomType: STAGING_ROOM
    },
    headerLayoutPreset: 'center'
  });

const GamesInProgressNavigator = createStackNavigator({
  RoomListScreen: {
    screen: RoomListScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ paddingHorizontal: 10 }}>
          <MaterialCommunityIcons name='menu' size={25} />
        </TouchableOpacity>
      )
    })
  }
}, {
    initialRouteParams: {
      roomType: ACTIVE_MATCH
    },
    headerLayoutPreset: 'center'
  });

const TabNavigator = createMaterialTopTabNavigator({
  PlayersTab: {
    screen: PlayerNavigator,
    navigationOptions: {
      title: 'Players',
      tabBarIcon: ({ tintColor }) => (<FontAwesome name='group' size={20} color={tintColor} />),
    }
  },
  StagingGamesTab: {
    screen: StagingGamesNavigator,
    navigationOptions: {
      title: 'Lobby',
      tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name='home-circle' size={25} color={tintColor} />),
    }
  },
  GamesInProgressTab: {
    screen: GamesInProgressNavigator,
    navigationOptions: {
      title: 'Games',
      tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name='xbox-controller' size={25} color={tintColor} />),
    }
  }
}, {
    initialRouteName: 'PlayersTab',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#a41034',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderColor: '#ccc'
      },
      indicatorStyle: {
        backgroundColor: '#a41034'
      },
      labelStyle: {
        fontSize: 8
      }
    }
  });

// main navigator that houses sub-navigators
export default createDrawerNavigator({
  Home: TabNavigator,
});