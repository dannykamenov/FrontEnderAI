import React from "react";

import { cn } from "@/lib/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {}

const ArrowDown = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => (
    <svg
        ref={ref}
        {...props}
        className={cn('', props.className)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
    </svg>
));

ArrowDown.displayName = "ArrowDown";
export default ArrowDown;

