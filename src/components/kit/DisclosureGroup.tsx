import React from "react";
import {
  DisclosureGroup as AriaDisclosureGroup,
  type DisclosureGroupProps as AriaDisclosureGroupProps,
} from 'react-aria-components/DisclosureGroup';

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children: React.ReactNode
}

export function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
  return (
    <AriaDisclosureGroup {...props} className="flex flex-col gap-2 w-full">
      {children}
    </AriaDisclosureGroup>
  );
}
