import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateLike } from '../../api/hooks/feed/useCreateLike';
import useDeletePost from '../../api/hooks/feed/useDeletePost';
import { IPost } from '../../api/hooks/feed/useFeed';
import { useMe } from '../../api/hooks/profile/useMe';
import { formatDate } from '../../utils/date';
import Button from '../UI/Buttons';
import Text from '../UI/Text';

function PostItem({ post }: { post: IPost }) {
  const navigation = useNavigation();
  const postId = post?.id;
  const { handleCreateLike } = useCreateLike(postId);
  const [showMenu, setShowMenu] = useState(false);
  const { handleDeletePost } = useDeletePost();
  const { profile } = useMe();

  const handlePostPress = () => {
    navigation.navigate('PostDetails' as never, { post } as never);
  };

  const handleCommentsPress = () => {
    navigation.navigate('Comments' as never, { postId } as never);
  };

  const handleLikesPress = async () => {
    await handleCreateLike();
  };

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.postItem}>
        <Image source={{ uri: post?.user?.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text value={post?.user?.username} weight="bold" />
              <Text value={formatDate(post.created_at)} size="small" />
            </View>
            <TouchableOpacity onPress={handleMenuPress}>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={24}
                color="#73788B"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handlePostPress}>
            {post.content && (
              <Text value={post.content} style={{ marginVertical: 8 }} />
            )}
            {post.attachment && post.attachment_type === 'image' ? (
              <Image
                source={{ uri: post.attachment }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : null}

            {post.attachment && post.attachment_type === 'pdf' ? (
              <Button
                onPress={() => Linking.openURL(post.attachment)}
                title="Ver documento"
              />
            ) : null}
          </TouchableOpacity>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleLikesPress}>
              <View style={styles.likesContainer}>
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color="#73788B"
                  style={post?.liked ? { color: 'red' } : { color: '#73788B' }}
                />
                <Text
                  value={post?.num_likes}
                  size="medium"
                  style={styles.likesText}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerIconContainer}
              onPress={handleCommentsPress}
            >
              <View style={styles.likesContainer}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="#73788B"
                />
                <Text
                  value={post?.num_comments}
                  size="medium"
                  style={styles.likesText}
                />
              </View>
            </TouchableOpacity>
          </View>
          {post?.user_id === profile?.id && showMenu && (
            <View style={[styles.menuContainer, styles.menuContainerTop]}>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={async () => {
                  await handleDeletePost(postId);
                  setShowMenu(false);
                }}
              >
                <Text value="Eliminar" style={styles.menuText} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  postItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 4,
    padding: 4,
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
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 4,
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
  footerIconContainer: {
    marginRight: 16,
  },
  menuContainer: {
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuContainerTop: {
    position: 'absolute',
    top: 30, // Adjust this value as per your needs
    right: 0,
    left: 0,
    zIndex: 1,
  },
  menuOption: {
    padding: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});

export default PostItem;
