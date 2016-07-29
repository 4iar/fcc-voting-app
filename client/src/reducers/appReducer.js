import initialState from './initialState';

export default function app(state = initialState.app, action) {
  switch (action.type) {
    case 'SET_POLLS': {
      return {
        ...state,
        polls: action.payload.polls
      }
    }
    default:
      return state;
  }
}
