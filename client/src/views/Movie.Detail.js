import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  let { id } = useParams();
  
  return (
    <div className='container'>
      <h1>MovieDetail, ID: {id}</h1>
    </div>
  );
};

export default MovieDetail;
