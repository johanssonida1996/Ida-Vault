import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator'

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import seedRoutines from './app/config/routines';
import seedExercises from './app/config/exercises';
import seedBooks from './app/config/booksAndOther';

const App = () => {
  useEffect(() => {
    // Anropa seedRoutines när appen startar
    //seedRoutines();
    //seedExercises();
    //seedBooks();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;