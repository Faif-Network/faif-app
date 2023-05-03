import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{
        uri: "https://i.imgur.com/Y6eoxWl.png"
      }} />
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput style={styles.input} placeholder="Correo electrónico" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
      <Text style={styles.forgotPasswordText}>¿No tienes cuenta? Registrate</Text>
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
