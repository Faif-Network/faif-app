import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Text, View } from 'react-native';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import ChatScreen from './screens/Chat';
import PostDetail from './screens/PostDetails';

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}

function App() {
  const mockData = {
    isFetching: false,
    isAuth: true,
  };

  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  if (mockData.isFetching) return <SplashScreen />;

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          {mockData.isAuth ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="PostDetails" component={PostDetail} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
