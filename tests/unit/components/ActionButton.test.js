import ActionButton from '@/components/ActionButton.vue';
import { mount } from '@vue/test-utils';

describe('ActionButton', () => {
  it('It renders text', () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: 'I\'m so clickable',
        type: 'primary',
      },
    });
    expect(wrapper.text()).toMatch('I\'m so clickable');
  });

  it('Apply one or several styles to button', () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: 'I\'m so clickable',
        type: 'primary',
      },
    });
    const button = wrapper.find('button');
    expect(button.classes('primary')).toBeTruthy();
  });
});
