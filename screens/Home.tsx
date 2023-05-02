import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Feed from './Feed';
import { Ionicons } from "@expo/vector-icons";


function HomeScreen() {
  const posts = [
    {
      avatar: 'https://media.licdn.com/dms/image/D4D03AQE3dTy4ZRZafg/profile-displayphoto-shrink_400_400/0/1678395006979?e=1688601600&v=beta&t=EKky14DKQlfDN1RITMnlZqEkXsbFqEwwgK5y5RcuE9E',
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
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <Image style={styles.logo} source={{
        uri: "data:image/jpeg;base64,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"
      }} />
      <TouchableOpacity style={styles.button}>
        <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
      <ScrollView style={{ flex: 1 }}>
        <Feed posts={posts}/>
      </ScrollView>
    </SafeAreaView>
  );
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
});

export default HomeScreen;


