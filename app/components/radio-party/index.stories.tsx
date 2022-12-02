import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { RadioParty } from './radio-party';

export default {
  title: 'Forms/RadioParty',
  component: RadioParty,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RadioParty>;

const Template: ComponentStory<typeof RadioParty> = (args) => (
  <RadioParty {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  name: 'firstName',
  config: [
    { value: 'pitch', label: 'Pitch' },
    { value: 'submission', label: 'Submission' },
  ],
};
