import React from 'react';
import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { Project } from './project';

export default {
  title: 'Reusable/Project',
  component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = (args) => (
  <Project {...args} />
);

export const Primary = Template.bind({});

const data = {
  id: '123abc',
  category: 'pitch',
  createdAt: '2011-10-05T14:48:00.000Z',
  description: 'Short story about living in the East Village',
  editor: { email: 'shannon@browns.com', name: 'Shannon Brown' },
  history: [{ status: 'sent', updatedAt: '2011-10-05T14:48:00.000Z' }],
  publication: 'The New Yorker',
  status: 'sent',
  title: 'Life in the City',
};

Primary.args = {
  project: data,
};
