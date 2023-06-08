import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/UI/Buttons';
import Text from '../../components/UI/Text';

interface Facultad {
  name: string;
  slug: string;
  icon: string;
}

const facultades: Facultad[] = [
  {
    name: 'Facultad de Bellas Artes',
    slug: 'FBA',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Biología',
    slug: 'FB',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Ciencias de la Educación',
    slug: 'FCE',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Ciencias del Trabajo',
    slug: 'FCT',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Ciencias Económicas y Empresariales',
    slug: 'FCEE',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Comunicación',
    slug: 'FCOM',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Derecho',
    slug: 'FD',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Enfermería, Fisioterapia y Podología',
    slug: 'FEFP',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Farmacia',
    slug: 'FF',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Filología',
    slug: 'FFILO',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Filosofía',
    slug: 'FFILO',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Geografía e Historia',
    slug: 'FGH',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Matemáticas',
    slug: 'FMAT',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Medicina',
    slug: 'FMED',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Odontología',
    slug: 'FOD',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Óptica y Optometría',
    slug: 'FOO',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Psicología',
    slug: 'FP',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Química',
    slug: 'FQ',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Facultad de Trabajo Social',
    slug: 'FTS',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Arquitectura',
    slug: 'ETSA',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingeniería',
    slug: 'ETSI',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingeniería Informática',
    slug: 'ETSII',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingenieros de Caminos, Canales y Puertos',
    slug: 'ETSICCP',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingenieros de la Edificación',
    slug: 'ETSIE',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingenieros de Telecomunicación',
    slug: 'ETSIT',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Técnica Superior de Ingenieros Industriales',
    slug: 'ETSIIND',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
  {
    name: 'Escuela Universitaria de Magisterio Sagrado Corazón',
    slug: 'EUMSC',
    icon: 'https://seeklogo.com/images/U/universidad-de-sevilla-logo-214320A847-seeklogo.com.png',
  },
];

const CommunitiesScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth / 3 - 20;
  const navigation = useNavigation();

  const [selectedFacultad, setSelectedFacultad] = useState('');

  const handleFacultadPress = (facultadId: string) => {
    setSelectedFacultad(facultadId);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text value="Selecciona tu facultad:" weight="bold" size="large" />
        </View>
        <View style={styles.facultadesContainer}>
          {facultades.map((facultad) => (
            <TouchableOpacity
              key={facultad.name}
              style={[
                styles.facultadContainer,
                selectedFacultad === facultad.name && styles.selectedFacultad,
              ]}
              onPress={() => handleFacultadPress(facultad.name)}
            >
              <Image
                style={[styles.facultadImagen, { width: imageWidth }]}
                source={{
                  uri: facultad.icon,
                }}
              />
              <Text
                value={facultad.name}
                align="center"
                size="small"
                weight="bold"
              />
            </TouchableOpacity>
          ))}
        </View>
        <Button
          title="Finalizar"
          onPress={() => {
            // Refresh screen
            navigation.reset({
              index: 1,
              routes: [{ name: 'Main' } as any],
            });
          }}
          style={{ marginBottom: 16, alignSelf: 'center', width: 200 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  selectedFacultad: {
    backgroundColor: '#5D88FF',
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
