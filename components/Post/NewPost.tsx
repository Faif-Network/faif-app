import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import useCreatePoll, {
  ICreatePollRequest,
} from '../../api/hooks/feed/useCreatePoll';
import useCreatePost, {
  ICreatePostRequest,
} from '../../api/hooks/feed/useCreatePost';
import useDocumentUploader from '../../api/hooks/profile/useUploadDocument';
import useImageUploader from '../../api/hooks/useUploadImage';
import useForm from '../../utils/useForm';
import Button from '../UI/Buttons';
import Text from '../UI/Text';

const NewPost = () => {
  const navigation = useNavigation();
  const { handleCreatePost, isLoading } = useCreatePost();
  const { handleCreatePoll, isLoading: isLoadingCreatePoll } = useCreatePoll();
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const { imageToUpload, setImageFromPicker, uploadImage } = useImageUploader();
  const { documentToUpload, uploadDocument, setDocumentFromPicker } =
    useDocumentUploader();
  const [isPoll, setIsPoll] = useState(false);
  const [options, setOptions] = useState<string[]>(['']);

  const addOption = () => {
    setOptions((prevState) => [...prevState, '']);
  };

  const onSubmitPost = async (post: ICreatePostRequest) => {
    const { data } = await handleCreatePost({
      content: post.content,
      attachment: imageToUpload
        ? 'image/jpeg'
        : documentToUpload
        ? 'application/pdf'
        : undefined,
    });
    if (data) {
      if (data?.post?.attachment_url) {
        if (imageToUpload) {
          await uploadImage(data.post.attachment_url);
        }
        if (documentToUpload) {
          await uploadDocument(data.post.attachment_url);
        }
      }
    }
    postForm.values.content = '';
    postForm.values.attachment = '';
    navigation.navigate('Main' as never, { screen: 'Home' } as never);
  };

  const onSubmitPoll = async (poll: ICreatePollRequest) => {
    const { data } = await handleCreatePoll({
      question: poll.question,
      options: options,
      attachment_type: imageToUpload
        ? 'image/jpeg'
        : documentToUpload
        ? 'application/pdf'
        : undefined,
    });

    if (data) {
      if (data?.poll?.attachment_url) {
        if (imageToUpload) {
          await uploadImage(data?.poll?.attachment_url);
        }
        if (documentToUpload) {
          await uploadDocument(data.poll?.attachment_url);
        }
      }
    }
    pollForm.values.question = '';
    pollForm.values.attachment_type = '';
    pollForm.values.options = [];
    navigation.navigate('Main' as never, { screen: 'Home' } as never);
  };

  const postForm = useForm<ICreatePostRequest>({
    initialValues: {
      attachment: '',
      content: '',
    },
    onSubmit: onSubmitPost,
  });

  const pollForm = useForm<ICreatePollRequest>({
    initialValues: {
      attachment_type: '',
      question: '',
      options: [],
    },
    onSubmit: onSubmitPoll,
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
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          value="Comparte algo con tu comunidad"
          weight="bold"
          style={{ marginTop: 16 }}
        />
        <TextInput
          style={[styles.input, { marginTop: 16 }]}
          placeholder="Empieza a escribir..."
          multiline
          numberOfLines={3}
          maxLength={280}
          onChangeText={(value) => {
            postForm.values.content = value;
            pollForm.values.question = value;
          }}
        />
        <View style={styles.switchContainer}>
          <Text value="Encuesta" weight="bold" style={styles.switchText} />
          <Switch
            value={isPoll}
            onValueChange={() => setIsPoll((prevState) => !prevState)}
          />
        </View>

        {isPoll && (
          <View>
            <View style={styles.optionsHeader}>
              <Text
                value="Opciones"
                weight="bold"
                style={{ flex: 1, marginRight: 8 }}
              />
              <TouchableOpacity onPress={addOption}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {options.map((option, index) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 4,
                  padding: 8,
                  marginVertical: 8,
                }}
                key={index}
                placeholder={`Opción ${index + 1}`}
                value={option}
                onChangeText={(value) => {
                  const newOptions = [...options];
                  newOptions[index] = value;
                  setOptions(newOptions);
                }}
              />
            ))}
          </View>
        )}

        {imageToUpload && (
          <View>
            <Text
              value="Vista previa"
              weight="bold"
              style={{ marginVertical: 16 }}
            />
            <Image source={{ uri: imageToUpload.uri }} style={styles.image} />
          </View>
        )}

        {documentToUpload && (
          <View>
            <Text
              value="Vista previa"
              weight="bold"
              style={{ marginVertical: 16 }}
            />
            <WebView
              source={{ uri: 'https://google.com' }}
              style={{ flex: 1 }}
              scalesPageToFit
              scrollEnabled
              allowFileAccess
              originWhitelist={['*']}
              startInLoadingState
              allowFileAccessFromFileURLs
              allowUniversalAccessFromFileURLs
            />
          </View>
        )}
      </View>
      <View
        style={[
          styles.footer,
          { bottom: keyboardOffset > 0 ? keyboardOffset : 0 },
        ]}
      >
        <Button
          title={imageToUpload ? 'Cambiar imagen' : 'Subir imagen'}
          onPress={() => setImageFromPicker()}
          style={{ width: '100%' }}
          disabled={documentToUpload ? true : false}
        />
        <Button
          title={documentToUpload ? 'Cambiar documento' : 'Subir documento'}
          onPress={async () => {
            await setDocumentFromPicker();
          }}
          style={{ width: '100%' }}
          disabled={imageToUpload ? true : false}
        />
        <Button
          title="Publicar"
          onPress={() => {
            if (isPoll) {
              pollForm.handleSubmit();
            } else {
              postForm.handleSubmit();
            }
          }}
          style={{ width: '100%' }}
          isLoading={isLoading}
          primary
        />
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 16,
    borderRadius: 8,
  },
  pdfView: {},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  switchText: {
    marginRight: 8,
    fontSize: 14,
    color: '#657786',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  optionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default NewPost;
