import React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatList from '../../components/Chat/ChatList';

const ChatListScreen = () => {
  const mockChats = [
    {
      id: 1,
      nickname: 'User 1',
      lastMessage: 'Last message 1',
      avatar: 'https://loremflickr.com/200/200',
    },
    {
      id: 2,
      nickname: 'User 2',
      lastMessage: 'Last message 2',
      avatar: 'https://loremflickr.com/200/200',
    },
    {
      id: 3,
      nickname: 'User 3',
      lastMessage: 'Last message 3',
      avatar: 'https://loremflickr.com/200/200',
    },
    {
      id: 4,
      nickname: 'User 4',
      lastMessage: 'Last message 4',
      avatar: 'https://loremflickr.com/200/200',
    },
    {
      id: 5,
      nickname: 'User 5',
      lastMessage: 'Last message 5',
      avatar: 'https://loremflickr.com/200/200',
    },
  ];
  return (
    <View style={styles.container}>
      <ChatList chats={mockChats} />
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
