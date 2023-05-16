import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { IPost } from '../../api/hooks/feed/useFeed';
import CommentsViewer from '../../components/Comments/CommentViewer';
import Text from '../../components/UI/Text';
import { formatDate } from '../../utils/date';

function PostDetailScreen({ route }: { route: any }) {
  const { post } = route.params as { post: IPost };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>
          <Image
            source={{
              uri: post?.user?.avatar,
            }}
            style={styles.avatar}
          />
          <View style={styles.nameContainer}>
            <Text value={post?.user?.username} weight="bold" />
            <Text value={formatDate(post.created_at)} size="small" />
          </View>
        </View>
        <Text value={post.content} />
        {post.attachment && (
          <Image source={{ uri: post?.attachment }} style={styles.image} />
        )}
      </View>
      <View>
        <CommentsViewer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  postContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default PostDetailScreen;
