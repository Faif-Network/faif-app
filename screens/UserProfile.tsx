import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import useForm from '../utils/useForm';
import Button from '../components/Buttons';
import useProfile, { IUpdateProfileRequest } from '../api/hooks/useProfile';

interface Props {}

const ProfileScreen: React.FC<Props> = () => {
  const handleEditProfile = () => {};

  const { handleLogin, isLoading } = useProfile();

  const onSubmit = async (values: IUpdateProfileRequest) => {
    await handleLogin(values);
  };

  const form = useForm<IUpdateProfileRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text value="Mi perfil" />
      </View>
      <View style={styles.profile}>
        <Image
          source={{
            uri: 'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
          }}
          style={styles.avatar}
        />
        <Text value="Juan Perez" />
        <Text value="juan.perez@example.com" />
        <Button
          title="Editar perfil"
          primary={true}
          onPress={() => {
            form.handleSubmit();
          }}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#999',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
