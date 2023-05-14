import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import ChatScreen from './screens/Chat';
import CommentScreen from './screens/Comments';
import CommunityScreen from './screens/Communities';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import PostDetail from './screens/PostDetails';
import SignUpScreen from './screens/SignUp';

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
  const { auth } = useContext(AuthContext);

  if (mockData.isFetching) return <SplashScreen />;

  return (
    <AuthProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            {auth ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PostDetails" component={PostDetail} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Comments" component={CommentScreen} />
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
                <Stack.Screen
                  name="Communities"
                  component={CommunityScreen}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </QueryClientProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
