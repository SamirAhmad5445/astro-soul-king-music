import type { Song } from "@utils/types";
import { DeleteSvg } from "@assets/icons/DeleteSvg";
import { useEffect, useState } from "react";

interface SongComponentProps {
  albumName: string;
  song: Song;
}

const SongCard: React.FC<SongComponentProps> = ({ albumName, song }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${albumName}/${song.name}/image`,
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

  return (
    <li className="group relative flex w-60 flex-col justify-start gap-2 rounded-lg bg-neutral-900 p-4 shadow-md">
      <div className="size-52 overflow-hidden rounded-md">
        <img src={image} alt="" />
      </div>

      <h4 className="text-2xl font-medium">{song.name}</h4>
      <p className="mt-auto text-sm opacity-90">
        {new Date(song.releaseDate).toLocaleString()}
      </p>
      <div className="flex items-center justify-between">
        <span>{song.likesCount} Like</span>
        <span>{song.playsCount} Listeners</span>
      </div>
    </li>
  );
};

export default SongCard;
