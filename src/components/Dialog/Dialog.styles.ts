export const dialogStyles = {
  backdrop:
    'fixed inset-0 bg-overlay transition-opacity duration-150 motion-reduce:transition-none data-ending-style:opacity-0 data-starting-style:opacity-0',
  popup:
    'fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-6 text-fg shadow-lg transition-[opacity,scale] duration-150 motion-reduce:transition-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
  title: 'text-lg font-semibold text-fg',
  description: 'mt-2 text-sm text-fg-muted',
  footer: 'mt-6 flex justify-end gap-2',
} as const;
