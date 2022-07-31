import nextElementInList from '@/utils/nextElementInList';

describe('nextElementInList', () => {
  it('Should locate element in list and return element in list', () => {
    const list = ['A', 'B', 'C', 'D', 'E'];
    const value = 'C';
    const result = nextElementInList(list, value);
    expect(result).toBe('D');
  });

  describe('When element is the last in the list', () => {
    it('Should return element in list', () => {
      const list = ['A', 'B', 'C', 'D', 'E'];
      const value = 'E';
      const result = nextElementInList(list, value);
      expect(result).toBe('A');
    });
  });
});
