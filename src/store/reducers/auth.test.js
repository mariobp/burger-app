import reduce from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

describe('auth reducer', () => {
  it('should return the initialState', () => {
    expect(reduce(undefined, {})).toEqual(initialState);
  });

  it('should return the initialState', () => {
    expect(reduce(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      data: {
        idToken: 'SOME-TOKEN',
        localId: 'SOME-LOCALID'
      }
    })).toEqual({
      token: 'SOME-TOKEN',
      userId: 'SOME-LOCALID',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});