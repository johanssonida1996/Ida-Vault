import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../config/colors';

import RoutineScreen from '../screens/RoutineScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import HomeScreen from '../screens/HomeScreen';
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();


export default function AppNavigator() {
   return (
      <Tab.Navigator initialRouteName="Hem">
         <Tab.Screen 
         name="Rutiner" 
         component={RoutineScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="weather-sunset-up" color={color} size={size} />
            ),
            tabBarActiveTintColor: colors.green, 
            tabBarInactiveTintColor: 'grey', 
            headerStyle: {
               backgroundColor: 'transparent',
             },
             headerTintColor: 'black',
             headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 18
             },
          }} />
         <Tab.Screen 
         name="Hem" 
         component={HomeScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarActiveTintColor: colors.green, 
            tabBarInactiveTintColor: 'grey', 
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18
            },
          }} />
         <Tab.Screen 
         name="Övningar" 
         component={ExerciseScreen}
         options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="meditation" color={color} size={size} />
            ),
            tabBarActiveTintColor: colors.green, 
            tabBarInactiveTintColor: 'grey', 
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18
            },
          }} />
     </Tab.Navigator>
     );
}
