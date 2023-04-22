import { useMedia } from "@dwarvesf/react-hooks";

export function useIsMobile(): boolean {
  return useMedia([`(max-width: 767px)`], [true], false);
}
