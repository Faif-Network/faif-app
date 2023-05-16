import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../../components/UI/Text';

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
            : [styles.messageText];
          return (
            <View key={index} style={containerStyle}>
              <Text value={message.text} />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          placeholder="Escribe un mensaje..."
          value={message}
          onChangeText={setMessage}
          style={styles.sendText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text value={'Enviar'} />
        </TouchableOpacity>
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
    backgroundColor: '#C9DFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#5D88FF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    color: '#000',
    marginHorizontal: 8,
  },
  rightText: {
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  sendText: {
    color: '#5D88FF',
    fontSize: 16,
    width: '80%',
  },
  sendButton: {
    marginLeft: 8,
    width: '20%',
    backgroundColor: '#C9DFFF',
    borderRadius: 8,
  },
});

export default ChatScreen;
