import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { IExplorer } from '../../api/hooks/explorer/useExplorer';
import Text from '../../components/UI/Text';

export default function ExplorerInfoScreen({ route }: any) {
  const event = route.params.event as IExplorer;
  // Tags is an array of strings getted from the description of the event where all words with # are tags
  const tags = event.description
    .split(' ')
    .filter((word: string) => word.startsWith('#'));

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: event?.attachment }} />
      <Text
        style={styles.title}
        value={event.title}
        align="center"
        weight="bold"
        size="large"
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.description} value={event.short_description} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description} value={event.description} />
      </View>

      <Text
        style={styles.date}
        value={new Date(event.start_date).toDateString()}
      />

      <View style={styles.tagsContainer}>
        {tags?.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText} value={tag} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
  date: {
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 16,
  },
  tag: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#202124',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
});
