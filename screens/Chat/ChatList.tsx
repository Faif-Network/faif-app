import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useChats } from '../../api/hooks/chat/useChats';
import ChatList from '../../components/Chat/ChatList';
import Text from '../../components/UI/Text';

const ChatListScreen = () => {
  const { chats, loading } = useChats();
  return (
    <View style={styles.container}>
      {loading && <Text value={'Cargando...'} />}
      {chats?.length ? (
        <ChatList chats={chats} />
      ) : (
        <>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              value={'Vaya, parece que no hablas con nadie'}
              align="center"
              weight="bold"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
