export function setRedirectReducer(state = {isRedirectEnabled: false}, action) {
  switch (action.type) {
    case "DISABLE_REDIRECT":
      return {...state, isRedirectEnabled: false};
    case "ENABLE_REDIRECT":
      return {...state, isRedirectEnabled: true};
    default:
      return state;
  }
}
