'use client';
import React from 'react';
import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components/Link';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from 'tailwind-variants';
import { focusRing } from './utils';

interface LinkProps extends AriaLinkProps {
  variant?: 'primary' | 'secondary'
}

const styles = tv({
  extend: focusRing,
  base: 'underline disabled:no-underline disabled:cursor-default forced-colors:disabled:text-[GrayText] transition rounded-xs [-webkit-tap-highlight-color:transparent]',
  variants: {
    variant: {
      primary: 'text-primary-700 underline decoration-primary-700/60 hover:decoration-primary-700',
      secondary: 'text-text-body underline decoration-text-body/50 hover:decoration-text-body'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export function Link(props: LinkProps) {
  return <AriaLink {...props} className={composeRenderProps(props.className, (className, renderProps) =>  styles({...renderProps, className, variant: props.variant}))} />;
}
