import { state, mutations } from '@/store';

describe('state', () => {
  it('should keep track of whether user is logged in', () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBeFalsy();
  });
});

describe('mutations', () => {
  describe('LOGIN_USER', () => {
    it('should log user in', () => {
      const currentState = { isLoggedIn: false };
      const epxectedState = { isLoggedIn: true };
      mutations.LOGIN_USER(currentState);
      expect(currentState).toEqual(epxectedState);
    });
  });
});
