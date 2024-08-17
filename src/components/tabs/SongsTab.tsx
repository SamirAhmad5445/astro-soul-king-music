import SongCard from "@components/cards/SongCard";
import type { SongResponse } from "@utils/types";
import { useEffect, useState } from "react";

const SongsTab = () => {
  const [songs, setSongs] = useState<SongResponse[]>([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-songs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        const data: SongResponse[] = await response.json();
        setSongs(data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="grid gap-12 pb-28">
      <section className="grid gap-4">
        <h2 className="px-12 text-2xl font-medium">Some Magical Songs</h2>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {songs.map((song) => (
            <SongCard song={song} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SongsTab;
