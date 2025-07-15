import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const formData = new FormData();
    if (!file) return;

    formData.append('file', file);
    console.log({formData});
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/upload-image`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();

    console.log({data});
  };

  return (
    <div>
      <div>
        <input
          className='border'
          id='image-upload'
          type='file'
          placeholder='Type something...'
          onChange={handleUpload}
          accept='image/*'
        />
        <button className='border'>
          <label htmlFor='image-upload'>image upload</label>
        </button>
      </div>
    </div>
  );
}

export default App;
