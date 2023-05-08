import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

interface IStories {
  avatar: string
  name: string
  image: string
}

function Stories({ stories: storiesPost }: { stories: IStories[] }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        {storiesPost.map((post, index) => (
          <View style={styles.story} key={index}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{post.name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  story: {
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
})

export default Stories
