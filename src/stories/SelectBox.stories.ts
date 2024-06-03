import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SelectBox from '@/components/SelectBox';
import { MONTH_OF_YEAR } from '@/constants';

const meta = {
  title: 'MyComponent/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: '월',
    possibleList: MONTH_OF_YEAR,
    currentProps: 6,
    setCurrentProps: fn(),
  },
};
