import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';

import { TextField } from './TextField.tsx';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Email', name: 'email', placeholder: 'you@example.com' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'kitsune@example.com');
    await expect(input).toHaveValue('kitsune@example.com');
  },
};

export const WithDescription: Story = {
  args: { description: 'We only use it to send receipts.' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toHaveAccessibleDescription('We only use it to send receipts.');
  },
};

export const WithError: Story = {
  args: { defaultValue: 'kitsune', error: 'Enter a full email address.' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAccessibleDescription('Enter a full email address.');
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'kitsune@example.com' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeDisabled();
  },
};
