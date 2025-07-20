import {useRef, useState} from 'react';
import {FileUploadContext} from './file-upload-contex';
import {FileAndPreview} from './file-upload';
import axios from 'axios';
interface FileUploadContextProviderProps {
  children: React.ReactNode;
}
export function FileUploadContextProvider({
  children,
}: FileUploadContextProviderProps) {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<FileAndPreview[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  const dragCounter = useRef(0);
  const baseApi = import.meta.env.VITE_API_URL;
  const formData = new FormData();

  const handleUploadFetch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData = new FormData();
    if (!file) return;

    formData.append('files', file);
    try {
      const res = await fetch(`${baseApi}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log({data});
      if (!res.ok) {
        throw new Error(data.message);
      }
      console.log({data});
    } catch (error) {
      console.log((error as Error).message);
    }
  };
  const handleUploadAxios = async (formData: FormData) => {
    try {
      setUploadLoading(true);
      const res = await axios.post(`${baseApi}/api/upload-image`, formData, {
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
          if (total) {
            const percentage = Math.round((loaded * 100) / total);
            setProgress(percentage);
          }
        },
      });
      console.log({res});
    } catch (error) {
      console.log({error});
    } finally {
      setUploadLoading(false);
    }
  };
  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files).map((file) => {
      return {file, previewUrl: URL.createObjectURL(file)};
    });
    setFiles((prev) => [...prev, ...files]);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(false);
    const files = Array.from(e.dataTransfer.files);

    const isAllImage = Array.from(files).every((file) =>
      file.type.startsWith('image/')
    );
    if (!isAllImage) {
      return;
    }
    const fileAndPreviewUrls = files.map((file) => {
      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });
    setFiles((prev) => [...prev, ...fileAndPreviewUrls]);
  };
  const handleDragEnter = () => {
    dragCounter.current++;
    setDropActive(true);
  };
  const handleDragLeave = () => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDropActive(false);
    }
  };

  return (
    <FileUploadContext.Provider
      value={{
        handleUploadAxios,
        selectImage,
        handleDrop,
        handleDragEnter,
        handleDragLeave,
        files,
        setFiles,
        dropActive,
        formData,
        progress,
        uploadLoading,
        setUploadLoading,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
}
