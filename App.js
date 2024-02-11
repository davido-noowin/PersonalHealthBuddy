
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, LogExercise, LogFood, LogWellness} from './src/phb_pages'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LogFood" component={LogFood} />
        <Stack.Screen name="LogExercise" component={LogExercise} />
        <Stack.Screen name="LogWellness" component={LogWellness} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

