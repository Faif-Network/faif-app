import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const useImageUploader = () => {
  const [imageToUpload, setImage] = useState<
    ImagePicker.ImagePickerAsset | undefined
  >();
  const [isUploading, setIsUploading] = useState(false);

  const setImageFromPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0]);
  };

  const uploadImage = async (url: string) => {
    setIsUploading(true);

    try {
      const response = await fetch(imageToUpload?.uri as string);
      const blob = await response.blob();

      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: blob,
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'image/jpeg',
        },
      });

      if (!uploadResponse.ok) {
        console.error('Upload error:', uploadResponse);
      }
      setIsUploading(false);
      setImage(undefined);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    imageToUpload,
    setImage,
    setImageFromPicker,
  };
};

export default useImageUploader;
