'use client';

import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {FileAndPreview} from './file-upload';
import axios from 'axios';

interface IFileUploadContext {
  handleUploadAxios: (formData: FormData) => Promise<void>;
  selectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragEnter: () => void;
  handleDragLeave: () => void;
  files: FileAndPreview[];
  dropActive: boolean;
  formData: FormData;
  progress: number;
  setFiles: React.Dispatch<React.SetStateAction<FileAndPreview[]>>;
  uploadLoading: boolean;
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileUploadContext = createContext<IFileUploadContext | null>(null);
export const useFileUploadContext = () => {
  const context = useContext(FileUploadContext);

  if (!context) {
    throw new Error(
      'useFileUploadContext must be used within FileUploadContextProvider'
    );
  }

  return context;
};
