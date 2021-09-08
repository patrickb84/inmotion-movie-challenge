import useMovies from '../hooks/useMovies';

const InputFileUpload = ({ movieId, setFormPoster, formPoster }) => {
  const { uploadPoster } = useMovies();

  const uploadHandler = async e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const uploadedFilename = await uploadPoster(data, movieId);
    console.log({ uploadedFilename });
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

export default InputFileUpload;
