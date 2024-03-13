import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as Pages from './src/phb_pages'
import { useState } from 'react';
import { AuthContext } from './authContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();




export default function App() {

  const [currentUser, setCurrentUser] = useState("")

   return (
     <NavigationContainer>
      <AuthContext.Provider value={{
        currentUser,
        setCurrentUser
      }}
      >

      {currentUser ? (
        <Drawer.Navigator initialRouteName='Home'>
          <Drawer.Screen name="Home" component={Pages.HomePage} />
          <Drawer.Screen name="Food" component={Pages.ViewFoodPage} />
          <Drawer.Screen name="Exercise" component={Pages.ViewExercisePage} />
          <Drawer.Screen name="Wellness" component={Pages.ViewWellnessPage} />
          <Drawer.Screen name="Log Data" component={Pages.LogDataPage} />

        </Drawer.Navigator>
        ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Pages.LoginPage} />
          <Stack.Screen name="CreateAccount" component={Pages.CreateAccountPage} />
        </Stack.Navigator>
      )}
      </AuthContext.Provider>
     </NavigationContainer>
   );
  
}

