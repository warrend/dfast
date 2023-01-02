import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { Button } from './button';

export default {
  title: 'Forms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  width: '125',
  label: 'Login',
  name: 'click',
  id: 'form',
  type: 'button',
};
