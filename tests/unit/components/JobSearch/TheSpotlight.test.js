import { mount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import TheSpotlight from '@/components/JobSearch/TheSpotlight.vue';

jest.mock('axios');

describe('TheSpotlight', () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: 'Some image',
          title: 'Some title',
          description: 'Some description',
          ...data,
        },
      ],
    });
  };

  it('should provides img attribue to parent compnent', async () => {
    mockSpotlightResponse({ img: 'Some image' });
    const wrapper = mount(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.img }} </h1>
            </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch('Some image');
  });

  it('should provides img attribue to parent compnent', async () => {
    mockSpotlightResponse({ title: 'Some title' });
    const wrapper = mount(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.title }} </h1>
            </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch('Some title');
  });

  it('should provides img attribue to parent compnent', async () => {
    mockSpotlightResponse({ description: 'Some description' });
    const wrapper = mount(TheSpotlight, {
      slots: {
        default: `<template #default="slotProps">
            <h1>{{ slotProps.description }} </h1>
            </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch('Some description');
  });
});
