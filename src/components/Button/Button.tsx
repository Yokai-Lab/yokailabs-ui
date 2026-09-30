import { Button as BaseButton } from '@base-ui/react/button';

import { cn } from '../../utils/cn.ts';
import { buttonStyles } from './Button.styles.ts';

export interface ButtonProps extends Omit<BaseButton.Props, 'className'> {
  variant?: keyof typeof buttonStyles.variant;
  size?: keyof typeof buttonStyles.size;
  className?: string;
}

// Renders a native <button>. To look like a button while being a link, pass
// `render={<a href="…" />}` with `nativeButton={false}`.
export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={cn(buttonStyles.base, buttonStyles.variant[variant], buttonStyles.size[size], className)}
    />
  );
}
