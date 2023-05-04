import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IStories {
  container: string
  avatar: string
  name: string
  image: string
}

function Stories({storiesPost}: {storiesPost: IStories[]}) {
  const StoriesPosts = [
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'John Doe',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      image: 'https://picsum.photos/400/400',
    },
  ]
const renderStories = (storiesPost: IStories) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        {StoriesPosts.map((post) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{post.name}</Text>
            <Image source={{ uri: post.image }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
})

export default Stories
