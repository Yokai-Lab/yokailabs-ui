export const textFieldStyles = {
  root: 'flex flex-col gap-1.5',
  label: 'text-sm font-medium text-fg data-disabled:opacity-50',
  input:
    'h-10 rounded-md border border-border-strong bg-surface px-3 text-sm text-fg placeholder:text-fg-muted data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-danger',
  description: 'text-sm text-fg-muted',
  error: 'text-sm text-danger-fg',
} as const;
