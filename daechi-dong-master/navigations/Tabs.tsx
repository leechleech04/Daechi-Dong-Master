import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from '../screens/TimerScreen';
import TodoScreen from '../screens/TodoScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import SettingScreen from '../screens/SettingScreen';
import ClassScreen from '../screens/ClassScreen';
import { Ionicons } from '@expo/vector-icons';
import colors from '../colors';
import TimerStacks from './TimerStacks';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.lightBlue,
        tabBarLabelStyle: {
          marginTop: 3,
        },
      }}
    >
      <Tab.Screen
        name="Timer"
        component={TimerStacks}
        options={{
          title: '타이머',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'stopwatch' : 'stopwatch-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          title: '할 일',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          title: '시간표',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Class"
        component={ClassScreen}
        options={{
          title: '수업',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'school' : 'school-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: '설정',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
