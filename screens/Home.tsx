import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import Feed from './Feed'

function HomeScreen() {
  const posts = [
    {
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
      name: 'John Doe',
      timestamp: '2023-05-02T10:00:00Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      timestamp: '2023-05-01T12:00:00Z',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      timestamp: '2023-05-01T12:00:00Z',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://picsum.photos/400/400',
    },
    {
      avatar: 'https://picsum.photos/200/200',
      name: 'Jane Doe',
      timestamp: '2023-05-01T12:00:00Z',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://picsum.photos/400/400',
    },
  ]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerFunction={[]} />
      <ScrollView style={{ flex: 1 }}>
        <Feed posts={posts} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
})

export default HomeScreen
