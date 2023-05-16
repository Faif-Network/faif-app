import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useFeed } from '../api/hooks/feed/useFeed';
import PostListViewer from '../components/Post/PostListViewer';
import Stories from '../components/Stories/Stories';
import Text from '../components/UI/Text';

function HomeScreen() {
  const { feed } = useFeed();

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
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Stories stories={stories} />
        {feed?.data ? (
          <PostListViewer posts={feed.data} />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 500,
            }}
          >
            <Text
              value="No hay publicaciones para mostrar"
              size="medium"
              weight="bold"
              align="center"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
