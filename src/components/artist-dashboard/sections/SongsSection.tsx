import type { Song } from "@utils/types";
import { useEffect, useState } from "react";

const SongsSection = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchAllSongs();
  }, []);

  async function fetchAllSongs() {
    try {
      const response = await fetch(
        "https://localhost:7066/api/artist/song/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Song[] = await response.json();
      setSongs(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (!songs.length) {
    return <></>;
  }

  return (
    <section className="py-4 max-md:overflow-x-scroll">
      <h2 className="px-4 pb-4 text-2xl font-bold">All Songs</h2>
      <table className="grid min-w-[720px] gap-2">
        <thead>
          <tr className="bg-slate-800 grid grid-cols-4 rounded-xl px-4 py-3">
            <td>Song Name</td>
            <td>Release Date</td>
            <td>Likes</td>
            <td>Plays</td>
          </tr>
        </thead>
        <tbody
          className="divide-indigo-300 grid gap-2 divide-y"
          id="recommendation"
        >
          {songs.map((song) => (
            <tr className="mx-2 grid grid-cols-4 px-2 py-3" key={song.name}>
              <td>{song.name}</td>
              <td>{new Date(song.releaseDate).toLocaleTimeString()}</td>
              <td>{song.likesCount} Like</td>
              <td>Played {song.listenersCount} time</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default SongsSection;
