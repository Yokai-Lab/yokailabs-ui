export const buttonStyles = {
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors select-none motion-reduce:transition-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
  variant: {
    primary: 'bg-primary text-on-primary not-data-disabled:hover:bg-primary-hover',
    secondary: 'border border-border-strong bg-surface text-fg not-data-disabled:hover:bg-surface-muted',
    ghost: 'text-fg not-data-disabled:hover:bg-surface-muted',
    danger: 'bg-danger text-on-danger not-data-disabled:hover:bg-danger-hover',
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
  },
} as const;
