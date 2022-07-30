import { mount } from '@vue/test-utils';

import HeaderContainer from '@/components/shared/HeaderContainer.vue';

describe('HeaderContainer', () => {
  it('should allow parent component to provide title content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        title: '<h1>Test Title</h1>',
      },
    });

    expect(wrapper.text()).toMatch('Test Title');
  });
  it('should allow parent component to provide subtitle content', () => {
    const wrapper = mount(HeaderContainer, {
      slots: {
        subtitle: '<h3>Test SubTitle</h3>',
      },
    });
    expect(wrapper.text()).toMatch('Test SubTitle');
  });
});
