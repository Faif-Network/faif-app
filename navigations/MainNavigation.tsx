import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from '../screens/Chat/Chat';
import ChatListScreen from '../screens/Chat/ChatList';
import CommentsScreen from '../screens/Feed/Comments';
import PostDetailScreen from '../screens/Feed/PostDetails';
import UploadScreen from '../screens/Feed/UploadPost';
import HomeScreen from '../screens/Home';
import PrivateProfile from '../screens/Profile/PrivateProfile';
import PublicProfile from '../screens/Profile/PublicProfile';
import UpdateProfileScreen from '../screens/Profile/UpdateProfile';

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
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        initialParams={{
          userId: null,
        }}
        options={{
          title: 'Perfil',
        }}
      />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={MainScreens}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
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
      <Tab.Screen
        name="PrivateProfile"
        component={PrivateProfile}
        options={{
          title: 'Perfil',
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
