import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useFeed } from '../api/hooks/feed/useFeed';
import PostListViewer from '../components/Post/PostListViewer';
import Text from '../components/UI/Text';

function HomeScreen() {
  const { feed } = useFeed({
    populate: 'user',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        {feed?.data ? (
          <PostListViewer posts={feed?.data} />
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
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
