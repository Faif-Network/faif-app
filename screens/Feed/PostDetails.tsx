import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useComments } from '../../api/hooks/comments/useComments';
import { IPost } from '../../api/hooks/feed/useFeed';
import CommentsList from '../../components/Comments/CommentList';
import Text from '../../components/UI/Text';
import { formatDate } from '../../utils/date';

function PostDetailScreen({ route }: { route: any }) {
  const { post } = route.params as { post: IPost };
  const { comments } = useComments(post?.id);

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
        <Text value={post.content} style={styles.text} />
        {post.attachment && (
          <Image source={{ uri: post?.attachment }} style={styles.image} />
        )}
      </View>
      <CommentsList comments={comments?.data} postId={post?.id} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  postContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
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
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default PostDetailScreen;
