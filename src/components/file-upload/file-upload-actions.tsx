import React from 'react';
import {Button} from '../ui/button';
import {FileAndPreview} from './file-upload';

interface FileUploadActionsProps {
  files: FileAndPreview[];
  formData: FormData;
  handleUploadAxios: (formData: FormData) => Promise<void>;
}

export default function FileUploadActions({
  files,
  formData,
  handleUploadAxios,
}: FileUploadActionsProps) {
  const handleUpload = async () => {
    for (const item of files) {
      formData.append('files', item.file);
    }
    try {
      await handleUploadAxios(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <footer className='flex justify-between items-center py-4 px-3 border-t'>
      <Button variant={'ghost'}>Cancel</Button>
      <Button
        className='cursor-pointer disabled:cursor-not-allowed'
        disabled={!files.length}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </footer>
  );
}
