import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useCreateChat from '../../api/hooks/chat/useCreateChat';
import { useFeed } from '../../api/hooks/feed/useFeed';
import { usePublicProfile } from '../../api/hooks/profile/usePublicProfile';
import PostListViewer from '../../components/Post/PostListViewer';
import Button from '../../components/UI/Buttons';

function PublicProfile({ route }: any) {
  const { feed } = useFeed({
    filterUser: route.params.userId,
    populate: 'user',
  });
  const { userId } = route.params;
  const { publicProfile } = usePublicProfile(userId);
  const navigation = useNavigation();
  const { isLoading: isLoadingCreatingChat, handleCreateChat } =
    useCreateChat();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: publicProfile?.data?.avatar }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{publicProfile?.data?.username}</Text>
            <Text style={styles.info}>Comunidad</Text>
            <Text style={styles.description}>Biografia</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{ marginRight: 5 }}
                  primary={true}
                  title="Seguir"
                  onPress={() => {
                    navigation.navigate('UpdateProfile' as never);
                  }}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{ marginLeft: 5 }}
                  primary={false}
                  isLoading={isLoadingCreatingChat}
                  title="Enviar mensaje"
                  onPress={async () => {
                    await handleCreateChat(userId);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <PostListViewer posts={feed?.data} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PublicProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: '#00BFFF',
    height: 160,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
  },
});
