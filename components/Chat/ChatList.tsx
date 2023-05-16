import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

interface Chat {
  id: number;
  nickname: string;
  lastMessage: string;
  avatar: string;
}

interface ChatListProps {
  chats: Chat[];
}

function ChatList({ chats }: ChatListProps) {
  const [chatData, setChatData] = useState<Chat[]>(chats);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const navigateToChat = (chat: Chat) => {
    // Navegar a la pantalla de chat
    const { id } = chat;
    console.log(`Navigating to chat ${id}`);
    navigation.navigate('ChatView' as never, { chat } as never);
  };

  useEffect(() => {
    loadMoreChats();
  }, []);

  const loadMoreChats = () => {
    if (!isLoading) {
      setIsLoading(true);
      // Simulación de una carga asincrónica de más chats
      setTimeout(() => {
        const newChats = generateMoreChats(page);
        setChatData((prevChats) => [...prevChats, ...newChats]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      }, 1500);
    }
  };

  const generateMoreChats = (currentPage: number): Chat[] => {
    // Simulación de generación de más chats
    const newChats: Chat[] = [];
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    for (let i = startIndex; i < endIndex; i++) {
      newChats.push({
        id: i,
        nickname: `User ${i}`,
        lastMessage: `Last message ${i}`,
        avatar: `https://picsum.photos/200`,
      });
    }
    return newChats;
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
      onPress={() => navigateToChat(item)}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.nickname}</Text>
        <Text>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <Text>Loading more chats...</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={chatData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreChats}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

export default ChatList;
