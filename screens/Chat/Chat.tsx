import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import io, { Socket } from 'socket.io-client';
import { IMessage, useChatById } from '../../api/hooks/chat/useChatById';
import { useMe } from '../../api/hooks/profile/useMe';
import Text from '../../components/UI/Text';

const ChatScreen = ({ route }: { route: any }) => {
  const { profile } = useMe();
  const { chat_id, receiver, user } = route.params;
  const { chat } = useChatById(chat_id);
  const [messageText, setMessageText] = useState('');
  const [socket, setSocket] = useState<Socket>();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<IMessage[]>(chat || []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user,
    });
  }, [navigation]);

  useEffect(() => {
    setSocket(io('http://localhost:3000'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join', chat_id);

      socket.on('listMessages', (message: IMessage) => {
        setMessages((prevChat: IMessage[]) => [...prevChat, message]);
      });
    }
  }, [socket, chat_id]);

  const sendMessage = () => {
    if (socket) {
      const message = {
        chat_id,
        sender: profile?.id,
        receiver,
        message: messageText,
      };
      socket.emit('chat', message);
      setMessageText('');
    }
  };

  useEffect(() => {
    if (chat) {
      setMessages(chat);
    }
  }, [chat]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      {chat?.length === 0 && (
        <View style={styles.centerContainer}>
          <Text value="No hay mensajes" style={styles.centerText} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: false })
        }
      >
        {messages?.map((message: IMessage, index: number) => {
          const isSender = message?.sender === profile?.id;

          return (
            <View
              key={index}
              style={[
                styles.messageContainer,
                isSender ? styles.rightContainer : styles.leftContainer,
              ]}
            >
              <Text
                value={message.message}
                style={[
                  styles.messageText,
                  isSender ? styles.rightText : styles.leftText,
                ]}
              />
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TextInput
          style={styles.sendText}
          placeholder="Escribe un mensaje..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!messageText}
        >
          <Text value="Enviar" style={styles.sendButtonText} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 80,
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
    height: 60,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  sendText: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    width: 80,
    backgroundColor: '#C9DFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#5D88FF',
    fontSize: 16,
  },
  leftText: {
    color: '#000',
  },
});

export default ChatScreen;
