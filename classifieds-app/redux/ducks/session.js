const SET = 'sessions/SET';
const CLEAR = 'session/CLEAR';

const DEFAULT_STATE = null;

const sessionReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case SET:
      return action.session;
    case CLEAR:
      return null;
  }
  return state;
};

export default sessionReducer;

export const setSession = session => {
  console.log('xxxxx');
  return { session, type: SET };
};

export const clearSession = () => {
  return { type: CLEAR };
};
