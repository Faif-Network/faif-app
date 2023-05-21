import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFeed } from '../../api/hooks/feed/useFeed';
import { usePublicProfile } from '../../api/hooks/profile/usePublicProfile';
import PostListViewer from '../../components/Post/PostListViewer';

function PublicProfile({ route }: any) {
  const { feed } = useFeed();
  const { userId } = route.params;
  const { publicProfile } = usePublicProfile(userId);

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
            <PostListViewer posts={feed?.data} />
          </View>
        </View>
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
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
