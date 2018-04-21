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
  CANDIDATES_DELETE_ERROR
} from '../actions/types';

const INITIAL_STATE = {

  insertLoading: false,
  insertError: false,
  insertErrorMessage: '',

  updateLoading: false,
  updateError: false,
  updateErrorMessage: '',

  deleteLoading: false,
  deleteError: false,
  deleteErrorMessage: '',

  candidatesLoading: false,
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case CANDIDATES_INSERT_LOADING:

      return { ...state, insertLoading: true };

    case CANDIDATES_INSERT:

      return { ...state, insertLoading: false, insertError: false, insertErrorMessage: '' };

    case CANDIDATES_INSERT_ERROR:

      return { ...state, insertLoading: false, insertError: true, insertErrorMessage: action.payload };

    case CANDIDATES_UPDATE_LOADING:

      return { ...state, updateLoading: true };

    case CANDIDATES_UPDATE:

      return { ...state, updateLoading: false, updateError: false, updateErrorMessage: '' };

    case CANDIDATES_UPDATE_ERROR:

      return { ...state, updateLoading: false, updateError: true, updateErrorMessage: action.payload };

    case CANDIDATES_DELETE_LOADING:

      return { ...state, deleteLoading: true };

    case CANDIDATES_DELETE:

      return { ...state, deleteLoading: false, deleteError: false, deleteErrorMessage: '' };

    case CANDIDATES_DELETE_ERROR:

      return { ...state, deleteLoading: false, deleteError: true, deleteErrorMessage: action.payload };

    case FETCH_CANDIDATES_LOADING:

      return { ...state, candidatesLoading: true };

    case FETCH_CANDIDATES:

      return { ...state, list: action.payload, candidatesLoading: false };

    case FETCH_CANDIDATES_ERROR:

      return { ...state, list: [], candidatesLoading: false };

    default:
      return state;
  }
}
