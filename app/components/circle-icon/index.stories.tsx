import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import { CircleIcon } from '.';

export default {
  title: 'Reusable/CircleIcon',
  component: CircleIcon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CircleIcon>;

const Template: ComponentStory<typeof CircleIcon> = (args) => (
  <CircleIcon {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  icon: <ClipboardDocumentCheckIcon height={18} width="auto" />,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
