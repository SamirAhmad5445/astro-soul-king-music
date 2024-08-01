import type { Album } from "@utils/types";
import { useEffect, useState } from "react";
import { LoadingSvg } from "@assets/icons/LoadingSvg";

const AlbumsSection = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetchAllAlbums();
  }, []);

  async function fetchAllAlbums() {
    try {
      const response = await fetch(
        "https://localhost:7066/api/artist/album/all",
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

      const data: Album[] = await response.json();
      setAlbums(data);
    } catch (e) {
      console.log(e);
    }
  }

  if (!albums.length) {
    return <></>;
  }

  return (
    <section className="py-4">
      <h2 className="px-4 pb-4 text-2xl font-bold">Your Albums</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {albums.slice(0, 8).map((al) => (
          <AlbumCard name={al.name} description={al.description} />
        ))}
      </div>
    </section>
  );
};

interface AlbumCardProps {
  name: string;
  description: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ name, description }) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetchAlbumImage();
  }, []);

  async function fetchAlbumImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/album/${name}/thumbnail`,
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
      console.log(e);
    }
  }

  return (
    <a
      href="#"
      className="grid grid-cols-[5rem_1fr] grid-rows-[5rem] overflow-hidden rounded-lg bg-neutral-800 text-start shadow-md"
    >
      <div className="grid size-full place-content-center">
        {image ? (
          <img
            src={image}
            className="size-full object-contain object-center"
            width={64}
            height={64}
            alt=""
          />
        ) : (
          <LoadingSvg />
        )}
      </div>

      <div className="flex items-center px-4">
        <p>{name}</p>
      </div>
    </a>
  );
};

export default AlbumsSection;
