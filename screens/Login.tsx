import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Button from '../components/Buttons'
import InputText from '../components/Inputs'
import Text from '../components/Text'

export default function LoginScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.imgur.com/Y6eoxWl.png',
        }}
      />
      <Text value="Iniciar sesión" size="large" weight="bold" align="center" />
      <InputText placeholder="Correo electrónico" />
      <InputText placeholder="Contraseña" isPassword={true} />
      <Text
        value="¿Olvidaste tu contraseña?"
        size="small"
        align="right"
        onPress={() => navigation.navigate('RestorePassw' as never)}
      />
      <Text
        value="¿No tienes cuenta? Regístrate"
        size="small"
        align="center"
        onPress={() => navigation.navigate('SignUp' as never)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4BBFF1',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
