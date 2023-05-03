import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


function Header() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <Image style={styles.logo} source={{
        uri: "https://i.imgur.com/Y6eoxWl.png"
      }} />
      <TouchableOpacity style={styles.button}>
        <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
      <ScrollView style={{ flex: 1 }}>
  
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

export default Header;


