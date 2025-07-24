import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import FileUpload from './components/file-upload/file-upload';
import {FileUploadContextProvider} from './components/file-upload/file-upload-context-provider';
import CalendarBar from './components/calendar/calendar-bar';
import {CalendarContextProvider} from './components/calendar/calendar-context-provider';

function App() {
  return (
    <div className='min-h-screen'>
      <FileUploadContextProvider>
        <FileUpload />
      </FileUploadContextProvider>
      <CalendarContextProvider>
        <CalendarBar />
      </CalendarContextProvider>
    </div>
  );
}

export default App;
