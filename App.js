
import { LogFood } from './src/pages/log_food'
import { Home } from './src/pages/home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LogFood" component={LogFood} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

