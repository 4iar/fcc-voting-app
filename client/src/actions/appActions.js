export function setPolls(polls) {
  return {
    type: 'SET_POLLS',
    payload: {
      polls
    }
  }
}

export function login(user, id) {
  return {
    type: 'LOGIN',
    payload: {
      user,
      id
    }
  };
}

export function logout() {
  console.log("got an action to logout")
  return {
    type: 'LOGOUT'
  };
}
