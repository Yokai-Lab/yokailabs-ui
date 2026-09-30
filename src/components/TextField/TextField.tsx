import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';

import { cn } from '../../utils/cn.ts';
import { textFieldStyles } from './TextField.styles.ts';

export interface TextFieldProps extends Omit<Input.Props, 'className'> {
  label: string;
  description?: string;
  // Shown whenever it is set, and marks the input invalid. Validation stays with the caller.
  error?: string;
  // Applies to the wrapper, so a layout can size the whole field.
  className?: string;
}

// A labelled text input. Base UI's Field wires the label, description and error to the input
// (`for`, `aria-describedby`, `aria-invalid`), so none of it is done by hand here.
export function TextField({ label, description, error, disabled, className, ...props }: TextFieldProps) {
  return (
    <Field.Root className={cn(textFieldStyles.root, className)} disabled={disabled} invalid={Boolean(error)}>
      <Field.Label className={textFieldStyles.label}>{label}</Field.Label>
      <Input {...props} className={textFieldStyles.input} />
      {description && <Field.Description className={textFieldStyles.description}>{description}</Field.Description>}
      {error && (
        <Field.Error className={textFieldStyles.error} match>
          {error}
        </Field.Error>
      )}
    </Field.Root>
  );
}
