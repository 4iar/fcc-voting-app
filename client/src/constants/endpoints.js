//export const BASE_URL = 'http://localhost:5000';
export const BASE_URL = 'https://voting-app-4iar.herokuapp.com';
export const ALL_POLLS_ENDPOINT = BASE_URL + '/api/polls/view';
export const VOTE_ENDPOINT = BASE_URL + '/api/poll/pollId/vote'; //fucking no string formatting
export const USER_INFO_ENDPOINT = BASE_URL + '/api/auth/currentuser';
