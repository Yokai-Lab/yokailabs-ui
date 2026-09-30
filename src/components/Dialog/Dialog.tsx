import type { ComponentProps } from 'react';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';

import { cn } from '../../utils/cn.ts';
import { dialogStyles } from './Dialog.styles.ts';

// Base UI owns the behaviour (focus trap, focus return, Escape, scroll lock, `aria-labelledby`
// from the title), so these parts only add the look. Trigger and Close stay unstyled: give them
// a Button with `render={<Button />}`.
export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export interface DialogContentProps extends Omit<BaseDialog.Popup.Props, 'className'> {
  className?: string;
}

export function DialogContent({ className, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={dialogStyles.backdrop} />
      <BaseDialog.Popup {...props} className={cn(dialogStyles.popup, className)} />
    </BaseDialog.Portal>
  );
}

export interface DialogTitleProps extends Omit<BaseDialog.Title.Props, 'className'> {
  className?: string;
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <BaseDialog.Title {...props} className={cn(dialogStyles.title, className)} />;
}

export interface DialogDescriptionProps extends Omit<BaseDialog.Description.Props, 'className'> {
  className?: string;
}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <BaseDialog.Description {...props} className={cn(dialogStyles.description, className)} />;
}

// The row of actions at the bottom.
export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn(dialogStyles.footer, className)} />;
}
