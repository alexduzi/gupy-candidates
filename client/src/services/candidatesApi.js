import apisauce from 'apisauce';

const create = (baseURL = process.env.REACT_APP_CANDIDATES_API_URL) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })

  const getCandidates = () => api.get('candidate');

  const getCandidate = (id) => api.get(`candidate/${id}`);

  const insertCandidate = (candidate) => api.post('candidate', { ...candidate });

  const updateCandidate = (candidate) => api.put('candidate', { ...candidate });

  const deleteCandidate = (id) => api.delete(`candidate/${id}`);

  const insertExperiences = ({ id, experiences }) => api.get(`candidate/${id}/experience`, { experiences });

  return {
    getCandidates,
    getCandidate,
    insertCandidate,
    updateCandidate,
    deleteCandidate,
    insertExperiences
  };
}

export default { create };
