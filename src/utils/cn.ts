import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Joins class lists, and lets a later class win over an earlier one of the same kind, so a
// consumer's `className="p-6"` replaces the component's padding instead of fighting it.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
