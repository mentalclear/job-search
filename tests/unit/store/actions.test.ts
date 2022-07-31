import actions from '@/store/actions';
import getJobs from '@/api/getJobs';
import getDegrees from '@/api/getDegrees';

jest.mock('@/api/getJobs');
const getJobsMock = getJobs as jest.Mock;
jest.mock('@/api/getDegrees');
const getDegreesMock = getDegrees as jest.Mock;


describe('actions', () => {
  describe('FETCH_JOBS', () => {
    beforeEach(() => {
      getJobsMock.mockResolvedValue([{ id: 1, title: 'Software Developer' }]);
    });

    it('should make a request to fetch jobs', async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it('should send message to save recieved jobs in store', async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_JOBS(context);
      expect(commit).toHaveBeenCalledWith('RECEIVE_JOBS', [
        { id: 1, title: 'Software Developer' },
      ]);
    });
  });
  describe('FETCH_DEGREESS', () => {
    beforeEach(() => {
      getDegreesMock.mockResolvedValue([{ id: 1, degree: 'Master\'s' }]);
    });

    it('should make a request to fetch degreess', async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_DEGREES(context);
      expect(getDegrees).toHaveBeenCalled();
    });

    it('should send message to save recieved degreess in store', async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_DEGREES(context);
      expect(commit).toHaveBeenCalledWith('RECEIVE_DEGREES', [
        { id: 1, degree: 'Master\'s' },
      ]);
    });
  });
});
