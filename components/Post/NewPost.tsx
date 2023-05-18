import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import useCreatePost, {
  ICreatePostRequest,
} from '../../api/hooks/feed/useCreatePost';
import useForm from '../../utils/useForm';
import Text from '../UI/Text';

interface PostFormProps {
  onSubmit: (post: Post) => void;
}

interface Post {
  message: string;
  image?: string;
  isPublic: boolean;
}

const NewPost: React.FC<PostFormProps> = () => {
  const navigation = useNavigation();
  const { handleCreatePost, isLoading } = useCreatePost();
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const onSubmit = async (post: ICreatePostRequest) => {
    await handleCreatePost(post);
    navigation.navigate('Main' as never, { screen: 'Feed' } as never);
  };

  const form = useForm<ICreatePostRequest>({
    initialValues: {
      attachment: '',
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              value="Comparte algo con tu comunidad"
              weight="bold"
              style={{ marginTop: 16 }}
            />
            <TextInput
              style={[styles.input, { marginBottom: keyboardOffset }]}
              placeholder="Empieza a escribir..."
              multiline
              numberOfLines={3}
              maxLength={280}
              onChangeText={(value) => form.handleChange('content', value)}
            />
          </View>
          <View
            style={[
              styles.footer,
              { bottom: keyboardOffset > 0 ? keyboardOffset : 0 },
            ]}
          >
            <TouchableOpacity
              onPress={() => form.handleSubmit()}
              disabled={isLoading}
              style={{ flex: 1, width: '100%' }}
            >
              <Button title="Publicar" onPress={() => form.handleSubmit()} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
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
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default NewPost;
