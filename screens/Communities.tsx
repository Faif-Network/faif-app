import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../components/Text';

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

const CommunitiesScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth / 3 - 20;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text value="Selecciona tu facultad:" weight="bold" size="large" />
        </View>
        <View style={styles.facultadesContainer}>
          {facultades.map((facultad) => (
            <TouchableOpacity
              key={facultad.id}
              style={styles.facultadContainer}
            >
              <Image
                style={[styles.facultadImagen, { width: imageWidth }]}
                source={{
                  uri: 'https://www.grupolarabida.org/wp-content/uploads/2020/10/Espana_UniversidaddeSevilla_US_51_.jpg',
                }}
              />
              <Text
                value={facultad.nombre}
                align="center"
                size="small"
                weight="bold"
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text value="Finalizar" size="medium" weight="bold" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  titleContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  facultadesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  facultadContainer: {
    width: '32%',
    marginBottom: 16,
    alignItems: 'center',
  },
  facultadImagen: {
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 1,
    borderRadius: 1,
    marginTop: 16,
    alignItems: 'center',
    width: 100,
  },
});

export default CommunitiesScreen;
