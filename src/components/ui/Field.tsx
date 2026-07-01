'use client';
import { type FieldErrorProps, FieldError as RACFieldError } from 'react-aria-components/FieldError';
import { type InputProps, Input as RACInput } from 'react-aria-components/Input';
import { type LabelProps, Label as RACLabel } from 'react-aria-components/Label';
import { Text, type TextProps } from 'react-aria-components/Text';
import { twMerge } from 'tailwind-merge';
import { composeTailwindRenderProps } from "./utils";

export function Label(props: LabelProps) {
  return <RACLabel {...props} className={twMerge('font-body text-sm text-text-headings font-medium cursor-default w-fit', props.className)} />;
}

export function Description(props: TextProps) {
  return <Text {...props} slot="description" className={twMerge('text-sm text-text-body', props.className)} />;
}

export function FieldError(props: FieldErrorProps) {
  return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-text-danger forced-colors:text-[Mark]')} />
}

export function Input(props: InputProps) {
  return <RACInput {...props} className={composeTailwindRenderProps(props.className, 'px-3 py-0 min-h-9 flex-1 min-w-0 border-0 outline outline-0 bg-surface-page font-body text-sm text-text-body placeholder:text-text-body disabled:text-text-disabled disabled:placeholder:text-text-disabled [-webkit-tap-highlight-color:transparent]')} />
}
