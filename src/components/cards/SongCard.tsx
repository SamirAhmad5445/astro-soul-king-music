import { $currentSong, $currentSongFile } from "@stores/current-song";
import type { SongResponse } from "@utils/types";
import { useEffect, useState } from "react";

interface SongCardProps {
  song: SongResponse;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const [image, setImage] = useState<string>("");
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/song/${song.artistName}/${song.albumName}/${song.name}/image`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/webp",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
    }
  }

  async function handlePlay() {
    if (!token) {
      location.href = "/login";
    }

    try {
      const response = await fetch(
        `https://localhost:7066/api/user/song/${song.artistName}/${song.albumName}/${song.name}/listen`,
        {
          method: "GET",
          headers: {
            "Content-Type": "audio/mpeg",
            Authorization: "bearer " + token,
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      $currentSongFile.set(blob);
      $currentSong.set(song);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className="group relative mx-auto flex w-fit flex-col justify-start gap-2 rounded-lg bg-neutral-900 p-4 shadow-md"
      onClick={handlePlay}
    >
      <div className="size-48 overflow-hidden rounded-md">
        <img src={image} alt="" />
      </div>

      <h4 className="max-w-[16ch] text-lg font-medium">{song.name}</h4>
      <p className="mt-auto text-sm opacity-90">
        {new Date(song.releaseDate).toLocaleString()}
      </p>
      <div className="flex items-center justify-between">
        <span>{song.likesCount} Like</span>
        <span>{song.playsCount} Listeners</span>
      </div>
    </div>
  );
};

export default SongCard;
