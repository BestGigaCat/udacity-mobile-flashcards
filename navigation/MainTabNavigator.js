import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DeckOverviewScreen from "../screens/DeckOverviewScreen";
import QuizScreen from "../screens/QuizScreen";
import AddCardScreen from "../screens/AddCardScreen";
import AddDeckScreen from "../screens/AddDeckScreen";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    DeckOverview: DeckOverviewScreen,
    QuizScreen: QuizScreen,
    AddCardScreen: AddCardScreen,
    AddDeckScreen: AddDeckScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    SettingsStack,
});
