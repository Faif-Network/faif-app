import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

interface PostFormProps {
  onSubmit: (post: Post) => void;
}

interface Post {
  message: string;
  image?: string;
  isPublic: boolean;
}

const NewPost: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isPublic, setIsPublic] = useState(true);

  const handleImagePicker = () => {
    // Implement your own image picker logic here
  };

  const handleSubmit = () => {
    const post: Post = {
      message,
      image,
      isPublic,
    };

    onSubmit(post);
    setMessage('');
    setImage(undefined);
    setIsPublic(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="¿Qué te gustaría compartir?"
        multiline
        numberOfLines={4}
        maxLength={280}
        value={message}
        onChangeText={setMessage}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Añadir imagen" onPress={handleImagePicker} />
      <View style={styles.switchContainer}>
        <Text style={[styles.switchText, { marginEnd: 4 }]}>Privacidad:</Text>
        <Switch value={isPublic} onValueChange={setIsPublic} />
        <Text style={styles.switchText}>
          {isPublic ? 'Público' : 'Privado'}
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="Publicar" onPress={handleSubmit} />
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
