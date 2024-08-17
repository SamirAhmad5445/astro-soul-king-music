import { EditSvg } from "@assets/icons/EditSvg";
import type { Artist, ArtistStatus } from "@utils/types";
import { useEffect, useState } from "react";

interface ArtistDataSectionProps {
  artistName: string;
}

const ArtistDataSection: React.FC<ArtistDataSectionProps> = ({
  artistName,
}) => {
  const [artist, setArtist] = useState<Artist>();
  const [profileImage, setProfileImage] = useState<string>("");
  const [status, setStatus] = useState<ArtistStatus>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArtistInfo();
    fetchArtistImage();
    fetchArtistStatus();
  }, []);

  async function fetchArtistInfo() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/${artistName}/info`,
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

      const data: Artist = await response.json();
      setArtist(data);
    } catch (e) {
      console.log(e);
      setError("Oops, Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchArtistImage() {
    try {
      const response = await fetch(
        `https://localhost:7066/api/artist/${artistName}/profile-image`,
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

      const image = await response.blob();
      setProfileImage(URL.createObjectURL(image));
    } catch (e) {
      console.log(e);
      setError("Oops, Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchArtistStatus() {
    try {
      const response = await fetch("https://localhost:7066/api/artist/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: ArtistStatus = await response.json();
      setStatus(data);
    } catch (e) {
      console.log(e);
      setError("Oops, Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-accent-100">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger-400">Error: {error}</div>;
  }

  return (
    <>
      <div className="my-4 flex flex-col items-center gap-4 rounded-xl bg-neutral-900 px-4 py-4 text-center shadow-xl md:flex-row md:text-start">
        <div className="relative size-24 rounded-full shadow-md">
          <img
            src={profileImage}
            className="overflow-hidden rounded-full object-cover object-center"
            alt=""
          />
        </div>

        <div className="grid items-start gap-2 md:mr-auto">
          <h2 className="flex items-baseline gap-2 text-3xl font-medium">
            {artist?.firstName}
            {artist?.lastName}
            <span className="text-xl opacity-80">({artist?.displayName})</span>

            <a href={`/artist/${artistName}/edit`}>
              <EditSvg className="size-6" />
              <span className="sr-only">Edit Account</span>
            </a>
          </h2>
          <p className="max-w-[52ch]">{artist?.description}</p>
        </div>

        <ul className="flex items-center justify-center gap-2 px-2 text-sm font-bold capitalize md:flex-col md:items-stretch md:text-base">
          <li className="rounded-md bg-primary-100 px-4 py-2 text-primary-600 md:py-1">
            {status?.followersCount} followers
          </li>
          <li className="rounded-md bg-accent-100 px-4 py-2 text-accent-800 md:py-1">
            {status?.songsCount} songs
          </li>
          <li className="rounded-md bg-success-100 px-4 py-2 text-success-700 md:py-1">
            {status?.albumsCount} albums
          </li>
        </ul>
      </div>

      <div></div>
    </>
  );
};

export default ArtistDataSection;
