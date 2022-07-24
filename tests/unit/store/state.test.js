import state from '@/store/state';

describe('state', () => {
  it('should keep track of whether user is logged in', () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBeFalsy();
  });

  it('should store job listings', () => {
    const startingState = state();
    expect(startingState.jobs).toEqual([]);
  });

  it('should store organizations that user wants to filter by', () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
});
