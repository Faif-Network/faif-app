import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useCreatePost, {
  ICreatePostRequest,
} from '../../api/hooks/feed/useCreatePost';
import useForm from '../../utils/useForm';

interface PostFormProps {
  onSubmit: (post: Post) => void;
}

interface Post {
  message: string;
  image?: string;
  isPublic: boolean;
}

const NewPost: React.FC<PostFormProps> = () => {
  const { handleCreatePost, isLoading } = useCreatePost();

  const onSubmit = async (post: ICreatePostRequest) => {
    await handleCreatePost(post);
  };

  const form = useForm<ICreatePostRequest>({
    initialValues: {
      attachment: '',
      content: '',
    },
    onSubmit,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="¿Qué te gustaría compartir?"
        multiline
        numberOfLines={4}
        maxLength={280}
        onChangeText={(value) => form.handleChange('content', value)}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => form.handleSubmit()}
          disabled={isLoading}
          style={{ flex: 1, width: '100%' }}
        >
          <Button title="Publicar" onPress={() => form.handleSubmit()} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    padding: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#657786',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default NewPost;
