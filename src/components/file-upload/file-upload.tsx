import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Button} from '../ui/button';
import {ImagePlus, Plus, X} from 'lucide-react';
import Previews from './previews';
import FileUploadActions from './file-upload-actions';
import {cn} from '@/lib/utils';
import {useFileUploadContext} from './file-upload-contex';

export interface FileAndPreview {
  file: File;
  previewUrl: string;
}

const FileUpload = () => {
  const {
    handleUploadAxios,
    selectImage,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    files,
    dropActive,
    formData,
    progress,
  } = useFileUploadContext();

  return (
    <div
      className={cn('w-96 mx-auto border mt-20', {
        'bg-black/40': dropActive && files.length !== 0,
      })}
    >
      <input
        id='upload-input'
        className='hidden'
        type='file'
        accept='image/*'
        onChange={selectImage}
        multiple
      />
      <header className='flex  justify-between items-center px-3'>
        <Button
          variant={'ghost'}
          className='rounded-full h-auto aspect-square w-8'
        >
          <X />
        </Button>
        <div className=''>
          <div className='font-medium text-base'>Upload photos</div>
          <div className='font-normal text-sm text-slate-600'>
            {files.length === 0
              ? 'No items'
              : files.length === 1
              ? '1 item'
              : files.length > 1
              ? `${files.length} items`
              : null}{' '}
            selected
          </div>
        </div>
        <label htmlFor='upload-input' className=''>
          <Button
            variant={'ghost'}
            asChild
            className='rounded-full h-auto aspect-square w-8'
          >
            <span>
              <Plus />
            </span>
          </Button>
        </label>
      </header>
      {progress > 0 && progress !== 100 && (
        <div className='px-6 mt-2'>
          <div className=' w-full  bg-gray-200 rounded h-1'>
            <div
              className='bg-blue-500 h-1 rounded transition-all duration-300 ease-out transform-gpu'
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
      )}
      <Previews />
      {files.length === 0 && (
        <div className='p-6'>
          <div
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDragEnter={() => {
              if (files.length > 0) return;
              handleDragEnter();
            }}
            onDragLeave={() => {
              if (files.length > 0) return;
              handleDragLeave();
            }}
            className={cn(
              'border-dashed border p-10 z-20 border-black rounded-xl w-full',
              {
                'bg-slate-100': dropActive,
              }
            )}
          >
            <section className='flex flex-col items-center gap-2'>
              <ImagePlus />
              <div className='text-xl font-medium text-slate-900'>
                Drag & drop
              </div>
              <div className='text-sm font-normal text-slate-600'>
                or browse for photos
              </div>
              <label htmlFor='upload-input'>
                <Button asChild>
                  <span>Browse</span>
                </Button>
              </label>
            </section>
          </div>
        </div>
      )}

      <FileUploadActions
        files={files}
        formData={formData}
        handleUploadAxios={handleUploadAxios}
      />
    </div>
  );
};

export default FileUpload;
