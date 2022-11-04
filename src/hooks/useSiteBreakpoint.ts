import { useEffect, useState } from "react";
import { useBoolean, useDebounce, useWindowSize } from "usehooks-ts";

import { UI_BREAKPOINTS } from "../config";

const SIZES: string[] = ["sm", "md", "lg", "xl"];

export default function useSiteBreakpoint(): string {
	const { width } = useWindowSize();
	const siteWidth = useDebounce<number>(width, 100);
	const [breakpoint, setBreakpoint] = useState<string>("xl");
	const { value: busy, setValue: setBusy } = useBoolean(false);

	useEffect(() => {
		if (siteWidth > -1 && !busy) {
			setBusy(true);
			let siteBp = "xl";
			for (let i = 0; i < SIZES.length; i++) {
				const size = SIZES[i];
				if (siteWidth < UI_BREAKPOINTS[size]) {
					siteBp = size;
					break;
				}
			}

			if (siteBp !== breakpoint) {
				console.log(
					`Site breakpoint changed @ ${siteWidth}px ${breakpoint} -> ${siteBp}`
				);
				setBreakpoint(siteBp);
			}
			setBusy(false);
		}
	}, [breakpoint, busy, siteWidth]);

	return breakpoint;
}
