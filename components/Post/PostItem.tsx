import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IPost } from '../../api/hooks/feed/useFeed';
import { formatDate } from '../../utils/date';
import Text from '../UI/Text';

function PostItem({ post }: { post: IPost }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.postItem}>
      <Image
        source={{
          uri: post?.user?.avatar,
        }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text value={post?.user?.username} weight="bold" />
            <Text value={formatDate(post.created_at)} size="small" />
          </View>
          <Ionicons
            name={'ellipsis-horizontal-outline'}
            size={24}
            color={'#73788B'}
            style={{ marginRight: 16 }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PostDetails' as never, { post } as never)
          }
        >
          {post.content && <Text value={post.content} />}
          {post.attachment && (
            <Image
              source={{ uri: post.attachment }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <View style={styles.footer}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#73788B"
            style={styles.icon}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments' as never)}
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
    </SafeAreaView>
  );
}

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

export default PostItem;
