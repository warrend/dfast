import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { Select } from './select';

export default {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  title: 'Status',
  name: 'status',
  width: '325px',
  selected: 'sent',
  config: [
    { value: 'unsent', label: 'Unsent' },
    { value: 'sent', label: 'Sent' },
  ],
};
