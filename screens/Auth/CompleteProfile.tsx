import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { ICompleteProfileRequest } from '../../api/hooks/auth/useCompleteProfile';
import useUpdateProfile from '../../api/hooks/profile/useUpdateProfile';
import useImageUploader from '../../api/hooks/useUploadImage';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

export default function CompleteProfileScreen({ route }: any) {
  const { avatar } = route.params;

  const { handleUpdateProfile } = useUpdateProfile();

  const onSubmit = async (values: ICompleteProfileRequest) => {
    //await uploadImage(avatar, image);
    await handleUpdateProfile(values);
  };

  const { uploadImage, image, setImage } = useImageUploader();

  const form = useForm<ICompleteProfileRequest>({
    initialValues: {
      name: '',
      last_name: '',
      biography: '',
    },
    onSubmit,
  });

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    try {
      await uploadImage(avatar);
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.imgur.com/Y6eoxWl.png',
        }}
      />
      <Text
        value={`Hola ${route.params.username}, completa tu perfil`}
        size="large"
        weight="bold"
        align="center"
      />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.profileImage} />
        </View>
      )}
      <InputText
        placeholder="Nombre"
        onChangeText={(value) => form.handleChange('name', value)}
      />
      <InputText
        placeholder="Apellido"
        onChangeText={(value) => form.handleChange('last_name', value)}
      />
      <InputText
        placeholder="Biografía"
        onChangeText={(value) => form.handleChange('biography', value)}
        multiline
        numberOfLines={3}
        maxLength={280}
      />

      <Button
        title="Subir foto de perfil"
        primary={false}
        onPress={() =>
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
            },
            (response) => {
              const imgs = response?.assets;
              if (imgs) {
                const uri = imgs[0].uri;
                setImage(uri);
              }
            },
          )
        }
      />

      <Button
        title="Continuar"
        primary={true}
        onPress={() => {
          form.handleSubmit();
          handleImageUpload();
        }}
        isLoading={form.isSubmitting}
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
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginVertical: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
});
