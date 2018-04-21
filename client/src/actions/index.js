import candidatesApi from '../services/candidatesApi';
import {
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_ERROR,
  FETCH_CANDIDATES_LOADING,
  CANDIDATES_INSERT,
  CANDIDATES_INSERT_LOADING,
  CANDIDATES_INSERT_ERROR,
  CANDIDATES_UPDATE,
  CANDIDATES_UPDATE_LOADING,
  CANDIDATES_UPDATE_ERROR,
  CANDIDATES_DELETE,
  CANDIDATES_DELETE_LOADING,
  CANDIDATES_DELETE_ERROR,
  CANDIDATES_CANCEL
} from './types';

const api = candidatesApi.create();

export const fetchCandidates = () => async dispatch => {
  dispatch({ type: FETCH_CANDIDATES_LOADING, payload: true });

  const res = await api.getCandidates();

  if (res.ok) {

    dispatch({ type: FETCH_CANDIDATES, payload: res.data.candidates });
  } else {
    dispatch({ type: FETCH_CANDIDATES_ERROR, payload: [] });
  }

};

export const fetchCandidate = (id) => async dispatch => {
  const res = await api.getCandidate(id);

  if (res.ok) {

    dispatch({ type: FETCH_CANDIDATES, payload: res.data.candidate });
  } else {
    dispatch({ type: 'FETCH_CANDIDATES_ERROR', payload: [] });
  }

};

export const insertCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_INSERT_LOADING, payload: true });

  const res = await api.insertCandidate(candidate);

  if (res.ok) {

    dispatch({ type: CANDIDATES_INSERT, payload: res.data.candidate });
  } else {
    dispatch({ type: CANDIDATES_INSERT_ERROR, payload: true });
  }

};

export const updateCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_UPDATE_LOADING, payload: true });

  const res = await api.updateCandidate(candidate);

  if (res.ok) {

    dispatch({ type: CANDIDATES_UPDATE, payload: res.data });
  } else {
    dispatch({ type: CANDIDATES_UPDATE_ERROR, payload: true });
  }

};

export const deleteCandidate = (candidate) => async dispatch => {
  dispatch({ type: CANDIDATES_DELETE_LOADING, payload: true });

  const res = await api.deleteCandidate(candidate._id);

  if (res.ok) {

    dispatch({ type: CANDIDATES_DELETE, payload: [] });

    dispatch(fetchCandidates());
  } else {
    dispatch({ type: CANDIDATES_DELETE_ERROR, payload: true });
  }

};

export const insertExperiences = (experiences) => async dispatch => {
  dispatch({ type: CANDIDATES_DELETE_LOADING, payload: true });

  const res = await api.deleteCandidate(0);

  if (res.ok) {

    dispatch({ type: CANDIDATES_DELETE, payload: [] });

    dispatch(fetchCandidates());
  } else {
    dispatch({ type: CANDIDATES_DELETE_ERROR, payload: true });
  }

};

export const cancelCandidateInsertion = () => async dispatch => {
  dispatch({ type: CANDIDATES_CANCEL, payload: true });
}
