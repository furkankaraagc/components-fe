import axios from 'axios';
import {useState} from 'react';
import {Button} from '../ui/button';
import {ImagePlus, Plus, X} from 'lucide-react';
import Previews from './previews';
import FileUploadActions from './file-upload-actions';

export interface FileAndPreview {
  file: File;
  previewUrl: string;
}

const FileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<FileAndPreview[]>([]);

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
    }
  };

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFiles((prev) => [...prev, {file, previewUrl}]);
  };

  return (
    <div className='w-96 mx-auto border mt-20'>
      <input
        id='upload-input'
        className='hidden'
        type='file'
        accept='image/*'
        onChange={selectImage}
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
      <Previews files={files} setFiles={setFiles} />
      {files.length === 0 && (
        <div className='p-6'>
          <div className='border-dashed border p-10 border-black rounded-xl w-full'>
            {progress > 0 && (
              <div className='mt-4 w-full bg-gray-200 rounded h-2'>
                <div
                  className='bg-blue-500 h-4 rounded transition-all duration-300 ease-out'
                  style={{width: `${progress}%`}}
                ></div>
              </div>
            )}
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
