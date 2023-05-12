import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Comment = {
  id: string;
  author: string;
  text: string;
};

const CommentScreen: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return;
    }

    const newId = comments.length + 1;
    const newCommentObject: Comment = {
      id: newId.toString(),
      author: 'John Doe', // Cambia 'John Doe' por el nombre del usuario
      text: newComment,
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Comentarios</Text>
      </View>
      {comments.length === 0 ? (
        <Text style={styles.noCommentsText}>No hay comentarios</Text>
      ) : (
        comments.map((comment) => (
          <View style={styles.commentContainer} key={comment.id}>
            <Text style={styles.commentAuthor}>{comment.author}:</Text>
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Escribe tu comentario..."
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  noCommentsText: {
    fontStyle: 'italic',
    marginTop: 16,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  commentText: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentScreen;
