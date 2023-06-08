import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useExplorer } from '../../api/hooks/explorer/useExplorer';
import Button from '../../components/UI/Buttons';
import Text from '../../components/UI/Text';

export default function ExplorerScreen({ route }: any) {
  const navigation = useNavigation();
  const { type } = route.params;
  const { explorer, loading } = useExplorer({
    explorer_type: type,
  });
  const explorerData = [
    {
      id: 1,
      title: 'Evento 1',
      description: 'Descripción del evento 1',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      title: 'Evento 2',
      description: 'Descripción del evento 2',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'Evento 3',
      description: 'Descripción del evento 3',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Evento 4',
      description: 'Descripción del evento 4',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'Evento 5',
      description: 'Descripción del evento 5',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'Evento 6',
      description: 'Descripción del evento 6',
      date: '01/01/2023',
      tags: ['tag1', 'tag2', 'tag3'],
      img: 'https://picsum.photos/200/300',
    },
  ];

  const renderEventCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.attachment }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text value={item.title} style={styles.title} weight="bold" />
        <Text value={item.short_description} />
        <Text value={new Date(item.start_date).toLocaleDateString()} />
      </View>
      <Button
        title="Ver más"
        onPress={() => {
          navigation.navigate(
            'ExplorerInfo' as never,
            { event: item } as never,
          );
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={explorer?.data}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.touchableOpacityStyle}
        onPress={() => navigation.navigate('NewExplorer' as never)}
      >
        <Ionicons name="md-add-circle-sharp" size={50} color="#5D88FF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  moreInfoButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#5D88FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomRightRadius: 8,
  },
  moreInfoButtonText: {
    color: '#fff',
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});
