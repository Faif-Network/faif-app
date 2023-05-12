import React, { useState } from 'react';
import Text from '../components/Text';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Facultad {
  id: string;
  nombre: string;
}

const facultades: Facultad[] = [
  { id: '1', nombre: 'Facultad de Bellas Artes' },
  { id: '2', nombre: 'Facultad de Biología' },
  { id: '3', nombre: 'Facultad de Ciencias de la Educación' },
  { id: '4', nombre: 'Facultad de Ciencias del Trabajo' },
  { id: '5', nombre: 'Facultad de Ciencias Económicas y Empresariales' },
  { id: '6', nombre: 'Facultad de Comunicación' },
  { id: '7', nombre: 'Facultad de Derecho' },
  { id: '8', nombre: 'Facultad de Enfermería, Fisioterapia y Podología' },
  { id: '9', nombre: 'Facultad de Farmacia' },
  { id: '10', nombre: 'Facultad de Filología' },
  { id: '11', nombre: 'Facultad de Filosofía' },
  { id: '12', nombre: 'Facultad de Geografía e Historia' },
  { id: '13', nombre: 'Facultad de Matemáticas' },
  { id: '14', nombre: 'Facultad de Medicina' },
  { id: '15', nombre: 'Facultad de Odontología' },
  { id: '16', nombre: 'Facultad de Óptica y Optometría' },
  { id: '17', nombre: 'Facultad de Psicología' },
  { id: '18', nombre: 'Facultad de Química' },
  { id: '19', nombre: 'Facultad de Trabajo Social' },
  { id: '20', nombre: 'Escuela Técnica Superior de Arquitectura' },
  { id: '21', nombre: 'Escuela Técnica Superior de Ingeniería' },
  { id: '22', nombre: 'Escuela Técnica Superior de Ingeniería Informática' },
  {
    id: '23',
    nombre:
      'Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos',
  },
  {
    id: '24',
    nombre: 'Escuela Técnica Superior de Ingenieros de la Edificación',
  },
  {
    id: '25',
    nombre: 'Escuela Técnica Superior de Ingenieros de Telecomunicación',
  },
  { id: '26', nombre: 'Escuela Técnica Superior de Ingenieros Industriales' },
  { id: '27', nombre: 'Escuela Universitaria de Magisterio Sagrado Corazón' },
];

const PantallaFacultades = () => {
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<
    Facultad | undefined
  >(undefined);

  const onFacultadSeleccionada = (facultad: Facultad) => {
    setFacultadSeleccionada(facultad);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://www.grupolarabida.org/wp-content/uploads/2020/10/Espana_UniversidaddeSevilla_US_51_.jpg',
        }}
      />
      <Text value="Selecciona una facultad:" size="large" />
      <Picker
        selectedValue={facultadSeleccionada}
        onValueChange={onFacultadSeleccionada}
      >
        {facultades.map((facultad) => (
          <Picker.Item
            key={facultad.id}
            label={facultad.nombre}
            value={facultad}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
  },
  picker: {
    width: '100%',
    height: 40,
    paddingHorizontal: 16,
  },
  logoContainer: {
    marginBottom: 40,
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
});

export default PantallaFacultades;
