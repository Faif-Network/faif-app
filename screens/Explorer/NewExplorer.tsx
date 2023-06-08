import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import useCreateExplorer, {
  ExplorerTypes,
  ICreateExplorerRequest,
} from '../../api/hooks/explorer/useCreateExplorer';
import useImageUploader from '../../api/hooks/useUploadImage';
import Button from '../../components/UI/Buttons';
import InputText from '../../components/UI/Inputs';
import Text from '../../components/UI/Text';
import useForm from '../../utils/useForm';

export default function NewExplorerScreen() {
  const navigation = useNavigation();
  const onSubmit = async (values: ICreateExplorerRequest) => {
    try {
      const { data } = await handleCreateExplorer(values);
      if (data?.attachment_url) await uploadImage(data.attachment_url);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Ocurrio un error al crear el explorador');
    }
  };

  const { handleCreateExplorer, isLoading } = useCreateExplorer();

  const form = useForm<ICreateExplorerRequest>({
    initialValues: {
      explorer_type: ExplorerTypes.UNIVERSITY,
      short_description: '',
      description: '',
      title: '',
      attachment: '',
      start_date: new Date().getTime(),
    },
    onSubmit,
  });

  const { imageToUpload, setImageFromPicker, uploadImage } = useImageUploader();

  return (
    <ScrollView style={styles.container}>
      <Text
        value="Nueva publicación"
        align="center"
        weight="bold"
        size="large"
        style={{ marginBottom: 16 }}
      />
      <Text
        value="Agrega un nuevo item a al explorador global y compartelo con toda la comunidad"
        align="center"
        style={{ marginBottom: 16 }}
      />

      <View style={styles.column}>
        <Text value="Fecha de evento (opcional): " />
        <DateTimePicker
          value={
            form.values.start_date
              ? new Date(form.values.start_date)
              : new Date()
          }
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            form.handleChange(
              'start_date',
              selectedDate?.getTime() || new Date().getTime(),
            );
          }}
          style={{ marginBottom: 12, alignSelf: 'flex-start', marginLeft: -12 }}
        />
      </View>

      <View style={styles.column}>
        <Text value="Titulo: " />
        <InputText
          placeholder="Titulo"
          onChangeText={(value) => form.handleChange('title', value)}
        />
      </View>

      <View style={styles.column}>
        <Text value="Descripción corta: " />
        <InputText
          placeholder="Descripción de la publicación"
          onChangeText={(value) =>
            form.handleChange('short_description', value)
          }
        />
      </View>

      <View style={styles.column}>
        <Text value="Descripción: " />
        <InputText
          placeholder="Descripción de la publicación"
          onChangeText={(value) => form.handleChange('description', value)}
          multiline
          numberOfLines={3}
          style={{ height: 100 }}
        />
      </View>

      <View style={styles.column}>
        <Text value="Tipo de evento: " />
        <SelectDropdown
          data={Object.values(ExplorerTypes).map((item) => item.toUpperCase())}
          onSelect={(selectedItem) => {
            form.handleChange('explorer_type', selectedItem);
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

      <View style={styles.column}>
        {imageToUpload ? (
          <Image
            source={{ uri: imageToUpload?.uri }}
            style={{ width: 200, height: 200, alignSelf: 'center' }}
          />
        ) : (
          <Text value="Imagen: " />
        )}
        <Button
          title={imageToUpload ? 'Cambiar imagen' : 'Agregar imagen'}
          onPress={async () => {
            await setImageFromPicker();
          }}
        />
      </View>
      <Button
        title="Agregar evento"
        onPress={form.handleSubmit}
        primary
        isLoading={isLoading}
        style={{ marginBottom: 24 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  column: {
    flexDirection: 'column',
    marginBottom: 16,
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
    borderRadius: 10,
    height: 28,
  },
  selectRow: {
    borderRadius: 12,
    height: 40,
  },
});
