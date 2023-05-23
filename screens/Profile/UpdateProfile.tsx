import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMe } from '../../api/hooks/profile/useMe';
import useUpdateProfile, {
  IUpdateProfileRequest,
} from '../../api/hooks/profile/useUpdateProfile';
import useImageUploader from '../../api/hooks/useUploadImage';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

function UpdateProfileScreen() {
  const { profile: publicProfile } = useMe();
  const { handleUpdateProfile } = useUpdateProfile();
  const navigation = useNavigation();
  const { image, setImage } = useImageUploader();

  const { handleChange, isSubmitting, handleSubmit } =
    useForm<IUpdateProfileRequest>({
      initialValues: {
        username: publicProfile?.username,
        avatar: publicProfile?.avatar,
        biography: publicProfile?.biography,
        name: publicProfile?.name,
        last_name: publicProfile?.last_name,
      },
      onSubmit: async (values) => {
        await handleUpdateProfile(values);
        navigation.navigate(
          'Home' as never,
          { screen: 'PrivateProfile' } as never,
        );
      },
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: image || publicProfile?.avatar }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text
            style={styles.name}
            value={publicProfile?.username}
            align="center"
          />
          <Text
            align="center"
            style={styles.info}
            value={'Actualiza tu perfil'}
          />
          <InputText
            placeholder="Nombre"
            defaultValue={publicProfile?.name}
            onChangeText={(value) => handleChange('name', value)}
          />
          <InputText
            placeholder="Apellido"
            defaultValue={publicProfile?.last_name}
            onChangeText={(value) => handleChange('last_name', value)}
          />
          <InputText
            placeholder="Biografia"
            multiline={true}
            onChangeText={(value) => handleChange('biography', value)}
            defaultValue={publicProfile?.biography}
          />
          <Button
            primary={false}
            title="Actualizar avatar"
            onPress={() => {
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
              );
            }}
          />
          <Button
            primary={true}
            title="Actualizar"
            onPress={() => {
              handleSubmit();
            }}
            isLoading={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 130,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  body: {
    marginVertical: 60,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  info: {
    fontSize: 16,
    color: '#5b5b5b',
    marginTop: 5,
    textAlign: 'center',
  },
});
