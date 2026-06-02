'use client';
import { Check, Minus } from 'lucide-react';
import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components/Checkbox';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { focusRing } from './utils';

const checkboxStyles = tv({
  base: 'flex gap-2 items-center group font-body text-sm transition relative [-webkit-tap-highlight-color:transparent]',
  variants: {
    isDisabled: {
      false: 'text-text-headings',
      true: 'text-text-disabled forced-colors:text-[GrayText]'
    }
  }
});

const boxStyles = tv({
  extend: focusRing,
  base: 'w-4.5 h-4.5 box-border shrink-0 rounded-sm flex items-center justify-center border transition',
  variants: {
    isSelected: {
      false: 'bg-surface-page border-(--color) [--color:var(--color-neutral-400)] group-pressed:[--color:var(--color-neutral-500)]',
      true: 'bg-(--color) border-(--color) [--color:var(--color-primary)] group-pressed:[--color:var(--color-primary-700)] forced-colors:[--color:Highlight]!'
    },
    isInvalid: {
      true: '[--color:var(--color-border-danger)] forced-colors:[--color:Mark]! group-pressed:[--color:var(--color-danger-700)]'
    },
    isDisabled: {
      true: '[--color:var(--color-border-disabled)] forced-colors:[--color:GrayText]!'
    }
  }
});

const iconStyles = 'w-3.5 h-3.5 text-text-on-action group-disabled:text-icon-disabled forced-colors:text-[HighlightText] pointer-events-none';

export interface CheckboxPropsWithLabel extends CheckboxProps {
  labelClassName?: string;
}

export function Checkbox({ labelClassName, ...props }: CheckboxPropsWithLabel) {
  return (
    <AriaCheckbox {...props} className={composeRenderProps(props.className, (className, renderProps) => checkboxStyles({...renderProps, className}))}>
      {composeRenderProps(props.children, (children, {isSelected, isIndeterminate, ...renderProps}) => (
        <>
          <div className={boxStyles({isSelected: isSelected || isIndeterminate, ...renderProps})}>
            {isIndeterminate
              ? <Minus aria-hidden className={iconStyles} />
              : isSelected
                ? <Check aria-hidden className={iconStyles} />
                : null
            }
          </div>
          <span className={twMerge('text-sm', labelClassName)}>{children}</span>
        </>
      ))}
    </AriaCheckbox>
  );
}
