export function setPolls(polls) {
  return {
    type: 'SET_POLLS',
    payload: {
      polls
    }
  }
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    payload: {
      user
    }
  };
}
