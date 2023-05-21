import { useState } from 'react';

const useImageUploader = () => {
  const [image, setImage] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (url: string) => {
    setIsUploading(true);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: image,
        headers: {
          'x-ms-blob-type': 'BlockBlob',
        },
      });

      if (!response.ok) {
        console.error('Upload error:', response);
      }
      setIsUploading(false);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, image, setImage };
};

export default useImageUploader;
