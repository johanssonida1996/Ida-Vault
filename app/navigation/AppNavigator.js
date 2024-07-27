import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';


const Tab = createBottomTabNavigator();


export default function AppNavigator() {
   return (
      <Tab.Navigator>
         <Tab.Screen name="Hem" component={HomeScreen} />
         <Tab.Screen name="Övrigt" component={DetailsScreen} />
     </Tab.Navigator>
     );
}
