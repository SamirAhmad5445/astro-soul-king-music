import AlbumCard from "@components/cards/AlbumCard";
import ArtistCard from "@components/cards/ArtistCard";
import SongCard from "@components/cards/SongCard";
import type { AlbumResponse, Artist, SongResponse } from "@utils/types";
import { useEffect, useState } from "react";

const HomeTab = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [songs, setSongs] = useState<SongResponse[]>([]);

  useEffect(() => {
    fetchArtists();
    fetchAlbums();
    fetchSongs();
  }, []);

  async function fetchArtists() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-artists/${0}`,
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

  async function fetchAlbums() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-albums/${0}`,
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

  async function fetchSongs() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/user/get-songs/${0}`,
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
        <h2 className="px-12 text-2xl font-medium">Popular Artist</h2>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </div>
      </section>
      <section className="grid gap-4">
        <h2 className="px-12 text-2xl font-medium">Fresh Albums release</h2>
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album, index) => (
            <AlbumCard key={index} album={album} />
          ))}
        </div>
      </section>
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

export default HomeTab;
