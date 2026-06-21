import React, { use } from "react";
import { Button } from "react-aria-components";
import {
    Disclosure as AriaDisclosure,
    DisclosurePanel as AriaDisclosurePanel,
    DisclosureStateContext,
    Heading,
    type DisclosurePanelProps as AriaDisclosurePanelProps,
    type DisclosureProps as AriaDisclosureProps,
} from 'react-aria-components/Disclosure';
import { composeRenderProps } from 'react-aria-components/composeRenderProps';
import { tv } from "tailwind-variants";
import { ChevronDown } from "lucide-react";
import { Meter } from "./Meter";


const disclosure = tv({
    base: "group min-w-50 font-sans rounded-lg text-neutral-900 dark:text-neutral-200"
});

const chevron = tv({
    base: "w-4 h-4 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ease-in-out",
    variants: {
        isExpanded: {
            true: "transform rotate-180",
        },
        isDisabled: {
            true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]'
        }
    }
});

export interface DisclosureProps extends AriaDisclosureProps {
    children: React.ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
    return (
        <AriaDisclosure
            {...props}
            className={composeRenderProps(props.className, (className, renderProps) => disclosure({ ...renderProps, className }))}
        >
            {children}
        </AriaDisclosure>
    );
}

export interface DisclosureHeaderProps {
    children: React.ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
    let { isExpanded } = use(DisclosureStateContext)!;
    return (
        <Heading className="text-sm font-semibold m-0 text-black">
            <Button
                slot="trigger"
                // variant="quiet"
                className="w-full min-w-0 flex items-center gap-2 font-medium">
                {({ isDisabled }) => (
                    <>
                        <div className="flex flex-wrap items-center w-full">
                            <span>{children}</span>
                            <Meter className="min-w-0 flex-1" label="Progreso" maxValue={100} value={20}></Meter>
                        </div>
                        <ChevronDown aria-hidden className={`${chevron({ isExpanded, isDisabled })}`} />
                    </>
                )}
            </Button>
        </Heading>
    );
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
    children: React.ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
    return (
        <AriaDisclosurePanel {...props} className={composeRenderProps(props.className, (className, renderProps) => disclosure({ ...renderProps, className }))}>
            <div className="px-4 py-2">{children}</div>
        </AriaDisclosurePanel>
    );
}
