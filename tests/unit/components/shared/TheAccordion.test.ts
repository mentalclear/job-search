import { mount } from '@vue/test-utils';

import TheAccordion from '@/components/shared/TheAccordion.vue';

describe('TheAccordion', () => {
  const createConfig = (config = {}) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: 'Test Header',
    },
    slots: {
      default: '<h3>My nested child</h3>',
    },
    ...config,
  });
  it('should render child', async () => {
    const slots = {
      default: '<h3>My nested child</h3>',
    };
    const config = { slots };
    const wrapper = mount(TheAccordion, createConfig(config));
    expect(wrapper.text()).not.toMatch('My nested child');
    const clickableArea = wrapper.find('[data-test="clickable-area"]');
    await clickableArea.trigger('click');
    expect(wrapper.text()).toMatch('My nested child');
  });
  describe('when custom child content is NOT provided', () => {
    it('should render default content', async () => {
      const slots = {};
      const config = { slots };
      const wrapper = mount(TheAccordion, createConfig(config));
      const clickableArea = wrapper.find('[data-test="clickable-area"]');
      await clickableArea.trigger('click');
      expect(wrapper.text()).toMatch('Whoops, something has forgotten to populate me!');
    });
  });
});
