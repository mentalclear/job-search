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

  it('should store all dgrees for listing', () => {
    const startingState = state();
    expect(startingState.degrees).toEqual([]);
  });

  it('should store degrees that user wants to filter by', () => {
    const startingState = state();
    expect(startingState.selectedDegrees).toEqual([]);
  });

  it('should store organizations that user wants to filter by', () => {
    const startingState = state();
    expect(startingState.selectedOrganizations).toEqual([]);
  });
  it('store job types that user would like to filter by', () => {
    const startingState = state();
    expect(startingState.selectedJobTypes).toEqual([]);
  });
});
