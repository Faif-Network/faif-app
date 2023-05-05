import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Buttons'
import InputText from '../components/Inputs'
import Text from '../components/Text'

export default function SignUpScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.imgur.com/Y6eoxWl.png',
        }}
      />
      <Text value="Crea una nueva cuenta"size="large" weight="bold" align="center" />
      <Text value='Bienvenido a Faif, rellena el siguiente formulario para poder registrarte y formar parte de
        esta comunidad' size="small" weight="light" align="center" />
      <Text value="Registrate" size="medium" weight="bold" align="center" />
      <InputText placeholder="Nickname" />
      <InputText placeholder="Correo electrónico" />
      <InputText placeholder="Contraseña" isPassword={true} /> 
      <InputText placeholder="Repite tu contraseña" isPassword={true}/>
      <Text value="¿Olvidaste tu contraseña?" size="small" align="right" />
      <Button
        title="Registrate"
        primary={true}
        onPress={() => {
          navigation.navigate('SignUp' as never)
        }}
      />
      <TouchableOpacity style={styles.forgotPassword}>
      <Text value="Ya tienes cuenta? Inicia sesión" size="small" align="center" />
      </TouchableOpacity>
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
  title2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 40,
    marginRight: 40,
    marginLeft: 40,
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
  SignUpButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#4BBFF1',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
