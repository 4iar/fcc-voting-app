# Voting App
[FreeCodeCamp project](https://www.freecodecamp.com/challenges/build-a-voting-app)

## Deployment
Hosted on https://voting-app-4iar.herokuapp.com/

### TODO
- [ ] Handle requests and their outcomes in redux middleware rather than components
- [ ] Use some sort of toast notification system rather than handling errors in components
- [ ] Improve validation of polls (prevent empty questions, etc)
- [ ] Add server-side validation for new choices -- should only be added by authenticated users
- [ ] Add logout button
- [ ] Add frontend handling for unauthenticated users that try to perform actions such as creating polls (i.e. redirect to /login)
- [ ] Improve reload behaviour -- at the moment, clicking the logo refreshes the whole app through window.location.replace, which is ugly and slow
- [ ] Improve behaviour following poll-deletion -- currently it just notifies the user poll has been deleted. Might be better to redirect to home or make the success message more prominent
- [ ] Add options to change chart type (manual vs dynamic? -- prefer chart when choices < 5)
- [ ] Style the poll author text (place at the bottom or under title?) + add dynamic behaviour: display "You created this poll." rather than "Poll created by YOURUSERNAME" if the logged in user created the poll
- [ ] Style the loading screens
