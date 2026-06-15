import { tv } from 'tailwind-variants';

export const fieldBorderStyles = tv({
  base: 'transition',
  variants: {
    isFocusWithin: {
      false: 'border-neutral-400 hover:border-neutral-500 forced-colors:border-[ButtonBorder]',
      true: 'border-border-action forced-colors:border-[Highlight]',
    },
    isInvalid: {
      true: 'border-border-danger forced-colors:border-[Mark]'
    },
    isDisabled: {
      true: 'border-border-disabled forced-colors:border-[GrayText]'
    }
  }
});
