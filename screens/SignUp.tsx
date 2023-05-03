import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{
        uri: "https://i.imgur.com/Y6eoxWl.png"
      }} />
      <Text style={styles.title}>Crea una nueva cuenta</Text>
      <Text style={styles.title2}>Bienvenido a Faif, rellena el siguiente formulario para poder registrarte y formar parte de esta comunidad</Text>
      <TextInput style={styles.input} placeholder="Nickname" />
      <TextInput style={styles.input} placeholder="Correo electrónico" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Repita la contraseña" secureTextEntry={true} />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Registrate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
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
});
