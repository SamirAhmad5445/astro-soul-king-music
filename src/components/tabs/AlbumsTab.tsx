import AlbumCard from "@components/cards/AlbumCard";
import type { Album } from "@utils/types";
import { useEffect, useState } from "react";

type AlbumResponse = Album & {
  artistName: string;
};

const AlbumsTab = () => {
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-albums`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        const data: AlbumResponse[] = await response.json();
        setAlbums(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="grid gap-12 pb-28">
      <section className="grid gap-4">
        <h2 className="px-12 text-2xl font-medium">Fresh Albums release</h2>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album, index) => (
            <AlbumCard key={index} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlbumsTab;
