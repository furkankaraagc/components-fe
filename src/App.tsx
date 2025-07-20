import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import FileUpload from './components/file-upload/file-upload';
import {FileUploadContextProvider} from './components/file-upload/file-upload-context-provider';

function App() {
  return (
    <div>
      <FileUploadContextProvider>
        <FileUpload />
      </FileUploadContextProvider>
    </div>
  );
}

export default App;
