import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { IMyChat } from '../../api/hooks/chat/useChats';
import { useMe } from '../../api/hooks/profile/useMe';

interface ChatListProps {
  chats?: IMyChat[];
  isLoading?: boolean;
}

function ChatList({ chats, isLoading }: ChatListProps) {
  const navigation = useNavigation();
  const { profile } = useMe();

  const navigateToChat = (chat: IMyChat) => {
    const { chat_id } = chat;
    const receiver = chat.users?.find((user) => user !== profile?.id);
    console.log(`Navigating to chat ${chat_id}`);
    navigation.navigate('ChatView' as never, { chat_id, receiver } as never);
  };

  const renderItem = ({ item }: { item: IMyChat }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
      onPress={() => navigateToChat(item)}
    >
      <Image
        source={{ uri: item.user?.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.user?.username}</Text>
        <Text>{item.last_message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item) => item.chat_id}
      onEndReachedThreshold={0.5}
    />
  );
}

export default ChatList;
