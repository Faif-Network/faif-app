import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CommunityScreen from './screens/Auth/Communities';
import LoginScreen from './screens/Auth/Login';
import SignUpScreen from './screens/Auth/SignUp';
import ChatScreen from './screens/Chat/Chat';
import ChatListScreen from './screens/Chat/ChatList';
import CommentScreen from './screens/Feed/Comments';
import PostDetailScreen from './screens/Feed/PostDetails';
import UploadScreen from './screens/Feed/UploadPost';
import HomeScreen from './screens/Home';

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}

function AuthScreens() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}

function MainScreens() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Faif',
        }}
      />
      <Stack.Screen name="PostDetails" component={PostDetailScreen} />
      <Stack.Screen name="ChatView" component={ChatScreen} />
      <Stack.Screen name="Comments" component={CommentScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const mockData = {
    isFetching: false,
    isAuth: true,
  };

  const Tab = createBottomTabNavigator();
  const queryClient = new QueryClient();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth: ', state.isAuthenticated);
  }, [state.isAuthenticated]);

  if (mockData.isFetching) return <SplashScreen />;

  return (
    <NavigationContainer>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {mockData.isAuth ? (
            <Tab.Navigator>
              <Tab.Screen
                name="Main"
                component={MainScreens}
                options={{
                  headerShown: false,
                  tabBarIcon: () => (
                    <Ionicons name="home" size={24} color="black" />
                  ),
                }}
              />
              <Tab.Screen
                name="Upload"
                component={UploadScreen}
                options={{
                  title: 'Nueva publicación',
                  tabBarIcon: () => (
                    <Ionicons name="add-circle" size={24} color="black" />
                  ),
                }}
              />
              <Tab.Screen
                name="ChatList"
                component={ChatListScreen}
                options={{
                  title: 'Chat',
                  tabBarIcon: () => (
                    <Ionicons name="chatbubbles" size={24} color="black" />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (
            <AuthScreens />
          )}
        </QueryClientProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
