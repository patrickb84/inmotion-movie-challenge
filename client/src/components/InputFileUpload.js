import useMovies from "../hooks/useMovies";

const InputFileUpload = ({ movieId, setFormPoster, formPoster }) => {
  const { uploadPoster } = useMovies();

  const uploadHandler = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);

    const uploadedFilename = await uploadPoster(data, movieId);
    setFormPoster(uploadedFilename);
  };

  return (
    <>
      <label className="d-block">Upload Poster</label>
      <input type="file" name="file" onChange={uploadHandler} />
    </>
  );
};

export default InputFileUpload;
