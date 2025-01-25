import { RootState } from "@/app/providers/store";

export const selectSidebarState = (state: RootState) => state.sidebar.isOpen;
