import NavBottom from '@/components/NavBottom';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MyComponent/NavBottom',
  component: NavBottom,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const Monthly: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/monthly',
      },
    },
  },
};

export const TodoList: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/todolist',
      },
    },
  },
};

export const MyPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/mypage',
      },
    },
  },
};
