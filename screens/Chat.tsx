import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Message {
  id: string;
  content: string;
}

const ChatScreen: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Simulación de mensajes existentes
    setMessages([
      { id: '1', content: 'Hola, ¿cómo estás?' },
      { id: '2', content: 'Muy bien, gracias. ¿Y tú?' },
      { id: '3', content: 'Bien, ¿como llevas los exámenes?' },
    ]);
  }, []);

  const handleSend = () => {
    if (inputValue === '') {
      return;
    }

    const newMessage: Message = {
      id: Math.random().toString(36).slice(2, 11),
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={{
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        alignSelf: 'flex-start',
      }}
    >
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: 10,
            borderRadius: 10,
            backgroundColor: 'lightgrey',
            padding: 10,
          }}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder="Escribe un mensaje"
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'lightblue',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={handleSend}
        >
          <Text style={{ color: 'white' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
