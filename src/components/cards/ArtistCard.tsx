import type { Artist } from "@utils/types";
import DefaultProfilePic from "@assets/default-profile-image.webp";
import { useEffect, useState } from "react";

interface ArtistCardProps {
  artist: Artist;
}
const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [image, setImage] = useState<string>(DefaultProfilePic.src);

  useEffect(() => {
    getArtistImage();
  }, []);

  async function getArtistImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-artist/${artist.username}/profile-image`,
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
      href={`/app/artist/${artist.username}`}
      className="mx-auto grid w-52 place-content-center rounded-xl border border-primary-200 py-2 text-center hover:bg-neutral-800/80"
    >
      <div className="mx-auto mb-2">
        <img className="size-24 rounded-full" src={image} alt="" />
      </div>

      <p className="max-w-[16ch]">
        <span className="text-lg font-medium">{artist.displayName}</span>
        <span className="opacity-75"> @{artist.username}</span>
      </p>
      <p>{artist.followersCount}</p>
    </a>
  );
};

export default ArtistCard;
