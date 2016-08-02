import initialState from './initialState';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case 'SET_POLLS': {
      return {
        ...state,
        polls: action.payload.polls
      };
    }
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload.user
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        user: action.payload.user,
        id: action.payload.id
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: '',
        id: ''
      };
    }
    default:
      return state;
  }
}
