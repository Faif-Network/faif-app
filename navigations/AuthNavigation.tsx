import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CommunityScreen from '../screens/Auth/Communities';
import CompleteProfileScreen from '../screens/Auth/CompleteProfile';
import LoginScreen from '../screens/Auth/Login';
import RestorePassword from '../screens/Auth/RestorePassword';
import SignUpScreen from '../screens/Auth/SignUp';

function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login" id="AuthStack">
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
        name="RestorePassword"
        component={RestorePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompleteProfile"
        component={CompleteProfileScreen}
        options={{ headerShown: false, title: 'Completa tu perfil' }}
        initialParams={{
          userId: null,
        }}
      />
      <Stack.Screen
        name="Communities"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
