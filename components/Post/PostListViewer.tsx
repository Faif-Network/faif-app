import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { IPoll, IPost } from '../../api/hooks/feed/useFeed';
import PollItem from './PollItem';
import PostItem from './PostItem';

function PostListViewer({
  posts: feed,
}: {
  posts: Array<IPost | IPoll> | undefined;
}) {
  console.log(feed);
  return (
    <FlatList
      style={{ flex: 1 }}
      data={feed}
      renderItem={({ item }: { item: IPoll | IPost }) => {
        if ('is_poll' in item) {
          return <PollItem poll={item as IPoll} />;
        }
        return <PostItem post={item as IPost} />;
      }}
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
    padding: 10,
  },
});
