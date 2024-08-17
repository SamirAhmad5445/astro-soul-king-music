import type { SongResponse } from "@utils/types";
import { atom } from "nanostores";

export const $currentSongFile = atom<Blob | null>(null);
export const $currentSong = atom<SongResponse | null>(null);
