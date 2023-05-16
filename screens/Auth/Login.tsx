import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import useLogin, { ILoginRequest } from '../../api/hooks/auth/useLogin';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

export default function LoginScreen() {
  const navigation = useNavigation();

  const { handleLogin, isLoading } = useLogin();

  const onSubmit = async (values: ILoginRequest) => {
    await handleLogin(values);
  };

  const form = useForm<ILoginRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.imgur.com/Y6eoxWl.png',
        }}
      />
      <Text value="Iniciar sesión" size="large" weight="bold" align="center" />
      <InputText
        placeholder="Correo electrónico"
        onChangeText={(value) => form.handleChange('email', value)}
      />
      <InputText
        placeholder="Contraseña"
        isPassword={true}
        onChangeText={(value) => form.handleChange('password', value)}
      />
      <Text
        value="¿Olvidaste tu contraseña?"
        size="small"
        align="right"
        onPress={() => navigation.navigate('RestorePassword' as never)}
      />
      <Button
        title="Iniciar sesión"
        primary={true}
        onPress={() => {
          form.handleSubmit();
        }}
        isLoading={isLoading}
      />
      <Text
        value="¿No tienes cuenta? Regístrate"
        size="small"
        align="center"
        onPress={() => navigation.navigate('SignUp' as never)}
      />
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
});
