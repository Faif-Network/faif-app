import React from 'react'
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IPost {
  avatar: string
  name: string
  timestamp: string
  text: string
  image: string
}

function Feed({ posts }: { posts: IPost[] }) {
  const renderPost = (post: IPost) => {
    return (
      <View style={styles.feedItem}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
            <Ionicons name="ellipsis-horizontal" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    )
  }

  return <View style={styles.container}>{posts.map((post) => renderPost(post))}</View>
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECF4',
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EBECF4',
    shadowColor: '#454D65',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
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
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
})
