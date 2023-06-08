import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import NewPost from '../../components/Post/NewPost';

function UploadPostScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <NewPost />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default UploadPostScreen;
