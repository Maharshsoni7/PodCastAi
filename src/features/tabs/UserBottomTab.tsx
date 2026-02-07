
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import SearchScreen from '../search/SearchScreen';
import FavouriteScreen from '../favourite/FavouriteScreen';


const Tab = createBottomTabNavigator();
const UserBottomTab: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Favourite" component={FavouriteScreen} />
        </Tab.Navigator >
    );
}
export default UserBottomTab;
