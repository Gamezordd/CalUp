import React, {Component} from 'react'
import Backup from './BackupComponent'
import CalendarManagement from './CalendarManagementComponent'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'

export default class Main extends Component {

    render() {
        const Tab = createBottomTabNavigator();
        return(
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="CalendarManagement">
                    <Tab.Screen name="Backup" component={Backup}/>
                    <Tab.Screen name="CalendarManagement" component={CalendarManagement}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}