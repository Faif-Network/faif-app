import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../components/Text';

interface Post {
  avatar: string;
  name: string;
  timestamp: string;
  text: string;
  image: string;
}

function PostDetail() {
  const posts: Post[] = [
    {
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
      name: 'Paula Leal',
      timestamp: '2023-05-02T10:00:00Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://picsum.photos/400/400',
    },
  ];

  const post = posts[0];

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        <View style={styles.userContainer}>
          <Image source={{ uri: post.avatar }} style={styles.avatar} />
          <View style={styles.nameContainer}>
            <Text value={post.name} weight="bold" />
            <Text value={post.timestamp} size="small" />
          </View>
        </View>
        <Text value={post.text} />
        <Image source={{ uri: post.image }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  postContainer: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nameContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default PostDetail;
