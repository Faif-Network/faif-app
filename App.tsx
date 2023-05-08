import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import HomeScreen from './screens/Home'
import LoginScreen from './screens/Login'
import SignUpScreen from './screens/SignUp'

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  )
}

function App() {
  const mockData = {
    isFetching: false,
    isAuth: true,
  }

  const Stack = createNativeStackNavigator()

  if (mockData.isFetching) return <SplashScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {mockData.isAuth ? (
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: 'Faif Network',
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
