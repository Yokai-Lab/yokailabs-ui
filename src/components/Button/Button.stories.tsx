import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';

import { Button } from './Button.tsx';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save changes', onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Save changes' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Danger: Story = { args: { variant: 'danger', children: 'Delete project' } };

export const Small: Story = { args: { size: 'sm' } };

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

// Every variant at every size, for comparing them side by side.
export const Gallery: Story = {
  render: (args) => (
    <div className="inline-grid grid-cols-3 items-center justify-items-start gap-3">
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => [
        <Button key={`${variant}-md`} {...args} variant={variant}>
          {variant}
        </Button>,
        <Button key={`${variant}-sm`} {...args} variant={variant} size="sm">
          {variant}
        </Button>,
        <Button key={`${variant}-disabled`} {...args} variant={variant} disabled>
          {variant}
        </Button>,
      ])}
    </div>
  ),
};
