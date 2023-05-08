import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
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
      <Text value="Crea una nueva cuenta" size="large" weight="bold" align="center" />
      <Text
        value="Bienvenido a Faif, rellena el siguiente formulario para poder registrarte y formar parte de
        esta comunidad"
        size="small"
        weight="light"
        align="center"
      />
      <Text value="Registrate" size="medium" weight="bold" align="center" />
      <InputText placeholder="Nickname" />
      <InputText placeholder="Correo electrónico" />
      <InputText placeholder="Contraseña" isPassword={true} />
      <InputText placeholder="Repite tu contraseña" isPassword={true} />
      <Text value="¿Olvidaste tu contraseña?" size="small" align="right" />
      <Button
        title="Registrate"
        primary={true}
        onPress={() => {
          navigation.navigate('SignUp' as never)
        }}
      />
      <Text
        value="Ya tienes cuenta? Inicia sesión"
        size="small"
        align="center"
        onPress={() => navigation.navigate('Login' as never)}
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
})
