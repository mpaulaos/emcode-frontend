'use client';
import React from 'react';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { Button as RACButton, type ButtonProps as RACButtonProps } from 'react-aria-components/Button';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

export interface ButtonProps extends RACButtonProps {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'destructive' | 'quiet'
}

let button = tv({
  extend: focusRing,
  base: 'relative inline-flex items-center justify-center gap-2 border border-transparent dark:border-white/10 h-9 box-border px-3.5 py-0 [&:has(>svg:only-child)]:px-0 [&:has(>svg:only-child)]:h-8 [&:has(>svg:only-child)]:w-8 font-body text-sm text-center transition rounded-lg cursor-default [-webkit-tap-highlight-color:transparent]',
  variants: {
    variant: {
      primary: 'bg-primary-700 hover:bg-surface-action-hover pressed:bg-primary-800 text-text-on-action',
      secondary: 'border-border-card bg-surface-page hover:bg-surface-action-hover-2 pressed:bg-neutral-200 text-text-body dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:pressed:bg-neutral-500 dark:text-text-on-action',
      destructive: 'bg-surface-danger hover:bg-surface-danger-hover pressed:bg-danger-700 text-text-on-action',
      quiet: 'border-0 bg-transparent hover:bg-surface-action-hover-2 pressed:bg-neutral-300 text-text-body dark:hover:bg-neutral-700 dark:pressed:bg-neutral-600 dark:text-neutral-100'
    },
    isDisabled: {
      true: 'border-transparent dark:border-transparent bg-surface-disabled dark:bg-neutral-800 text-text-disabled dark:text-neutral-600 forced-colors:text-[GrayText]'
    },
    isPending: {
      true: 'text-transparent'
    }
  },
  defaultVariants: {
    variant: 'primary'
  },
  compoundVariants: [
    {
      variant: 'quiet',
      isDisabled: true,
      class: 'bg-transparent dark:bg-transparent'
    }
  ]
});

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(
        props.className,
        (className, renderProps) => button({...renderProps, variant: props.variant, className})
      )}
    >
      {composeRenderProps(props.children, (children, {isPending}) => (
        <>
          {children}
          {isPending && (
            <span aria-hidden className="flex absolute inset-0 justify-center items-center">
              <svg className="w-4 h-4 text-text-on-action animate-spin" viewBox="0 0 24 24" stroke={props.variant === 'secondary' || props.variant === 'quiet' ? 'light-dark(black, white)' : 'var(--text-on-action)'}>
                <circle cx="12" cy="12" r="10" strokeWidth="4" fill="none" className="opacity-25" />
                <circle cx="12" cy="12" r="10" strokeWidth="4" strokeLinecap="round" fill="none" pathLength="100" strokeDasharray="60 140" strokeDashoffset="0" />
              </svg>
            </span>
          )}
        </>
      ))}
    </RACButton>
  );
}
