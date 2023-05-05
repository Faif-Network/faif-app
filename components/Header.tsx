import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'


function Header() {
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Image style={styles.logo} source={{ uri: 'https://i.imgur.com/Y6eoxWl.png' }} />
        <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}></ScrollView>
    </SafeAreaView>
  )
  } 

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 64,
    height: 64,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default Header 
