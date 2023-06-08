import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useFeed } from '../../api/hooks/feed/useFeed';
import { useMe } from '../../api/hooks/profile/useMe';
import PostListViewer from '../../components/Post/PostListViewer';
import Button from '../../components/UI/Buttons';
import Text from '../../components/UI/Text';

function PrivateProfile() {
  const { profile: publicProfile } = useMe();
  const { feed } = useFeed({
    filterUser: publicProfile?.id,
    populate: 'user',
  });
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: publicProfile?.avatar }} />
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
              value={`${publicProfile?.name} ${publicProfile?.last_name}`}
            />
            <Text align="center" value={publicProfile?.biography} />
            <View style={styles.buttonContainer}>
              <Button
                style={{ marginRight: 10 }}
                primary={true}
                title="Editar perfil"
                onPress={() => {
                  navigation.navigate('UpdateProfile' as never);
                }}
              />
              <Button
                primary={false}
                title="Cerrar sesión"
                onPress={async () => {
                  await AsyncStorage.removeItem('token');
                  console.log('token removed');
                }}
              />
            </View>
            <Text
              size="medium"
              weight="regular"
              value={'Publicaciones'}
              align="center"
            />
          </View>
        </View>
        <PostListViewer posts={feed?.data} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PrivateProfile;

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
    marginTop: 20,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
