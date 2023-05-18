import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import useRegister, {
  IRegisterRequest,
} from '../../api/hooks/auth/useRegister';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const { handleRegister, isLoading } = useRegister();

  const onSubmit = async (values: IRegisterRequest) => {
    await handleRegister(values);
  };

  const form = useForm<IRegisterRequest>({
    initialValues: {
      username: '',
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
      <Text
        value="Crea una nueva cuenta"
        size="large"
        weight="bold"
        align="center"
      />
      <Text
        value="Bienvenido a Faif, rellena el siguiente formulario para poder registrarte y formar parte de
        esta comunidad"
        size="small"
        weight="light"
        align="center"
      />
      <Text value="Registrate" size="medium" weight="bold" align="center" />
      <InputText
        placeholder="Nombre de usuario"
        onChangeText={(value) => form.handleChange('username', value)}
      />
      <InputText
        placeholder="Correo electrónico"
        onChangeText={(value) => form.handleChange('email', value)}
      />
      <InputText
        placeholder="Contraseña"
        isPassword={true}
        onChangeText={(value) => form.handleChange('password', value)}
      />
      <Button
        title="Registrate"
        primary={true}
        onPress={async () => {
          await form.handleSubmit();
          navigation.navigate('Communities' as never);
        }}
        isLoading={isLoading}
      />
      <Text
        value="Ya tienes cuenta? Inicia sesión"
        size="small"
        align="center"
        onPress={() => navigation.navigate('Login' as never)}
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
});
