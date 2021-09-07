import axios from 'axios';

const FileUpload = ({ movieId, setPoster, poster }) => {
  const uploadHandler = e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    axios
      .post(`/api/upload/${movieId}`, data)
      .then(response => {
        console.log(response);
        setTimeout(() => {
          console.log(response.data)
          setPoster(response.data.filename);
        }, 1000);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div>
        <label>Upload Poster</label>
      </div>
      <input type='file' name='file' onChange={uploadHandler} />
    </div>
  );
};

export default FileUpload;
