import React from 'react';
import { SafeAreaView } from 'react-native';
import { useComments } from '../../api/hooks/comments/useComments';
import CommentsList from '../../components/Comments/CommentList';

function CommentsScreen({ route }: { route: any }) {
  const { postId } = route.params as { postId: string };
  const { comments } = useComments(postId);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommentsList comments={comments?.data} postId={postId} />
    </SafeAreaView>
  );
}

export default CommentsScreen;
