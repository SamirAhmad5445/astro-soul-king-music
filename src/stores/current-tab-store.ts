import { atom } from "nanostores";

export type Tabs = "home" | "artists" | "albums" | "songs";

export const $currentTab = atom<Tabs>("home");
export const tabValues: Tabs[] = ["home", "artists", "albums", "songs"];
