export const LOAD_USER = 'LOAD_USER';

export default function user(state = {}, { payload, type }) {
  switch (type) {
    case LOAD_USER:
      return { ...payload };
  }
  return state;
}
