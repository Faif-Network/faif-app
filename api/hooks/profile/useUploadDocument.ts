import { getDocumentAsync } from 'expo-document-picker';
import { useEffect, useState } from 'react';

const useDocumentUploader = () => {
  const [documentToUpload, setDocument] = useState<any | undefined>();
  const [file, setFile] = useState<any | undefined>();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (documentToUpload) {
      console.log('Document to upload:', documentToUpload);
    }
  }, [documentToUpload]);

  const setDocumentFromPicker = async () => {
    try {
      const response = await getDocumentAsync({
        type: '*/*',
      });
      if (response.type === 'success') {
        console.log('Document picker response:', response);
        setDocument(response?.uri);
        setFile(response);
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  const uploadDocument = async (url: string) => {
    setIsUploading(true);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file?.mimeType,
        },
      });

      if (!response.ok) {
        console.error('Upload error:', response);
      }
      setIsUploading(false);
      setDocument(undefined);
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setDocument(undefined);
    }
  };

  return {
    uploadDocument,
    isUploading,
    documentToUpload,
    setDocument,
    setDocumentFromPicker,
  };
};

export default useDocumentUploader;
