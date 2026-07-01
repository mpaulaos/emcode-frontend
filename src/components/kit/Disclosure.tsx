import React, { useContext } from "react";
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
import { ChevronDown, Plus } from "lucide-react";

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
    isDisabled?: boolean;
    onAddLessonPress?: () => void;
    showAddButton?: boolean;
}

export function DisclosureHeader({ children, isDisabled, onAddLessonPress, showAddButton = true }: DisclosureHeaderProps) {
    const { isExpanded } = useContext(DisclosureStateContext)!;

    return (
        <Heading className="m-0 text-black ">
            <div className="flex flex-wrap items-center justify-between w-full gap-6 border-md border-neutral-100 p-sm rounded-lg border-l-6 border-l-purple-600 ">

                <Button slot="trigger" isDisabled={isDisabled} className="flex-1 min-w-0 flex items-center gap-6 cursor-pointer font-semibold">
                    <span className="truncate text-body-lg font-semibold">{children}</span>
                </Button>

                {showAddButton && (
                <Button
                    aria-label="Crear nueva lección"
                    className="flex items-center gap-1 sm:gap-2 rounded-lg bg-surface-action px-2 sm:px-3 py-1.5 text-sm font-semibold text-text-on-action border-none cursor-pointer transition hover:bg-surface-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus shrink-0"
                    onPress={onAddLessonPress}
                >
                    <Plus size={18} aria-hidden="true" />
                    <span className="hidden sm:inline">Agregar</span>
                </Button>
                )}

                <ChevronDown aria-hidden className={`${chevron({ isExpanded, isDisabled })} shrink-0`} />
            </div>
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