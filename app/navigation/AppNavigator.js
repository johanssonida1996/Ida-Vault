import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen() {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Home Screen</Text>
     </View>
   );
 }

 function DetailsScreen() {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Details Screen</Text>
     </View>
   );
 }



export default function AppNavigator() {
   return (
      <Tab.Navigator>
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Details" component={DetailsScreen} />
     </Tab.Navigator>
     );
}
