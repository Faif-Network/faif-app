import React, { useState } from 'react';
import { View, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

function Upload(){
  const UploadPost = () => {
    const [image, setImage] = useState<ImageOrVideo | null>(null);
  
    const handleImagePicker = async () => {
      try {
        const pickedImage = await ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        });
  
        setImage(pickedImage);
      } catch (error) {
        console.log('Error picking image:', error);
      }
    };
  
    const handleCameraPicker = async () => {
      try {
        const takenImage = await ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        });
  
        setImage(takenImage);
      } catch (error) {
        console.log('Error taking image:', error);
      }
    };
  

    return (
      <SafeAreaView style={{ flex: 1 }}>
          {image && <Image source={{ uri: image.path }} style={{ width: 200, height: 200 }} />}
          <Button title="Seleccionar Imagen" onPress={handleImagePicker} />
          <Button title="Tomar Foto" onPress={handleCameraPicker} />
      </SafeAreaView>
    )
  };
}

export default Upload;
