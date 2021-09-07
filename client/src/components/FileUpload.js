import axios from 'axios';
import { useState } from 'react';

const FileUpload = () => {
  const [state, setState] = useState({});

  const uploadHandler = e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    axios.post('/api/upload', data).then(response => {
      console.log(response);
    });
  };
  return <input type='file' name='file' onChange={uploadHandler} />;
};

export default FileUpload;
