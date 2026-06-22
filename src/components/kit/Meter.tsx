import { AlertTriangle } from "lucide-react";

import {
  Meter as AriaMeter,
  type MeterProps as AriaMeterProps,
  Label,
} from "react-aria-components/Meter";

export interface MeterProps extends AriaMeterProps {
  label?: string;
}

export function Meter({ label, ...props }: MeterProps) {
  return (
    <AriaMeter {...props} className="flex flex-col gap-2 font-sans w-full max-w-150 min-w-50 ">
      {({ percentage, valueText }) => (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Label className="text-(--text-body-lg-size) leading-(--text-body-lg-lh) font-normal">
            {label}
          </Label>

          <span
            className={`text-(--text-body-sm-size) leading-(--text-body-sm-lh) font-normal ${percentage >= 80 ? "text-text-danger" : "text-text-body"
              }`}
          >
            {percentage >= 80 && (
              <AlertTriangle
                aria-label="Alert"
                className="inline-block w-4 h-4 align-text-bottom"
              />
            )}
            {" " + valueText}
          </span>

          <div className="w-full sm:flex-1 h-2 rounded-lg bg-surface-card outline-1 -outline-offset-1 outline-transparent relative border border-border-card">
            <div
              className={`absolute top-0 left-0 h-full rounded-full ${getColor(percentage)} forced-colors:bg-[Highlight]`}
              style={{ width: percentage + "%" }}
            />
          </div>
        </div>
      )}
    </AriaMeter>
  );
}

function getColor(percentage: number) {
  if (percentage < 70) return "bg-purple-600";
  if (percentage < 80) return "bg-purple-600";
  return "bg-purple-600";
}