import ArtistCard from "@components/cards/ArtistCard";
import type { Artist } from "@utils/types";
import { useEffect, useState } from "react";

const ArtistsTab = () => {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-artists`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        const data: Artist[] = await response.json();
        setArtists(data);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="grid gap-12 pb-28">
      <section className="grid gap-4">
        <h2 className="px-12 text-2xl font-medium">Popular Artist</h2>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistsTab;
