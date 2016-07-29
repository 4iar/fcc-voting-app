export function setPolls(polls) {
  return {
    type: 'SET_POLLS',
    payload: {
      polls
    }
  }
}
