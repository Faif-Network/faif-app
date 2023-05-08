import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import PostViewer from '../components/PostViewer'
import Stories from '../components/Stories'

function HomeScreen() {
  const posts = [
    {
      avatar:
        'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
      name: 'Paula Leal',
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

  const stories = [
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Stories stories={stories} />
        <PostViewer posts={posts} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
