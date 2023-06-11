import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import useCalendar from '../../api/hooks/calendar/useCalendar';
import Text from '../../components/UI/Text';

export default function AgendaScreen() {
  const { calendar: items } = useCalendar();

  const test = {
    'Sun Jun 11 2023': [
      {
        name: 'Entrevista',
        height: 50,
        day: 'Sun Jun 11 2023',
      },
    ],
  };

  const renderItem = (item: {
    height: any;
    name: string | number | undefined;
  }) => (
    <TouchableOpacity style={[styles.item, { height: item.height }]}>
      <Text value={item.name} />
    </TouchableOpacity>
  );

  const renderEmptyDate = () => <Text value="No hay eventos para este día" />;

  const renderEmptyData = () => (
    <SafeAreaView style={styles.emptyDateContainer}>
      <Text value="No hay eventos para este día" style={styles.emptyDateText} />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        ListEmptyComponent={renderEmptyData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  emptyDateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  emptyDateText: {
    fontSize: 16,
    color: '#999',
  },
});
