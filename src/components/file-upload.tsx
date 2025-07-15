import axios from 'axios';
import {useState} from 'react';

const FileUpload = () => {
  const [progress, setProgress] = useState(0);

  const baseApi = import.meta.env.VITE_API_URL;

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
  const handleUploadAxios = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

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
  return (
    <div className='p-4'>
      <input type='file' accept='image/*' onChange={handleUploadAxios} />
      <div className='mt-4 w-full bg-gray-200 rounded h-4'>
        <div
          className='bg-blue-500 h-4 rounded transition-all duration-300 ease-out'
          style={{width: `${progress}%`}}
        ></div>
      </div>
      <p className='text-sm mt-1'>{progress}%</p>
    </div>
  );
};

export default FileUpload;
