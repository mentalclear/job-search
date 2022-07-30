import { mount } from '@vue/test-utils';
import TextInput from '@/components/shared/TextInput.vue';

describe('TextInput', () => {
  it('should communicate that user have enterd a character', () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: '',
        id: '',
      },
    });

    const input = wrapper.find('input');
    input.setValue('N');
    input.setValue('NY');
    input.setValue('NYC');
    const messages = wrapper.emitted()['update:modelValue'];
    expect(messages).toEqual([['N'], ['NY'], ['NYC']]);
  });
});
