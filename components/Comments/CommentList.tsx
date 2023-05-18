import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IComment } from '../../api/hooks/comments/useComments';
import {
  ICreateCommentRequest,
  useCreateComment,
} from '../../api/hooks/comments/useCreateComment';
import { formatDate } from '../../utils/date';
import useForm from '../../utils/useForm';
import Text from '../UI/Text';

const CommentsList = ({
  comments,
  postId,
}: {
  comments: IComment[] | undefined;
  postId: string;
}) => {
  const { handleCreateComment } = useCreateComment(postId);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onSubmit = async (comment: ICreateCommentRequest) => {
    await handleCreateComment({
      content: comment.content,
    });

    // Remove the content from the form
    form.handleChange('content', '');
  };

  const form = useForm<ICreateCommentRequest>({
    initialValues: {
      content: '',
    },
    onSubmit,
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardOffset(event.endCoordinates.height);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffset(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
      >
        <View
          style={[styles.commentsContainer, { marginBottom: keyboardOffset }]}
        >
          {comments?.length === 0 ? (
            <Text
              size="medium"
              value="No hay comentarios"
              align="center"
              style={styles.noCommentsText}
            />
          ) : (
            comments?.map((comment, index) => (
              <View style={styles.commentContainer} key={index}>
                <Image
                  source={{ uri: comment?.user?.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.commentContent}>
                  <Text
                    value={`${comment?.user?.username}`}
                    size="medium"
                    weight="bold"
                  />
                  <Text value={formatDate(comment?.created_at)} size="small" />
                  <Text value={comment?.content} size="medium" />
                </View>
              </View>
            ))
          )}
        </View>
        <View
          style={[
            styles.inputContainer,
            { bottom: keyboardOffset > 0 ? keyboardOffset : 0 },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Añadir un comentario"
            value={form.values.content}
            onChangeText={(value) => form.handleChange('content', value)}
            multiline
            numberOfLines={2}
          />
          <Button
            title="Enviar"
            onPress={() => form.handleSubmit()}
            disabled={form.values.content === ''}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  commentsContainer: {
    flex: 1,
  },
  noCommentsText: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});

export default CommentsList;
