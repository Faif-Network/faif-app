import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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
    {
      id: '1',
      author: 'John Doe',
      text: '¡Este es un comentario de ejemplo!',
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
    },
    {
      id: '2',
      author: 'Jane Smith',
      text: 'Este es otro comentario de ejemplo',
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
    },
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
    <View style={styles.container}>
      {comments.length === 0 ? (
        <Text size="medium" value="No hay comentarios" />
      ) : (
        comments.map((comment) => (
          <View style={styles.commentContainer} key={comment.id}>
            <Image source={{ uri: comment.avatar }} style={styles.avatar} />
            <View style={styles.commentContent}>
              <Text value={`${comment.author}:`} size="medium" weight="bold" />
              <Text value={comment.text} size="medium" />
            </View>
          </View>
        ))
      )}
      <View style={styles.inputContainer}>
        <InputText
          placeholder="Escribe tu comentario..."
          value={newComment}
          onChangeText={setNewComment}
          isPassword={false}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text value="Enviar" size="medium" weight="bold" />
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
  noCommentsText: {
    fontStyle: 'italic',
    marginTop: 16,
    marginHorizontal: 16,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  commentText: {},
  inputContainer: {
    flex: 1,
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
