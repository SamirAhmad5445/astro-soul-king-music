import type { AlbumResponse } from "@utils/types";
import { useEffect, useState } from "react";
import DefaultImage from "@assets/default-song-cover.png";
import { slugify } from "@utils/parse-path";

interface AlbumCardProps {
  album: AlbumResponse;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const [image, setImage] = useState<string>(DefaultImage.src);

  useEffect(() => {
    getImage();
  }, []);

  async function getImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-album/${album.artistName}/${album.name}/thumbnail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "image/webp",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <a
      href={`/app/artist/${album.artistName}/${slugify(album.name)}`}
      className="mx-auto grid max-w-fit content-start items-center gap-3 rounded-lg p-2 pb-5 hover:bg-neutral-800/80"
    >
      <div>
        <img src={image} className="size-44 rounded-md" alt="" />
      </div>
      <p>{album.name}</p>
    </a>
  );
};

export default AlbumCard;
