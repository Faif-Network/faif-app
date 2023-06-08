import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import useCreateChat from '../../api/hooks/chat/useCreateChat';
import { useFeed } from '../../api/hooks/feed/useFeed';
import useFollowUser from '../../api/hooks/followers/useFollowUser';
import { useFollowers } from '../../api/hooks/followers/useFollowers';
import { usePublicProfile } from '../../api/hooks/profile/usePublicProfile';
import PostListViewer from '../../components/Post/PostListViewer';
import Button from '../../components/UI/Buttons';
import Text from '../../components/UI/Text';

function PublicProfile({ route }: any) {
  const { feed } = useFeed({
    filterUser: route.params.userId,
    populate: 'user',
  });
  const { handleFollowUser, isLoading: isLoadingFollow } = useFollowUser();
  const { userId } = route.params;
  const { followers } = useFollowers({
    user_id: userId,
  });
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
            <Text
              value={publicProfile?.data?.username}
              weight="bold"
              style={{ marginTop: 30, marginBottom: 10 }}
            />
            <Text value={publicProfile?.data?.biography} />

            <View style={styles.statsContainer}>
              <View style={styles.statsItem}>
                <Text
                  value={`${followers?.data?.num_followers || 0} seguidores`}
                />
              </View>
              <View style={styles.statsItem}>
                <Text
                  value={`${followers?.data?.num_following || 0} seguidos`}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{ marginRight: 5 }}
                  primary={true}
                  title={
                    followers?.data?.is_following ? 'Dejar de seguir' : 'Seguir'
                  }
                  isLoading={isLoadingFollow}
                  onPress={async () => {
                    await handleFollowUser(userId);
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
                    navigation.navigate('ChatList' as never);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <Text value="Publicaciones" weight="bold" align="center" />
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
  statsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  statsItem: {
    marginHorizontal: 10,
  },
});
