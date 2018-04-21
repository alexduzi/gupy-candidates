import {
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_ERROR,
  FETCH_CANDIDATES_LOADING,

  FETCH_CANDIDATE,

  CANDIDATES_INSERT,
  CANDIDATES_INSERT_LOADING,
  CANDIDATES_INSERT_ERROR,
  CANDIDATES_UPDATE,
  CANDIDATES_UPDATE_LOADING,
  CANDIDATES_UPDATE_ERROR,
  CANDIDATES_DELETE,
  CANDIDATES_DELETE_LOADING,
  CANDIDATES_DELETE_ERROR,
  CANDIDATES_CANCEL,

  EXPERIENCES_INSERT,
  EXPERIENCES_INSERT_LOADING,
  EXPERIENCES_INSERT_ERROR,

  EXPERIENCES_UPDATE,
  EXPERIENCES_UPDATE_LOADING,
  EXPERIENCES_UPDATE_ERROR,

  EXPERIENCES_DELETE,
  EXPERIENCES_DELETE_LOADING,
  EXPERIENCES_DELETE_ERROR
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

  experienceInsertLoading: false,
  experienceInsertError: false,
  experienceInsertErrorMessage: '',

  experienceUpdateLoading: false,
  experienceUpdateError: false,
  experienceUpdateErrorMessage: '',

  experienceDeleteLoading: false,
  experienceDeleteError: false,
  experienceDeleteErrorMessage: '',

  candidatesLoading: false,
  list: [],
  candidate: undefined
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {

    case CANDIDATES_INSERT_LOADING:

      return { ...state, insertLoading: true };

    case CANDIDATES_INSERT:

      return { ...state, insertLoading: false, insertError: false, insertErrorMessage: '', candidate: action.payload };

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

    case FETCH_CANDIDATE:

      return { ...state, candidate: action.payload };

    case CANDIDATES_CANCEL:

      return { ...state, candidate: undefined };

    case EXPERIENCES_INSERT:

      return { ...state, experienceInsertLoading: false };

    case EXPERIENCES_INSERT_LOADING:

      return { ...state, experienceInsertLoading: true }

    case EXPERIENCES_INSERT_ERROR:

      return { ...state,  }

    case EXPERIENCES_UPDATE:

      return { ...state, experienceUpdateLoading: false };

    case EXPERIENCES_UPDATE_LOADING:

      return { ...state, experienceUpdateLoading: true }

    case EXPERIENCES_UPDATE_ERROR:

      return { ...state,  }

    case EXPERIENCES_DELETE:

      return { ...state, experienceDeleteLoading: false };

    case EXPERIENCES_DELETE_LOADING:

      return { ...state, experienceDeleteLoading: true }

    case EXPERIENCES_DELETE_ERROR:

      return { ...state,  }

    default:
      return state;
  }
}
