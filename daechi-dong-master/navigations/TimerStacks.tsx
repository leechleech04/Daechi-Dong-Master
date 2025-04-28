import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimerScreen from '../screens/TimerScreen';
import AddSubjectScreen from '../screens/AddSubjectScreen';

const Stack = createNativeStackNavigator();

const TimerStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: 'modal' }}
    >
      <Stack.Screen name="TimerScreen" component={TimerScreen} />
      <Stack.Screen name="AddSubjectScreen" component={AddSubjectScreen} />
    </Stack.Navigator>
  );
};

export default TimerStacks;
