import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IPost } from '../../api/hooks/feed/useFeed';
import PostItem from './PostItem';

function PostListViewer({ posts }: { posts: IPost[] | undefined }) {
  return (
    <FlatList
      style={{ flex: 1 }}
      data={posts}
      renderItem={(item) => <PostItem post={item.item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default PostListViewer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
