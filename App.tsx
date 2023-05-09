import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import LoginScreen from './screens/Login'
import SignUpScreen from './screens/SignUp'
import Upload from './screens/UploadPost'


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

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
    isAuth: false,
  }

  const Stack = createNativeStackNavigator()

  if (mockData.isFetching) return <SplashScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {mockData.isAuth ? (
          <Stack.Screen name="Home" component={HomeScreen} />
          
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
