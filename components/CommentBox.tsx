import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Comment {
  id: string;
  author: string;
  text: string;
}

const exampleComments: Comment[] = [
  { id: '1', author: 'Juan', text: '¡Genial publicación!' },
  { id: '2', author: 'Pedro', text: 'Me encanta esta foto' },
];

function CommentScreen() {
  const [comments, setComments] = useState<Comment[]>(exampleComments);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return;
    }

    const newId = comments.length + 1;
    const newCommentObject: Comment = {
      id: newId.toString(),
      author: 'Usuario Anónimo',
      text: newComment,
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{item.author}:</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Agrega un comentario..."
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  commentContainer: {
    marginBottom: 8,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 8,
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CommentScreen;
