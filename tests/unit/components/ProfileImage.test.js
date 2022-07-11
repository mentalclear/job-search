import { shallowMount } from '@vue/test-utils';

import ProfileImage from '@/components/ProfileImage.vue';

describe('ProfileImage', () => {
  it('Profile Image should be rendered', () => {
    const wrapper = shallowMount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
