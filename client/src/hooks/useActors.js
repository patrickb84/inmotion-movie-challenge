import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const useActors = () => {
  // let history = useHistory();

  const getAllActors = async () => {
    try {
      const response = await axios.get('/api/actors');
      return response.data.actors;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const getActor = async id => {
    try {
      const response = await axios.get(`/api/actors/${id}`);
      const { actor } = response.data;
      return actor;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const addActor = async ({ ...actor }) => {
    try {
      const response = await axios.post('/api/actors', {
        name: actor.name,
      });
      return response.data.newId;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const updateActor = async ({ ...actor }) => {
    try {
      await axios.put('/api/actors', {
        id: actor.id,
        name: actor.name,
      });
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const deleteActor = async id => {
    try {
      await axios.delete(`/api/actors/${id}`);
      return { error: false };
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // const handleError = error => {
  //   if (error.response.status === 404) history.push('/error/404');
  //   if (error.response.status === 500) history.push('/error/500');
  // };

  return {
    getAllActors,
    getActor,
    addActor,
    updateActor,
    deleteActor,
  };
};

export default useActors;
