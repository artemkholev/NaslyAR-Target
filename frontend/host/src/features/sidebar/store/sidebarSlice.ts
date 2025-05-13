import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
}

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state: SidebarState): void => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state: SidebarState): void => {
      state.isOpen = true;
    },
    closeSidebar: (state: SidebarState): void => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;