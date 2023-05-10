import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IPost {
  avatar: string;
  name: string;
  timestamp: string;
  text?: string;
  image?: string;
}

function PostItem({ post }: { post: IPost }) {
  const navigation = useNavigation();

  return (
    <View style={styles.postItem}>
      <Image source={{ uri: post.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{post.name}</Text>
            <Text style={styles.timestamp}>
              {new Date(post.timestamp).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>
          <Ionicons
            name={'ellipsis-horizontal-outline'}
            size={24}
            color={'#73788B'}
            style={{ marginRight: 16 }}
          />
        </View>
        {post.text && <Text style={styles.text}>{post.text}</Text>}
        {post.image && (
          <TouchableOpacity
            onPress={() => navigation.navigate('PostDetails' as never)}
          >
            <Image
              source={{ uri: post.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        <View style={styles.footer}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#73788B"
            style={styles.icon}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat' as never)}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#73788B"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PostViewer({ posts }: { posts: IPost[] }) {
  const renderItem = ({ item }: { item: IPost }) => <PostItem post={item} />;

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.timestamp}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default PostViewer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  postItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 8,
    padding: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: '#838899',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 16,
  },
});
