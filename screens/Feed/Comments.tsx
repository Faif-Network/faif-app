import React from 'react';
import { SafeAreaView } from 'react-native';
import CommentsViewer from '../../components/Comments/CommentViewer';

const CommentsScreen = () => {
  return (
    <SafeAreaView>
      <CommentsViewer />
    </SafeAreaView>
  );
};

export default CommentsScreen;
