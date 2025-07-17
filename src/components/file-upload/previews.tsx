import {Trash} from 'lucide-react';
import React from 'react';
import {Button} from '../ui/button';
import {FileAndPreview} from './file-upload';

interface PreviewsProps {
  files: FileAndPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileAndPreview[]>>;
}

export default function Previews({files, setFiles}: PreviewsProps) {
  if (files.length === 0) {
    return null;
  }
  const handleRemoveSelected = (previewUrl: string) => {
    const filtred = files.filter((item) => item.previewUrl !== previewUrl);
    setFiles(filtred);
  };
  return (
    <section className='grid grid-cols-2 gap-4 p-6'>
      {files.map((item, index) => (
        <div key={index} className='relative'>
          <img
            className='object-cover aspect-square w-56 h-auto rounded-xl'
            src={item.previewUrl}
            alt=''
          />
          <Button
            onClick={() => handleRemoveSelected(item.previewUrl)}
            className='hover:scale-105 transition-all absolute right-2 border border-slate-700 top-2 rounded-full  aspect-square w-8 h-auto'
          >
            <Trash size={20} className='' />
          </Button>
        </div>
      ))}
    </section>
  );
}
