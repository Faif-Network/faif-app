import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IComment {
  name: string;
  text?: string;
}

function CommentItem({ comment }: { comment: IComment }) {
  const navigation = useNavigation();

  function handleDeleteComment(event: GestureResponderEvent): void {
    throw new Error('Function not implemented.');
  }

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{comment.name}:</Text>
      <Text style={styles.commentText}>{comment.text}</Text>
      <TouchableOpacity
        onPress={handleDeleteComment}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

function CommentViewer({ name, text }: IComment) {
  const renderItem = ({ item }: { item: IComment }) => (
    <CommentItem comment={item} />
  );

  return <FlatList data={comment} renderItem={renderItem} />;
}

interface CommentItemProps {
  comment: IComment;
  onDeleteComment: (commentId: string) => void;
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentText: {},
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
});
