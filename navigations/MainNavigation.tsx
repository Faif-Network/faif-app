import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AddEventScreen from '../screens/Agenda/AddEvent';
import AgendaScreen from '../screens/Agenda/Agenda';
import ChatScreen from '../screens/Chat/Chat';
import ChatListScreen from '../screens/Chat/ChatList';
import ExplorerScreen from '../screens/Explorer/Explorer';
import ExplorerInfoScreen from '../screens/Explorer/ExplorerInfo';
import NewExplorerScreen from '../screens/Explorer/NewExplorer';
import CommentsScreen from '../screens/Feed/Comments';
import PostDetailScreen from '../screens/Feed/PostDetails';
import UploadScreen from '../screens/Feed/UploadPost';
import HomeScreen from '../screens/Home';
import PrivateProfile from '../screens/Profile/PrivateProfile';
import PublicProfile from '../screens/Profile/PublicProfile';
import UpdateProfileScreen from '../screens/Profile/UpdateProfile';

function MainScreens() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Faif',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatList' as never);
              }}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetailScreen}
        options={{ title: 'Detalles' }}
      />
      <Stack.Screen
        name="ChatView"
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: 'Comentarios' }}
      />
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
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfileScreen}
        options={{ title: 'Editar perfil' }}
      />
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{ title: 'Añadir evento' }}
      />
      <Stack.Screen
        name="ExplorerInfo"
        component={ExplorerInfoScreen}
        options={{ title: 'Información' }}
      />
      <Stack.Screen
        name="NewExplorer"
        component={NewExplorerScreen}
        options={{ title: 'Añadir nuevo evento de exploración' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  return (
    <Tab.Navigator id="MainTabs" initialRouteName="Main">
      <Tab.Screen
        name="Main"
        component={MainScreens}
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={ExploreTopTabs}
        options={{
          title: 'Explorar',
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />,
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
        name="Agenda"
        component={AgendaScreen}
        options={{
          title: 'Agenda',
          tabBarIcon: () => (
            <Ionicons name="calendar" size={24} color="black" />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddEvent' as never);
              }}
            >
              <Ionicons
                name="add-circle"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
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

function ExploreTopTabs() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Universidad"
        component={ExplorerScreen}
        initialParams={{ type: 'university' }}
      />
      <Tab.Screen
        name="Viviendas"
        component={ExplorerScreen}
        initialParams={{ type: 'housing' }}
      />
      <Tab.Screen
        name="Ocio"
        component={ExplorerScreen}
        initialParams={{ type: 'leisure' }}
      />
      <Tab.Screen
        name="Erasmus"
        component={ExplorerScreen}
        initialParams={{ type: 'erasmus' }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
