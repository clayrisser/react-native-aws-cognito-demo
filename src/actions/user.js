import { LOAD_USER } from '../reducers/user';

export function loadUser(user) {
  return {
    type: LOAD_USER,
    payload: user
  };
}
