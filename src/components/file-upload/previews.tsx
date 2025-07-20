import {Trash} from 'lucide-react';
import React from 'react';
import {Button} from '../ui/button';
import {FileAndPreview} from './file-upload';
import {CircularProgress} from '../ui/circular-progress';
import {cn} from '@/lib/utils';
import {useFileUploadContext} from './file-upload-contex';

export default function Previews() {
  const {
    files,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    progress,
    setFiles,
    uploadLoading,
  } = useFileUploadContext();
  if (files.length === 0) {
    return null;
  }
  const handleRemoveSelected = (previewUrl: string) => {
    const filtred = files.filter((item) => item.previewUrl !== previewUrl);
    setFiles(filtred);
  };
  return (
    <section
      onDrop={handleDrop}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={cn('grid grid-cols-2 gap-4 p-6')}
    >
      {files.map((item, index) => (
        <div key={index} className={cn('relative overflow-hidden')}>
          <div
            className={cn(' absolute w-full h-full rounded-xl', {
              'bg-black/40': uploadLoading,
            })}
          ></div>
          <img
            className='object-cover aspect-square w-56 h-auto rounded-xl'
            src={item.previewUrl}
            alt=''
          />
          <Button
            onClick={() => handleRemoveSelected(item.previewUrl)}
            className=' group hover:scale-105  absolute right-2 border border-slate-700 top-2 rounded-full  aspect-square max-w-8 max-h-8'
          >
            <Trash size={20} className='group-hover:scale-95 transition-all' />
          </Button>
          {uploadLoading && (
            <CircularProgress
              className='absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2'
              value={progress}
              size={50}
              strokeWidth={3}
              circleClassName=' stroke-gray-400'
              progressClassName=' stroke-white'
            />
          )}
        </div>
      ))}
    </section>
  );
}
