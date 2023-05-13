import React, { useState } from 'react';
import Text from '../components/Text';
import InputText from '../components/Inputs';
import Button from '../components/Buttons';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

interface Message {
  text: string;
  from: 'me' | 'other';
}

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { text: 'Hola, ¿cómo estás?', from: 'me' },
    { text: 'Bien, gracias. ¿Y tú?', from: 'other' },
    { text: 'Estoy bien también, gracias', from: 'me' },
    { text: 'Me alegro', from: 'other' },
    { text: '¿Qué planes tienes para hoy?', from: 'me' },
    { text: 'No muchos, ¿tú?', from: 'other' },
    {
      text: 'Tengo que trabajar un poco, pero luego no tengo planes',
      from: 'me',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, { text: message, from: 'me' }]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.container}>
        {chatHistory.map((message, index) => {
          const isMe = message.from === 'me';
          const containerStyle = isMe
            ? [styles.messageContainer, styles.rightContainer]
            : [styles.messageContainer, styles.leftContainer];
          const textStyle = isMe
            ? [styles.messageText, styles.rightText]
            : [styles.messageText, styles.leftText];
          return (
            <View key={index} style={containerStyle}>
              <Text value={message.text} />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <InputText
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Enviar" onPress={handleSendMessage} primary />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80, // para dejar espacio para el footer
  },
  messageContainer: {
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
    marginBottom: 8,
  },
  leftContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  messageText: {
    color: '#000',
    marginHorizontal: 8,
  },
  leftText: {},
  rightText: {
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default ChatScreen;
