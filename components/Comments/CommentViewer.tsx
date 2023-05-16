import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import InputText from '../UI/Inputs';
import Text from '../UI/Text';

interface IComment {
  id: string;
  author: string;
  text: string;
  avatar: string;
}

const CommentsViewer: React.FC = () => {
  const [comments, setComments] = useState<IComment[]>([
    // Comentarios de ejemplo
  ]);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      return;
    }

    const newId = comments.length + 1;
    const newCommentObject: IComment = {
      id: newId.toString(),
      author: 'John Doe',
      text: newComment,
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
    };

    setComments([...comments, newCommentObject]);
    setNewComment('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.commentsContainer}>
        {comments.length === 0 ? (
          <Text
            size="medium"
            value="No hay comentarios"
            style={styles.noCommentsText}
          />
        ) : (
          comments.map((comment, index) => (
            <View style={styles.commentContainer} key={index}>
              <Image source={{ uri: comment.avatar }} style={styles.avatar} />
              <View style={styles.commentContent}>
                <Text
                  value={`${comment.author}:`}
                  size="medium"
                  weight="bold"
                />
                <Text value={comment.text} size="medium" />
              </View>
            </View>
          ))
        )}
      </View>
      <View style={styles.inputContainer}>
        <InputText
          placeholder="Escribe tu comentario..."
          value={newComment}
          onChangeText={setNewComment}
          isPassword={false}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text
            value="Enviar"
            size="medium"
            weight="bold"
            style={styles.buttonText}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentsContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  noCommentsText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentContent: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
  },
});

export default CommentsViewer;
