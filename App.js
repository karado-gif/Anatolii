import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/config';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import CarListScreen from './src/screens/CarListScreen';
import CarDetailScreen from './src/screens/CarDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ForumScreen from './src/screens/ForumScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1a1a1a',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Karado' }}
            />
            <Stack.Screen 
              name="Search" 
              component={SearchScreen} 
              options={{ title: 'Поиск авто' }}
            />
            <Stack.Screen 
              name="CarList" 
              component={CarListScreen} 
              options={{ title: 'Результаты поиска' }}
            />
            <Stack.Screen 
              name="CarDetail" 
              component={CarDetailScreen} 
              options={{ title: 'Детали авто' }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={{ title: 'Личный кабинет' }}
            />
            <Stack.Screen 
              name="Forum" 
              component={ForumScreen} 
              options={{ title: 'Форум' }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen} 
              options={{ title: 'Уведомления' }}
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen} 
              options={{ title: 'Оплата' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </I18nextProvider>
  );
} 