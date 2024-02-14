
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Pages from './src/phb_pages'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Pages.HomePage} />
        <Stack.Screen name="LogFood" component={Pages.LogFoodPage} />
        <Stack.Screen name="LogExercise" component={Pages.LogExercisePage} />
        <Stack.Screen name="LogWellness" component={Pages.LogWellnessPage} />
        <Stack.Screen name="Login" component={Pages.LoginPage} />
        <Stack.Screen name="CreateAccount" component={Pages.CreateAccountPage} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

