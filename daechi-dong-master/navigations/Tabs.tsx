import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from '../screens/TimerScreen';
import TodoScreen from '../screens/TodoScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TimerScreen" component={TimerScreen} />
      <Tab.Screen name="TodoScreen" component={TodoScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
