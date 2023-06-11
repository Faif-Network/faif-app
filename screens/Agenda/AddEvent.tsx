import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import useAddCalendarEvent, {
  EventTypes,
  IAddCalendarEventRequest,
} from '../../api/hooks/calendar/useAddCalendarEvent';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

export default function AddEventScreen() {
  const onSubmit = async (values: IAddCalendarEventRequest) => {
    handleAddEvent();
  };
  const navigation = useNavigation();

  const { handleAddCalendarEvent, isLoading } = useAddCalendarEvent();

  const form = useForm<IAddCalendarEventRequest>({
    initialValues: {
      timestamp: new Date().getTime(),
      description: '',
      eventType: EventTypes.PERSONAL,
    },
    onSubmit,
  });

  const handleAddEvent = async () => {
    if (
      !form.values.description ||
      !form.values.eventType ||
      !form.values.timestamp
    ) {
      Alert.alert('Error', 'Debes llenar todos los campos');
      return;
    }
    await handleAddCalendarEvent(form.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text value="Fecha de evento: " />
        <DateTimePicker
          value={new Date(form.values.timestamp)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            form.handleChange(
              'timestamp',
              selectedDate?.getTime() || new Date().getTime(),
            );
          }}
        />
      </View>

      <View style={styles.row}>
        <InputText
          placeholder="Descripción del evento"
          onChangeText={(value) => form.handleChange('description', value)}
          style={[styles.input, styles.select]}
        />
      </View>

      <View style={styles.row}>
        <Text value="Tipo de evento: " />
        <SelectDropdown
          data={Object.values(EventTypes)}
          onSelect={(selectedItem) => {
            form.handleChange('eventType', selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
          buttonStyle={[styles.select]}
          rowStyle={[styles.selectRow]}
        />
      </View>

      <Button
        title="Agregar evento"
        onPress={handleAddEvent}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  select: {
    borderRadius: 12,
  },
  selectRow: {
    borderRadius: 12,
    height: 40,
  },
});
