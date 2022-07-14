import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TheHeadline from '@/components/jobsearch/TheHeadline.vue';

describe('TheHeadline', () => {
  beforeEach(() => {
    jest.useFakeTimers('legacy');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should display introductory action verb', () => {
    const wrapper = mount(TheHeadline);
    const actionPhrase = wrapper.find('[data-test="action-phrase"]');
    expect(actionPhrase.text()).toBe('Build for everyone');
  });

  it('Should change action verb at a consistent interval', () => {
    mount(TheHeadline);
    expect(setInterval).toHaveBeenCalled();
  });

  it('Should swap action verb after first interval', async () => {
    const wrapper = mount(TheHeadline);
    jest.runOnlyPendingTimers();
    // console.log(wrapper.vm.action); // View model output
    await nextTick(); // Wait for a page "Refresh" after the action.
    const actionPhrase = wrapper.find('[data-test="action-phrase"]');
    expect(actionPhrase.text()).toBe('Create for everyone');
  });

  it('Should remove interval when component is gone', () => {
    const wrapper = mount(TheHeadline);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});

// Worked on examples:

// describe('TheHeadline', () => {
//   describe('Jest playground', () => {
//     it('Track whether it has been called', () => {
//       // Mock out timers
//       jest.useFakeTimers('legacy');
//       // Do things
//       console.log(clearInterval);
//       // Restore timers behavior
//       jest.useRealTimers();
//     });
//   });
// });
