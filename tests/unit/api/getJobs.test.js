import axios from 'axios';
import getJobs from '@/api/getJobs';

jest.mock('axios');

describe('getJobs', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [{
        id: 1,
        title: 'Java Engineer',
      }],
    });
  });

  it('should fetch jobs that candidates can apply to', async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
  });
  it('should extract jobs from response', async () => {
    const data = await getJobs();
    expect(data).toEqual([{
      id: 1,
      title: 'Java Engineer',
    }]);
  });
});
