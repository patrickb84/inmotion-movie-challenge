import { useParams } from 'react-router-dom';

const GenreDetail = () => {
  let { id } = useParams();
  
  return (
    <div className='container'>
      <h1>GenreDetail, ID: {id}</h1>
    </div>
  );
};

export default GenreDetail;
