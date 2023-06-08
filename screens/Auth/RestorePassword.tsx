import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';

export default function RestorePassword() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.imgur.com/Y6eoxWl.png',
        }}
      />
      <Text
        value="Restaura tu contraseña"
        size="large"
        weight="bold"
        align="center"
        style={{ marginBottom: 20 }}
      />
      <Text
        value="Ingresa tu correo electrónico para poder restaurar tu contraseña"
        size="small"
        weight="light"
        align="center"
        style={{ marginBottom: 20 }}
      />
      <InputText placeholder="Correo electrónico" style={{ width: '80%' }} />
      <Button
        title="Restaurar"
        primary={true}
        onPress={() => {
          navigation.navigate('Login' as never);
        }}
        style={{ width: '80%', marginTop: 20 }}
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
